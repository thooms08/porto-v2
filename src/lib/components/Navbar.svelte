<script lang="ts">
  import type { Locale } from "$lib/i18n";
  import { t } from "$lib/i18n";
  import { ui } from "$lib/data/ui";
  import { siteConfig } from "$lib/data/site";
  import { onMount } from "svelte";

  let { locale }: { locale: Locale } = $props();

  let isScrolled = $state(false);
  let sidebarOpen = $state(false);
  let activeSection = $state("home");
  let fabEl: HTMLButtonElement | undefined = $state();

  const navItems = [
    { href: "#home", label: () => t(ui.nav.home, locale), icon: "home" },
    { href: "#about", label: () => t(ui.nav.about, locale), icon: "user" },
    {
      href: "#experience",
      label: () => t(ui.nav.experience, locale),
      icon: "briefcase",
    },
    {
      href: "#projects",
      label: () => t(ui.nav.projects, locale),
      icon: "grid",
    },
    { href: "#skills", label: () => t(ui.nav.skills, locale), icon: "zap" },
    {
      href: "#certificates",
      label: () => t(ui.nav.certificates, locale),
      icon: "award",
    },
    {
      href: "#education",
      label: () => t(ui.nav.education, locale),
      icon: "book",
    },
    {
      href: "#dokumentasi",
      label: () => (locale === "id" ? "Dokumentasi" : "Gallery"),
      icon: "camera",
    },
    { href: "#faq", label: () => t(ui.nav.faq, locale), icon: "help" },
    { href: "#contact", label: () => t(ui.nav.contact, locale), icon: "mail" },
  ] as const;

  type IconName =
    | "home"
    | "user"
    | "briefcase"
    | "grid"
    | "zap"
    | "award"
    | "book"
    | "help"
    | "mail"
    | "camera";

  const icons: Record<IconName, string> = {
    home: '<polyline points="3 9 12 2 21 9"/><polyline points="9 22 9 12 15 12 15 22"/><rect x="3" y="9" width="18" height="13" rx="1" ry="1" fill="none"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    briefcase:
      '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    award:
      '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    camera:
      '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  };

  function openSidebar() {
    sidebarOpen = true;
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    sidebarOpen = false;
    document.body.style.overflow = "";
    fabEl?.focus();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" && sidebarOpen) closeSidebar();
  }

  function handleOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains("sidebar-overlay")) {
      closeSidebar();
    }
  }

  onMount(() => {
    const onScroll = () => {
      isScrolled = window.scrollY > 20;
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      const scrollPos = window.scrollY + 100;
      sections.forEach((s) => {
        if (
          scrollPos >= s.offsetTop &&
          scrollPos < s.offsetTop + s.offsetHeight
        ) {
          activeSection = s.id;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", handleKeydown);
    };
  });

  let targetEnUrl = $derived(
    `/${activeSection && activeSection !== "home" ? "#" + activeSection : ""}`,
  );
  let targetIdUrl = $derived(
    `/id/${activeSection && activeSection !== "home" ? "#" + activeSection : ""}`,
  );
  let cvFile = $derived(`/downloads/${t(ui.downloads.cvFilename, locale)}`);
  let portfolioFile = $derived(
    `/downloads/${t(ui.downloads.portfolioFilename, locale)}`,
  );
</script>

<header class="topbar" class:scrolled={isScrolled}>
  <div class="container topbar-inner">
    <div class="topbar-pill">
      <a
        href={locale === "id" ? "/id/" : "/"}
        class="logo"
        aria-label="Thomas Lefvi Baehaqi"
      >
        <span class="logo-mark">THOMAS LEFVI BAEHAQI</span>
      </a>

      <div
        class="lang-switch"
        role="group"
        aria-label={t({ en: "Language", id: "Bahasa" }, locale)}
      >
        <a
          href={targetEnUrl}
          class="lang-btn"
          class:active={locale === "en"}
          hreflang="en">EN</a
        >
        <a
          href={targetIdUrl}
          class="lang-btn"
          class:active={locale === "id"}
          hreflang="id">ID</a
        >
      </div>
    </div>
  </div>
</header>

<button
  bind:this={fabEl}
  class="nav-fab"
  class:fab-open={sidebarOpen}
  onclick={sidebarOpen ? closeSidebar : openSidebar}
  aria-expanded={sidebarOpen}
  aria-label={sidebarOpen
    ? t(ui.nav.closeMenu, locale)
    : t(ui.nav.menu, locale)}
  aria-controls="nav-sidebar"
>
  {#if sidebarOpen}
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  {:else}
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
      <line x1="4" y1="8" x2="20" y2="8" />
      <line x1="4" y1="14" x2="14" y2="14" />
      <line x1="4" y1="20" x2="17" y2="20" />
    </svg>
  {/if}
</button>

{#if sidebarOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="sidebar-overlay" onclick={handleOverlayClick}>
    <!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
    <nav
      id="nav-sidebar"
      class="sidebar-panel"
      role="dialog"
      aria-modal="true"
      aria-label={t(ui.nav.menu, locale)}
    >
      <!-- Panel header -->
      <div class="sidebar-header">
        <span class="sidebar-label">
          <span class="sidebar-label-dot" aria-hidden="true"></span>
          {t({ en: "Navigation", id: "Navigasi" }, locale)}
        </span>
      </div>

      <!-- Nav links -->
      <ul class="sidebar-links" role="list">
        {#each navItems as item, i}
          <li style="--i: {i}">
            <a
              href={item.href}
              class="sidebar-link"
              class:active={activeSection === item.href.slice(1)}
              onclick={closeSidebar}
            >
              <span class="sidebar-icon" aria-hidden="true">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {@html icons[item.icon]}
                </svg>
              </span>
              <span class="sidebar-link-label">{item.label()}</span>
              {#if activeSection === item.href.slice(1)}
                <span class="active-dot" aria-hidden="true"></span>
              {/if}
            </a>
          </li>
        {/each}
      </ul>

      <!-- Footer row: download CV + Portfolio -->
      <div class="sidebar-footer">
        <a
          href={cvFile}
          download
          class="btn btn-primary sidebar-cv-btn"
          onclick={closeSidebar}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {t(ui.downloads.cvBtn, locale)}
        </a>
        <a
          href={portfolioFile}
          download
          class="btn btn-secondary sidebar-cv-btn"
          onclick={closeSidebar}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {t(ui.downloads.portfolioBtn, locale)}
        </a>
      </div>
    </nav>
  </div>
{/if}

<style>
  .topbar {
    position: sticky;
    top: 0;
    z-index: 100;
    height: var(--header-height);
    padding-top: 8px;
    pointer-events: none;
  }

  .topbar-inner {
    height: 48px;
    pointer-events: auto;
  }

  .topbar-pill {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0 6px 0 8px;
    border-radius: 999px;
    background: rgba(9, 14, 38, 0.5);
    border: 1px solid rgba(150, 170, 255, 0.18);
    -webkit-backdrop-filter: blur(16px) saturate(140%);
    backdrop-filter: blur(16px) saturate(140%);
    box-shadow:
      0 10px 32px -12px rgba(0, 0, 0, 0.65),
      0 0 44px -20px rgba(91, 124, 255, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
    transition:
      margin 0.3s ease,
      background 0.25s ease,
      border-color 0.25s ease,
      box-shadow 0.25s ease;
  }

  .topbar.scrolled .topbar-pill {
    margin-inline: clamp(0px, 1.6vw, 14px);
    background: rgba(7, 11, 30, 0.82);
    border-color: rgba(150, 170, 255, 0.28);
  }

  .logo {
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
    font-weight: 700;
    color: var(--text);
    min-width: 0;
  }

  .logo-mark {
    flex: none;
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    font-weight: 700;
    color: #dfe6ff;
    padding: 0.3rem 0.65rem;
    border: 1px solid rgba(150, 170, 255, 0.35);
    border-radius: 999px;
    background: rgba(91, 124, 255, 0.14);
    box-shadow: 0 0 16px -3px rgba(91, 124, 255, 0.6);
  }

  .lang-switch {
    flex: none;
    display: flex;
    align-items: center;
    gap: 2px;
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    padding: 3px;
    border: 1px solid rgba(150, 170, 255, 0.2);
    border-radius: 999px;
    background: rgba(120, 140, 255, 0.07);
  }

  .lang-btn {
    color: var(--text-muted);
    font-weight: 600;
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    transition:
      color 0.15s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;
  }

  .lang-btn:hover {
    color: var(--text);
  }

  .lang-btn.active {
    color: #fff;
    background-image: linear-gradient(120deg, #4f6cff 0%, #7b5cff 100%);
    box-shadow:
      0 4px 14px -4px rgba(91, 100, 255, 0.7),
      inset 0 1px 0 rgba(255, 255, 255, 0.22);
  }

  .nav-fab {
    position: fixed;
    bottom: clamp(20px, 4vw, 32px);
    right: clamp(20px, 4vw, 32px);
    z-index: 300;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 1px solid rgba(170, 190, 255, 0.4);
    background-image: linear-gradient(135deg, #4f6cff 0%, #7b5cff 100%);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 8px 28px -6px rgba(91, 100, 255, 0.7),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
    transition:
      transform 0.2s ease,
      box-shadow 0.25s ease,
      filter 0.2s ease;
  }

  .nav-fab:hover {
    transform: scale(1.08);
    filter: brightness(1.1);
    box-shadow:
      0 10px 34px -4px rgba(110, 100, 255, 0.85),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .nav-fab.fab-open {
    box-shadow:
      0 8px 30px -4px rgba(123, 92, 255, 0.85),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .nav-fab:active {
    transform: scale(0.96);
  }

  .sidebar-overlay {
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(4, 6, 20, 0.55);
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
    animation: overlay-in 0.25s ease forwards;
  }

  @keyframes overlay-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .sidebar-panel {
    position: absolute;
    top: 12px;
    left: 12px;
    bottom: 12px;
    width: min(320px, calc(100vw - 24px));
    border-radius: 22px;
    background: radial-gradient(
        ellipse 120% 38% at 0% 0%,
        rgba(120, 90, 255, 0.28),
        transparent 65%
      ),
      radial-gradient(
        ellipse 110% 34% at 100% 100%,
        rgba(60, 130, 255, 0.18),
        transparent 65%
      ),
      rgba(8, 12, 34, 0.8);
    -webkit-backdrop-filter: blur(22px) saturate(140%);
    backdrop-filter: blur(22px) saturate(140%);
    border: 1px solid rgba(150, 170, 255, 0.22);
    box-shadow:
      0 30px 80px -20px rgba(0, 0, 0, 0.75),
      0 0 70px -30px rgba(91, 124, 255, 0.55),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
    display: flex;
    flex-direction: column;
    padding: clamp(18px, 4vw, 24px);
    gap: 0;
    animation: panel-in 0.38s cubic-bezier(0.2, 0.7, 0.2, 1) both;
    overflow-y: auto;
    scrollbar-width: none;
    overscroll-behavior: contain;
  }

  .sidebar-panel::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 520px) {
    .sidebar-panel {
      bottom: calc(clamp(20px, 4vw, 32px) + 52px + 14px);
    }
  }

  @keyframes panel-in {
    from {
      opacity: 0;
      transform: translateX(-28px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  .sidebar-header {
    margin-bottom: 1.25rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(150, 170, 255, 0.14);
  }

  .sidebar-label {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #7fb0ff;
  }

  .sidebar-label-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #7fb0ff;
    box-shadow:
      0 0 8px 2px rgba(110, 170, 255, 0.75),
      0 0 20px 6px rgba(120, 90, 255, 0.35);
  }

  .sidebar-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }

  .sidebar-links li {
    animation: item-in 0.42s cubic-bezier(0.2, 0.7, 0.2, 1) both;
    animation-delay: calc(90ms + var(--i, 0) * 40ms);
  }

  @keyframes item-in {
    from {
      opacity: 0;
      transform: translateX(-12px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .sidebar-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.4rem 0.9rem 0.4rem 0.45rem;
    border-radius: 999px;
    border: 1px solid transparent;
    color: var(--text-muted);
    font-size: 0.9375rem;
    font-weight: 500;
    text-decoration: none;
    position: relative;
    transition:
      background 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.25s ease;
  }

  .sidebar-link:hover {
    background: rgba(120, 140, 255, 0.1);
    color: var(--text);
  }

  .sidebar-link.active {
    color: #fff;
    border-color: rgba(150, 170, 255, 0.3);
    background-image: linear-gradient(
      120deg,
      rgba(79, 108, 255, 0.3),
      rgba(123, 92, 255, 0.2)
    );
    box-shadow: 0 6px 22px -10px rgba(91, 100, 255, 0.7);
  }

  .sidebar-icon {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(120, 140, 255, 0.1);
    color: #b9c6ff;
    transition:
      background 0.2s ease,
      color 0.2s ease;
  }

  .sidebar-link.active .sidebar-icon {
    color: #fff;
    background-image: linear-gradient(135deg, #4f6cff 0%, #7b5cff 100%);
    box-shadow: 0 0 14px -2px rgba(110, 120, 255, 0.8);
  }

  .sidebar-link-label {
    flex: 1;
  }

  .active-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #9db4ff;
    box-shadow: 0 0 8px 2px rgba(110, 150, 255, 0.7);
    flex-shrink: 0;
  }

  .sidebar-footer {
    padding-top: 1.1rem;
    margin-top: 1.1rem;
    border-top: 1px solid rgba(150, 170, 255, 0.14);
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .sidebar-cv-btn {
    width: 100%;
    justify-content: center;
    font-size: 0.875rem;
    border-radius: 999px;
    color: #fff;
    border: 1px solid rgba(160, 180, 255, 0.35);
    background-image: linear-gradient(120deg, #4f6cff 0%, #7b5cff 100%);
    box-shadow:
      0 6px 22px -6px rgba(91, 100, 255, 0.65),
      inset 0 1px 0 rgba(255, 255, 255, 0.22);
    transition:
      transform 0.2s ease,
      box-shadow 0.25s ease,
      filter 0.2s ease;
  }

  .sidebar-cv-btn:hover {
    transform: translateY(-1px);
    filter: brightness(1.08);
    box-shadow:
      0 10px 30px -4px rgba(110, 100, 255, 0.85),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  @media (prefers-reduced-motion: reduce) {
    .sidebar-overlay {
      animation: none;
    }
    .sidebar-panel,
    .sidebar-links li {
      animation: none;
    }
    .nav-fab,
    .topbar-pill {
      transition: none;
    }
  }
</style>
