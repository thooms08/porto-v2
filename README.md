# Thomas Lefvi Baehaqi - Personal Portfolio

Personal portfolio website of Thomas Lefvi Baehaqi, Fullstack Web Developer with Team Leadership capability.

Live: [thomaslefvibaehaqi.my.id](https://thomaslefvibaehaqi.my.id)

![OG Preview](static/og-image.jpg)

---

## Tech Stack

- **Framework**: SvelteKit 2 + Svelte 5 (Runes)
- **Language**: TypeScript
- **Styling**: Pure CSS with custom properties, no framework
- **Build output**: 100% static (adapter-static), no server required
- **Fonts**: Inter Variable + JetBrains Mono Variable (self-hosted, no CDN)
- **PDF generation**: Playwright Chromium at build time
- **Image processing**: Sharp

---

## Project Structure

```
src/
+-- lib/
|   +-- components/       Svelte components (Hero, Navbar, About, etc.)
|   +-- data/             Single source of truth for all content
|   |   +-- site.ts       Site config, URLs, SEO
|   |   +-- profile.ts    About text, quick facts, stats
|   |   +-- experience.ts Work experience
|   |   +-- projects.ts   Portfolio projects
|   |   +-- skills.ts     Technical and soft skills
|   |   +-- certificates.ts  Certifications
|   |   +-- education.ts  Education history
|   |   +-- organizations.ts Organizations and leadership
|   |   +-- dokumentasi.ts   Activity photo gallery
|   |   +-- faq.ts        FAQ for AEO
|   |   +-- ui.ts         UI strings (bilingual EN/ID)
|   +-- i18n/             Locale types and t() helper
|   +-- actions/          Svelte actions (reveal on scroll)
|   +-- print/            CV and Portfolio print templates
+-- routes/
|   +-- +page.svelte      English homepage
|   +-- id/               Indonesian version
|   +-- print/[doc]/[lang]/  Prerendered PDF routes

static/
+-- foto-diri.webp        Profile photo (transparent background)
+-- foto-diri-2.webp      Second profile photo
+-- foto-formal.png       Formal photo used in CV/Portfolio PDF
+-- og-image.jpg          Open Graph image (1200x630 JPEG)
+-- projects/             Project fallback screenshots
+-- certificates/         Certificate thumbnails and full images
+-- dokumentasi/          Activity documentation photos
+-- downloads/            Downloadable PDF files

scripts/
+-- generate-assets.mjs   Generates favicons and OG image via Sharp
+-- generate-seo-files.mjs Generates sitemap.xml, robots.txt, llms.txt
+-- generate-pdfs.mjs     Renders CV and Portfolio PDFs via Playwright
```

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

## Build

```bash
npm run build
```

The build script runs in sequence:

1. `npm run assets` -- generates favicon set and OG image via Sharp
2. `npm run seo` -- generates sitemap.xml, robots.txt, llms.txt from data
3. `vite build` -- prerenders all routes to static HTML
4. `node scripts/generate-pdfs.mjs` -- opens prerendered print routes with Playwright and saves PDFs to `static/downloads/` and `build/downloads/`

Output is in `build/`. Upload the contents of `build/` directly to `public_html/` on shared hosting. No Node.js required on the server.

---

## Deployment to Shared Hosting

1. Run `npm run build` locally
2. Upload everything inside `build/` to `public_html/` via FTP or cPanel File Manager
3. The `.htaccess` in `static/` is included in the build and handles HTTPS redirect, routing fallback, and cache headers

The `build/` folder is committed to the repository so it can be deployed directly without running the build on the server.

---

## Bilingual Support (EN/ID)

All user-visible text lives in `src/lib/data/ui.ts` and the data files using the `Localized<T>` type:

```typescript
interface Localized<T = string> {
  en: T;
  id: T;
}
```

The `t(obj, locale)` helper from `src/lib/i18n/index.ts` returns the correct string.

- English: `https://thomaslefvibaehaqi.my.id/`
- Indonesian: `https://thomaslefvibaehaqi.my.id/id/`

---

## Updating Content

All content is maintained in `src/lib/data/`. Editing a data file automatically updates:

- The website (all sections that read from that file)
- The JSON-LD structured data (via `JsonLd.svelte`)
- The CV PDF (via `src/lib/print/CvTemplate.svelte`)
- The Portfolio PDF (via `src/lib/print/PortfolioTemplate.svelte`)
- The `llms.txt` and `llms-full.txt` files (via `scripts/generate-seo-files.mjs`)
- The `sitemap.xml`

After editing data, run `npm run build` to regenerate all outputs.

---

## PDF Generation

PDFs are generated from prerendered HTML routes using Playwright:

| File | Route | Output |
|---|---|---|
| CV (EN) | `/print/cv/en` | `CV_Thomas_Lefvi_Baehaqi_EN.pdf` |
| CV (ID) | `/print/cv/id` | `CV_Thomas_Lefvi_Baehaqi_ID.pdf` |
| Portfolio (EN) | `/print/portfolio/en` | `Portfolio_Thomas_Lefvi_Baehaqi_EN.pdf` |
| Portfolio (ID) | `/print/portfolio/id` | `Portfolio_Thomas_Lefvi_Baehaqi_ID.pdf` |

The script verifies the CV fits exactly 1 page. If it overflows, the build fails with a clear message.

If Playwright/Chromium is not available on the build machine, the script exits with a warning and falls back to the last committed PDFs in `static/downloads/`.

---

## Photo Files

| File | Usage |
|---|---|
| `static/foto-diri.webp` | Hero section slide 1 (transparent background) |
| `static/foto-diri-2.webp` | Hero section slide 2 (transparent background) |
| `static/foto-formal.png` | CV and Portfolio PDF header |
| `static/og-image.jpg` | Open Graph preview (1200x630 JPEG) |

The profile photos have transparent backgrounds. Drop shadows are applied interactively via CSS `filter: drop-shadow()` based on mouse position.

---

## Activity Documentation Photos

Photos are stored in `static/dokumentasi/` as `dokumentasi-1.webp` through `dokumentasi-10.webp`, each with a `-thumb.webp` variant at 600px width. Labels and metadata are defined in `src/lib/data/dokumentasi.ts`.

To add a new photo:

1. Convert to WebP using Sharp or any tool (max width 1200px for full, 600px for thumb)
2. Place in `static/dokumentasi/dokumentasi-N.webp` and `dokumentasi-N-thumb.webp`
3. Add an entry to `src/lib/data/dokumentasi.ts`

---

## SEO and AEO

- Structured data (JSON-LD): `Person`, `Organization`, `ProfilePage`, `WebSite`, `ItemList`, `FAQPage`, `Occupation`
- Open Graph and Twitter Card meta tags
- `sitemap.xml` and `robots.txt` generated from data
- `llms.txt` and `llms-full.txt` for AI engine discovery (ChatGPT, Gemini, Perplexity, etc.)
- FAQ section uses `<details><summary>` (no JavaScript) and mirrors the FAQPage JSON-LD exactly

---

## Background

Portfolio website built with SvelteKit and TypeScript, featuring bilingual support (EN/ID), responsive design, and SEO optimization. The AI name "FlavoryAI" is used only within the Flavory.id product context. The constant `aiName` in `site.ts` controls this.

---

## License

Private. All rights reserved. Source code is for personal use only.
