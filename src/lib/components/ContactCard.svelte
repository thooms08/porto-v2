<script lang="ts">
	import type { Locale } from '$lib/i18n';
	import { t } from '$lib/i18n';
	import { siteConfig } from '$lib/data/site';
	import { ui } from '$lib/data/ui';
	import { reveal } from '$lib/actions/reveal';

	let { locale }: { locale: Locale } = $props();

	let copied = $state(false);
	let copyTimeout: ReturnType<typeof setTimeout> | null = null;

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(siteConfig.email);
			copied = true;
			if (copyTimeout) clearTimeout(copyTimeout);
			copyTimeout = setTimeout(() => {
				copied = false;
			}, 3000);
		} catch (err) {
			console.error('Failed to copy email:', err);
		}
	}

	let cvFile = $derived(`/downloads/${t(ui.downloads.cvFilename, locale)}`);
	let portfolioFile = $derived(`/downloads/${t(ui.downloads.portfolioFilename, locale)}`);
</script>

<section id="contact" class="contact-section">
	<div class="container">
		<header class="section-header section-header--center" use:reveal>
			<span class="kicker">{t(ui.contact.title, locale)}</span>
			<h2>{t({ en: 'Get In Touch', id: 'Hubungi Saya' }, locale)}</h2>
		</header>

		<div class="contact-grid">
			<!-- Contact Methods Column -->
			<div class="card contact-card" use:reveal>
				<div class="contact-methods">
					<!-- Email -->
					<div class="contact-item">
						<div class="contact-icon" aria-hidden="true">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<rect x="2" y="4" width="20" height="16" rx="2"></rect>
								<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
							</svg>
						</div>
						<div class="contact-text">
							<span class="contact-label">{t(ui.contact.emailLabel, locale)}</span>
							<a href={`mailto:${siteConfig.email}`} class="contact-link">{siteConfig.email}</a>
						</div>
						<button
							type="button"
							class="copy-btn"
							onclick={copyEmail}
							aria-label={t(ui.contact.copyEmail, locale)}
							title={t(ui.contact.copyEmail, locale)}
						>
							{#if copied}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<polyline points="20 6 9 17 4 12"></polyline>
								</svg>
							{:else}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
									<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
								</svg>
							{/if}
						</button>
					</div>

					<!-- Live Region for copy feedback -->
					<div class="sr-only" role="status" aria-live="polite">
						{copied ? t(ui.contact.emailCopied, locale) : ''}
					</div>

					<!-- WhatsApp / Phone -->
					<div class="contact-item">
						<div class="contact-icon" aria-hidden="true">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
							</svg>
						</div>
						<div class="contact-text">
							<span class="contact-label">{t(ui.contact.phoneLabel, locale)}</span>
							<a
								href={siteConfig.whatsappUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="contact-link"
							>
								{siteConfig.phoneDisplay}
							</a>
						</div>
						<a
							href={siteConfig.whatsappUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="btn btn-secondary btn-sm"
						>
							<span>WA</span>
							<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<line x1="7" y1="17" x2="17" y2="7"></line>
								<polyline points="7 7 17 7 17 17"></polyline>
							</svg>
						</a>
					</div>

					<!-- Location -->
					<div class="contact-item">
						<div class="contact-icon" aria-hidden="true">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
								<circle cx="12" cy="10" r="3"></circle>
							</svg>
						</div>
						<div class="contact-text">
							<span class="contact-label">{t(ui.contact.locationLabel, locale)}</span>
							<span class="contact-val">{t(siteConfig.location, locale)}</span>
						</div>
					</div>

					<!-- Profiles -->
					<div class="contact-item">
						<div class="contact-icon" aria-hidden="true">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<circle cx="12" cy="12" r="10"></circle>
								<line x1="2" y1="12" x2="22" y2="12"></line>
								<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
							</svg>
						</div>
						<div class="contact-text">
							<span class="contact-label">{t(ui.contact.socialLabel, locale)}</span>
							<div class="social-row">
								<a
									href={siteConfig.githubUrl}
									target="_blank"
									rel="noopener noreferrer me"
									class="contact-link"
								>
									github.com/{siteConfig.githubUser}
								</a>
								<span class="meta-sep" aria-hidden="true">·</span>
								<a
									href={siteConfig.linkedinUrl}
									target="_blank"
									rel="noopener noreferrer me"
									class="contact-link"
								>
									linkedin.com/in/{siteConfig.linkedinUser}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Downloads & Document Panel -->
			<div class="card downloads-card" use:reveal={{ delay: 100 }}>
				<h3 class="downloads-heading">{t(ui.contact.downloadsTitle, locale)}</h3>
				<p class="downloads-desc">
					{locale === 'id'
						? 'Unduh berkas resmi Curriculum Vitae (1 halaman A4) dan Portofolio (format cetak) hasil generate langsung dari satu sumber data.'
						: 'Download official Curriculum Vitae (1 page A4) and Portfolio documents generated directly from a single source of truth.'}
				</p>

				<div class="download-action-group">
					<a
						href={cvFile}
						download
						class="btn btn-primary"
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
							<polyline points="7 10 12 15 17 10"></polyline>
							<line x1="12" y1="15" x2="12" y2="3"></line>
						</svg>
						<span>{t(ui.downloads.cvBtn, locale)}</span>
					</a>

					<a
						href={portfolioFile}
						download
						class="btn btn-secondary"
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
							<polyline points="7 10 12 15 17 10"></polyline>
							<line x1="12" y1="15" x2="12" y2="3"></line>
						</svg>
						<span>{t(ui.downloads.portfolioBtn, locale)}</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.contact-section {
		border-top: 1px solid var(--border);
	}

	.contact-grid {
		display: grid;
		/* minmax(0, 1fr), bukan 1fr: kolom boleh menyempit sampai selebar layar
		   dan tidak dipaksa selebar isi terpanjangnya (penyebab gap kanan di HP) */
		grid-template-columns: minmax(0, 1fr);
		gap: 2rem;
		align-items: start;
	}

	.contact-grid > :global(.card) {
		min-width: 0;
	}

	@media (min-width: 900px) {
		.contact-grid {
			grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
		}
	}

	.contact-methods {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding-bottom: 1.25rem;
		border-bottom: 1px solid var(--border);
	}

	.contact-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.contact-icon {
		width: 44px;
		height: 44px;
		border-radius: var(--radius-m);
		background: var(--surface-2);
		border: 1px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--accent);
		flex-shrink: 0;
	}

	.contact-text {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		flex: 1;
		min-width: 0;
	}

	.contact-label {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-muted);
	}

	.contact-link {
		font-size: 0.9375rem;
		color: var(--text);
		font-weight: 500;
		/* teks panjang (email/URL) turun baris, bukan melebarkan halaman atau terpotong "..." */
		overflow-wrap: anywhere;
	}

	.contact-link:hover {
		color: var(--accent);
	}

	.contact-val {
		font-size: 0.9375rem;
		color: var(--text);
		overflow-wrap: anywhere;
	}

	.social-row {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.meta-sep {
		color: var(--border-strong);
	}

	.copy-btn {
		width: 36px;
		height: 36px;
		border-radius: var(--radius-s);
		background: var(--surface-2);
		border: 1px solid var(--border);
		color: var(--text-muted);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: border-color 0.15s ease, color 0.15s ease;
	}

	.copy-btn:hover {
		border-color: var(--accent);
		color: var(--text);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	.downloads-card {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.downloads-heading {
		font-size: 1.1875rem;
		color: var(--text);
	}

	.downloads-desc {
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--text-muted);
	}

	.download-action-group {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding-top: 0.5rem;
	}
</style>