<script lang="ts">
	import type { Locale } from '$lib/i18n';
	import { t } from '$lib/i18n';
	import { siteConfig } from '$lib/data/site';
	import { ui } from '$lib/data/ui';

	let { locale }: { locale: Locale } = $props();

	const currentYear = new Date().getFullYear();

	let altLangUrl = $derived(locale === 'en' ? '/id/' : '/');
	let altLangLabel = $derived(locale === 'en' ? 'Bahasa Indonesia' : 'English');
</script>

<footer class="site-footer">
	<div class="container footer-content">
		<div class="footer-top">
			<div class="footer-brand">
				<span class="brand-name">{siteConfig.name}</span>
				<span class="brand-role">{t(siteConfig.role, locale)}</span>
			</div>

			<div class="footer-links">
				<a href={altLangUrl} class="footer-lang-link" hreflang={locale === 'en' ? 'id' : 'en'}>
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<circle cx="12" cy="12" r="10"></circle>
						<line x1="2" y1="12" x2="22" y2="12"></line>
						<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
					</svg>
					<span>{altLangLabel}</span>
				</a>

				<a href="#home" class="footer-link">
					<span>{t(ui.footer.backToTop, locale)}</span>
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<line x1="12" y1="19" x2="12" y2="5"></line>
						<polyline points="5 12 12 5 19 12"></polyline>
					</svg>
				</a>
			</div>
		</div>

		<div class="footer-bottom">
			<p class="copyright">
				© {currentYear} {siteConfig.name}. {t(ui.footer.rights, locale)}
			</p>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		border-top: 1px solid var(--border);
		padding-block: 3rem 2rem;
		background: var(--bg-raised);
	}

	.footer-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.footer-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1.5rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--border);
	}

	.footer-brand {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.brand-name {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--text);
	}

	.brand-role {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--accent);
	}

	.footer-links {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.footer-link,
	.footer-lang-link {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.875rem;
		color: var(--text-muted);
		transition: color 0.15s ease;
	}

	.footer-link:hover,
	.footer-lang-link:hover {
		color: var(--text);
	}

	.footer-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.copyright {
		font-size: 0.8125rem;
		color: var(--text-muted);
	}
</style>
