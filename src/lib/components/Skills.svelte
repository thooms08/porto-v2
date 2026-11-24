<script lang="ts">
	import type { Locale } from '$lib/i18n';
	import { t } from '$lib/i18n';
	import { skillCategories, softSkills } from '$lib/data/skills';
	import { ui } from '$lib/data/ui';
	import { reveal } from '$lib/actions/reveal';

	let { locale }: { locale: Locale } = $props();

	const pad = (n: number) => String(n).padStart(2, '0');
</script>

<section id="skills" class="skills-section section-line">
	<div class="container">
		<header class="section-header skills-header" use:reveal>
			<!-- ikon "keahlian teknis" (chip/prosesor) menggantikan label kecil + titik -->
			<span class="skills-icon" aria-hidden="true">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
					<rect x="4" y="4" width="16" height="16" rx="2.5" />
					<rect x="9" y="9" width="6" height="6" rx="1" />
					<path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
				</svg>
			</span>
			<h2>{t({ en: 'Technical Skills', id: 'Keahlian Teknis' }, locale)}</h2>
		</header>

		<!-- Daftar keahlian: baris bernomor, tanpa kartu -->
		<div class="skills-list">
			{#each skillCategories as cat, idx}
				<div class="skill-row" use:reveal={{ delay: idx * 60 }}>
					<h3 class="skill-cat">
						<span class="skill-index" aria-hidden="true">{pad(idx + 1)}</span>
						<span class="skill-cat-name">{t(cat.name, locale)}</span>
					</h3>
					<div class="skill-chips">
						{#each cat.items as skill}
							<span class="chip">{skill}</span>
						{/each}
					</div>
				</div>
			{/each}

			<!-- Soft skills: baris terakhir dengan gaya yang sama -->
			<div class="skill-row" use:reveal={{ delay: skillCategories.length * 60 }}>
				<h3 class="skill-cat">
					<span class="skill-index" aria-hidden="true">{pad(skillCategories.length + 1)}</span>
					<span class="skill-cat-name">{t(ui.skills.softSkillsTitle, locale)}</span>
				</h3>
				<div class="skill-chips">
					{#each t(softSkills, locale) as soft}
						<span class="chip chip-soft">{soft}</span>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* garis pemisah atas memakai .section-line (app.css) */

	/* ── Ikon judul (menggantikan kicker) ── */
	.skills-icon {
		display: block;
		width: 30px;
		height: 30px;
		margin-bottom: 0.75rem;
		color: var(--neb-cyan);
		filter: drop-shadow(0 0 10px rgba(90, 160, 255, 0.5));
	}

	.skills-icon svg {
		display: block;
		width: 100%;
		height: 100%;
	}

	@media (max-width: 959px) {
		.skills-header {
			text-align: center;
		}

		.skills-icon {
			margin-inline: auto;
		}
	}

	/* ── Daftar: baris dipisah garis tipis yang memudar ── */
	.skills-list {
		display: flex;
		flex-direction: column;
		max-width: 960px;
	}

	/* garis penutup di bawah baris terakhir */
	.skills-list::after {
		content: '';
		height: 1px;
		background: linear-gradient(90deg, rgba(150, 170, 255, 0.24), rgba(150, 170, 255, 0.03));
	}

	/* Mobile: judul kategori di atas, chip di bawahnya */
	.skill-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 0.85rem;
		padding-block: 1.25rem;
		border-top: 1px solid transparent;
		border-image: linear-gradient(90deg, rgba(150, 170, 255, 0.24), rgba(150, 170, 255, 0.03)) 1;
	}

	.skill-cat {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		min-width: 0;
		font-size: 1.0625rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--text);
	}

	.skill-index {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 400;
		color: var(--text-muted);
		opacity: 0.7;
		transition: color 0.2s ease, opacity 0.2s ease;
	}

	.skill-row:hover .skill-index {
		color: var(--neb-cyan);
		opacity: 1;
	}

	.skill-cat-name {
		overflow-wrap: anywhere;
	}

	.skill-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		min-width: 0;
	}

	/* chip ringan: hanya garis tipis, tanpa latar (sama dengan Experience) */
	.skill-chips .chip {
		padding: 0.35rem 0.7rem;
		font-size: 0.78rem;
		background: transparent;
		border-color: rgba(150, 170, 255, 0.22);
		color: var(--text-muted);
		transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
	}

	.skill-chips .chip:hover {
		color: var(--text);
		border-color: rgba(170, 190, 255, 0.5);
		background-color: rgba(120, 140, 255, 0.08);
	}

	/* soft skills: huruf biasa (bukan mono) agar terbaca sebagai kalimat pendek */
	.skill-chips .chip-soft {
		font-family: var(--font-sans);
		font-size: 0.875rem;
	}

	/* ── Tablet/desktop: kategori di kiri, chip di kanan ── */
	@media (min-width: 720px) {
		.skill-row {
			grid-template-columns: minmax(11rem, 15rem) minmax(0, 1fr);
			gap: 2rem;
			align-items: baseline;
			padding-block: 1.4rem;
		}
	}
</style>