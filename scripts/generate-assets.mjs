import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const staticDir = path.join(rootDir, 'static');
const certsDir = path.join(staticDir, 'certificates');
const projectsDir = path.join(staticDir, 'projects');
const downloadsDir = path.join(staticDir, 'downloads');

// Ensure output directories exist
fs.mkdirSync(staticDir, { recursive: true });
fs.mkdirSync(certsDir, { recursive: true });
fs.mkdirSync(projectsDir, { recursive: true });
fs.mkdirSync(downloadsDir, { recursive: true });

async function processPhotosAndFavicons() {
	console.log('Generating photos, favicons, and OG image...');
	const fotoDiriSrc = path.join(rootDir, 'foto-diri.webp');
	const fotoFormalSrc = path.join(rootDir, 'foto-formal.png');

	// Copy foto-diri.webp to static/foto-diri.webp
	if (fs.existsSync(fotoDiriSrc)) {
		await sharp(fotoDiriSrc)
			.webp({ quality: 90 })
			.toFile(path.join(staticDir, 'foto-diri.webp'));
	}

	// Copy foto-formal.png to static/foto-formal.png
	if (fs.existsSync(fotoFormalSrc)) {
		fs.copyFileSync(fotoFormalSrc, path.join(staticDir, 'foto-formal.png'));
	}

	// Favicon & app icons (face crop from foto-diri.webp)
	// foto-diri is 1200x1600. Center top area is face (around y: 150-800, x: 250-950)
	if (fs.existsSync(fotoDiriSrc)) {
		const metadata = await sharp(fotoDiriSrc).metadata();
		const width = metadata.width || 1200;
		const height = metadata.height || 1600;
		const squareSize = Math.min(width, Math.round(height * 0.75));

		const faceCrop = await sharp(fotoDiriSrc)
			.extract({
				left: Math.round((width - squareSize) / 2),
				top: Math.round(height * 0.05),
				width: squareSize,
				height: squareSize
			})
			.toBuffer();

		// icon-192.png
		await sharp(faceCrop).resize(192, 192).png().toFile(path.join(staticDir, 'icon-192.png'));

		// icon-512.png
		await sharp(faceCrop).resize(512, 512).png().toFile(path.join(staticDir, 'icon-512.png'));

		// apple-touch-icon.png (180x180)
		await sharp(faceCrop)
			.resize(180, 180)
			.png()
			.toFile(path.join(staticDir, 'apple-touch-icon.png'));

		// favicon-32.png / favicon.ico
		await sharp(faceCrop).resize(32, 32).png().toFile(path.join(staticDir, 'favicon.ico'));

		// favicon.svg (clean geometric monogram T in galaxy theme)
		const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#050816"/>
  <rect x="1" y="1" width="62" height="62" rx="13" fill="none" stroke="#5b7cff" stroke-width="2" stroke-opacity="0.5"/>
  <path d="M18 20 H46 V26 H35 V48 H29 V26 H18 Z" fill="#5b7cff"/>
</svg>`;
		fs.writeFileSync(path.join(staticDir, 'favicon.svg'), svgContent, 'utf-8');

		// Webmanifest
		const manifest = {
			name: 'Thomas Lefvi Baehaqi — Fullstack Web Developer',
			short_name: 'Thomas LB',
			start_url: '/',
			display: 'standalone',
			background_color: '#050816',
			theme_color: '#050816',
			icons: [
				{
					src: '/icon-192.png',
					sizes: '192x192',
					type: 'image/png'
				},
				{
					src: '/icon-512.png',
					sizes: '512x512',
					type: 'image/png'
				}
			]
		};
		fs.writeFileSync(
			path.join(staticDir, 'site.webmanifest'),
			JSON.stringify(manifest, null, 2),
			'utf-8'
		);

		// og-image.jpg (1200x630, galaxy dark blue background + portrait)
		const photoResized = await sharp(fotoDiriSrc)
			.resize(450, 600, { fit: 'cover', position: 'top' })
			.toBuffer();

		// Composite onto a 1200x630 dark background
		const ogSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad" cx="30%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#0d1430"/>
      <stop offset="100%" stop-color="#050816"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect x="40" y="40" width="1120" height="550" rx="20" fill="none" stroke="rgba(148,163,200,0.18)" stroke-width="1"/>
  <text x="90" y="160" font-family="system-ui, sans-serif" font-size="20" font-weight="600" fill="#5b7cff" letter-spacing="3">FULLSTACK WEB DEVELOPER · KARAWANG</text>
  <text x="90" y="240" font-family="system-ui, sans-serif" font-size="54" font-weight="700" fill="#e8ebf8">Thomas Lefvi Baehaqi</text>
  <text x="90" y="310" font-family="system-ui, sans-serif" font-size="24" fill="#98a1c4">Fullstack Web Developer with Team Leadership</text>
  <text x="90" y="370" font-family="system-ui, sans-serif" font-size="20" fill="#98a1c4">Laravel · Next.js · TypeScript · MySQL · POS · E-Commerce</text>
  <rect x="90" y="440" width="280" height="52" rx="10" fill="#5b7cff"/>
  <text x="230" y="473" text-anchor="middle" font-family="system-ui, sans-serif" font-size="18" font-weight="600" fill="#060a1f">thomaslefvibaehaqi.my.id</text>
</svg>`;

		const ogSvgBuffer = Buffer.from(ogSvg);

		await sharp(ogSvgBuffer)
			.composite([
				{
					input: photoResized,
					top: 15,
					left: 710
				}
			])
			.jpeg({ quality: 88 })
			.toFile(path.join(staticDir, 'og-image.jpg'));
	}
}

async function processCertificates() {
	console.log('Processing certificates and thumbnails...');

	// List of mapping for certificate files
	const certMappings = [
		{
			src: '2026-11-22_10-53.png',
			dest: 'sertifikat-kompetensi-database-administrator.webp',
			thumb: 'sertifikat-kompetensi-database-administrator-thumb.webp',
			type: 'image'
		},
		{
			src: '2026-11-22_11-43.png',
			dest: 'sertifikat-uji-kompetensi-basis-data-advance.webp',
			thumb: 'sertifikat-uji-kompetensi-basis-data-advance-thumb.webp',
			type: 'image'
		},
		{
			src: 'Sertifikat_THOMAS LEFVI BAEHAQI_Fundamental Junior Web Developer.pdf',
			dest: 'sertifikat-fundamental-junior-web-developer.pdf',
			thumb: 'sertifikat-fundamental-junior-web-developer-thumb.webp',
			type: 'pdf'
		},
		{
			src: 'sertifikat_course_123_5101844_030426234453.pdf',
			dest: 'sertifikat-belajar-dasar-pemrograman-web.pdf',
			thumb: 'sertifikat-belajar-dasar-pemrograman-web-thumb.webp',
			type: 'pdf'
		},
		{
			src: '2026-11-22_11-38.png',
			dest: 'sertifikat-ai-work-career-readiness.webp',
			thumb: 'sertifikat-ai-work-career-readiness-thumb.webp',
			type: 'image'
		},
		{
			src: '2026-11-22_11-39_1.png',
			dest: 'sertifikat-workshop-erd-lrs-uml.webp',
			thumb: 'sertifikat-workshop-erd-lrs-uml-thumb.webp',
			type: 'image'
		},
		{
			src: '2026-11-22_11-39.png',
			dest: 'sertifikat-webinar-automation-uipath.webp',
			thumb: 'sertifikat-webinar-automation-uipath-thumb.webp',
			type: 'image'
		},
		{
			src: 'certificate-thomas-lefvi-baehaqi.pdf',
			dest: 'certificate-farkatech-internship.pdf',
			thumb: 'certificate-farkatech-internship-thumb.webp',
			type: 'pdf'
		},
		{
			src: 'Sertifikat_Thomas_Lefvi_Baehaqi_Workshop_Web_Programming.pdf',
			dest: 'sertifikat-workshop-web-programming.pdf',
			thumb: 'sertifikat-workshop-web-programming-thumb.webp',
			type: 'pdf'
		},
		{
			src: '260_Thomas_lefvi_Baehaqi.png',
			dest: 'sertifikat-bisa-ai-machine-learning.webp',
			thumb: 'sertifikat-bisa-ai-machine-learning-thumb.webp',
			type: 'image'
		},
		{
			src: 'a058f4f9-f5a5-436d-aec1-6017b25a0043_01M2G5WDG77246FNGSBDZ7A8A9.jpg',
			dest: 'sertifikat-icwc-top10-website-competition.webp',
			thumb: 'sertifikat-icwc-top10-website-competition-thumb.webp',
			type: 'image'
		},
		{
			src: '2026-11-22_10-54.png',
			dest: 'sertifikat-badan-ekraf-digital-talent.webp',
			thumb: 'sertifikat-badan-ekraf-digital-talent-thumb.webp',
			type: 'image'
		},
		{
			src: '5 (7).png',
			dest: 'sertifikat-webinar-futureleaders.webp',
			thumb: 'sertifikat-webinar-futureleaders-thumb.webp',
			type: 'image'
		}
	];

	for (const cert of certMappings) {
		const srcPath = path.join(rootDir, cert.src);
		if (!fs.existsSync(srcPath)) {
			console.warn(`Source certificate not found: ${cert.src}`);
			continue;
		}

		if (cert.type === 'image') {
			// Save full WebP (max 1600px width)
			await sharp(srcPath)
				.resize({ width: 1600, withoutEnlargement: true })
				.webp({ quality: 85 })
				.toFile(path.join(certsDir, cert.dest));

			// Save thumbnail WebP (480px width)
			await sharp(srcPath)
				.resize({ width: 480, withoutEnlargement: true })
				.webp({ quality: 80 })
				.toFile(path.join(certsDir, cert.thumb));
		} else if (cert.type === 'pdf') {
			// Copy original PDF
			fs.copyFileSync(srcPath, path.join(certsDir, cert.dest));

			// Render page 1 to WebP thumbnail using pdftoppm + sharp
			const tmpPngPrefix = `/tmp/cert_thumb_${path.parse(cert.dest).name}`;
			try {
				execSync(`pdftoppm -png -r 150 -f 1 -l 1 "${srcPath}" "${tmpPngPrefix}"`, {
					stdio: 'pipe'
				});
				const tmpPng = `${tmpPngPrefix}-1.png`;
				if (fs.existsSync(tmpPng)) {
					await sharp(tmpPng)
						.resize({ width: 480, withoutEnlargement: true })
						.webp({ quality: 80 })
						.toFile(path.join(certsDir, cert.thumb));
					fs.unlinkSync(tmpPng);
				}
			} catch (err) {
				console.error(`Failed to render PDF thumbnail for ${cert.src}:`, err);
			}
		}
	}

	// For the two certificates from reference portfolio without dedicated file (Dicoding Kiro, UBSI 9 Unit),
	// generate clean elegant placeholder card thumbnails so images don't break!
	const placeholders = [
		{
			title: 'Spec-Driven Development dengan Kiro',
			issuer: 'AWS AI Academy 2026 | Dicoding',
			dest: 'sertifikat-spec-driven-development-kiro.webp',
			thumb: 'sertifikat-spec-driven-development-kiro-thumb.webp'
		},
		{
			title: 'Workshop Bedah 9 Unit Pemrograman',
			issuer: 'Universitas Bina Sarana Informatika',
			dest: 'sertifikat-bedah-9-unit-pemrograman.webp',
			thumb: 'sertifikat-bedah-9-unit-pemrograman-thumb.webp'
		}
	];

	for (const p of placeholders) {
		const svg = `<svg width="800" height="560" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="560" fill="#0d1430"/>
  <rect x="20" y="20" width="760" height="520" rx="12" fill="none" stroke="#5b7cff" stroke-width="2" stroke-opacity="0.4"/>
  <text x="400" y="180" text-anchor="middle" font-family="system-ui, sans-serif" font-size="28" font-weight="700" fill="#e8ebf8">${p.title}</text>
  <text x="400" y="240" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" fill="#98a1c4">${p.issuer}</text>
  <text x="400" y="320" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" fill="#5b7cff">Official Certificate Record</text>
  <text x="400" y="380" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" fill="#98a1c4">Thomas Lefvi Baehaqi</text>
</svg>`;
		const svgBuffer = Buffer.from(svg);
		await sharp(svgBuffer).webp({ quality: 85 }).toFile(path.join(certsDir, p.dest));
		await sharp(svgBuffer).resize(480).webp({ quality: 80 }).toFile(path.join(certsDir, p.thumb));
	}
}

async function processProjectScreenshots() {
	console.log('Generating project fallback cards/screenshots...');
	const projectList = [
		{
			slug: 'flavory-pos',
			name: 'Flavory.id',
			tagline: 'F&B POS & Cashier System with AI Analytics',
			stack: 'Laravel · MySQL'
		},
		{
			slug: 'key-flavory',
			name: 'Key.Flavory.id',
			tagline: 'HRMS Platform for MSMEs',
			stack: 'Laravel · MySQL'
		},
		{
			slug: 'blog-flavory',
			name: 'Blog.Flavory.id',
			tagline: 'Digital Media for Tech & Business Innovation',
			stack: 'Next.js · TypeScript · Prisma'
		},
		{
			slug: 'supermura',
			name: 'Supermura.id',
			tagline: 'Low-MOQ Fashion E-Commerce Platform',
			stack: 'Laravel · MySQL'
		},
		{
			slug: 'recomon',
			name: 'Recomon.my.id',
			tagline: 'Interactive Digital Card Generator',
			stack: 'Laravel · MySQL'
		},
		{
			slug: 'mysems',
			name: 'mysems.my.id',
			tagline: 'School Event Management System',
			stack: 'PHP · MySQL'
		},
		{
			slug: 'rekain',
			name: 'Rekain.my.id',
			tagline: 'Garment Waste Textile Marketplace',
			stack: 'PHP · MySQL'
		},
		{
			slug: 'imkompres',
			name: 'Imkompres',
			tagline: '100% In-Browser Image & Video Compressor',
			stack: 'JavaScript · Canvas API'
		}
	];

	const escapeXml = (str) =>
		str.replace(/[<>&'"]/g, (c) => {
			switch (c) {
				case '<': return '&lt;';
				case '>': return '&gt;';
				case '&': return '&amp;';
				case '\'': return '&apos;';
				case '"': return '&quot;';
			}
		});

	for (const proj of projectList) {
		const outPath = path.join(projectsDir, `${proj.slug}.webp`);
		if (!fs.existsSync(outPath)) {
			// Generate crisp fallback preview card
			const svg = `<svg width="1280" height="800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="cardGrad" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#0f1938"/>
      <stop offset="100%" stop-color="#060918"/>
    </radialGradient>
  </defs>
  <rect width="1280" height="800" fill="url(#cardGrad)"/>
  <rect x="40" y="40" width="1200" height="720" rx="20" fill="none" stroke="rgba(148,163,200,0.18)" stroke-width="2"/>
  
  <!-- Browser top bar -->
  <rect x="40" y="40" width="1200" height="54" rx="20" fill="#090e24"/>
  <rect x="40" y="74" width="1200" height="20" fill="#090e24"/>
  <circle cx="75" cy="67" r="6" fill="#2d3748"/>
  <circle cx="95" cy="67" r="6" fill="#2d3748"/>
  <circle cx="115" cy="67" r="6" fill="#2d3748"/>
  <rect x="250" y="52" width="780" height="30" rx="8" fill="#050816" stroke="rgba(148,163,200,0.2)" stroke-width="1"/>
  <text x="640" y="72" text-anchor="middle" font-family="monospace" font-size="13" fill="#98a1c4">${escapeXml(proj.name.toLowerCase())}</text>

  <!-- Body -->
  <text x="640" y="320" text-anchor="middle" font-family="system-ui, sans-serif" font-size="48" font-weight="700" fill="#e8ebf8">${escapeXml(proj.name)}</text>
  <text x="640" y="390" text-anchor="middle" font-family="system-ui, sans-serif" font-size="22" fill="#98a1c4">${escapeXml(proj.tagline)}</text>
  <rect x="440" y="440" width="400" height="40" rx="8" fill="rgba(91,124,255,0.12)" stroke="#5b7cff" stroke-width="1"/>
  <text x="640" y="465" text-anchor="middle" font-family="monospace" font-size="14" font-weight="600" fill="#5b7cff">${escapeXml(proj.stack)}</text>
  <text x="640" y="600" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" fill="#98a1c4">Live preview unavailable inside iframe — click Open Site to explore</text>
</svg>`;
			await sharp(Buffer.from(svg)).webp({ quality: 85 }).toFile(outPath);
		}
	}
}

async function main() {
	try {
		await processPhotosAndFavicons();
		await processCertificates();
		await processProjectScreenshots();
		console.log('✓ All assets generated successfully.');
	} catch (err) {
		console.error('Error generating assets:', err);
		process.exit(1);
	}
}

main();
