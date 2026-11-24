import type { Action } from "svelte/action";

interface RevealOptions {
  delay?: number;
  threshold?: number;
}

export const reveal: Action<HTMLElement, RevealOptions | undefined> = (
  node,
  options = {},
) => {
  const delay = options?.delay ?? 0;
  const threshold = options?.threshold ?? 0.12;

  node.setAttribute("data-reveal", "");
  if (delay > 0) {
    node.style.transitionDelay = `${delay}ms`;
  }

  if (typeof window === "undefined") return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    node.classList.add("revealed");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          node.classList.add("revealed");
          observer.unobserve(node);
        }
      }
    },
    {
      threshold,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    },
  };
};
