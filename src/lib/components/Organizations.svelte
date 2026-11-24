<script lang="ts">
	import type { Locale } from '$lib/i18n';
	import { t } from '$lib/i18n';
	import { organizations } from '$lib/data/organizations';
	import { ui } from '$lib/data/ui';
	import { reveal } from '$lib/actions/reveal';

	let { locale }: { locale: Locale } = $props();

	const leadership = organizations.filter((o) => o.type === 'leadership');
	const activities = organizations.filter((o) => o.type === 'activity');
</script>

<section id="organizations" class="organizations-section">
	<div class="container">
		<header class="section-header" use:reveal>
			<span class="kicker">{t(ui.education.organizationsTitle, locale)}</span>
			<h2>{t(ui.education.organizationsSubtitle, locale)}</h2>
		</header>

		<div class="org-layout">
			<!-- Leadership -->
			<div class="org-group" use:reveal>
				<h3 class="group-title">{t(ui.education.leadershipTitle, locale)}</h3>
				<div class="org-cards">
					{#each leadership as item}
						<div class="card org-card">
							<div class="org-info">
								<h4 class="org-role">{t(item.role, locale)}</h4>
								<span class="org-inst">{item.institution}</span>
							</div>
							<span class="org-period">{item.period}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Activities -->
			<div class="org-group" use:reveal={{ delay: 100 }}>
				<h3 class="group-title">{t(ui.education.activitiesTitle, locale)}</h3>
				<div class="org-cards">
					{#each activities as item}
						<div class="card org-card">
							<div class="org-info">
								<h4 class="org-role">{t(item.role, locale)}</h4>
								<span class="org-inst">{item.institution}</span>
							</div>
							<span class="org-period">{item.period}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.organizations-section {
		border-top: 1px solid var(--border);
	}

	.org-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
	}

	@media (min-width: 900px) {
		.org-layout {
			grid-template-columns: 1fr 1fr;
		}
	}

	.group-title {
		font-size: 1.125rem;
		color: var(--accent);
		margin-bottom: 1.25rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border);
	}

	.org-cards {
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
	}

	.org-card {
		padding: 1.125rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.org-info {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.org-role {
		font-size: 0.9375rem;
		color: var(--text);
		font-weight: 600;
	}

	.org-inst {
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	.org-period {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-muted);
		white-space: nowrap;
	}
</style>
