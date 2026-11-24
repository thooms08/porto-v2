<script lang="ts">
  import type { Locale } from "$lib/i18n";
  import { t } from "$lib/i18n";
  import { dokumentasiList } from "$lib/data/dokumentasi";
  import { reveal } from "$lib/actions/reveal";
  import { onMount } from "svelte";

  let { locale }: { locale: Locale } = $props();

  let lightboxOpen = $state(false);
  let activeIdx = $state(0);

  function open(idx: number) {
    activeIdx = idx;
    lightboxOpen = true;
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightboxOpen = false;
    document.body.style.overflow = "";
  }

  function prev() {
    activeIdx =
      (activeIdx - 1 + dokumentasiList.length) % dokumentasiList.length;
  }

  function next() {
    activeIdx = (activeIdx + 1) % dokumentasiList.length;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!lightboxOpen) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  });

  const active = $derived(dokumentasiList[activeIdx]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const lbClose = $derived(locale === "id" ? "Tutup" : "Close");
  const lbPrev = $derived(locale === "id" ? "Sebelumnya" : "Previous");
  const lbNext = $derived(locale === "id" ? "Berikutnya" : "Next");
</script>

<section id="dokumentasi" class="dok-section section-line">
  <div class="container">
    <header class="section-header dok-header" use:reveal>
      <span class="dok-icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
          />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </span>
      <h2>
        {locale === "id" ? "Dokumentasi Kegiatan" : "Activity Documentation"}
      </h2>
    </header>

    <div class="masonry" use:reveal>
      {#each dokumentasiList as item, idx}
        <button
          type="button"
          class="masonry-item"
          onclick={() => open(idx)}
          aria-label={t(item.label, locale)}
        >
          <img
            src={item.thumb}
            alt={t(item.label, locale)}
            width={item.width}
            height={item.height}
            loading="lazy"
            decoding="async"
            class="masonry-img"
          />
          <div class="masonry-overlay">
            <span class="masonry-label">{t(item.label, locale)}</span>
          </div>
        </button>
      {/each}
    </div>
  </div>
</section>

{#if lightboxOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="lb-backdrop"
    onclick={(e) => {
      if ((e.target as HTMLElement).classList.contains("lb-backdrop")) close();
    }}
  >
    <div
      class="lb-dialog"
      role="dialog"
      aria-modal="true"
      aria-label={t(active.label, locale)}
    >
      <!-- Close -->
      <button class="lb-close" onclick={close} aria-label={lbClose}>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" /><line
            x1="6"
            y1="6"
            x2="18"
            y2="18"
          />
        </svg>
      </button>

      <!-- Prev -->
      <button class="lb-nav lb-prev" onclick={prev} aria-label={lbPrev}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <!-- Image -->
      <div class="lb-img-wrap">
        <img
          src={active.full}
          alt={t(active.label, locale)}
          class="lb-img"
          decoding="async"
        />
        <p class="lb-caption">{t(active.label, locale)}</p>
        <span class="lb-counter" aria-hidden="true"
          >{pad(activeIdx + 1)} / {pad(dokumentasiList.length)}</span
        >
      </div>

      <!-- Next -->
      <button class="lb-nav lb-next" onclick={next} aria-label={lbNext}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  </div>
{/if}

<style>
  .dok-icon {
    display: block;
    width: 30px;
    height: 30px;
    margin-bottom: 0.75rem;
    color: var(--neb-cyan);
    filter: drop-shadow(0 0 10px rgba(90, 160, 255, 0.5));
  }

  .dok-icon svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 959px) {
    .dok-header {
      text-align: center;
    }

    .dok-icon {
      margin-inline: auto;
    }
  }

  .masonry {
    columns: 2 240px;
    column-gap: 1rem;
  }

  @media (min-width: 640px) {
    .masonry {
      columns: 3 220px;
    }
  }
  @media (min-width: 1024px) {
    .masonry {
      columns: 4 220px;
    }
  }

  .masonry-item {
    display: block;
    break-inside: avoid;
    margin-bottom: 1rem;
    border-radius: 14px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    background: var(--bg-raised);
    border: 1px solid rgba(150, 170, 255, 0.2);
    padding: 0;
    width: 100%;
    transition:
      transform 0.25s ease,
      border-color 0.25s ease,
      box-shadow 0.3s ease;
  }

  .masonry-item:hover,
  .masonry-item:focus-visible {
    transform: translateY(-3px);
    border-color: rgba(170, 190, 255, 0.5);
    box-shadow: 0 18px 40px -22px rgba(91, 124, 255, 0.7);
  }

  .masonry-item:focus-visible {
    outline: 2px solid var(--focus);
    outline-offset: 2px;
  }

  .masonry-img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.35s ease;
  }

  .masonry-item:hover .masonry-img {
    transform: scale(1.03);
  }

  .masonry-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(5, 8, 22, 0.88) 0%,
      rgba(5, 8, 22, 0.3) 50%,
      transparent 100%
    );
    display: flex;
    align-items: flex-end;
    padding: 0.75rem;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .masonry-item:hover .masonry-overlay,
  .masonry-item:focus-visible .masonry-overlay {
    opacity: 1;
  }

  @media (hover: none) {
    .masonry-overlay {
      opacity: 1;
    }
  }

  .masonry-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #fff;
    line-height: 1.35;
    text-align: left;
  }

  .lb-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(4, 6, 20, 0.92);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    animation: lb-in 0.2s ease forwards;
  }

  @keyframes lb-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .lb-dialog {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    max-width: min(90vw, 1000px);
    width: 100%;
  }

  .lb-img-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    min-width: 0;
  }

  .lb-img {
    max-width: 100%;
    max-height: 80dvh;
    width: auto;
    height: auto;
    border-radius: 14px;
    border: 1px solid rgba(150, 170, 255, 0.22);
    box-shadow:
      0 20px 70px -20px rgba(0, 0, 0, 0.8),
      0 0 70px -30px rgba(91, 124, 255, 0.5);
    display: block;
  }

  .lb-caption {
    font-size: 0.9375rem;
    color: var(--text);
    text-align: center;
    max-width: 55ch;
    line-height: 1.4;
  }

  .lb-counter {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    color: var(--neb-cyan);
  }

  .lb-close {
    position: fixed;
    top: 1rem;
    right: 1rem;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: rgba(120, 140, 255, 0.1);
    border: 1px solid rgba(150, 170, 255, 0.28);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.25s ease;
    z-index: 10;
  }

  .lb-close:hover {
    background: rgba(120, 140, 255, 0.2);
    border-color: rgba(170, 190, 255, 0.55);
    box-shadow: 0 0 18px -4px rgba(110, 130, 255, 0.6);
  }

  .lb-nav {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(120, 140, 255, 0.08);
    border: 1px solid rgba(150, 170, 255, 0.24);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.25s ease;
  }

  .lb-nav:hover {
    background: rgba(120, 140, 255, 0.2);
    border-color: rgba(170, 190, 255, 0.55);
    box-shadow: 0 0 18px -4px rgba(110, 130, 255, 0.6);
  }

  @media (max-width: 480px) {
    .lb-prev {
      display: none;
    }
    .lb-next {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .lb-backdrop {
      animation: none;
    }
    .masonry-item,
    .masonry-img,
    .masonry-overlay {
      transition: none;
    }
  }
</style>
