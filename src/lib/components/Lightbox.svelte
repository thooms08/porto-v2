<script lang="ts">
  import type { CertificateItem } from "$lib/data/certificates";
  import type { Locale } from "$lib/i18n";
  import { t } from "$lib/i18n";
  import { ui } from "$lib/data/ui";
  import { onMount } from "svelte";

  let {
    certificate,
    locale,
    onClose,
    onPrev,
    onNext,
  }: {
    certificate: CertificateItem;
    locale: Locale;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
  } = $props();

  let dialogEl: HTMLElement | null = $state(null);
  let closeBtnEl: HTMLButtonElement | null = $state(null);

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      onNext();
    } else if (e.key === "Tab" && dialogEl) {
      const focusable = dialogEl.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  onMount(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (closeBtnEl) {
      closeBtnEl.focus();
    }

    window.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeydown);
    };
  });

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }
</script>

<div
  class="lightbox-backdrop"
  onclick={handleBackdropClick}
  role="presentation"
>
  <div
    class="lightbox-dialog"
    role="dialog"
    aria-modal="true"
    aria-labelledby="lightbox-title"
    bind:this={dialogEl}
  >
    <button
      type="button"
      class="lightbox-close-btn"
      onclick={onClose}
      aria-label={t(ui.certificates.closeLightbox, locale)}
      bind:this={closeBtnEl}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <button
      type="button"
      class="nav-btn prev-btn"
      onclick={onPrev}
      aria-label={t(ui.certificates.prevCertificate, locale)}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>

    <button
      type="button"
      class="nav-btn next-btn"
      onclick={onNext}
      aria-label={t(ui.certificates.nextCertificate, locale)}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>

    <div class="lightbox-body">
      <div class="preview-stage">
        {#if certificate.type === "pdf"}
          <div class="pdf-viewer-wrap">
            <img
              src={`/certificates/${certificate.thumb}`}
              alt={`Certificate: ${t(certificate.title, locale)}`}
              class="cert-img"
            />
          </div>
        {:else}
          <img
            src={`/certificates/${certificate.file}`}
            alt={`Certificate: ${t(certificate.title, locale)}`}
            class="cert-img"
          />
        {/if}
      </div>

      <div class="meta-panel">
        <div class="meta-header">
          <h3 id="lightbox-title" class="cert-title">
            {t(certificate.title, locale)}
          </h3>
          <span class="chip">{certificate.category}</span>
        </div>

        <div class="meta-details">
          <div class="detail-item">
            <span class="detail-label">{t(ui.certificates.issuer, locale)}</span
            >
            <span class="detail-val">{certificate.issuer}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">{t(ui.certificates.date, locale)}</span>
            <span class="detail-val">{t(certificate.displayDate, locale)}</span>
          </div>
          {#if certificate.credentialId}
            <div class="detail-item">
              <span class="detail-label"
                >{t(ui.certificates.credentialId, locale)}</span
              >
              <span class="detail-val mono">{certificate.credentialId}</span>
            </div>
          {/if}
        </div>

        <div class="meta-actions">
          <a
            href={`/certificates/${certificate.file}`}
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-secondary btn-sm"
          >
            <span>{t(ui.certificates.openPdf, locale)}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
              ></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .lightbox-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(5, 8, 22, 0.88);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .lightbox-dialog {
    background: var(--surface);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-l);
    max-width: 960px;
    width: 100%;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05) inset;
    animation: scaleUp 0.2s cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  @keyframes scaleUp {
    from {
      opacity: 0;
      transform: scale(0.97);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .lightbox-close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(5, 8, 22, 0.8);
    border: 1px solid var(--border);
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 20;
    transition:
      background-color 0.15s ease,
      border-color 0.15s ease;
  }

  .lightbox-close-btn:hover {
    background: var(--accent);
    color: var(--accent-ink);
    border-color: var(--accent);
  }

  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(5, 8, 22, 0.8);
    border: 1px solid var(--border);
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 20;
    transition:
      background-color 0.15s ease,
      border-color 0.15s ease;
  }

  .nav-btn:hover {
    background: var(--accent);
    color: var(--accent-ink);
    border-color: var(--accent);
  }

  .prev-btn {
    left: 1rem;
  }

  .next-btn {
    right: 1rem;
  }

  .lightbox-body {
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    overflow-y: auto;
  }

  .preview-stage {
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    min-height: 380px;
    max-height: 60vh;
    overflow: hidden;
  }

  .cert-img {
    max-width: 100%;
    max-height: 55vh;
    object-fit: contain;
    display: block;
  }

  .pdf-viewer-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .meta-panel {
    padding: 1.5rem;
    background: var(--surface);
    border-top: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .meta-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }

  .cert-title {
    font-size: 1.25rem;
    color: var(--text);
  }

  .meta-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.75rem;
  }

  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .detail-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
  }

  .detail-val {
    font-size: 0.875rem;
    color: var(--text);
  }

  .detail-val.mono {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
  }

  .meta-actions {
    display: flex;
    justify-content: flex-end;
    padding-top: 0.5rem;
  }
</style>
