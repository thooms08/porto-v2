<script lang="ts">
  import type { Locale } from "$lib/i18n";
  import { t } from "$lib/i18n";
  import { siteConfig } from "$lib/data/site";
  import { onMount, onDestroy, tick } from "svelte";

  let { locale }: { locale: Locale } = $props();

  const slides = [
    {
      photo: "/foto-diri.webp",
      photoAlt: "Thomas Lefvi Baehaqi",
      tagline: {
        en: "Building digital products\nthat solve real problems.",
        id: "Membangun produk digital\nyang memecahkan masalah nyata.",
      },
      sub: {
        en: "Fullstack Web Developer · Karawang, Indonesia",
        id: "Fullstack Web Developer · Karawang, Indonesia",
      },
      photoSide: "right" as const,
    },
    {
      photo: "/foto-diri-2.webp",
      photoAlt: "Thomas Lefvi Baehaqi",
      tagline: {
        en: "I build web apps\nfor real businesses.",
        id: "Saya membangun aplikasi web\nuntuk bisnis nyata.",
      },
      sub: {
        en: "Fullstack Web Developer with Team Leadership capability",
        id: "Fullstack Web Developer dengan kemampuan Team Leadership",
      },
      photoSide: "left" as const,
    },
  ] as const;

  type SlideIndex = 0 | 1;

  let current = $state<SlideIndex>(0);
  let direction = $state<1 | -1>(1);
  let phase = $state<"idle" | "exit" | "enter">("idle");
  let pending = $state<SlideIndex | null>(null);

  let mouseX = $state(0);
  let mouseY = $state(0);
  let heroEl: HTMLElement | undefined = $state();
  let nebulaCanvas: HTMLCanvasElement | undefined = $state();
  let nebulaWrap: HTMLDivElement | undefined = $state();
  let photoWrapEl: HTMLDivElement | undefined = $state();
  let photoImg: HTMLImageElement | undefined = $state();
  let textEl: HTMLDivElement | undefined = $state();
  let rafId = 0;
  let nebulaBoost = 1;
  let interval: ReturnType<typeof setInterval> | undefined;

  const SLIDE_DURATION = 420;

  type NebState = { x: number; y: number; o: number; s: number };
  let neb: NebState = { x: 0, y: 0, o: 1, s: 1 };
  let nebAnim: Animation | undefined;
  let reducedMotion = false;
  let isMobile = $state(false);

  const NEBULA_PER_SLIDE = [
    { s: 1, dy: 0 },
    { s: 0.85, dy: 0.07 },
  ] as const;

  function nebulaRest(index: SlideIndex, o = 1, swell = 1): NebState {
    const cfg = NEBULA_PER_SLIDE[index];
    const h = nebulaWrap?.offsetHeight ?? 0;
    return { x: 0, y: cfg.dy * h, o, s: cfg.s * swell };
  }

  function nebulaTo(target: NebState, duration: number) {
    if (!nebulaWrap) return;
    const frame = (v: NebState) => ({
      opacity: v.o,
      transform: `translate(${v.x}px, ${v.y}px) scale(${v.s})`,
    });
    const anim = nebulaWrap.animate([frame(neb), frame(target)], {
      duration: reducedMotion ? 0 : duration,
      easing: "cubic-bezier(0.45, 0, 0.2, 1)",
      fill: "forwards",
    });
    nebAnim?.cancel();
    nebAnim = anim;
    neb = { ...target };
  }

  function glide(el: HTMLElement | undefined, dx: number, dy: number) {
    if (!el || reducedMotion || (!dx && !dy)) return;
    el.animate([{ translate: `${dx}px ${dy}px` }, { translate: "0px 0px" }], {
      duration: SLIDE_DURATION * 2,
      easing: "cubic-bezier(0.45, 0, 0.2, 1)",
    });
  }

  function goTo(next: SlideIndex) {
    if (phase !== "idle" || next === current) return;
    direction = next > current ? 1 : -1;
    pending = next;
    phase = "exit";
    nebulaTo(nebulaRest(current, 0.55, 1.06), SLIDE_DURATION);
    setTimeout(async () => {
      const before = nebulaWrap?.getBoundingClientRect();
      const photoBefore = photoWrapEl?.getBoundingClientRect();
      const textBeforeTop = textEl?.offsetTop ?? 0;
      const textBeforeLeft = textEl?.offsetLeft ?? 0;
      current = next;
      pending = null;
      phase = "enter";
      await tick();
      const after = nebulaWrap?.getBoundingClientRect();
      if (before && after) {
        const bcx = before.left + before.width / 2;
        const bcy = before.top + before.height / 2;
        const acx = after.left + after.width / 2;
        const acy = after.top + after.height / 2;
        neb = {
          ...neb,
          x: neb.x + (bcx - acx),
          y: neb.y + (bcy - acy),
          s: after.width ? neb.s * (before.width / after.width) : neb.s,
        };
      }
      if (isMobile) {
        const photoAfter = photoWrapEl?.getBoundingClientRect();
        if (photoBefore && photoAfter) {
          glide(
            photoImg,
            photoBefore.left - photoAfter.left,
            photoBefore.top - photoAfter.top,
          );
        }
        if (textEl) {
          glide(
            textEl,
            textBeforeLeft - textEl.offsetLeft,
            textBeforeTop - textEl.offsetTop,
          );
        }
      }
      nebulaTo(nebulaRest(next, 1, 1), SLIDE_DURATION * 2);
      setTimeout(() => {
        phase = "idle";
      }, SLIDE_DURATION);
    }, SLIDE_DURATION);
  }

  function nextSlide() {
    goTo(((current + 1) % slides.length) as SlideIndex);
  }

  function handleMouseMove(e: MouseEvent) {
    if (!heroEl) return;
    const rect = heroEl.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  }

  function handleMouseLeave() {
    mouseX = 0;
    mouseY = 0;
  }

  let shadowStyle = $derived(
    `filter: drop-shadow(${(-mouseX * 20).toFixed(1)}px ${(mouseY * 16 + 28).toFixed(1)}px 36px rgba(5,10,40,0.85)) drop-shadow(${(-mouseX * 9).toFixed(1)}px ${(mouseY * 7 + 14).toFixed(1)}px 20px rgba(91,124,255,0.25));`,
  );

  let textStyle = $derived.by(() => {
    const axis = isMobile ? "Y" : "X";
    const out = direction === 1 ? "-40px" : "40px";
    const into = direction === 1 ? "40px" : "-40px";
    if (phase === "exit")
      return `opacity:0; transform:translate${axis}(${out})`;
    if (phase === "enter")
      return `opacity:0; transform:translate${axis}(${into})`;
    return "opacity:1; transform:translate(0, 0)";
  });

  let photoStyle = $derived.by(() => {
    const base = shadowStyle;
    const axis = isMobile ? "Y" : "X";
    const out = direction === 1 ? "30px" : "-30px";
    const into = direction === 1 ? "-30px" : "30px";
    if (phase === "exit")
      return `${base} opacity:0; transform:translate${axis}(${out}) scale(0.97)`;
    if (phase === "enter")
      return `${base} opacity:0; transform:translate${axis}(${into}) scale(0.97)`;
    return `${base} opacity:1; transform:translate(0, 0) scale(1)`;
  });

  $effect(() => {
    nebulaBoost = phase === "idle" ? 1 : 2.6;
  });

  const TRANSITION = `transition: opacity ${SLIDE_DURATION}ms cubic-bezier(0.4,0,0.2,1), transform ${SLIDE_DURATION}ms cubic-bezier(0.4,0,0.2,1);`;

  type Blob = {
    x: number;
    y: number;
    r: number;
    ax: number;
    ay: number;
    speed: number;
    phase: number;
    color: string;
    alpha: number;
    glow: boolean;
  };
  type Star = { x: number; y: number; s: number; speed: number; phase: number };

  function startNebula(
    canvas: HTMLCanvasElement,
    animate: boolean,
    getBoost: () => number,
  ) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return () => {};
    const W = (canvas.width = 760);
    const H = (canvas.height = 300);

    const palette = [
      "70,100,255",
      "120,80,255",
      "60,170,255",
      "190,100,255",
      "40,60,190",
    ];
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const blobs: Blob[] = [];

    const baseColors = ["40,60,190", "70,55,190", "30,50,160", "85,65,200"];
    for (let i = 0; i < 22; i++) {
      blobs.push({
        x: rand(0.0, 1.0) * W,
        y: rand(0.68, 1.05) * H,
        r: rand(110, 190),
        ax: rand(25, 60),
        ay: rand(6, 18),
        speed: rand(0.25, 0.55),
        phase: rand(0, Math.PI * 2),
        color: baseColors[i % baseColors.length],
        alpha: rand(0.8, 1),
        glow: false,
      });
    }
    for (let i = 0; i < 14; i++) {
      blobs.push({
        x: rand(0.05, 0.95) * W,
        y: rand(0.4, 0.8) * H,
        r: rand(80, 150),
        ax: rand(30, 90),
        ay: rand(14, 36),
        speed: rand(0.3, 0.75),
        phase: rand(0, Math.PI * 2),
        color: palette[i % palette.length],
        alpha: rand(0.5, 0.75),
        glow: false,
      });
    }
    for (let i = 0; i < 24; i++) {
      blobs.push({
        x: rand(0.05, 0.95) * W,
        y: rand(0.3, 0.95) * H,
        r: rand(65, 135),
        ax: rand(30, 90),
        ay: rand(12, 34),
        speed: rand(0.3, 0.85),
        phase: rand(0, Math.PI * 2),
        color: palette[i % palette.length],
        alpha: rand(0.35, 0.6),
        glow: true,
      });
    }

    const stars: Star[] = Array.from({ length: 46 }, () => ({
      x: rand(0.05, 0.95) * W,
      y: rand(0.25, 0.95) * H,
      s: rand(0.6, 1.6),
      speed: rand(0.8, 2.2),
      phase: rand(0, Math.PI * 2),
    }));

    function draw(time: number) {
      const t = time / 1000;
      ctx!.clearRect(0, 0, W, H);

      for (const b of blobs) {
        const x = b.x + Math.sin(t * b.speed + b.phase) * b.ax;
        const y = b.y + Math.cos(t * b.speed * 0.8 + b.phase) * b.ay;
        const r = b.r * (1 + 0.08 * Math.sin(t * b.speed * 0.6 + b.phase));
        const g = ctx!.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${b.color},${b.alpha})`);
        g.addColorStop(0.5, `rgba(${b.color},${b.alpha * 0.45})`);
        g.addColorStop(1, `rgba(${b.color},0)`);
        ctx!.globalCompositeOperation = b.glow ? "lighter" : "source-over";
        ctx!.fillStyle = g;
        ctx!.fillRect(x - r, y - r, r * 2, r * 2);
      }

      ctx!.globalCompositeOperation = "lighter";
      for (const s of stars) {
        const a = 0.35 + 0.65 * Math.abs(Math.sin(t * s.speed + s.phase));
        ctx!.fillStyle = `rgba(210,225,255,${(a * 0.8).toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.s, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalCompositeOperation = "source-over";
    }

    if (!animate) {
      draw(0);
      return () => {};
    }

    let last = 0;
    let virtualTime = 0;
    let k = 1;
    const loop = (time: number) => {
      const dt = last ? Math.min((time - last) / 1000, 0.1) : 0;
      last = time;
      k += (getBoost() - k) * Math.min(1, dt * 4);
      virtualTime += dt * k;
      draw(virtualTime * 1000);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }

  let stopNebula: (() => void) | undefined;
  let stopMobileWatch: (() => void) | undefined;

  onMount(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    reducedMotion = prefersReduced;
    const mobileMql = window.matchMedia("(max-width: 899px)");
    isMobile = mobileMql.matches;
    const onMobileChange = (e: MediaQueryListEvent) => {
      isMobile = e.matches;
    };
    mobileMql.addEventListener("change", onMobileChange);
    stopMobileWatch = () =>
      mobileMql.removeEventListener("change", onMobileChange);
    if (!prefersReduced) interval = setInterval(nextSlide, 7000);
    for (const sl of slides) {
      const img = new Image();
      img.src = sl.photo;
      img.decode?.().catch(() => {});
    }
    if (nebulaCanvas)
      stopNebula = startNebula(
        nebulaCanvas,
        !prefersReduced,
        () => nebulaBoost,
      );
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
    stopNebula?.();
    stopMobileWatch?.();
  });

  const slide = $derived(slides[current]);
</script>

<section
  id="home"
  class="hero-section"
  class:photo-top={slide.photoSide === "right"}
  bind:this={heroEl}
  onmousemove={handleMouseMove}
  onmouseleave={handleMouseLeave}
  aria-label="Hero"
>
  <div
    class="container slide-grid"
    class:photo-left={slide.photoSide === "left"}
  >
    <!-- TEXT BLOCK -->
    <div class="hero-text" bind:this={textEl} style="{TRANSITION} {textStyle}">
      <h1 class="hero-tagline">
        {#each t(slide.tagline, locale).split("\n") as line, i}
          {line}{#if i < t(slide.tagline, locale).split("\n").length - 1}<br
            />{/if}
        {/each}
      </h1>

      <div class="hero-cta">
        <a href="#projects" class="btn btn-primary">
          {t({ en: "View Projects", id: "Lihat Proyek" }, locale)}
        </a>
        <a href="#contact" class="btn btn-secondary">
          {t({ en: "Contact Me", id: "Hubungi Saya" }, locale)}
        </a>
      </div>

      <div class="hero-socials">
        <a
          href={siteConfig.githubUrl}
          target="_blank"
          rel="noopener noreferrer me"
          class="social-btn"
          aria-label="GitHub"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
            ></path>
          </svg>
          <span>GitHub</span>
        </a>
        <a
          href={siteConfig.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer me"
          class="social-btn"
          aria-label="LinkedIn"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
            ></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
          <span>LinkedIn</span>
        </a>
      </div>
    </div>

    <!-- PHOTO BLOCK -->
    <div class="hero-photo-wrap" bind:this={photoWrapEl}>
      <div class="photo-stage">
        <img
          bind:this={photoImg}
          src={slide.photo}
          alt={slide.photoAlt}
          width="433"
          height="577"
          fetchpriority="high"
          decoding="async"
          class="hero-photo"
          style="{TRANSITION} {photoStyle}"
        />
        <!-- Nebula bergerak, menutupi tepi bawah foto yang kotak -->
        <div class="nebula-wrap" bind:this={nebulaWrap} aria-hidden="true">
          <canvas bind:this={nebulaCanvas} class="nebula-canvas"></canvas>
        </div>
      </div>
    </div>
  </div>

  <!-- Slide indicators -->
  <div class="slide-dots" aria-label="Slide navigation">
    {#each slides as _, i}
      <button
        class="dot"
        class:active={i === current}
        onclick={() => {
          if (interval) clearInterval(interval);
          goTo(i as SlideIndex);
          const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;
          if (!prefersReduced) interval = setInterval(nextSlide, 7000);
        }}
        aria-label={`Slide ${i + 1}`}
        aria-current={i === current ? "true" : undefined}
      ></button>
    {/each}
  </div>
</section>

<style>
  .hero-section {
    min-height: calc(100dvh - var(--header-height));
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-block: var(--hero-pad);
    position: relative;
    overflow: hidden;
  }

  .hero-section {
    --neb-cyan: #7fb0ff;
    --hero-pad: clamp(48px, 8vw, 96px);
  }

  .hero-section::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
        ellipse 70% 60% at 65% 40%,
        rgba(91, 124, 255, 0.07) 0%,
        transparent 70%
      ),
      radial-gradient(
        ellipse 50% 50% at 20% 70%,
        rgba(60, 80, 220, 0.05) 0%,
        transparent 65%
      );
    pointer-events: none;
    z-index: 0;
  }

  .hero-section > * {
    position: relative;
    z-index: 1;
  }

  .slide-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(24px, 5vw, 48px);
    align-items: end;
  }

  .slide-grid .hero-photo-wrap {
    order: 0;
  }
  .slide-grid .hero-text {
    order: 1;
  }

  .slide-grid.photo-left .photo-stage {
    max-width: clamp(220px, 46vw, 430px);
  }

  .slide-grid.photo-left .hero-text {
    order: 1;
  }
  .slide-grid.photo-left .hero-photo-wrap {
    order: 2;
  }

  @media (min-width: 900px) {
    .slide-grid {
      --photo-col: clamp(260px, 36vw, 390px);
      grid-template-columns: minmax(0, 1fr) var(--photo-col);
      align-items: center;
    }
    .slide-grid .hero-text {
      order: 1;
    }
    .slide-grid .hero-photo-wrap {
      order: 2;
    }

    .slide-grid.photo-left {
      --photo-col: clamp(290px, 40vw, 430px);
      grid-template-columns: var(--photo-col) minmax(0, 1fr);
      column-gap: clamp(56px, 8vw, 104px);
    }
    .slide-grid.photo-left .hero-photo-wrap {
      order: 1;
    }
    .slide-grid.photo-left .hero-text {
      order: 2;
    }
  }

  .hero-text {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    gap: clamp(16px, 2.5vw, 24px);
  }

  .hero-sub {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--neb-cyan);
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    text-shadow: 0 0 18px rgba(90, 160, 255, 0.45);
  }

  .hero-sub::before {
    content: "";
    flex: none;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--neb-cyan);
    box-shadow:
      0 0 8px 2px rgba(110, 170, 255, 0.75),
      0 0 20px 6px rgba(120, 90, 255, 0.35);
  }

  .hero-tagline {
    font-size: clamp(1.9rem, 1rem + 4vw, 3.75rem);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.03em;
    color: var(--text);
    background-image: linear-gradient(
      165deg,
      #ffffff 0%,
      #dfe6ff 38%,
      #a9baff 70%,
      #d8c9ff 100%
    );
    background-size: 100% 220%;
    background-position: 0% 0%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    filter: drop-shadow(0 0 22px rgba(91, 124, 255, 0.35));
    animation: tagline-drift 16s ease-in-out infinite alternate;
  }

  @keyframes tagline-drift {
    from {
      background-position: 0% 0%;
    }
    to {
      background-position: 0% 100%;
    }
  }

  .hero-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.875rem;
  }

  .hero-cta :global(.btn) {
    transition:
      transform 0.2s ease,
      box-shadow 0.25s ease,
      border-color 0.2s ease,
      background 0.25s ease;
  }

  .hero-cta :global(.btn-primary) {
    color: #fff;
    border: 1px solid rgba(160, 180, 255, 0.35);
    background-image: linear-gradient(120deg, #4f6cff 0%, #7b5cff 100%);
    box-shadow:
      0 6px 22px -6px rgba(91, 100, 255, 0.65),
      inset 0 1px 0 rgba(255, 255, 255, 0.22);
  }

  .hero-cta :global(.btn-primary:hover) {
    transform: translateY(-1px);
    box-shadow:
      0 10px 32px -4px rgba(110, 100, 255, 0.85),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .hero-cta :global(.btn-secondary) {
    color: var(--text);
    background: rgba(120, 140, 255, 0.08);
    border: 1px solid rgba(150, 170, 255, 0.28);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }

  .hero-cta :global(.btn-secondary:hover) {
    background: rgba(120, 140, 255, 0.16);
    border-color: rgba(170, 190, 255, 0.55);
    box-shadow: 0 0 22px -4px rgba(110, 130, 255, 0.5);
  }

  .hero-socials {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .social-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-muted);
    padding: 0.35rem 0.65rem;
    border: 1px solid rgba(150, 170, 255, 0.2);
    border-radius: var(--radius-s);
    background: rgba(120, 140, 255, 0.06);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    transition:
      color 0.15s ease,
      border-color 0.2s ease,
      box-shadow 0.25s ease,
      background 0.2s ease;
  }

  .social-btn:hover {
    color: var(--text);
    border-color: rgba(170, 190, 255, 0.55);
    background: rgba(120, 140, 255, 0.14);
    box-shadow: 0 0 18px -4px rgba(110, 130, 255, 0.55);
  }

  .hero-photo-wrap {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    min-width: 0;
  }

  .photo-stage {
    position: relative;
    width: 100%;
    max-width: clamp(200px, 42vw, 390px);
  }

  .hero-photo {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
    position: relative;
    z-index: 1;
  }

  .nebula-wrap {
    position: absolute;
    left: 50%;
    translate: -50% 0;
    bottom: -26%;
    width: 185%;
    height: 72%;
    z-index: 2;
    pointer-events: none;
    will-change: transform, opacity;
    -webkit-mask-image: radial-gradient(
      ellipse 50% 50% at 50% 56%,
      #000 70%,
      transparent 100%
    );
    mask-image: radial-gradient(
      ellipse 50% 50% at 50% 56%,
      #000 70%,
      transparent 100%
    );
  }

  .nebula-canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  .slide-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: clamp(20px, 3vw, 36px);
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    background: var(--border-strong);
    cursor: pointer;
    padding: 0;
    transition:
      background 0.2s ease,
      width 0.3s ease,
      border-radius 0.3s ease;
    min-width: 8px;
  }

  .dot.active {
    background: var(--accent);
    width: 22px;
    border-radius: 4px;
  }

  @media (max-width: 899px) {
    .hero-section.photo-top {
      --hero-top: 12px;
      padding-top: var(--hero-top);
      padding-bottom: calc(var(--hero-pad) * 2 - var(--hero-top));
    }

    .slide-grid.photo-left {
      row-gap: 6px;
    }

    .hero-text {
      align-items: center;
      text-align: center;
    }
    .hero-cta,
    .hero-socials {
      justify-content: center;
    }
    .hero-photo-wrap {
      margin-bottom: clamp(64px, 20vw, 96px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-text,
    .hero-photo {
      transition-duration: 0.1ms !important;
    }
    .hero-tagline {
      animation: none;
    }
  }
</style>
