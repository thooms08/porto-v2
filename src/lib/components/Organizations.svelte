<script lang="ts">
  import type { Locale } from "$lib/i18n";
  import { t } from "$lib/i18n";
  import { organizations } from "$lib/data/organizations";
  import { ui } from "$lib/data/ui";
  import { reveal } from "$lib/actions/reveal";

  let { locale }: { locale: Locale } = $props();

  const leadership = organizations.filter((o) => o.type === "leadership");
  const activities = organizations.filter((o) => o.type === "activity");

  const title = $derived(t(ui.education.organizationsTitle, locale));
  const subtitle = $derived(t(ui.education.organizationsSubtitle, locale));

  const groups = [
    { title: ui.education.leadershipTitle, items: leadership },
    { title: ui.education.activitiesTitle, items: activities },
  ].filter((g) => g.items.length > 0);
</script>

<section id="organizations" class="organizations-section section-line">
  <div class="container">
    <header class="section-header org-header" use:reveal>
      <span class="org-icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </span>
      <h2>{t(ui.education.organizationsTitle, locale)}</h2>
      {#if subtitle && subtitle !== title}
        <p class="org-sub">{subtitle}</p>
      {/if}
    </header>

    <div class="org-layout">
      {#each groups as group, gi}
        <div class="org-group" use:reveal={{ delay: gi * 100 }}>
          <h3 class="group-title">{t(group.title, locale)}</h3>
          <ul class="org-list">
            {#each group.items as item}
              <li class="org-row">
                <div class="org-info">
                  <h4 class="org-role">{t(item.role, locale)}</h4>
                  <span class="org-inst">{item.institution}</span>
                </div>
                <span class="org-period">{item.period}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .org-icon {
    display: block;
    width: 30px;
    height: 30px;
    margin-bottom: 0.75rem;
    color: var(--neb-cyan);
    filter: drop-shadow(0 0 10px rgba(90, 160, 255, 0.5));
  }

  .org-icon svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .org-sub {
    font-size: 1rem;
    color: var(--text-muted);
    max-width: 60ch;
  }

  @media (max-width: 959px) {
    .org-header {
      text-align: center;
    }

    .org-icon,
    .org-sub {
      margin-inline: auto;
    }
  }

  .org-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(2rem, 6vw, 3rem);
  }

  @media (min-width: 900px) {
    .org-layout {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: clamp(3rem, 6vw, 5rem);
    }
  }

  .org-group {
    min-width: 0;
  }

  .group-title {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 1rem;
  }

  .org-list {
    list-style: none;
    display: flex;
    flex-direction: column;
  }

  .org-list::after {
    content: "";
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(150, 170, 255, 0.24),
      rgba(150, 170, 255, 0.03)
    );
  }

  .org-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      "period"
      "info";
    gap: 0.4rem;
    padding-block: 1.1rem;
    border-top: 1px solid transparent;
    border-image: linear-gradient(
        90deg,
        rgba(150, 170, 255, 0.24),
        rgba(150, 170, 255, 0.03)
      )
      1;
  }

  .org-info {
    grid-area: info;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
  }

  .org-role {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.35;
    color: var(--text);
    overflow-wrap: anywhere;
  }

  .org-inst {
    font-size: 0.875rem;
    color: var(--text-muted);
    overflow-wrap: anywhere;
  }

  .org-period {
    grid-area: period;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    font-weight: 600;
    color: var(--neb-cyan);
  }

  @media (min-width: 560px) {
    .org-row {
      grid-template-columns: minmax(0, 1fr) auto;
      grid-template-areas: "info period";
      column-gap: 1.5rem;
      align-items: baseline;
    }

    .org-period {
      white-space: nowrap;
      text-align: right;
    }
  }
</style>
