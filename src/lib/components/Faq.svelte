<script lang="ts">
	import type { Locale } from '$lib/i18n';
	import { t } from '$lib/i18n';
	import { faqs } from '$lib/data/faq';
	import { ui } from '$lib/data/ui';
	import { reveal } from '$lib/actions/reveal';

	let { locale }: { locale: Locale } = $props();
</script>

<section id="faq" class="faq-section">
	<div class="container">
		<header class="section-header section-header--center" use:reveal>
			<span class="kicker">{t(ui.faq.title, locale)}</span>
			<h2>{t({ en: 'FAQ', id: 'FAQ' }, locale)}</h2>
		</header>

		<div class="faq-list">
			{#each faqs as item, idx}
				<details class="card faq-item" use:reveal={{ delay: idx * 50 }}>
					<summary class="faq-summary">
						<span class="faq-question">{t(item.question, locale)}</span>
						<span class="faq-icon" aria-hidden="true">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<polyline points="6 9 12 15 18 9"></polyline>
							</svg>
						</span>
					</summary>
					<div class="faq-answer">
						<p>{t(item.answer, locale)}</p>
					</div>
				</details>
			{/each}
		</div>
	</div>
</section>

<style>
	.faq-section {
		border-top: 1px solid var(--border);
	}

	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 860px;
	}

	.faq-item {
		padding: 0;
		overflow: hidden;
	}

	.faq-summary {
		padding: 1.25rem 1.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		cursor: pointer;
		list-style: none;
		font-weight: 600;
		color: var(--text);
		user-select: none;
	}

	.faq-summary::-webkit-details-marker {
		display: none;
	}

	.faq-question {
		font-size: 1.0625rem;
	}

	.faq-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--text-muted);
		transition: transform 0.2s ease, color 0.2s ease;
	}

	.faq-item[open] .faq-icon {
		transform: rotate(180deg);
		color: var(--accent);
	}

	.faq-answer {
		padding: 0 1.5rem 1.25rem 1.5rem;
		border-top: 1px solid var(--border);
		margin-top: 0.25rem;
		padding-top: 1rem;
	}

	.faq-answer p {
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--text-muted);
		max-width: none;
	}
</style>
