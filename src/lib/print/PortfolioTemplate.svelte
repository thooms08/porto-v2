<script lang="ts">
	import type { Locale } from '$lib/i18n';
	import { t } from '$lib/i18n';
	import { siteConfig } from '$lib/data/site';
	import { profileData } from '$lib/data/profile';
	import { experiences } from '$lib/data/experience';
	import { projects } from '$lib/data/projects';
	import { educationList } from '$lib/data/education';
	import { portfolioHardSkills, softSkills, favoriteTools } from '$lib/data/skills';
	import { organizations } from '$lib/data/organizations';
	import { certificates } from '$lib/data/certificates';

	let { locale }: { locale: Locale } = $props();

	const portfolioExperiences = experiences.filter((e) => e.showInPortfolio);
	const portfolioProjects = projects.filter((p) => p.showInPortfolio);
	const portfolioCerts = certificates.filter((c) => c.showInPortfolio);
	const portfolioOrgs = organizations.filter((o) => o.showInPortfolio);
</script>

<div class="portfolio-doc">
	<!-- Page 1 Header -->
	<header class="porto-header">
		<div class="porto-avatar-wrap">
			<img src="/foto-formal.png" alt={siteConfig.name} class="porto-avatar" />
		</div>

		<div class="porto-header-info">
			<h1 class="porto-name">{siteConfig.name.toUpperCase()}</h1>
			<div class="porto-role">{t(siteConfig.role, locale)}</div>

			<div class="porto-contact-grid">
				<div class="contact-cell">
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2b3cff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
					<span>{siteConfig.email}</span>
				</div>
				<div class="contact-cell">
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2b3cff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
					<span>{siteConfig.phoneDisplay}</span>
				</div>
				<div class="contact-cell">
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2b3cff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
					<span>{t(siteConfig.location, locale)}</span>
				</div>
				<div class="contact-cell">
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2b3cff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
					<a href={siteConfig.siteUrl} class="porto-link">{siteConfig.siteUrl.replace('https://', '')}</a>
				</div>
				<div class="contact-cell">
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2b3cff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
					<span>github.com/{siteConfig.githubUser}</span>
				</div>
				<div class="contact-cell">
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2b3cff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
					<span>linkedin.com/in/{siteConfig.linkedinUser}</span>
				</div>
			</div>
		</div>
	</header>

	<div class="porto-divider"></div>

	<!-- Section: About -->
	<section class="porto-section">
		<h2 class="porto-section-title">{locale === 'id' ? 'TENTANG SAYA' : 'ABOUT ME'}</h2>
		<p class="porto-about-p">{t(profileData.about.long, locale).join(' ')}</p>
	</section>

	<!-- Section: Experience -->
	<section class="porto-section">
		<h2 class="porto-section-title">{locale === 'id' ? 'PENGALAMAN' : 'EXPERIENCE'}</h2>
		<div class="porto-exp-list">
			{#each portfolioExperiences as exp}
				<div class="porto-exp-item">
					<div class="exp-head">
						<span class="exp-role">{t(exp.role, locale)}</span>
						<span class="exp-period">{t(exp.period, locale)}</span>
					</div>
					<div class="exp-company">{t(exp.companyDisplay, locale)}</div>
					<p class="exp-desc">{t(exp.description, locale)}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Section: Projects (Grid 2 cols, break-inside: avoid) -->
	<section class="porto-section">
		<h2 class="porto-section-title">{locale === 'id' ? 'PROYEK YANG DISELESAIKAN' : 'COMPLETED PROJECTS'}</h2>
		<div class="porto-projects-grid">
			{#each portfolioProjects as proj}
				<div class="porto-proj-card">
					<div class="proj-title">{proj.name}</div>
					<p class="proj-desc">{t(proj.shortDesc, locale)}</p>
					<a href={proj.url} class="proj-link">{proj.displayUrl}</a>
				</div>
			{/each}
		</div>
	</section>

	<!-- Section: Education -->
	<section class="porto-section">
		<h2 class="porto-section-title">{locale === 'id' ? 'PENDIDIKAN' : 'EDUCATION'}</h2>
		<div class="porto-edu-grid">
			{#each educationList as edu}
				<div class="porto-edu-card">
					<div class="edu-inst">{edu.institution}</div>
					<div class="edu-detail">{t(edu.degree, locale)} · {t(edu.period, locale)}</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Section: Hard Skill -->
	<section class="porto-section">
		<h2 class="porto-section-title">HARD SKILL</h2>
		<div class="pills-grid">
			{#each t(portfolioHardSkills, locale) as hs}
				<div class="skill-pill">{hs}</div>
			{/each}
		</div>
	</section>

	<!-- Section: Soft Skill -->
	<section class="porto-section">
		<h2 class="porto-section-title">SOFT SKILL</h2>
		<div class="pills-grid">
			{#each t(softSkills, locale) as ss}
				<div class="skill-pill">{ss}</div>
			{/each}
		</div>
	</section>

	<!-- Section: Organisasi -->
	<section class="porto-section">
		<h2 class="porto-section-title">{locale === 'id' ? 'ORGANISASI' : 'ORGANIZATIONS'}</h2>
		<div class="porto-orgs-grid">
			{#each portfolioOrgs as org}
				<div class="porto-org-card">
					<div class="org-role">{t(org.role, locale)}</div>
					<div class="org-inst">{org.institution}</div>
					<div class="org-period">{org.period}</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Section: Favorite Tools -->
	<section class="porto-section">
		<h2 class="porto-section-title">{locale === 'id' ? 'ALAT FAVORIT' : 'FAVORITE TOOLS'}</h2>
		<div class="tools-row">
			{#each favoriteTools as tool}
				<span class="tool-pill">{tool}</span>
			{/each}
		</div>
	</section>

	<!-- Section: Certificates -->
	<section class="porto-section">
		<h2 class="porto-section-title">{locale === 'id' ? 'SERTIFIKAT' : 'CERTIFICATES'}</h2>
		<div class="porto-certs-list">
			{#each portfolioCerts as cert}
				<div class="porto-cert-row">
					<span class="cert-title-val">{t(cert.title, locale)}</span>
					<span class="cert-issuer-val">{cert.issuerDisplay ? t(cert.issuerDisplay, locale) : cert.issuer}</span>
				</div>
			{/each}
		</div>
	</section>
</div>

<style>
	@page {
		size: A4 portrait;
		margin: 10mm;
	}

	.portfolio-doc {
		width: 100%;
		max-width: 210mm;
		background: #ffffff;
		color: #0f172a;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		font-size: 9pt;
		line-height: 1.4;
		box-sizing: border-box;
		margin-inline: auto;
	}

	/* Header */
	.porto-header {
		display: flex;
		align-items: center;
		gap: 18px;
	}

	.porto-avatar-wrap {
		width: 28mm;
		height: 28mm;
		border-radius: 50%;
		border: 3px solid #2b3cff;
		overflow: hidden;
		flex-shrink: 0;
	}

	.porto-avatar {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 20%;
		display: block;
	}

	.porto-header-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.porto-name {
		font-size: 19pt;
		font-weight: 800;
		color: #0f172a;
		letter-spacing: -0.01em;
		line-height: 1.1;
	}

	.porto-role {
		font-size: 10.5pt;
		font-weight: 700;
		color: #2b3cff;
		margin-bottom: 3px;
	}

	.porto-contact-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 3px 10px;
		font-size: 8.2pt;
		color: #4b5563;
	}

	.contact-cell {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.porto-link {
		color: #2b3cff;
		text-decoration: none;
	}

	.porto-divider {
		width: 100%;
		height: 2.5px;
		background: #2b3cff;
		margin-block: 8px 10px;
	}

	/* Section Headings */
	section.porto-section,
	.porto-section {
		margin-bottom: 10px;
		padding-block: 0 !important;
	}

	.porto-section-title {
		font-size: 10pt;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: #2b3cff;
		border-bottom: 1px solid #e2e8f0;
		padding-bottom: 2px;
		margin-bottom: 6px;
		break-after: avoid;
		page-break-after: avoid;
	}

	.porto-about-p {
		font-size: 8.6pt;
		line-height: 1.4;
		color: #334155;
		text-align: justify;
	}

	/* Experience */
	.porto-exp-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.porto-exp-item {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.exp-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.exp-role {
		font-weight: 700;
		color: #0f172a;
		font-size: 9pt;
	}

	.exp-period {
		color: #64748b;
		font-size: 8.2pt;
	}

	.exp-company {
		font-weight: 700;
		color: #2b3cff;
		font-size: 8.6pt;
	}

	.exp-desc {
		font-size: 8.3pt;
		color: #475569;
		line-height: 1.32;
	}

	/* Projects Grid (2 cols, prevent breaking across pages) */
	.porto-projects-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 7px;
	}

	.porto-proj-card {
		border: 1px solid #e2e8f0;
		border-radius: 6px;
		padding: 7px 9px;
		break-inside: avoid;
		page-break-inside: avoid;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.proj-title {
		font-weight: 700;
		color: #2b3cff;
		font-size: 9pt;
	}

	.proj-desc {
		font-size: 8.2pt;
		color: #475569;
		line-height: 1.32;
		flex: 1;
	}

	.proj-link {
		font-size: 8pt;
		color: #2b3cff;
		text-decoration: underline;
	}

	/* Education Grid */
	.porto-edu-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 7px;
	}

	.porto-edu-card {
		border: 1px solid #e2e8f0;
		border-radius: 6px;
		padding: 6px 9px;
		break-inside: avoid;
	}

	.edu-inst {
		font-weight: 700;
		color: #0f172a;
		font-size: 8.7pt;
	}

	.edu-detail {
		font-size: 8.2pt;
		color: #2b3cff;
	}

	/* Skill Pills */
	.pills-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 6px;
		break-inside: avoid;
		page-break-inside: avoid;
	}

	.skill-pill {
		border: 1px solid #93c5fd;
		border-radius: 5px;
		padding: 5px;
		text-align: center;
		font-weight: 600;
		font-size: 8.2pt;
		color: #1e3a8a;
		background: #f8fafc;
		break-inside: avoid;
	}

	/* Organizations */
	.porto-orgs-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 6px;
	}

	.porto-org-card {
		border: 1px solid #e2e8f0;
		border-radius: 5px;
		padding: 6px 9px;
		break-inside: avoid;
		page-break-inside: avoid;
		display: flex;
		flex-direction: column;
		gap: 1.5px;
	}

	.org-role {
		font-weight: 700;
		color: #0f172a;
		font-size: 8.5pt;
	}

	.org-inst {
		color: #2b3cff;
		font-size: 8pt;
	}

	.org-period {
		color: #64748b;
		font-size: 7.7pt;
	}

	/* Favorite Tools */
	.tools-row {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		break-inside: avoid;
		page-break-inside: avoid;
	}

	.tool-pill {
		border: 1px solid #cbd5e1;
		border-radius: 9999px;
		padding: 2.5px 7px;
		font-size: 7.8pt;
		font-weight: 600;
		color: #334155;
		background: #f8fafc;
	}

	/* Certificates List */
	.porto-certs-list {
		display: flex;
		flex-direction: column;
	}

	.porto-cert-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		font-size: 8.3pt;
		padding-block: 2.5px;
		border-bottom: 1px solid #f1f5f9;
		break-inside: avoid;
	}

	.porto-cert-row:last-child {
		border-bottom: none;
	}

	.cert-title-val {
		font-weight: 700;
		color: #0f172a;
	}

	.cert-issuer-val {
		color: #64748b;
		font-size: 7.9pt;
	}
</style>
