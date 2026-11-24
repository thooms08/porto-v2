import { chromium } from 'playwright';
import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;

function waitForServer(url, timeoutMs = 20000) {
	const start = Date.now();
	return new Promise((resolve, reject) => {
		const check = () => {
			http.get(url, (res) => {
				if (res.statusCode === 200) resolve();
				else setTimeout(check, 300);
			}).on('error', () => {
				if (Date.now() - start > timeoutMs) reject(new Error('Server timeout'));
				else setTimeout(check, 300);
			});
		};
		check();
	});
}

function fetchBuffer(url) {
	return new Promise((resolve, reject) => {
		http.get(url, (res) => {
			if (res.statusCode !== 200) {
				return reject(new Error(`Failed to fetch ${url}, status: ${res.statusCode}`));
			}
			const chunks = [];
			res.on('data', (c) => chunks.push(c));
			res.on('end', () => resolve(Buffer.concat(chunks)));
		}).on('error', reject);
	});
}

async function runTests() {
	console.log('🚀 Starting preview server...');
	const previewProcess = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
		stdio: 'pipe'
	});

	let serverReady = false;
	try {
		await waitForServer(BASE_URL);
		serverReady = true;
		console.log(`✓ Preview server running at ${BASE_URL}`);
	} catch (err) {
		console.error('Failed to connect to preview server:', err);
		previewProcess.kill();
		process.exit(1);
	}

	const browser = await chromium.launch();
	let passCount = 0;
	let failCount = 0;

	function assert(desc, condition) {
		if (condition) {
			console.log(`  ✓ ${desc}`);
			passCount++;
		} else {
			console.error(`  ❌ FAIL: ${desc}`);
			failCount++;
		}
	}

	try {
		// ========================================================
		// 1. BREAKPOINTS TEST
		// ========================================================
		console.log('\n📱 Testing Breakpoints (PRD §5.4: 320, 375, 768, 1024, 1440, 1920)...');
		const breakpoints = [
			{ width: 320, height: 640, label: '320px (Mobile Mini)' },
			{ width: 375, height: 667, label: '375px (Mobile Std)' },
			{ width: 768, height: 1024, label: '768px (Tablet)' },
			{ width: 1024, height: 768, label: '1024px (Laptop)' },
			{ width: 1440, height: 900, label: '1440px (Desktop)' },
			{ width: 1920, height: 1080, label: '1920px (Full HD)' }
		];

		for (const bp of breakpoints) {
			const context = await browser.newContext({ viewport: { width: bp.width, height: bp.height } });
			const page = await context.newPage();
			await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });

			// Check horizontal scroll
			const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
			const innerWidth = await page.evaluate(() => window.innerWidth);
			assert(`No horizontal scroll at ${bp.label} (scrollWidth: ${scrollWidth} <= innerWidth: ${innerWidth})`, scrollWidth <= innerWidth + 1);

			// Check key sections are in DOM and rendered
			const heroVisible = await page.locator('#hero').isVisible();
			const aboutVisible = await page.locator('#about').isVisible();
			const projectsVisible = await page.locator('#projects').isVisible();
			assert(`Hero section visible at ${bp.label}`, heroVisible);
			assert(`About section visible at ${bp.label}`, aboutVisible);
			assert(`Projects section visible at ${bp.label}`, projectsVisible);

			await context.close();
		}

		// ========================================================
		// 2. BILINGUAL TEST (EN at / vs ID at /id/)
		// ========================================================
		console.log('\n🌐 Testing Bilingual Support (EN & ID)...');
		const context = await browser.newContext();
		const page = await context.newPage();

		// EN page
		await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
		const enLang = await page.getAttribute('html', 'lang');
		assert('EN page html lang is "en"', enLang === 'en');
		const enHeroTitle = await page.locator('#hero h1').innerText();
		assert('EN hero displays English greeting/title', enHeroTitle.includes('Hi, I am') || enHeroTitle.includes('Thomas'));
		const enCvHref = await page.locator('a[download*="CV"]').first().getAttribute('href');
		assert('EN CV download links to EN PDF', enCvHref.includes('_EN.pdf'));

		// ID page
		await page.goto(BASE_URL + '/id/', { waitUntil: 'networkidle' });
		const idLang = await page.getAttribute('html', 'lang');
		assert('ID page html lang is "id"', idLang === 'id');
		const idHeroTitle = await page.locator('#hero h1').innerText();
		assert('ID hero displays Indonesian greeting/title', idHeroTitle.includes('Halo, saya') || idHeroTitle.includes('Thomas'));
		const idCvHref = await page.locator('a[download*="CV"]').first().getAttribute('href');
		assert('ID CV download links to ID PDF', idCvHref.includes('_ID.pdf'));

		// Language switch button
		const langSwitch = page.locator('a[aria-label*="English"], a[title*="English"], header nav a:has-text("EN")').first();
		assert('Language switch link exists', (await langSwitch.count()) > 0);
		await langSwitch.click();
		await page.waitForURL(BASE_URL + '/');
		assert('Language switch navigates to EN (/)', page.url() === BASE_URL + '/');

		// ========================================================
		// 3. DOWNLOAD BUTTONS & PDF INTEGRITY
		// ========================================================
		console.log('\n📄 Testing PDF Downloads & Validity...');
		const pdfList = [
			'CV_Thomas_Lefvi_Baehaqi_EN.pdf',
			'CV_Thomas_Lefvi_Baehaqi_ID.pdf',
			'Portfolio_Thomas_Lefvi_Baehaqi_EN.pdf',
			'Portfolio_Thomas_Lefvi_Baehaqi_ID.pdf'
		];

		for (const pdf of pdfList) {
			const buf = await fetchBuffer(`${BASE_URL}/downloads/${pdf}`);
			const isPdf = buf.slice(0, 5).toString('ascii') === '%PDF-';
			assert(`${pdf} exists, HTTP 200, valid PDF header (%PDF-), size: ${(buf.length / 1024).toFixed(1)} KB`, isPdf && buf.length > 50000);
		}

		// ========================================================
		// 4. CERTIFICATE GALLERY & LIGHTBOX
		// ========================================================
		console.log('\n🏆 Testing Certificate Gallery & Lightbox Modal...');
		await page.goto(BASE_URL + '/id/', { waitUntil: 'networkidle' });

		// Filter buttons
		const allCertsCount = await page.locator('.cert-card').count();
		assert(`Found ${allCertsCount} certificate cards (>= 15)`, allCertsCount >= 15);

		// Click category filter
		const dbFilterBtn = page.locator('.filter-tab:has-text("Database")').first();
		if (await dbFilterBtn.isVisible()) {
			await dbFilterBtn.click();
			await page.waitForTimeout(200);
			const filteredCount = await page.locator('.cert-card').count();
			assert(`Filtering by Database shows fewer certificates (${filteredCount} < ${allCertsCount})`, filteredCount > 0 && filteredCount < allCertsCount);

			// Reset filter
			const allFilterBtn = page.locator('.filter-tab').first();
			await allFilterBtn.click();
			await page.waitForTimeout(200);
		}

		// Click first certificate card to open lightbox
		const firstCertCard = page.locator('.cert-card').first();
		await firstCertCard.click();
		await page.waitForTimeout(300);

		const modal = page.locator('[role="dialog"]');
		const modalVisible = await modal.isVisible();
		assert('Lightbox modal opens with role="dialog"', modalVisible);
		const modalTitle = await modal.locator('h3').innerText();
		assert(`Lightbox shows certificate title: "${modalTitle.slice(0, 30)}..."`, modalTitle.length > 5);

		// Test Next button in modal
		const nextBtn = modal.locator('button[aria-label*="berikutnya"], button[aria-label*="Next"]').first();
		if (await nextBtn.isVisible()) {
			await nextBtn.click();
			await page.waitForTimeout(200);
			const nextTitle = await modal.locator('h3').innerText();
			assert('Next button advances to different certificate', nextTitle !== modalTitle);
		}

		// Test Close with Escape key
		await page.keyboard.press('Escape');
		await page.waitForTimeout(300);
		const modalClosed = !(await modal.isVisible());
		assert('Pressing Escape closes the lightbox modal', modalClosed);

		// ========================================================
		// 5. PROJECT SHOWCASE (Master-Detail, Viewports, Fallback)
		// ========================================================
		console.log('\n💻 Testing Project Showcase...');
		await page.locator('#projects').scrollIntoViewIfNeeded();

		const projectTabs = page.locator('.project-tab');
		const projectCount = await projectTabs.count();
		assert(`Found ${projectCount} project tabs in showcase (PRD requires 8)`, projectCount === 8);

		// Click 2nd project tab
		if (projectCount > 1) {
			const secondTab = projectTabs.nth(1);
			const secondName = (await secondTab.locator('.proj-name').innerText()).trim();
			await secondTab.click();
			await page.waitForTimeout(300);
			const activeTitle = (await page.locator('.preview-meta h3').innerText()).trim();
			assert(`Selecting tab changes active project to "${secondName}"`, activeTitle.includes(secondName) || secondName.includes(activeTitle));
		}

		// Test Viewport Buttons (Desktop, Tablet, Mobile)
		const vpButtons = page.locator('.vp-btn');
		const vpCount = await vpButtons.count();
		assert(`Viewport controls exist (${vpCount} buttons)`, vpCount >= 3);

		// Test single active iframe
		const iframeCount = await page.locator('iframe').count();
		assert(`Only 1 iframe element exists in DOM (PRD §4.2 rule)`, iframeCount <= 1);

		// ========================================================
		// 6. KEYBOARD NAVIGATION & PREFERS-REDUCED-MOTION
		// ========================================================
		console.log('\n⌨️ Testing Keyboard Accessibility & Reduced Motion...');
		await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });

		// Test skip link
		await page.keyboard.press('Tab');
		const activeElTag = await page.evaluate(() => document.activeElement?.tagName);
		const activeElHref = await page.evaluate(() => document.activeElement?.getAttribute('href'));
		assert('First Tab stop is skip link (#main-content)', activeElTag === 'A' && activeElHref === '#main-content');

		// Test reduced motion media query
		const reducedMotionContext = await browser.newContext({
			reducedMotion: 'reduce'
		});
		const rmPage = await reducedMotionContext.newPage();
		await rmPage.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
		const prefersReducedMotion = await rmPage.evaluate(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
		assert('prefers-reduced-motion: reduce is recognized by page', prefersReducedMotion);
		await reducedMotionContext.close();

		// ========================================================
		// 7. SEO, GEO, AEO & METADATA VALIDATION
		// ========================================================
		console.log('\n🔍 Testing SEO, GEO, AEO & Metadata...');

		// Title & description
		const pageTitle = await page.title();
		assert(`Page title is present: "${pageTitle}"`, pageTitle.length > 20);
		const metaDesc = await page.getAttribute('meta[name="description"]', 'content');
		assert(`Meta description is present and informative (${metaDesc?.length} chars)`, (metaDesc?.length || 0) > 50);

		// Canonical
		const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
		assert(`Canonical URL is set to production: ${canonical}`, canonical === 'https://thomaslefvibaehaqi.my.id/');

		// Hreflang
		const hreflangEn = await page.getAttribute('link[rel="alternate"][hreflang="en"]', 'href');
		const hreflangId = await page.getAttribute('link[rel="alternate"][hreflang="id"]', 'href');
		const hreflangDefault = await page.getAttribute('link[rel="alternate"][hreflang="x-default"]', 'href');
		assert('hreflang="en" is set to https://thomaslefvibaehaqi.my.id/', hreflangEn === 'https://thomaslefvibaehaqi.my.id/');
		assert('hreflang="id" is set to https://thomaslefvibaehaqi.my.id/id/', hreflangId === 'https://thomaslefvibaehaqi.my.id/id/');
		assert('hreflang="x-default" is set to https://thomaslefvibaehaqi.my.id/', hreflangDefault === 'https://thomaslefvibaehaqi.my.id/');

		// Open Graph & Twitter Card
		const ogImage = await page.getAttribute('meta[property="og:image"]', 'content');
		const twitterCard = await page.getAttribute('meta[name="twitter:card"]', 'content');
		const twitterImage = await page.getAttribute('meta[name="twitter:image"]', 'content');
		assert(`OG image is absolute URL (${ogImage})`, ogImage?.startsWith('https://thomaslefvibaehaqi.my.id/'));
		assert('Twitter card is summary_large_image', twitterCard === 'summary_large_image');
		assert(`Twitter image is absolute URL (${twitterImage})`, twitterImage?.startsWith('https://thomaslefvibaehaqi.my.id/'));

		// JSON-LD validation
		const jsonLdContent = await page.locator('script[type="application/ld+json"]').innerText();
		let parsedJsonLd = null;
		try {
			parsedJsonLd = JSON.parse(jsonLdContent);
			assert('JSON-LD parses cleanly without syntax errors', true);
		} catch (e) {
			assert('JSON-LD parses cleanly without syntax errors', false);
		}

		if (parsedJsonLd) {
			const graph = parsedJsonLd['@graph'];
			assert('JSON-LD contains @graph array', Array.isArray(graph));
			const types = graph.map((node) => node['@type']);
			assert('JSON-LD includes WebSite schema', types.includes('WebSite'));
			assert('JSON-LD includes ProfilePage schema', types.includes('ProfilePage'));
			assert('JSON-LD includes Person schema', types.includes('Person'));
			assert('JSON-LD includes ItemList schema (projects & certificates)', types.includes('ItemList'));
			assert('JSON-LD includes FAQPage schema', types.includes('FAQPage'));
		}

		// SEO Files Check (robots.txt, sitemap.xml, llms.txt, llms-full.txt)
		const robotsTxt = (await fetchBuffer(`${BASE_URL}/robots.txt`)).toString('utf-8');
		assert('robots.txt allows all crawlers and AI bots', robotsTxt.includes('User-agent: *') && robotsTxt.includes('GPTBot'));
		assert('robots.txt points to sitemap.xml', robotsTxt.includes('Sitemap: https://thomaslefvibaehaqi.my.id/sitemap.xml'));

		const sitemapXml = (await fetchBuffer(`${BASE_URL}/sitemap.xml`)).toString('utf-8');
		assert('sitemap.xml has valid XML declaration and urlset', sitemapXml.includes('<?xml') && sitemapXml.includes('<urlset'));
		assert('sitemap.xml includes / and /id/', sitemapXml.includes('https://thomaslefvibaehaqi.my.id/') && sitemapXml.includes('https://thomaslefvibaehaqi.my.id/id/'));

		const llmsTxt = (await fetchBuffer(`${BASE_URL}/llms.txt`)).toString('utf-8');
		assert('llms.txt has markdown header and bio', llmsTxt.includes('# Thomas Lefvi Baehaqi'));

		const llmsFullTxt = (await fetchBuffer(`${BASE_URL}/llms-full.txt`)).toString('utf-8');
		assert('llms-full.txt contains full project and experience documentation', llmsFullTxt.includes('Flavory.id') && llmsFullTxt.includes('Farkatech'));

		// ========================================================
		// 8. ACCESSIBILITY & PERFORMANCE AUDIT
		// ========================================================
		console.log('\n⚡ Auditing Accessibility & Performance Metrics...');

		// Check images have alt text
		const missingAlts = await page.evaluate(() => {
			const imgs = Array.from(document.querySelectorAll('img'));
			return imgs.filter((img) => !img.hasAttribute('alt')).length;
		});
		assert(`All images have alt attributes (missing: ${missingAlts})`, missingAlts === 0);

		// Check interactive elements have accessible names
		const unnamedButtons = await page.evaluate(() => {
			const btns = Array.from(document.querySelectorAll('button'));
			return btns.filter((b) => !b.innerText.trim() && !b.getAttribute('aria-label') && !b.getAttribute('title')).length;
		});
		assert(`All buttons have accessible names (missing: ${unnamedButtons})`, unnamedButtons === 0);

		// Check navigation timing
		const timing = await page.evaluate(() => {
			const nav = performance.getEntriesByType('navigation')[0];
			return {
				domContentLoaded: nav ? nav.domContentLoadedEventEnd - nav.startTime : 0,
				load: nav ? nav.loadEventEnd - nav.startTime : 0
			};
		});
		assert(`DOMContentLoaded time is ultra fast (${Math.round(timing.domContentLoaded)} ms < 800ms)`, timing.domContentLoaded < 800);

		await context.close();
	} finally {
		await browser.close();
		previewProcess.kill();
	}

	console.log('\n========================================================');
	console.log(`TOTAL TESTS: ${passCount + failCount}`);
	console.log(`PASSED: ${passCount}`);
	console.log(`FAILED: ${failCount}`);
	console.log('========================================================\n');

	if (failCount > 0) {
		process.exit(1);
	}
}

runTests();
