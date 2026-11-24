<script lang="ts">
	import type { Locale } from '$lib/i18n';
	import { t } from '$lib/i18n';
	import { siteConfig } from '$lib/data/site';
	import { projects } from '$lib/data/projects';
	import { certificates } from '$lib/data/certificates';
	import { faqs } from '$lib/data/faq';
	import { skillCategories } from '$lib/data/skills';

	let { locale }: { locale: Locale } = $props();

	const allSkills = skillCategories.flatMap((c) => c.items);

	const graph = $derived({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': `${siteConfig.siteUrl}/#website`,
				url: siteConfig.siteUrl,
				name: siteConfig.name,
				inLanguage: locale === 'id' ? 'id-ID' : 'en-US'
			},
			{
				'@type': 'ProfilePage',
				'@id': `${siteConfig.siteUrl}${locale === 'id' ? '/id/' : '/'}#webpage`,
				url: `${siteConfig.siteUrl}${locale === 'id' ? '/id/' : '/'}`,
				name: t(siteConfig.seo.title, locale),
				description: t(siteConfig.seo.description, locale),
				isPartOf: { '@id': `${siteConfig.siteUrl}/#website` },
				mainEntity: { '@id': `${siteConfig.siteUrl}/#person` }
			},
			{
				'@type': 'Person',
				'@id': `${siteConfig.siteUrl}/#person`,
				name: siteConfig.name,
				givenName: siteConfig.firstName,
				familyName: siteConfig.lastName,
				jobTitle: t(siteConfig.role, locale),
				description: t(siteConfig.headline, locale),
				url: siteConfig.siteUrl,
				image: siteConfig.seo.ogImage,
				email: siteConfig.email,
				telephone: siteConfig.phone,
				address: {
					'@type': 'PostalAddress',
					addressLocality: 'Karawang',
					addressRegion: 'Jawa Barat',
					addressCountry: 'ID'
				},
				sameAs: [siteConfig.githubUrl, siteConfig.linkedinUrl],
				alumniOf: {
					'@type': 'EducationalOrganization',
					name: 'Universitas Bina Sarana Informatika'
				},
				worksFor: {
					'@type': 'Organization',
					name: siteConfig.companyName
				},
				founder: {
					'@type': 'Organization',
					name: siteConfig.companyName
				},
				knowsAbout: allSkills,
				hasCredential: certificates.map((c) => ({
					'@type': 'EducationalOccupationalCredential',
					name: t(c.title, locale),
					credentialCategory: c.category,
					recognizedBy: {
						'@type': 'Organization',
						name: c.issuer
					},
					validFrom: c.date
				}))
			},
			{
				'@type': 'Organization',
				'@id': `${siteConfig.siteUrl}/#organization`,
				name: siteConfig.companyName,
				founder: { '@id': `${siteConfig.siteUrl}/#person` }
			},
			{
				'@type': 'ItemList',
				name: 'Portfolio Projects',
				itemListElement: projects.map((proj, idx) => ({
					'@type': 'ListItem',
					position: idx + 1,
					item: {
						'@type': 'WebApplication',
						name: proj.name,
						url: proj.url,
						description: t(proj.shortDesc, locale),
						applicationCategory: t(proj.category, locale),
						creator: { '@id': `${siteConfig.siteUrl}/#person` }
					}
				}))
			},
			{
				'@type': 'FAQPage',
				mainEntity: faqs.map((f) => ({
					'@type': 'Question',
					name: t(f.question, locale),
					acceptedAnswer: {
						'@type': 'Answer',
						text: t(f.answer, locale)
					}
				}))
			}
		]
	});
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(graph)}<\/script>`}
</svelte:head>
