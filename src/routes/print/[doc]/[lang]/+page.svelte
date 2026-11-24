<script lang="ts">
	import { page } from '$app/state';
	import CvTemplate from '$lib/print/CvTemplate.svelte';
	import PortfolioTemplate from '$lib/print/PortfolioTemplate.svelte';
	import type { Locale } from '$lib/i18n';

	let doc = $derived(page.params.doc);
	let lang = $derived((page.params.lang === 'id' ? 'id' : 'en') as Locale);
</script>

<svelte:head>
	<meta name="robots" content="noindex,nofollow" />
	<title>{doc === 'cv' ? 'CV' : 'Portfolio'} - Thomas Lefvi Baehaqi</title>
</svelte:head>

{#if doc === 'cv'}
	<CvTemplate locale={lang} />
{:else if doc === 'portfolio'}
	<PortfolioTemplate locale={lang} />
{/if}
