<script lang="ts">
  import type { Locale } from "$lib/i18n";
  import { t } from "$lib/i18n";
  import { educationList } from "$lib/data/education";
  import { reveal } from "$lib/actions/reveal";

  let { locale }: { locale: Locale } = $props();
</script>

<section id="education" class="education-section section-line">
  <div class="container">
    <header class="section-header edu-header" use:reveal>
      <span class="edu-icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M22 10 12 5 2 10l10 5 10-5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
          <path d="M22 10v6" />
        </svg>
      </span>
      <h2>{t({ en: "Education", id: "Pendidikan" }, locale)}</h2>
    </header>

    <div class="timeline" role="list">
      {#each educationList as edu, idx}
        <article
          class="edu-item"
          role="listitem"
          use:reveal={{ delay: idx * 80 }}
        >
          <div class="edu-marker" aria-hidden="true">
            <span class="edu-dot"></span>
          </div>

          <div class="edu-meta">
            <span class="edu-period">{t(edu.period, locale)}</span>
          </div>

          <div class="edu-body">
            <h3 class="edu-institution">{edu.institution}</h3>
            <p class="edu-degree">{t(edu.degree, locale)}</p>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .edu-icon {
    display: block;
    width: 30px;
    height: 30px;
    margin-bottom: 0.75rem;
    color: var(--neb-cyan);
    filter: drop-shadow(0 0 10px rgba(90, 160, 255, 0.5));
  }

  .edu-icon svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 959px) {
    .edu-header {
      text-align: center;
    }

    .edu-icon {
      margin-inline: auto;
    }
  }

  .timeline {
    max-width: 900px;
  }

  .edu-item {
    display: grid;
    grid-template-columns: 14px minmax(0, 1fr);
    column-gap: 0.9rem;
    grid-template-areas:
      "marker meta"
      "marker body";
  }

  .edu-marker {
    grid-area: marker;
    position: relative;
    display: flex;
    justify-content: center;
  }

  .edu-marker::after {
    content: "";
    position: absolute;
    top: 1rem;
    bottom: 0;
    left: 50%;
    width: 1px;
    transform: translateX(-50%);
    background: linear-gradient(
      to bottom,
      rgba(150, 170, 255, 0.4),
      rgba(150, 170, 255, 0.1)
    );
  }

  .edu-item:last-child .edu-marker::after {
    display: none;
  }

  .edu-dot {
    position: relative;
    z-index: 1;
    width: 8px;
    height: 8px;
    margin-top: 0.4rem;
    border-radius: 50%;
    background: var(--neb-cyan);
    box-shadow:
      0 0 8px 2px rgba(110, 170, 255, 0.7),
      0 0 20px 6px rgba(120, 90, 255, 0.3);
    transition: box-shadow 0.25s ease;
  }

  .edu-item:hover .edu-dot {
    box-shadow:
      0 0 10px 3px rgba(130, 185, 255, 0.9),
      0 0 26px 8px rgba(120, 90, 255, 0.45);
  }

  .edu-meta {
    grid-area: meta;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    margin-bottom: 0.6rem;
  }

  .edu-period {
    color: var(--neb-cyan);
    font-weight: 600;
  }

  .edu-body {
    grid-area: body;
    min-width: 0;
    padding-bottom: clamp(2rem, 7vw, 2.75rem);
  }

  .edu-item:last-child .edu-body {
    padding-bottom: 0;
  }

  .edu-institution {
    font-size: 1.0625rem;
    line-height: 1.3;
    color: var(--text);
    margin-bottom: 0.35rem;
    overflow-wrap: anywhere;
  }

  .edu-degree {
    font-size: 0.9375rem;
    line-height: 1.65;
    color: var(--text-muted);
    max-width: 62ch;
  }

  @media (min-width: 720px) {
    .edu-item {
      grid-template-columns: minmax(8rem, 10.5rem) 14px minmax(0, 1fr);
      column-gap: 1.5rem;
      grid-template-areas: "meta marker body";
    }

    .edu-meta {
      text-align: right;
      margin-bottom: 0;
      padding-top: 0.15rem;
      font-size: 0.8125rem;
    }

    .edu-institution {
      font-size: 1.25rem;
    }

    .edu-degree {
      font-size: 1rem;
    }
  }
</style>
