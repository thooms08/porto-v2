<script lang="ts">
	import type { Locale } from '$lib/i18n';
	import { t } from '$lib/i18n';
	import { educationList } from '$lib/data/education';
	import { ui } from '$lib/data/ui';
	import { reveal } from '$lib/actions/reveal';

	let { locale }: { locale: Locale } = $props();
</script>

<section id="education" class="education-section">
	<div class="container">
		<header class="section-header section-header--center" use:reveal>
			<span class="kicker">{t(ui.education.title, locale)}</span>
			<h2>{t({ en: 'Education', id: 'Pendidikan' }, locale)}</h2>
		</header>

		<div class="education-grid">
			{#each educationList as edu, idx}
				<article class="card edu-card" use:reveal={{ delay: idx * 80 }}>
					<div class="edu-top">
						<h3 class="edu-institution">{edu.institution}</h3>
						<span class="period-badge">{t(edu.period, locale)}</span>
					</div>
					<p class="edu-degree">{t(edu.degree, locale)}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.education-section {
		border-top: 1px solid var(--border);
	}

	.education-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 1.5rem;
	}

	.edu-card {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.edu-top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.edu-institution {
		font-size: 1.125rem;
		color: var(--text);
	}

	.period-badge {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--accent);
		background: var(--surface-2);
		padding: 0.2rem 0.6rem;
		border-radius: var(--radius-s);
		border: 1px solid var(--border);
		white-space: nowrap;
	}

	.edu-degree {
		font-size: 0.9375rem;
		color: var(--text-muted);
	}
</style>
