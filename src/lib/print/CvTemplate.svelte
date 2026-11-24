<script lang="ts">
	import type { Locale } from '$lib/i18n';
	import { t } from '$lib/i18n';
	import { siteConfig } from '$lib/data/site';
	import { profileData } from '$lib/data/profile';
	import { experiences } from '$lib/data/experience';
	import { projects } from '$lib/data/projects';
	import { educationList } from '$lib/data/education';
	import { skillCategories, softSkills } from '$lib/data/skills';
	import { certificates } from '$lib/data/certificates';

	let { locale }: { locale: Locale } = $props();

	// CV shows only items marked with showInCv: true to fit exactly 1 A4 page
	const cvExperiences = experiences.filter((e) => e.showInCv);
	const cvProjects = projects.filter((p) => p.showInCv);
	const cvEducation = educationList.filter((e) => e.showInCv);
	const cvCertificates = certificates.filter((c) => c.showInCv);

	const sectionTitles = {
		about: { en: 'ABOUT', id: 'TENTANG' },
		experience: { en: 'WORK EXPERIENCE', id: 'PENGALAMAN KERJA' },
		projects: { en: 'PROJECTS', id: 'PROYEK' },
		education: { en: 'EDUCATION', id: 'PENDIDIKAN' },
		skills: { en: 'SKILLS', id: 'KEMAMPUAN' },
		certificates: { en: 'LICENSES AND CERTIFICATIONS', id: 'LISENSI DAN SERTIFIKASI' }
	};
</script>

<div class="cv-page">
	<!-- Header -->
	<header class="cv-header">
		<div class="header-photo-wrap">
			<img
				src="/foto-formal.png"
				alt={siteConfig.name}
				class="header-photo"
			/>
		</div>

		<div class="header-info">
			<h1 class="header-name">{siteConfig.name.toUpperCase()}</h1>
			<div class="header-role">{t(siteConfig.role, locale)}</div>
			<div class="header-location">{t(siteConfig.location, locale)}</div>
			<div class="header-contact">
				<span>{siteConfig.email}</span>
				<span class="sep">|</span>
				<span>{siteConfig.phoneDisplay}</span>
			</div>
			<div class="header-portfolio">
				<span>{locale === 'id' ? 'Portofolio' : 'Portfolio'}: </span>
				<a href={siteConfig.siteUrl} class="portfolio-link">{siteConfig.siteUrl}</a>
			</div>
		</div>
	</header>

	<div class="header-divider"></div>

	<!-- Section: About -->
	<section class="cv-section">
		<h2 class="section-title">{t(sectionTitles.about, locale)}</h2>
		<p class="about-text">{t(profileData.about.cv, locale)}</p>
	</section>

	<!-- Section: Experience -->
	<section class="cv-section">
		<h2 class="section-title">{t(sectionTitles.experience, locale)}</h2>
		<div class="items-list">
			{#each cvExperiences as exp}
				<div class="cv-item">
					<div class="item-head">
						<span class="item-title">{t(exp.role, locale)}</span>
						<span class="item-period">{t(exp.period, locale)}</span>
					</div>
					<div class="item-sub italic">{exp.company}</div>
					<ul class="item-bullets">
						<li>{t(exp.description, locale)}</li>
					</ul>
				</div>
			{/each}
		</div>
	</section>

	<!-- Section: Projects -->
	<section class="cv-section">
		<h2 class="section-title">{t(sectionTitles.projects, locale)}</h2>
		<div class="items-list">
			{#each cvProjects as proj}
				<div class="cv-item">
					<div class="item-head">
						<span class="item-title">{proj.name}</span>
						<span class="item-domain italic">{proj.displayUrl}</span>
					</div>
					<ul class="item-bullets">
						<li>
							{t(proj.shortDesc, locale)}
							<span class="stack-note">Stack: {proj.stack.join(', ')}</span>
						</li>
					</ul>
				</div>
			{/each}
		</div>
	</section>

	<!-- Section: Education -->
	<section class="cv-section">
		<h2 class="section-title">{t(sectionTitles.education, locale)}</h2>
		<div class="items-list">
			{#each cvEducation as edu}
				<div class="cv-item">
					<div class="item-head">
						<span class="item-title">{edu.institution}</span>
						<span class="item-period">{t(edu.period, locale)}</span>
					</div>
					<div class="item-sub italic">{t(edu.degree, locale)}</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Section: Skills -->
	<section class="cv-section">
		<h2 class="section-title">{t(sectionTitles.skills, locale)}</h2>
		<table class="skills-table">
			<tbody>
				{#each skillCategories as cat}
					<tr>
						<td class="skill-label">{t(cat.name, locale)}</td>
						<td class="skill-values">{cat.items.join(', ')}</td>
					</tr>
				{/each}
				<tr>
					<td class="skill-label">Soft Skill</td>
					<td class="skill-values">{t(softSkills, locale).join(', ')}</td>
				</tr>
			</tbody>
		</table>
	</section>

	<!-- Section: Licenses & Certifications -->
	<section class="cv-section">
		<h2 class="section-title">{t(sectionTitles.certificates, locale)}</h2>
		<div class="cert-list">
			{#each cvCertificates as cert}
				<div class="cert-row">
					<span class="cert-name">{t(cert.title, locale)}</span>
					<span class="cert-issuer italic">{cert.issuerDisplay ? t(cert.issuerDisplay, locale) : cert.issuer}</span>
				</div>
			{/each}
		</div>
	</section>
</div>

<style>
	@page {
		size: A4 portrait;
		margin: 0;
	}

	.cv-page {
		width: 210mm;
		box-sizing: border-box;
		padding: 8.5mm 11mm;
		background: #ffffff;
		color: #111111;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		font-size: 8.1pt;
		line-height: 1.25;
		margin-inline: auto;
	}

	/* Header */
	.cv-header {
		display: flex;
		align-items: flex-start;
		gap: 13px;
	}

	.header-photo-wrap {
		width: 23mm;
		height: 23mm;
		flex-shrink: 0;
		overflow: hidden;
	}

	.header-photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 20%;
		display: block;
	}

	.header-info {
		display: flex;
		flex-direction: column;
		gap: 0.5px;
	}

	.header-name {
		font-size: 16.5pt;
		font-weight: 700;
		letter-spacing: 0.05em;
		color: #000000;
		line-height: 1.05;
		margin-bottom: 1px;
	}

	.header-role {
		font-size: 8.8pt;
		color: #4b5563;
		font-weight: 500;
	}

	.header-location {
		font-size: 7.9pt;
		color: #374151;
	}

	.header-contact {
		font-size: 7.9pt;
		color: #374151;
	}

	.sep {
		margin-inline: 4px;
		color: #9ca3af;
	}

	.header-portfolio {
		font-size: 7.9pt;
		color: #374151;
	}

	.portfolio-link {
		color: #2563eb;
		text-decoration: underline;
	}

	.header-divider {
		width: 100%;
		height: 1.5px;
		background: #000000;
		margin-block: 4.5px 5.5px;
	}

	/* Sections */
	section.cv-section,
	.cv-section {
		margin-bottom: 5px;
		padding-block: 0 !important;
	}

	.section-title {
		font-size: 8.4pt;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: #000000;
		border-bottom: 1.2px solid #000000;
		padding-bottom: 1px;
		margin-bottom: 2.5px;
	}

	.about-text {
		font-size: 7.7pt;
		line-height: 1.22;
		color: #1f2937;
		text-align: justify;
	}

	/* Items */
	.items-list {
		display: flex;
		flex-direction: column;
		gap: 2.5px;
	}

	.cv-item {
		display: flex;
		flex-direction: column;
		gap: 0.5px;
	}

	.item-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.item-title {
		font-weight: 700;
		font-size: 8.1pt;
		color: #000000;
	}

	.item-period,
	.item-domain {
		font-size: 7.6pt;
		color: #374151;
	}

	.item-sub {
		font-size: 7.6pt;
		color: #374151;
	}

	.italic {
		font-style: italic;
	}

	.item-bullets {
		list-style: none;
		padding-left: 8px;
		margin: 0;
	}

	.item-bullets li {
		position: relative;
		font-size: 7.6pt;
		line-height: 1.22;
		color: #1f2937;
	}

	.item-bullets li::before {
		content: '•';
		position: absolute;
		left: -8px;
		color: #111;
	}

	.stack-note {
		margin-left: 3px;
	}

	/* Skills Table */
	.skills-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 7.6pt;
		line-height: 1.18;
	}

	.skill-label {
		font-weight: 700;
		color: #000000;
		width: 110px;
		vertical-align: top;
		padding-block: 0.5px;
	}

	.skill-values {
		color: #1f2937;
		vertical-align: top;
		padding-block: 0.5px;
	}

	/* Certs */
	.cert-list {
		display: flex;
		flex-direction: column;
	}

	.cert-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		font-size: 7.6pt;
		padding-block: 1px;
		border-bottom: 1px solid #e5e7eb;
	}

	.cert-row:last-child {
		border-bottom: none;
	}

	.cert-name {
		font-weight: 700;
		color: #000000;
	}

	.cert-issuer {
		color: #4b5563;
		font-size: 7.4pt;
	}
</style>
