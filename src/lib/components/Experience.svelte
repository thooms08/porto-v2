<script lang="ts">
  import type { Locale } from "$lib/i18n";
  import { t } from "$lib/i18n";
  import { experiences } from "$lib/data/experience";
  import { reveal } from "$lib/actions/reveal";
  import { softHyphenate } from "$lib/utils/hyphenate";

  let { locale }: { locale: Locale } = $props();

  const STACK_RULES: { match: RegExp; stack: string[] }[] = [
    {
      match:
        /diskominfo|kominfo|komunikasi dan informatika|communications? and informatics/,
      stack: ["Laravel", "MySQL", "Bootstrap"],
    },
    {
      match: /supermura/,
      stack: [
        "Laravel",
        "Redis",
        "Alpine.js",
        "jQuery",
        "TailwindCSS",
      ],
    },
    {
      match: /diskominfo|farkatech|supermura/,
      stack: [
        "Laravel",
        "Next.js",
        "SvelteKit",
        "Flutter",
        "MySQL",
        "Redis",
        "TailwindCSS",
        "Bootstrap",
      ],
    },
    {
      match: /it developer/,
      stack: ["Laravel", "jQuery", "MySQL", "Redis", "TailwindCSS"],
    },
  ];

  function stackFor(exp: (typeof experiences)[number]): string[] {
    const haystack = [
      t(exp.role, "en"),
      t(exp.role, "id"),
      t(exp.companyDisplay, "en"),
      t(exp.companyDisplay, "id"),
    ]
      .join(" ")
      .toLowerCase();
    const rule = STACK_RULES.find((r) => r.match.test(haystack));
    return rule ? rule.stack : (exp.technologies ?? []);
  }
</script>

<section id="experience" class="experience-section section-line">
  <div class="container">
    <header class="section-header exp-header" use:reveal>
      <span class="exp-icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="7" width="18" height="13" rx="2.5" />
          <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
          <path d="M3 12.5h18" />
        </svg>
      </span>
      <h2>{t({ en: "Work Experience", id: "Pengalaman Kerja" }, locale)}</h2>
    </header>

    <div class="timeline" role="list">
      {#each experiences as exp, idx}
        {@const stack = stackFor(exp)}
        <article
          class="exp-item"
          role="listitem"
          use:reveal={{ delay: idx * 80 }}
        >
          <!-- titik bintang + garis penghubung -->
          <div class="exp-marker" aria-hidden="true">
            <span class="exp-dot"></span>
          </div>

          <div class="exp-meta">
            <span class="exp-period">{t(exp.period, locale)}</span>
            <span class="exp-type">{t(exp.type, locale)}</span>
          </div>

          <div class="exp-body">
            <h3 class="role-title">{t(exp.role, locale)}</h3>
            <h4 class="company-name">{t(exp.companyDisplay, locale)}</h4>
            <p class="exp-desc" lang={locale}>
              {softHyphenate(t(exp.description, locale), locale)}
            </p>

            {#if stack.length > 0}
              <div class="tech-row" aria-label="Technologies used">
                {#each stack as tech}
                  <span class="chip">{tech}</span>
                {/each}
              </div>
            {/if}
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .exp-icon {
    display: block;
    width: 30px;
    height: 30px;
    margin-bottom: 0.75rem;
    color: var(--neb-cyan);
    filter: drop-shadow(0 0 10px rgba(90, 160, 255, 0.5));
  }

  .exp-icon svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 959px) {
    .exp-header {
      text-align: center;
    }

    .exp-icon {
      margin-inline: auto;
    }
  }

  .timeline {
    max-width: 900px;
  }

  .exp-item {
    display: grid;
    grid-template-columns: 14px minmax(0, 1fr);
    column-gap: 0.9rem;
    grid-template-areas:
      "marker meta"
      "marker body";
  }

  .exp-marker {
    grid-area: marker;
    position: relative;
    display: flex;
    justify-content: center;
  }

  .exp-marker::after {
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

  .exp-item:last-child .exp-marker::after {
    display: none;
  }

  .exp-dot {
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

  .exp-item:hover .exp-dot {
    box-shadow:
      0 0 10px 3px rgba(130, 185, 255, 0.9),
      0 0 26px 8px rgba(120, 90, 255, 0.45);
  }

  .exp-meta {
    grid-area: meta;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.25rem 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    color: var(--text-muted);
    margin-bottom: 0.6rem;
  }

  .exp-period {
    color: var(--neb-cyan);
    font-weight: 600;
  }

  .exp-type::before {
    content: "·";
    margin-right: 0.5rem;
    opacity: 0.6;
  }

  .exp-body {
    grid-area: body;
    min-width: 0;
    padding-bottom: clamp(2rem, 7vw, 2.75rem);
  }

  .exp-item:last-child .exp-body {
    padding-bottom: 0;
  }

  .role-title {
    font-size: 1.0625rem;
    line-height: 1.3;
    color: var(--text);
    margin-bottom: 0.2rem;
    overflow-wrap: anywhere;
  }

  .company-name {
    font-size: 0.9375rem;
    font-weight: 500;
    color: #9db4ff;
    margin-bottom: 0.75rem;
    overflow-wrap: anywhere;
  }

  .exp-desc {
    font-size: 0.9375rem;
    line-height: 1.7;
    color: var(--text-muted);
    max-width: 66ch;
    margin-bottom: 1rem;
    text-align: justify;
    text-justify: inter-word;
    hyphens: auto;
    -webkit-hyphens: auto;
    overflow-wrap: break-word;
  }

  .tech-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }

  .tech-row .chip {
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
    background: transparent;
    border-color: rgba(150, 170, 255, 0.22);
    color: var(--text-muted);
  }

  @media (min-width: 720px) {
    .exp-item {
      grid-template-columns: minmax(8rem, 10.5rem) 14px minmax(0, 1fr);
      column-gap: 1.5rem;
      grid-template-areas: "meta marker body";
    }

    .exp-meta {
      flex-direction: column;
      align-items: flex-end;
      text-align: right;
      margin-bottom: 0;
      padding-top: 0.15rem;
      font-size: 0.8125rem;
    }

    .exp-type::before {
      display: none;
    }

    .role-title {
      font-size: 1.25rem;
    }

    .exp-desc {
      font-size: 1rem;
    }
  }
</style>
