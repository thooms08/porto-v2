<script lang="ts">
	import type { Locale } from '$lib/i18n';
	import { t } from '$lib/i18n';
	import { certificates, type CertificateItem } from '$lib/data/certificates';
	import { ui } from '$lib/data/ui';
	import { reveal } from '$lib/actions/reveal';
	import Lightbox from './Lightbox.svelte';
	import { onMount } from 'svelte';

	let { locale }: { locale: Locale } = $props();

	let selectedCert: CertificateItem | null = $state(null);
	let selectedIndex = $state(0);

	// Pause marquee on hover/focus
	let paused = $state(false);
	let trackEl: HTMLElement | undefined = $state();

	function openLightbox(index: number) {
		selectedIndex = index;
		selectedCert = certificates[index];
	}

	function closeLightbox() { selectedCert = null; }
	function prevCert() {
		selectedIndex = (selectedIndex - 1 + certificates.length) % certificates.length;
		selectedCert = certificates[selectedIndex];
	}
	function nextCert() {
		selectedIndex = (selectedIndex + 1) % certificates.length;
		selectedCert = certificates[selectedIndex];
	}

	// Duplicate items so marquee loops seamlessly
	const items = [...certificates, ...certificates];
</script>

<section id="certificates" class="certs-section section-line">
	<div class="container">
		<header class="section-header certs-header" use:reveal>
			<!-- ikon "sertifikat" (medali) menggantikan label kecil + titik -->
			<span class="certs-icon" aria-hidden="true">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="8" r="6" />
					<polyline points="8.21 13.89 7 22 12 19 17 22 15.79 13.88" />
				</svg>
			</span>
			<h2>{t({ en: 'Licenses & Certifications', id: 'Lisensi & Sertifikasi' }, locale)}</h2>
		</header>
	</div>

	<!-- Full-bleed marquee (outside container so it bleeds edge-to-edge) -->
	<div
		class="marquee-outer"
		role="region"
		onmouseenter={() => (paused = true)}
		onmouseleave={() => (paused = false)}
		onfocusin={() => (paused = true)}
		onfocusout={() => (paused = false)}
		aria-label={t(ui.certificates.title, locale)}
	>
		<div
			class="marquee-track"
			class:paused
			bind:this={trackEl}
		>
			{#each items as cert, idx}
				{@const originalIdx = idx % certificates.length}
				<button
					type="button"
					class="cert-card"
					class:is-dup={idx >= certificates.length}
					aria-hidden={idx >= certificates.length ? 'true' : undefined}
					onclick={() => openLightbox(originalIdx)}
					aria-label={`${t(ui.certificates.viewCertificate, locale)}: ${t(cert.title, locale)}`}
					tabindex={idx >= certificates.length ? -1 : 0}
				>
					<div class="cert-thumb-wrap">
						<img
							src={`/certificates/${cert.thumb}`}
							alt={`Certificate: ${t(cert.title, locale)}, issued by ${cert.issuer}`}
							width="320"
							height="220"
							loading="lazy"
							decoding="async"
							class="cert-thumb-img"
						/>
						<span class="cert-badge">{cert.category}</span>
					</div>
					<div class="cert-info">
						<p class="cert-name">{t(cert.title, locale)}</p>
						<p class="cert-issuer">{cert.issuer}</p>
						<p class="cert-date">{t(cert.displayDate, locale)}</p>
					</div>
				</button>
			{/each}
		</div>
	</div>
</section>

{#if selectedCert}
	<Lightbox
		certificate={selectedCert}
		{locale}
		onClose={closeLightbox}
		onPrev={prevCert}
		onNext={nextCert}
	/>
{/if}

<style>
	/* garis pemisah atas memakai .section-line (app.css) */
	.certs-section {
		overflow: hidden;
	}

	/* ── Ikon judul (menggantikan kicker) ── */
	.certs-icon {
		display: block;
		width: 30px;
		height: 30px;
		margin-bottom: 0.75rem;
		color: var(--neb-cyan);
		filter: drop-shadow(0 0 10px rgba(90, 160, 255, 0.5));
	}

	.certs-icon svg {
		display: block;
		width: 100%;
		height: 100%;
	}

	@media (max-width: 959px) {
		.certs-header {
			text-align: center;
		}

		.certs-icon {
			margin-inline: auto;
		}
	}

	/* Marquee container — bleeds full width */
	.marquee-outer {
		width: 100%;
		overflow: hidden;
		/* Fade edges */
		-webkit-mask-image: linear-gradient(
			to right,
			transparent 0%,
			black 8%,
			black 92%,
			transparent 100%
		);
		mask-image: linear-gradient(
			to right,
			transparent 0%,
			black 8%,
			black 92%,
			transparent 100%
		);
	}

	/* Track: flex row, animates translateX */
	.marquee-track {
		display: flex;
		gap: 1.5rem;
		width: max-content;
		padding-block: 0.75rem;
		animation: marquee-scroll 40s linear infinite;
		will-change: transform;
	}

	.marquee-track.paused {
		animation-play-state: paused;
	}

	@keyframes marquee-scroll {
		0%   { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}

	/* Item sertifikat: tanpa kotak, hanya gambar + teks di bawahnya */
	.cert-card {
		flex-shrink: 0;
		width: clamp(220px, 28vw, 280px);
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		background: transparent;
		border: 0;
		cursor: pointer;
		text-align: left;
		color: inherit;
		padding: 0;
	}

	.cert-card:focus-visible {
		outline: 2px solid var(--focus);
		outline-offset: 4px;
		border-radius: 14px;
	}

	/* Thumbnail: satu-satunya bingkai, karena gambarnya memang sertifikat */
	.cert-thumb-wrap {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 11;
		overflow: hidden;
		background: var(--bg);
		border: 1px solid rgba(150, 170, 255, 0.2);
		border-radius: 14px;
		transition: border-color 0.25s ease, box-shadow 0.3s ease, transform 0.25s ease;
	}

	.cert-card:hover .cert-thumb-wrap,
	.cert-card:focus-visible .cert-thumb-wrap {
		border-color: rgba(170, 190, 255, 0.5);
		box-shadow: 0 18px 40px -22px rgba(91, 124, 255, 0.7);
		transform: translateY(-3px);
	}

	.cert-thumb-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.3s ease;
	}

	.cert-card:hover .cert-thumb-img {
		transform: scale(1.04);
	}

	/* Kategori: pil kecil di pojok gambar */
	.cert-badge {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--neb-cyan);
		background: rgba(7, 11, 30, 0.8);
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);
		border: 1px solid rgba(150, 170, 255, 0.22);
		padding: 0.2rem 0.55rem;
		border-radius: 999px;
	}

	/* Teks di bawah gambar: rata dengan tepi kiri gambar */
	.cert-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding-inline: 0.15rem;
	}

	.cert-name {
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--text);
		line-height: 1.3;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.cert-issuer {
		font-size: 0.8125rem;
		color: var(--text-muted);
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.cert-date {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.04em;
		color: var(--neb-cyan);
		margin-top: 0.15rem;
	}

	/* Respect reduced motion — no auto-scroll, show static row */
	@media (prefers-reduced-motion: reduce) {
		.marquee-track {
			animation: none;
			flex-wrap: wrap;
			width: 100%;
			padding-inline: clamp(16px, 4vw, 32px);
		}
		/* Sembunyikan salinan (duplikat) */
		.cert-card.is-dup {
			display: none;
		}
	}
</style>