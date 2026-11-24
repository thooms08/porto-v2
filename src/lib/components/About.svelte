<script lang="ts">
  import type { Locale } from "$lib/i18n";
  import { t } from "$lib/i18n";
  import { profileData } from "$lib/data/profile";
  import { certificates } from "$lib/data/certificates";
  import { ui } from "$lib/data/ui";
  import { reveal } from "$lib/actions/reveal";
  import { softHyphenate } from "$lib/utils/hyphenate";

  let { locale }: { locale: Locale } = $props();

  const yearsExperience = 2;
  const verifiedCertificatesCount = certificates.length;
  const quickFacts = profileData.quickFacts.filter((fact) => {
    const labels = Object.values(
      fact.label as unknown as Record<string, string>,
    );
    return !labels.some((label) => /^(focus|fokus)$/i.test(label.trim()));
  });

  const pad = (n: number) => String(n).padStart(2, "0");

  function countUp(node: HTMLElement, to: number) {
    if (
      !Number.isFinite(to) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    node.textContent = "0";
    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const duration = 1400;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          node.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
        cancelAnimationFrame(raf);
      },
    };
  }
</script>

<section id="about" class="about-section section-line">
  <div class="container">
    <header class="section-header about-header" use:reveal>
      <span class="about-icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="8" r="3.6" />
          <path d="M4.5 20c.8-3.6 3.9-5.6 7.5-5.6s6.7 2 7.5 5.6" />
        </svg>
      </span>
      <h2>{t({ en: "About Me", id: "Tentang Saya" }, locale)}</h2>
    </header>

    <div class="about-grid">
      <div class="narrative-col" use:reveal>
        <div class="paragraphs">
          {#each t(profileData.about.long, locale) as paragraph, i}
            <p class:lead={i === 0} lang={locale}>
              {softHyphenate(paragraph, locale)}
            </p>
          {/each}
        </div>
        <dl class="stats-row">
          <div class="stat">
            <dt class="stat-label">{t(ui.about.statProjects, locale)}</dt>
            <dd class="stat-number">
              <span use:countUp={Number(profileData.stats.projectsCount)}
                >{profileData.stats.projectsCount}</span
              >
            </dd>
          </div>
          <div class="stat">
            <dt class="stat-label">{t(ui.about.statCertificates, locale)}</dt>
            <dd class="stat-number">
              <span use:countUp={verifiedCertificatesCount}
                >{verifiedCertificatesCount}</span
              >
            </dd>
          </div>
          <div class="stat">
            <dt class="stat-label">{t(ui.about.statYears, locale)}</dt>
            <dd class="stat-number">
              <span use:countUp={yearsExperience}>{yearsExperience}</span><span
                class="stat-plus">+</span
              >
            </dd>
          </div>
        </dl>
      </div>

      <div class="facts-col" use:reveal={{ delay: 100 }}>
        <h3 class="facts-heading">{t(ui.about.quickFactsTitle, locale)}</h3>
        <dl class="facts-list">
          {#each quickFacts as fact, i}
            <div class="fact-row">
              <span class="fact-index" aria-hidden="true">{pad(i + 1)}</span>
              <dt class="fact-label">{t(fact.label, locale)}</dt>
              <dd class="fact-value">{t(fact.value, locale)}</dd>
            </div>
          {/each}
        </dl>
      </div>
    </div>
  </div>
</section>

<style>
  .about-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(40px, 7vw, 72px);
    align-items: start;
  }

  @media (min-width: 960px) {
    .about-grid {
      grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
      gap: clamp(56px, 8vw, 112px);
    }
  }

  .narrative-col,
  .facts-col {
    min-width: 0;
  }

  .about-icon {
    display: block;
    width: 30px;
    height: 30px;
    margin-bottom: 0.75rem;
    color: var(--neb-cyan);
    filter: drop-shadow(0 0 10px rgba(90, 160, 255, 0.5));
  }

  .about-icon svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .paragraphs {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .paragraphs p {
    font-size: 1.0625rem;
    max-width: 60ch;
  }

  .paragraphs p.lead {
    font-size: clamp(1.4rem, 1.05rem + 1.5vw, 2rem);
    font-weight: 500;
    line-height: 1.32;
    letter-spacing: -0.02em;
    color: var(--text);
    max-width: 28em;
    margin-bottom: 0.5rem;
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: clamp(2.25rem, 6vw, 3.5rem);
    border-top: 1px solid transparent;
    border-image: linear-gradient(
        90deg,
        rgba(150, 170, 255, 0.3),
        rgba(150, 170, 255, 0.04)
      )
      1;
  }

  .stat {
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-end;
    gap: 0.5rem;
    padding-top: 1.25rem;
    padding-left: clamp(0.75rem, 3vw, 1.75rem);
    border-left: 1px solid rgba(150, 170, 255, 0.14);
    min-width: 0;
  }

  .stat:first-child {
    padding-left: 0;
    border-left: none;
  }

  .stat-number {
    font-size: clamp(2.25rem, 1.2rem + 4vw, 3.5rem);
    font-weight: 300;
    line-height: 1;
    letter-spacing: -0.04em;
    font-variant-numeric: tabular-nums;
    color: var(--text);
  }

  .stat-plus {
    color: var(--neb-cyan);
    font-weight: 300;
  }

  .stat-label {
    font-size: clamp(0.72rem, 0.68rem + 0.2vw, 0.8125rem);
    color: var(--text-muted);
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .facts-heading {
    font-size: 0.75rem;
    font-family: var(--font-mono);
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 1rem;
  }

  .facts-list {
    display: flex;
    flex-direction: column;
  }

  .fact-row {
    display: grid;
    grid-template-columns: 2.25rem minmax(0, 1fr);
    column-gap: 0.5rem;
    row-gap: 0.2rem;
    padding-block: 1rem;
    border-top: 1px solid transparent;
    border-image: linear-gradient(
        90deg,
        rgba(150, 170, 255, 0.24),
        rgba(150, 170, 255, 0.03)
      )
      1;
  }

  .fact-index {
    grid-row: 1 / span 2;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    line-height: 1.7;
    color: var(--text-muted);
    opacity: 0.7;
    transition:
      color 0.2s ease,
      opacity 0.2s ease;
  }

  .fact-row:hover .fact-index {
    color: var(--neb-cyan);
    opacity: 1;
  }

  .fact-label {
    grid-column: 2;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    overflow-wrap: anywhere;
  }

  .fact-value {
    grid-column: 2;
    font-size: 1rem;
    color: var(--text);
    font-weight: 500;
    line-height: 1.45;
    overflow-wrap: anywhere;
  }

  @media (max-width: 959px) {
    /* judul rata tengah */
    .about-header {
      text-align: center;
    }

    .about-icon {
      margin-inline: auto;
    }

    .paragraphs p {
      font-size: 0.9375rem;
      line-height: 1.7;
      max-width: none;
      text-align: justify;
      hyphens: auto;
      -webkit-hyphens: auto;
      overflow-wrap: break-word;
    }

    .paragraphs p.lead {
      font-size: 1.0625rem;
      font-weight: 500;
      line-height: 1.6;
      letter-spacing: 0;
      margin-bottom: 0.25rem;
    }
  }
</style>
