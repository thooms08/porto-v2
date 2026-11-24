<script lang="ts">
  import type { Locale } from "$lib/i18n";
  import { t } from "$lib/i18n";
  import { faqs } from "$lib/data/faq";
  import { ui } from "$lib/data/ui";
  import { reveal } from "$lib/actions/reveal";

  let { locale }: { locale: Locale } = $props();

  const title = $derived(t({ en: "FAQ", id: "FAQ" }, locale));
  const subtitle = $derived(t(ui.faq.title, locale));

  const pad = (n: number) => String(n).padStart(2, "0");
</script>

<section id="faq" class="faq-section section-line">
  <div class="container">
    <header class="section-header faq-header" use:reveal>
      <span class="faq-header-icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </span>
      <h2>{title}</h2>
      {#if subtitle && subtitle.trim().toLowerCase() !== title
            .trim()
            .toLowerCase()}
        <p class="faq-sub">{subtitle}</p>
      {/if}
    </header>

    <div class="faq-list">
      {#each faqs as item, idx}
        <details class="faq-item" use:reveal={{ delay: idx * 50 }}>
          <summary class="faq-summary">
            <span class="faq-index" aria-hidden="true">{pad(idx + 1)}</span>
            <span class="faq-question">{t(item.question, locale)}</span>
            <span class="faq-icon" aria-hidden="true">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
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
  .faq-header-icon {
    display: block;
    width: 30px;
    height: 30px;
    margin-bottom: 0.75rem;
    color: var(--neb-cyan);
    filter: drop-shadow(0 0 10px rgba(90, 160, 255, 0.5));
  }

  .faq-header-icon svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .faq-sub {
    font-size: 1rem;
    color: var(--text-muted);
    max-width: 60ch;
  }

  @media (max-width: 959px) {
    .faq-header {
      text-align: center;
    }

    .faq-header-icon,
    .faq-sub {
      margin-inline: auto;
    }
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    max-width: 860px;
  }

  .faq-list::after {
    content: "";
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(150, 170, 255, 0.24),
      rgba(150, 170, 255, 0.03)
    );
  }

  .faq-item {
    border-top: 1px solid transparent;
    border-image: linear-gradient(
        90deg,
        rgba(150, 170, 255, 0.24),
        rgba(150, 170, 255, 0.03)
      )
      1;
  }

  .faq-summary {
    display: grid;
    grid-template-columns: 2rem minmax(0, 1fr) auto;
    column-gap: 0.5rem;
    align-items: baseline;
    padding-block: 1.15rem;
    cursor: pointer;
    list-style: none;
    font-weight: 600;
    color: var(--text);
    user-select: none;
    border-radius: 8px;
  }

  .faq-summary::-webkit-details-marker {
    display: none;
  }

  .faq-index {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 400;
    color: var(--text-muted);
    opacity: 0.7;
    transition:
      color 0.2s ease,
      opacity 0.2s ease;
  }

  .faq-question {
    font-size: 1rem;
    line-height: 1.4;
    overflow-wrap: anywhere;
    transition: color 0.2s ease;
  }

  .faq-icon {
    display: inline-flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    transition:
      transform 0.25s ease,
      color 0.2s ease;
  }

  .faq-item:hover .faq-index,
  .faq-item[open] .faq-index {
    color: var(--neb-cyan);
    opacity: 1;
  }

  .faq-item[open] .faq-icon {
    transform: rotate(180deg);
    color: var(--neb-cyan);
  }

  .faq-answer {
    padding: 0 2.25rem 1.4rem 2.5rem;
    animation: faq-open 0.28s ease both;
  }

  @keyframes faq-open {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .faq-answer p {
    font-size: 0.9375rem;
    line-height: 1.7;
    color: var(--text-muted);
    max-width: 62ch;
  }

  @media (min-width: 720px) {
    .faq-question {
      font-size: 1.0625rem;
    }

    .faq-summary {
      padding-block: 1.3rem;
    }

    .faq-answer p {
      font-size: 1rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .faq-answer {
      animation: none;
    }
  }
</style>
