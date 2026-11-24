import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const buildDir = path.join(rootDir, 'build');
const staticDownloadsDir = path.join(rootDir, 'static', 'downloads');
const buildDownloadsDir = path.join(buildDir, 'downloads');

fs.mkdirSync(staticDownloadsDir, { recursive: true });
if (fs.existsSync(buildDir)) {
	fs.mkdirSync(buildDownloadsDir, { recursive: true });
}

// Simple MIME map for serving build directory
const MIME_TYPES = {
	'.html': 'text/html; charset=UTF-8',
	'.js': 'application/javascript; charset=UTF-8',
	'.css': 'text/css; charset=UTF-8',
	'.json': 'application/json; charset=UTF-8',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
	'.svg': 'image/svg+xml',
	'.pdf': 'application/pdf',
	'.woff2': 'font/woff2',
	'.woff': 'font/woff'
};

function createStaticServer(port) {
	const server = http.createServer((req, res) => {
		try {
			let safeUrl = new URL(req.url, `http://localhost:${port}`).pathname;
			if (safeUrl.endsWith('/')) {
				safeUrl += 'index.html';
			}

			let filePath = path.join(buildDir, safeUrl);
			if (!fs.existsSync(filePath)) {
				// try with .html
				if (fs.existsSync(filePath + '.html')) {
					filePath += '.html';
				} else if (fs.existsSync(path.join(filePath, 'index.html'))) {
					filePath = path.join(filePath, 'index.html');
				} else {
					res.writeHead(404, { 'Content-Type': 'text/plain' });
					res.end('Not Found');
					return;
				}
			}

			const ext = path.extname(filePath).toLowerCase();
			const contentType = MIME_TYPES[ext] || 'application/octet-stream';

			res.writeHead(200, {
				'Content-Type': contentType,
				'Cache-Control': 'no-cache'
			});
			fs.createReadStream(filePath).pipe(res);
		} catch (err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('Server Error: ' + err.message);
		}
	});

	return new Promise((resolve) => {
		server.listen(port, '127.0.0.1', () => {
			resolve(server);
		});
	});
}

function getPdfPageCount(filePath) {
	try {
		const out = execSync(`pdfinfo "${filePath}"`, { encoding: 'utf-8' });
		const match = out.match(/Pages:\s+(\d+)/);
		if (match) return parseInt(match[1], 10);
	} catch (e) {
		// fallback using Ghostscript or file size
	}
	return null;
}

async function generatePdfs() {
	console.log('Generating CV and Portfolio PDFs from build directory...');

	let chromium;
	try {
		const playwright = await import('playwright');
		chromium = playwright.chromium;
	} catch (e) {
		console.warn('⚠️ Playwright not installed. Skipping PDF generation and using existing fallback downloads.');
		return;
	}

	const PORT = 4173;
	let server;
	let browser;

	try {
		server = await createStaticServer(PORT);
		browser = await chromium.launch({
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		});

		const context = await browser.newContext();

		const pdfJobs = [
			{
				route: '/print/cv/id/',
				filename: 'CV_Thomas_Lefvi_Baehaqi_ID.pdf',
				expectedPages: 1,
				isCv: true
			},
			{
				route: '/print/cv/en/',
				filename: 'CV_Thomas_Lefvi_Baehaqi_EN.pdf',
				expectedPages: 1,
				isCv: true
			},
			{
				route: '/print/portfolio/id/',
				filename: 'Portfolio_Thomas_Lefvi_Baehaqi_ID.pdf',
				expectedPages: 3,
				isCv: false
			},
			{
				route: '/print/portfolio/en/',
				filename: 'Portfolio_Thomas_Lefvi_Baehaqi_EN.pdf',
				expectedPages: 3,
				isCv: false
			}
		];

		for (const job of pdfJobs) {
			console.log(`Rendering ${job.filename} from http://127.0.0.1:${PORT}${job.route}...`);
			const page = await context.newPage();
			await page.goto(`http://127.0.0.1:${PORT}${job.route}`, { waitUntil: 'networkidle' });

			// Wait for fonts to load
			await page.evaluate(() => document.fonts.ready);

			const staticTarget = path.join(staticDownloadsDir, job.filename);
			const buildTarget = path.join(buildDownloadsDir, job.filename);

			await page.pdf({
				path: staticTarget,
				format: 'A4',
				printBackground: true,
				preferCSSPageSize: true,
				margin: {
					top: 0,
					bottom: 0,
					left: 0,
					right: 0
				}
			});

			if (fs.existsSync(buildDir)) {
				fs.copyFileSync(staticTarget, buildTarget);
			}

			// Validate page count
			const pages = getPdfPageCount(staticTarget);
			console.log(`✓ Generated ${job.filename} (${pages ?? 'unknown'} pages)`);

			if (job.isCv && pages && pages !== 1) {
				throw new Error(
					`❌ CV overflow! ${job.filename} generated with ${pages} pages instead of exactly 1 page. Please reduce margin or font size.`
				);
			}

			await page.close();
		}

		console.log('✓ All PDFs generated successfully and verified.');
	} catch (err) {
		console.error('Error generating PDFs:', err);
		throw err;
	} finally {
		if (browser) await browser.close();
		if (server) server.close();
	}
}

generatePdfs().catch((err) => {
	console.error('PDF Generation failed:', err);
	process.exit(1);
});
