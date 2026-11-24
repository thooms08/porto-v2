<script lang="ts">
	import type { Locale } from '$lib/i18n';
	import { t } from '$lib/i18n';
	import { siteConfig } from '$lib/data/site';
	import { ui } from '$lib/data/ui';

	import Starfield from '$lib/components/Starfield.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import ProjectShowcase from '$lib/components/ProjectShowcase.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import CertificateGallery from '$lib/components/CertificateGallery.svelte';
	import Education from '$lib/components/Education.svelte';
	import Organizations from '$lib/components/Organizations.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import ContactCard from '$lib/components/ContactCard.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';

	const locale: Locale = 'id';
	const enUrl = `${siteConfig.siteUrl}/`;
	const canonicalUrl = `${siteConfig.siteUrl}/id/`;
</script>

<svelte:head>
	<title>{t(siteConfig.seo.title, locale)}</title>
	<meta name="description" content={t(siteConfig.seo.description, locale)} />
	<meta name="author" content={siteConfig.name} />
	<meta name="keywords" content="Thomas Lefvi Baehaqi, Fullstack Web Developer, Laravel, Next.js, TypeScript, POS, HRMS, E-Commerce, Karawang, Indonesia" />
	<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1" />

	<!-- Canonical & Hreflang -->
	<link rel="canonical" href={canonicalUrl} />
	<link rel="alternate" hreflang="en" href={enUrl} />
	<link rel="alternate" hreflang="id" href={canonicalUrl} />
	<link rel="alternate" hreflang="x-default" href={enUrl} />

	<!-- Open Graph -->
	<meta property="og:type" content="profile" />
	<meta property="og:site_name" content={siteConfig.name} />
	<meta property="og:title" content={t(siteConfig.seo.title, locale)} />
	<meta property="og:description" content={t(siteConfig.seo.description, locale)} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content="https://thomaslefvibaehaqi.my.id/foto-diri.webp" />
	<meta property="og:image:type" content="image/webp" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="1600" />
	<meta property="og:image:alt" content="Foto Thomas Lefvi Baehaqi" />
	<meta property="og:image" content="https://thomaslefvibaehaqi.my.id/og-image.jpg" />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content="id_ID" />
	<meta property="og:locale:alternate" content="en_US" />
	<meta property="profile:first_name" content={siteConfig.firstName} />
	<meta property="profile:last_name" content={siteConfig.lastName} />

	<!-- Twitter Cards -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={t(siteConfig.seo.title, locale)} />
	<meta name="twitter:description" content={t(siteConfig.seo.description, locale)} />
	<meta name="twitter:image" content="https://thomaslefvibaehaqi.my.id/foto-diri.webp" />
</svelte:head>

<JsonLd {locale} />

<a href="#about" class="skip-link">{t(ui.skipToContent, locale)}</a>

<Starfield />

<Navbar {locale} />

<main id="main-content">
	<Hero {locale} />
	<About {locale} />
	<Experience {locale} />
	<ProjectShowcase {locale} />
	<Skills {locale} />
	<CertificateGallery {locale} />
	<Education {locale} />
	<Organizations {locale} />
	<Faq {locale} />
	<ContactCard {locale} />
</main>

<Footer {locale} />
