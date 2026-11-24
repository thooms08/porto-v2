<script lang="ts">
	import type { Locale } from '$lib/i18n';
	import { t } from '$lib/i18n';
	import { siteConfig } from '$lib/data/site';
	import { ui } from '$lib/data/ui';

	let { locale }: { locale: Locale } = $props();

	const currentYear = new Date().getFullYear();

	let altLangUrl = $derived(locale === 'en' ? '/id/' : '/');
	let altLangLabel = $derived(locale === 'en' ? 'Bahasa Indonesia' : 'English');

	const navLinks = [
		{ href: '#about',       label: { en: 'About',        id: 'Tentang'     } },
		{ href: '#experience',  label: { en: 'Experience',   id: 'Pengalaman'  } },
		{ href: '#projects',    label: { en: 'Projects',     id: 'Proyek'      } },
		{ href: '#skills',      label: { en: 'Skills',       id: 'Keahlian'    } },
		{ href: '#certificates',label: { en: 'Certificates', id: 'Sertifikat'  } },
		{ href: '#dokumentasi', label: { en: 'Gallery',      id: 'Dokumentasi' } },
		{ href: '#contact',     label: { en: 'Contact',      id: 'Kontak'      } },
	] as const;
</script>

<footer class="site-footer">
	<div class="container">

		<!-- Main footer grid -->
		<div class="footer-grid">

			<!-- Col 1: Brand -->
			<div class="footer-brand">
				<a href={locale === 'id' ? '/id/' : '/'} class="brand-logo" aria-label="Back to top">
					<span class="brand-name">{siteConfig.name}</span>
				</a>
				<p class="brand-tagline">
					{locale === 'id'
						? 'Fullstack Web Developer berbasis di Karawang, Indonesia. Membangun aplikasi web untuk bisnis nyata.'
						: 'Fullstack Web Developer based in Karawang, Indonesia. Building web apps for real businesses.'}
				</p>
				<!-- Language toggle -->
				<a href={altLangUrl} class="lang-toggle" hreflang={locale === 'en' ? 'id' : 'en'}>
					<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<circle cx="12" cy="12" r="10"/>
						<line x1="2" y1="12" x2="22" y2="12"/>
						<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
					</svg>
					{altLangLabel}
				</a>
			</div>

			<!-- Col 2: Quick navigation -->
			<nav class="footer-nav" aria-label={locale === 'id' ? 'Navigasi cepat' : 'Quick navigation'}>
				<p class="footer-col-heading">{locale === 'id' ? 'Navigasi' : 'Navigation'}</p>
				<ul class="footer-nav-list">
					{#each navLinks as link}
						<li>
							<a href={link.href} class="footer-nav-link">{t(link.label, locale)}</a>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- Col 3: Social & contact -->
			<div class="footer-social-col">
				<p class="footer-col-heading">{locale === 'id' ? 'Terhubung' : 'Connect'}</p>

				<div class="social-icons">
					<a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer me" class="social-icon-btn" aria-label="GitHub">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
						</svg>
					</a>
					<a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer me" class="social-icon-btn" aria-label="LinkedIn">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
							<rect x="2" y="9" width="4" height="12"/>
							<circle cx="4" cy="4" r="2"/>
						</svg>
					</a>
					<a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer me" class="social-icon-btn" aria-label="Instagram">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
							<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
							<line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
						</svg>
					</a>
					<a href={`mailto:${siteConfig.email}`} class="social-icon-btn" aria-label="Email">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<rect x="2" y="4" width="20" height="16" rx="2"/>
							<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
						</svg>
					</a>
					<a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="WhatsApp">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
						</svg>
					</a>
				</div>

			</div>

		</div>

		<!-- Bottom bar -->
		<div class="footer-bottom">
			<p class="copyright">
				© {currentYear} {siteConfig.name}. {t(ui.footer.rights, locale)}
			</p>
			<a href="#home" class="back-to-top" aria-label={t(ui.footer.backToTop, locale)}>
				<span>{t(ui.footer.backToTop, locale)}</span>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<line x1="12" y1="19" x2="12" y2="5"/>
					<polyline points="5 12 12 5 19 12"/>
				</svg>
			</a>
		</div>

	</div>
</footer>

<style>
	.site-footer {
		border-top: 1px solid var(--border);
		padding-top: clamp(3rem, 6vw, 5rem);
		padding-bottom: 2rem;
		position: relative;
	}

	/* subtle accent glow at top edge */
	.site-footer::before {
		content: '';
		position: absolute;
		top: -1px;
		left: 50%;
		transform: translateX(-50%);
		width: min(600px, 80%);
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(91, 124, 255, 0.5), transparent);
		pointer-events: none;
	}

	/* ── Grid ── */
	.footer-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 5vw, 3rem);
		padding-bottom: clamp(2rem, 4vw, 3rem);
		border-bottom: 1px solid var(--border);
	}

	@media (min-width: 640px) {
		.footer-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (min-width: 1024px) {
		.footer-grid {
			grid-template-columns: 1.5fr 1fr 1.2fr;
		}
	}

	/* ── Col 1: Brand ── */
	.footer-brand {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.brand-logo {
		display: inline-flex;
		align-items: center;
		gap: 0.625rem;
		text-decoration: none;
		width: fit-content;
	}

	.logo-mark {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		font-weight: 700;
		color: var(--accent);
		padding: 0.25rem 0.45rem;
		border: 1px solid var(--border-strong);
		border-radius: var(--radius-s);
		background: var(--surface);
	}

	.brand-name {
		font-size: 1rem;
		font-weight: 700;
		color: var(--text);
		letter-spacing: -0.01em;
	}

	.brand-tagline {
		font-size: 0.875rem;
		color: var(--text-muted);
		line-height: 1.6;
		max-width: 36ch;
	}

	.lang-toggle {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-muted);
		padding: 0.3rem 0.65rem;
		border: 1px solid var(--border);
		border-radius: var(--radius-s);
		background: var(--surface);
		width: fit-content;
		transition: color 0.15s ease, border-color 0.15s ease;
	}

	.lang-toggle:hover {
		color: var(--accent);
		border-color: var(--accent);
	}

	/* ── Col 2: Nav ── */
	.footer-col-heading {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-muted);
		margin-bottom: 0.875rem;
	}

	.footer-nav-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.footer-nav-link {
		font-size: 0.9rem;
		color: var(--text-muted);
		transition: color 0.15s ease;
	}

	.footer-nav-link:hover {
		color: var(--accent);
	}

	/* ── Col 3: Social ── */
	.footer-social-col {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.social-icons {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1.25rem;
	}

	.social-icon-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 38px;
		border-radius: var(--radius-s);
		border: 1px solid var(--border);
		background: var(--surface);
		color: var(--text-muted);
		transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
	}

	.social-icon-btn:hover {
		color: var(--accent);
		border-color: var(--accent);
		background: var(--surface-2);
	}

	.contact-quick {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.contact-quick-link {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
		transition: color 0.15s ease;
		overflow-wrap: anywhere;
	}

	.contact-quick-link:hover {
		color: var(--accent);
	}

	/* ── Bottom bar ── */
	.footer-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.75rem;
		padding-top: 1.5rem;
	}

	.copyright {
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	.back-to-top {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.8125rem;
		color: var(--text-muted);
		transition: color 0.15s ease;
	}

	.back-to-top:hover {
		color: var(--accent);
	}
</style>
