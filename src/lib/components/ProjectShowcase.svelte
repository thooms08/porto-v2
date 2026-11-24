<script lang="ts">
  import type { Locale } from "$lib/i18n";
  import { t } from "$lib/i18n";
  import { projects as allProjects } from "$lib/data/projects";
  import { ui } from "$lib/data/ui";
  import { reveal } from "$lib/actions/reveal";
  import { onMount } from "svelte";

  let { locale }: { locale: Locale } = $props();

  const HIDDEN_PROJECTS = ["mysems", "recomon"];
  const projects = allProjects.filter((p) => {
    const key = `${p.slug} ${p.name}`.toLowerCase();
    return !HIDDEN_PROJECTS.some((hidden) => key.includes(hidden));
  });

  const pad = (n: number) => String(n).padStart(2, "0");

  let activeIndex = $state(0);
  let activeProject = $derived(projects[activeIndex]);

  type ViewportMode = "desktop" | "tablet" | "mobile";
  let viewportMode: ViewportMode = $state("desktop");

  let sectionElement: HTMLElement | null = $state(null);
  let isSectionVisible = $state(false);

  let iframeLoading = $state(false);
  let iframeError = $state(false);
  let reloadKey = $state(0);

  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function setProject(index: number) {
    if (activeIndex === index) return;
    activeIndex = index;
    startLoad();
  }

  function startLoad() {
    iframeLoading = true;
    iframeError = false;
    reloadKey++;

    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (iframeLoading) {
        iframeLoading = false;
        iframeError = true;
      }
    }, 8000);
  }

  function handleIframeLoad() {
    iframeLoading = false;
    if (timeoutId) clearTimeout(timeoutId);
  }

  function handleIframeError() {
    iframeLoading = false;
    iframeError = true;
    if (timeoutId) clearTimeout(timeoutId);
  }

  function reloadPreview() {
    iframeError = false;
    startLoad();
  }

  function handleKeydown(e: KeyboardEvent, index: number) {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setProject((index + 1) % projects.length);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setProject((index - 1 + projects.length) % projects.length);
    }
  }

  onMount(() => {
    if (!sectionElement) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            isSectionVisible = true;
            startLoad();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(sectionElement);
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  });
</script>

<section
  id="projects"
  class="projects-section section-line"
  bind:this={sectionElement}
>
  <div class="container">
    <header class="section-header proj-header" use:reveal>
      <span class="proj-icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      </span>
      <h2>{t({ en: "Featured Projects", id: "Proyek Pilihan" }, locale)}</h2>
    </header>

    <div class="showcase-layout">
      <div
        class="projects-list-col"
        role="tablist"
        aria-label={t(ui.projects.allProjects, locale)}
        use:reveal
      >
        {#each projects as proj, idx}
          <button
            type="button"
            role="tab"
            id={`project-tab-${proj.slug}`}
            aria-selected={activeIndex === idx}
            aria-controls={`project-panel-${proj.slug}`}
            tabindex={activeIndex === idx ? 0 : -1}
            class="project-tab-btn"
            class:active={activeIndex === idx}
            onclick={() => setProject(idx)}
            onkeydown={(e) => handleKeydown(e, idx)}
          >
            <span class="tab-index" aria-hidden="true">{pad(idx + 1)}</span>
            <span class="tab-name">{proj.name}</span>
            <span class="tab-category">{t(proj.category, locale)}</span>
          </button>
        {/each}
      </div>

      <div
        class="projects-detail-col"
        id={`project-panel-${activeProject.slug}`}
        role="tabpanel"
        aria-labelledby={`project-tab-${activeProject.slug}`}
        use:reveal={{ delay: 100 }}
      >
        <div class="browser-frame">
          <header class="browser-bar">
            <div class="browser-dots" aria-hidden="true">
              <span class="browser-dot dot-red"></span>
              <span class="browser-dot dot-yellow"></span>
              <span class="browser-dot dot-green"></span>
            </div>

            <div class="browser-address">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span class="domain-text">{activeProject.displayUrl}</span>
            </div>

            <div class="bar-right">
              <div class="viewport-controls" role="group" aria-label="Viewport">
                <button
                  type="button"
                  class="ctrl-btn"
                  class:active={viewportMode === "desktop"}
                  onclick={() => (viewportMode = "desktop")}
                  aria-label={t(ui.projects.viewportDesktop, locale)}
                  title="Desktop (1280px)"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"
                    ></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </button>
                <button
                  type="button"
                  class="ctrl-btn"
                  class:active={viewportMode === "tablet"}
                  onclick={() => (viewportMode = "tablet")}
                  aria-label={t(ui.projects.viewportTablet, locale)}
                  title="Tablet (820px)"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"
                    ></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                </button>
                <button
                  type="button"
                  class="ctrl-btn"
                  class:active={viewportMode === "mobile"}
                  onclick={() => (viewportMode = "mobile")}
                  aria-label={t(ui.projects.viewportMobile, locale)}
                  title="Mobile (390px)"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"
                    ></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                </button>
              </div>

              <button
                type="button"
                class="ctrl-btn"
                onclick={reloadPreview}
                aria-label={t(ui.projects.reloadPreview, locale)}
                title={t(ui.projects.reloadPreview, locale)}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                </svg>
              </button>

              <a
                href={activeProject.url}
                target="_blank"
                rel="noopener noreferrer"
                class="open-site-btn"
                aria-label={`${t(ui.projects.openSite, locale)}: ${activeProject.name}`}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
                <span class="open-label">{t(ui.projects.openSite, locale)}</span
                >
              </a>
            </div>
          </header>

          <div
            class="browser-viewport-stage"
            class:tablet-mode={viewportMode === "tablet"}
            class:mobile-mode={viewportMode === "mobile"}
          >
            {#if isSectionVisible}
              {#if !iframeError}
                {#key `${activeProject.slug}-${reloadKey}`}
                  <div class="iframe-wrap">
                    {#if iframeLoading}
                      <div class="skeleton-overlay" aria-busy="true">
                        <div class="spinner"></div>
                        <span>Loading preview…</span>
                      </div>
                    {/if}
                    <iframe
                      src={activeProject.url}
                      title={`Live preview of ${activeProject.name}`}
                      loading="lazy"
                      referrerpolicy="no-referrer"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                      onload={handleIframeLoad}
                      onerror={handleIframeError}
                      class="preview-iframe"
                    ></iframe>
                  </div>
                {/key}
              {:else}
                <div class="fallback-wrap">
                  <img
                    src={activeProject.screenshot}
                    alt="Preview of {activeProject.name}"
                    width="1280"
                    height="800"
                    loading="lazy"
                    class="fallback-img"
                  />
                  <div class="fallback-bar">
                    <span class="fallback-msg">
                      {t(ui.projects.fallbackNotice, locale)}
                    </span>
                    <a
                      href={activeProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="fallback-cta"
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                      <span>{t(ui.projects.openSite, locale)}</span>
                    </a>
                  </div>
                </div>
              {/if}
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .proj-icon {
    display: block;
    width: 30px;
    height: 30px;
    margin-bottom: 0.75rem;
    color: var(--neb-cyan);
    filter: drop-shadow(0 0 10px rgba(90, 160, 255, 0.5));
  }

  .proj-icon svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 959px) {
    .proj-header {
      text-align: center;
    }

    .proj-icon {
      margin-inline: auto;
    }
  }

  .showcase-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(1.25rem, 4vw, 2rem);
    align-items: start;
  }

  @media (min-width: 1024px) {
    .showcase-layout {
      grid-template-columns: 300px minmax(0, 1fr);
      gap: 2.5rem;
    }
  }

  .projects-list-col {
    display: flex;
    flex-direction: column;
    max-height: 580px;
    overflow-y: auto;
    min-width: 0;
    scrollbar-width: thin;
    scrollbar-color: var(--border-strong) transparent;
  }

  .projects-list-col::-webkit-scrollbar {
    width: 3px;
  }
  .projects-list-col::-webkit-scrollbar-track {
    background: transparent;
  }
  .projects-list-col::-webkit-scrollbar-thumb {
    background: var(--border-strong);
    border-radius: 3px;
  }

  .projects-list-col::after {
    content: "";
    flex-shrink: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(150, 170, 255, 0.24),
      rgba(150, 170, 255, 0.03)
    );
  }

  .project-tab-btn {
    position: relative;
    display: grid;
    grid-template-columns: 2rem minmax(0, 1fr);
    column-gap: 0.5rem;
    row-gap: 0.15rem;
    align-items: baseline;
    text-align: left;
    width: 100%;
    padding: 0.95rem 0.5rem 0.95rem 0.75rem;
    background: transparent;
    border: 0;
    border-top: 1px solid transparent;
    border-image: linear-gradient(
        90deg,
        rgba(150, 170, 255, 0.24),
        rgba(150, 170, 255, 0.03)
      )
      1;
    color: inherit;
    cursor: pointer;
    flex-shrink: 0;
    transition: background-color 0.25s ease;
  }

  .tab-index {
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

  .tab-name {
    grid-column: 2;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-muted);
    overflow-wrap: anywhere;
    transition: color 0.2s ease;
  }

  .tab-category {
    grid-column: 2;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    opacity: 0.8;
    transition: color 0.2s ease;
  }

  .project-tab-btn:hover .tab-name {
    color: var(--text);
  }

  .project-tab-btn.active {
    background: linear-gradient(
      90deg,
      rgba(120, 140, 255, 0.09),
      transparent 80%
    );
  }

  .project-tab-btn.active .tab-name {
    color: var(--text);
  }

  .project-tab-btn.active .tab-index {
    color: var(--neb-cyan);
    opacity: 1;
  }

  .project-tab-btn.active .tab-category {
    color: var(--neb-cyan);
    opacity: 1;
  }

  .project-tab-btn.active::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.8rem;
    bottom: 0.8rem;
    width: 2px;
    border-radius: 2px;
    background: linear-gradient(to bottom, #7fb0ff, #7b5cff);
    box-shadow: 0 0 10px rgba(110, 140, 255, 0.7);
  }

  .projects-detail-col {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .browser-frame {
    background: rgba(9, 14, 38, 0.6);
    border: 1px solid rgba(150, 170, 255, 0.22);
    border-radius: var(--radius-xl);
    overflow: hidden;
    box-shadow:
      0 30px 80px -30px rgba(0, 0, 0, 0.8),
      0 0 70px -35px rgba(91, 124, 255, 0.5);
  }

  .browser-bar {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.5rem 0.875rem;
    background: rgba(7, 11, 30, 0.9);
    border-bottom: 1px solid rgba(150, 170, 255, 0.14);
    min-height: 46px;
  }

  .browser-dots {
    display: flex;
    gap: 0.3rem;
    flex-shrink: 0;
  }

  .browser-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: rgba(150, 170, 255, 0.28);
  }

  .browser-address {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.75rem;
    background: rgba(120, 140, 255, 0.07);
    border: 1px solid rgba(150, 170, 255, 0.18);
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    color: var(--text-muted);
    flex: 1;
    min-width: 0;
    overflow: hidden;
  }

  .domain-text {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  /* Right cluster */
  .bar-right {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    flex-shrink: 0;
  }

  .viewport-controls {
    display: none;
    align-items: center;
    gap: 2px;
    padding: 2px;
    background: rgba(120, 140, 255, 0.07);
    border: 1px solid rgba(150, 170, 255, 0.18);
    border-radius: 999px;
  }

  @media (min-width: 640px) {
    .viewport-controls {
      display: flex;
    }
  }

  .ctrl-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.3rem 0.45rem;
    background: transparent;
    border: none;
    border-radius: 999px;
    color: var(--text-muted);
    cursor: pointer;
    transition:
      background 0.2s ease,
      color 0.15s ease,
      box-shadow 0.2s ease;
    min-width: 28px;
    min-height: 28px;
  }

  .ctrl-btn:hover {
    color: var(--text);
    background: rgba(120, 140, 255, 0.14);
  }
  .ctrl-btn.active {
    color: #fff;
    background-image: linear-gradient(120deg, #4f6cff 0%, #7b5cff 100%);
    box-shadow: 0 4px 12px -4px rgba(91, 100, 255, 0.7);
  }

  .open-site-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.3rem 0.7rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text);
    border: 1px solid rgba(150, 170, 255, 0.28);
    border-radius: 999px;
    background: rgba(120, 140, 255, 0.08);
    text-decoration: none;
    white-space: nowrap;
    transition:
      border-color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.25s ease;
    min-height: 28px;
  }

  .open-site-btn:hover {
    border-color: rgba(170, 190, 255, 0.55);
    background: rgba(120, 140, 255, 0.16);
    box-shadow: 0 0 18px -4px rgba(110, 130, 255, 0.55);
  }

  .open-label {
    display: none;
  }

  @media (min-width: 480px) {
    .open-label {
      display: inline;
    }
  }

  .browser-viewport-stage {
    position: relative;
    width: 100%;
    height: clamp(300px, 48vw, 540px);
    background: var(--bg);
    overflow: hidden;
    display: flex;
    align-items: stretch;
    justify-content: center;
  }

  .iframe-wrap {
    width: 100%;
    height: 100%;
    position: relative;
    transition: width 0.3s ease;
  }

  .browser-viewport-stage.tablet-mode .iframe-wrap {
    width: 820px;
    max-width: 100%;
  }
  .browser-viewport-stage.mobile-mode .iframe-wrap {
    width: 390px;
    max-width: 100%;
  }

  .preview-iframe {
    width: 100%;
    height: 100%;
    border: none;
    background: #fff;
    display: block;
  }

  .skeleton-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.875rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    z-index: 2;
  }

  .spinner {
    width: 26px;
    height: 26px;
    border: 2px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .fallback-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .fallback-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
  }

  .fallback-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: linear-gradient(
      to top,
      rgba(5, 8, 22, 0.95) 0%,
      rgba(5, 8, 22, 0.6) 70%,
      transparent 100%
    );
  }

  .fallback-msg {
    font-size: 0.8rem;
    color: var(--text-muted);
    line-height: 1.35;
    flex: 1;
    min-width: 0;
  }

  .fallback-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
    font-weight: 600;
    white-space: nowrap;
    color: #fff;
    background-image: linear-gradient(120deg, #4f6cff 0%, #7b5cff 100%);
    border-radius: 999px;
    text-decoration: none;
    flex-shrink: 0;
    box-shadow: 0 6px 18px -6px rgba(91, 100, 255, 0.65);
    transition:
      filter 0.2s ease,
      box-shadow 0.25s ease;
  }

  .fallback-cta:hover {
    filter: brightness(1.1);
    box-shadow: 0 8px 24px -4px rgba(110, 100, 255, 0.85);
  }
</style>
