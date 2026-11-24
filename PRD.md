# PRD — Website Portofolio Thomas Lefvi Baehaqi

> Dokumen ini adalah **instruksi eksekusi** untuk AI Agent (Google Antigravity). Baca seluruh dokumen sebelum menulis kode. Jangan berhenti di tahap perencanaan: **scaffold → implement → build → verifikasi → perbaiki sampai `npm run build` sukses dan hasilnya siap deploy.** Jangan meninggalkan placeholder, TODO, lorem ipsum, atau link palsu.

---

## 0. Ringkasan

| Item | Nilai |
|---|---|
| Pemilik | Thomas Lefvi Baehaqi — Fullstack Web Developer |
| URL produksi | `https://thomaslefvibaehaqi.my.id/` (canonical) |
| Framework | **SvelteKit (Svelte 5) + TypeScript**, `adapter-static`, semua halaman **prerendered** |
| Tipe situs | Statis, data **hard-coded** di satu folder data (tanpa backend/CMS/database) |
| Tema | **Galaxy dark blue**, profesional, minimalis (bukan "AI-slop") |
| Bahasa | Inggris (default) dan Indonesia |
| Fitur kunci | Preview project (embed live site), galeri sertifikat, tombol **Download CV** & **Download Portfolio** (PDF dihasilkan dari data yang sama), SEO + GEO + AEO, share preview (OG/Twitter) |

### Tujuan
1. Menampilkan profil, pengalaman, project, sertifikat, dan kontak Thomas secara informatif dan kredibel.
2. Satu sumber data (single source of truth): **mengubah data di kode → website, CV PDF, Portfolio PDF, JSON-LD, `llms.txt`, dan sitemap ikut berubah** setelah build.
3. Mudah ditemukan mesin pencari dan AI chatbot (Google, Bing, ChatGPT, Claude, Perplexity, Gemini).
4. Cepat, ringan, dan proporsional di semua perangkat (320px → 2560px).

### Bukan tujuan
Tidak ada login, blog engine, CMS, form dengan backend, analytics berat, atau library animasi besar.

---

## 1. Aset & Sumber Data di Direktori Proyek

Agent **wajib memeriksa isi direktori proyek lebih dulu** (`ls -R`), lalu mengerjakan berikut:

| Aset | Penggunaan |
|---|---|
| `foto-diri.webp` | Foto di website (hero/about), **favicon** (generate semua ukuran), dan gambar **Open Graph/Twitter share** |
| `foto-formal.png` | Foto di **CV PDF** dan **Portfolio PDF** |
| File sertifikat (gambar/PDF) di direktori proyek, bernama sesuai judul sertifikat | Galeri sertifikat. **Ada sertifikat baru yang belum tercantum di PDF portofolio — semuanya wajib ditampilkan.** |
| `CV_-_Thomas_Lefvi_Baehaqi.pdf` | **Referensi format & isi CV** (replikasi persis) |
| `Portofolio___Thomas_Lefvi_Baehaqi.pdf` | **Referensi format & isi Portfolio** (replikasi persis) + sumber daftar project, organisasi, sertifikat |

Langkah wajib untuk sertifikat:
1. Inventarisasi semua file sertifikat di direktori (gambar `.png/.jpg/.jpeg/.webp` dan `.pdf`).
2. **Baca isi tiap sertifikat** (vision/OCR; untuk PDF ekstrak teks atau render halaman pertama) dan ekstrak: **judul, penerbit/penyelenggara, nama penerima (verifikasi = Thomas), tanggal/tahun terbit, nomor kredensial/ID (jika ada), tanggal kedaluwarsa (jika ada), deskripsi/kompetensi singkat**.
3. Cocokkan dengan 9 sertifikat yang sudah ada di PDF portofolio (lihat §4.6). Sertifikat tambahan di luar daftar itu **ditambahkan** ke data.
4. Pindahkan/optimasi file ke `static/certificates/` (konversi gambar ke WebP, lebar maks 1600px, + thumbnail 480px; untuk PDF render halaman 1 menjadi WebP sebagai thumbnail dan tetap sediakan PDF aslinya untuk dibuka). Nama file kebab-case.
5. Jika sebuah sertifikat tidak terbaca/ambigu, tulis field yang pasti saja dan **jangan mengarang** nilai; laporkan di README bagian "Catatan data".

---

## 2. Tech Stack & Aturan Teknis

- **SvelteKit + Svelte 5 (runes) + TypeScript strict**, Vite, `@sveltejs/adapter-static` (`prerender = true`, `trailingSlash = 'always'`, fallback tidak dipakai).
- **Styling:** CSS murni dengan custom properties (design tokens) + scoped styles Svelte. **Tailwind tidak dipakai** agar bundle kecil dan kontrol penuh. Tidak ada UI kit.
- **Font:** self-host via `@fontsource-variable/inter` (body/heading) dan `@fontsource-variable/jetbrains-mono` (label kecil/kode). Subset latin, `font-display: swap`, preload font utama. **Dilarang** memuat font dari Google Fonts CDN.
- **Ikon:** SVG inline lokal (set kecil: mail, phone, map-pin, github, linkedin, globe, external-link, download, sun/moon tidak perlu, language, x, chevron). Jangan memuat seluruh library ikon.
- **Animasi:** hanya `svelte/transition`, `svelte/motion`, CSS (`transform` & `opacity`), dan `IntersectionObserver`. **Dilarang** GSAP, Framer, Lottie, three.js, particles.js.
- **Dependency dev untuk PDF:** `playwright` (Chromium) — hanya dev dependency, tidak masuk bundle web.
- **Sharp** untuk optimasi gambar & pembuatan favicon/OG di script build.
- Node ≥ 20. Package manager: `npm`.
- Tanpa tracking/analytics pihak ketiga. Tanpa cookie.

### Struktur direktori yang diharapkan

```
.
├─ PRD.md
├─ README.md                      # cara edit data, build, deploy, catatan data
├─ package.json
├─ svelte.config.js  vite.config.ts  tsconfig.json
├─ scripts/
│  ├─ generate-assets.mjs         # favicon set, og-image, optimasi foto/sertifikat
│  ├─ generate-seo-files.mjs      # sitemap.xml, robots.txt, llms.txt, llms-full.txt dari data
│  ├─ generate-pdfs.mjs           # Playwright → PDF CV & Portfolio (EN + ID)
│  └─ generate-screenshots.mjs    # fallback screenshot preview project (opsional tapi disarankan)
├─ static/
│  ├─ foto-diri.webp  favicon.ico  favicon.svg  apple-touch-icon.png  icon-192.png  icon-512.png
│  ├─ og-image.jpg                # 1200×630 turunan foto-diri.webp
│  ├─ site.webmanifest  robots.txt  sitemap.xml  llms.txt  llms-full.txt
│  ├─ certificates/               # file sertifikat + thumbnail
│  ├─ projects/                   # screenshot fallback
│  └─ downloads/                  # PDF hasil generate (di-commit sebagai fallback)
└─ src/
   ├─ app.html  app.css           # tokens, reset, util
   ├─ lib/
   │  ├─ data/                    # ★ SATU-SATUNYA tempat mengedit konten
   │  │  ├─ site.ts               # url, nama, kontak, sosial, SEO default
   │  │  ├─ profile.ts            # headline, about, quick facts (en/id)
   │  │  ├─ experience.ts  projects.ts  skills.ts  education.ts
   │  │  ├─ organizations.ts  certificates.ts  faq.ts
   │  │  └─ ui.ts                 # semua teks UI en/id
   │  ├─ i18n/                    # helper t(), tipe Locale
   │  ├─ components/              # Navbar, Hero, Starfield, Section, ProjectShowcase, CertificateGallery, Lightbox, ContactCard, LangSwitch, JsonLd, Footer, dst.
   │  ├─ print/                   # template CV & Portfolio (HTML/CSS print)
   │  └─ actions/                 # reveal (IntersectionObserver), dsb.
   └─ routes/
      ├─ +layout.svelte  +layout.ts
      ├─ +page.svelte             # EN  →  /
      ├─ id/+page.svelte          # ID  →  /id/
      └─ print/[doc]/[lang]/+page.svelte   # cv|portfolio × en|id (noindex, dipakai Playwright)
```

---

## 3. Single Source of Truth (WAJIB)

- Semua konten ada di `src/lib/data/*`, bertipe TypeScript, **dua bahasa** per field teks: `{ en: string; id: string }`.
- Komponen website, template PDF (`/print/*`), JSON-LD, `llms.txt`, `sitemap.xml`, dan meta tag **semuanya membaca dari data yang sama**. Dilarang menulis ulang/duplikasi teks di komponen.
- Setiap entri punya flag tampil per medium agar format CV tetap muat 1 halaman, contoh:
  ```ts
  { /* certificate */ showOnWeb: true, showInCv: true, showInPortfolio: true }
  ```
- README harus berisi panduan 1 halaman: "Cara mengubah informasi → jalankan `npm run build` → semua ikut berubah".

---

## 4. Konten (hard-code ke `src/lib/data`)

Sumber: dua PDF terlampir. Teks sumber berbahasa Indonesia. **Versi Inggris dibuat oleh agent** dengan terjemahan natural-profesional (bukan literal), mempertahankan istilah teknis, nama produk, dan angka. Jangan menambah klaim yang tidak ada di sumber (mis. angka pengguna, penghargaan).

### 4.1 Identitas & kontak
- Nama: **Thomas Lefvi Baehaqi**
- Role: **Fullstack Web Developer** (juga: Founder FlavoryID Technologies; Mahasiswa Sistem Informasi)
- Lokasi: **Karawang, Jawa Barat, Indonesia**
- Email: `thomaslefvibaehaqi@gmail.com`
- Telepon/WhatsApp: `+62 851-7828-6438` (tautan WhatsApp: `https://wa.me/6285178286438`)
- Website: `https://thomaslefvibaehaqi.my.id/`
- GitHub: `https://github.com/Thooms08`
- LinkedIn: `https://www.linkedin.com/in/thomaslb08`

### 4.2 Tentang (about)
Sumber (ID, dari portofolio):
> Saya mahasiswa Sistem Informasi sekaligus Fullstack Web Developer yang berfokus pada membangun solusi digital bernilai bisnis nyata. Sebagai Founder ekosistem digital FlavoryID Technologies, saya menggabungkan keahlian fullstack HTML, CSS, JavaScript, TypeScript, PHP, MySQL, Laravel, dan Next.js, untuk menciptakan produk yang efisien, aman, dan mudah digunakan. Saya telah menangani pengembangan ekosistem POS bisnis F&B, Progressive Web App, sistem manajemen data terpadu, hingga integrasi software dengan hardware. Setiap proyek berfokus pada performa tinggi, skalabilitas jangka panjang, dan pengalaman pengguna yang intuitif, dengan pendekatan modern berbasis AI-assisted development.

Versi ringkas untuk **CV** (ID, dari CV):
> Saya Mahasiswa Sistem Informasi Universitas Bina Sarana Informatika dan Fullstack Web Developer dengan pengalaman nyata membangun solusi digital bernilai bisnis. Saya adalah Founder ekosistem digital FlavoryID Technology. Saya berpengalaman mengembangkan sistem POS F&B, Progressive Web App, HRMS, dan integrasi software-hardware menggunakan Laravel, Next.js, PHP, TypeScript, dan MySQL. Saya berorientasi pada performa tinggi, skalabilitas, dan pengalaman pengguna yang intuitif.

> Simpan **dua varian** (`about.long` untuk web & portfolio, `about.cv` untuk CV). Di web, tampilkan `about.long` dalam paragraf-paragraf pendek yang mudah dibaca, ditambah blok **Quick Facts** (lihat §6.3) agar lebih informatif.

Hero tagline (EN, usulan — boleh dipoles):
- Headline: "Fullstack web developer building business-ready digital products."
- Sub: "Founder of FlavoryID Technologies. I design and ship POS systems, HRMS, e-commerce, and Progressive Web Apps with Laravel, Next.js, and TypeScript."

### 4.3 Pengalaman
1. **IT Developer (Magang / Internship)** — PT. Farkatech International Nexus — *Mei 2026 – Juli 2026* — WFH. Setiap bulan ditugaskan membangun satu aplikasi siap jual secara mandiri, mulai dari perencanaan, pengembangan, hingga delivery.
2. **Fullstack Web Developer & Deployment (Freelance)** — E-Commerce Supermura.id · PT Bryclo Mega Jaya — *Feb – Apr 2026* — Bertanggung jawab penuh atas pengembangan dan deployment platform e-commerce Supermura.id secara end-to-end, meliputi arsitektur fitur inti, integrasi sistem pembayaran, dan memastikan stabilitas di lingkungan produksi.
3. **Founder — FlavoryID Technologies** — ekosistem digital (Flavory.id, Key.Flavory, Blog.Flavory). *(Tampilkan di web & JSON-LD sebagai Organization yang dipimpin; periode tidak diketahui → jangan tulis tanggal.)*

### 4.4 Project (8 project, semua ada di PDF portofolio)

| # | Nama | URL | Deskripsi (ID) | Stack |
|---|---|---|---|---|
| 1 | **Flavory.id** | https://flavory.id | Aplikasi POS/Kasir digital terintegrasi untuk bisnis F&B: manajemen pesanan real-time, laporan keuangan otomatis, dan analitik berbasis AI (FlavoryAI). | Laravel, MySQL |
| 2 | **Key.Flavory.id** | https://key.flavory.id | Platform HRMS untuk UMKM: kelola data karyawan, absensi, dan jadwal kerja dalam satu sistem terpadu. | Laravel, MySQL |
| 3 | **Blog.Flavory.id** | https://blog.flavory.id | Platform media digital untuk konten teknologi, bisnis, dan inovasi digital. | Next.js, TypeScript, Prisma ORM |
| 4 | **Supermura.id** | https://supermura.id | Platform e-commerce fashion dengan kuantitas minimum rendah, menghubungkan brand lokal dan reseller dengan supplier. Freelance untuk PT Bryclo Mega Jaya. | Laravel, MySQL |
| 5 | **Recomon.my.id** | https://recomon.my.id | Platform pembuatan kartu digital interaktif tanpa batas: kartu ucapan, undangan, atau pesan personal yang lebih berkesan dari kartu konvensional. | Laravel, MySQL |
| 6 | **mysems.my.id** | https://mysems.my.id | Sistem manajemen event sekolah: jadwal, koordinasi panitia, dan distribusi informasi. | *(kosongkan jika tidak terverifikasi)* |
| 7 | **Rekain.my.id** | https://rekain.my.id | Platform digital wadah distribusi limbah tekstil industri garmen untuk disalurkan ke para pengrajin yang membutuhkan bahan. | *(kosongkan jika tidak terverifikasi)* |
| 8 | **Imkompres** | https://imkompres.vercel.app | Kompres gambar dan video langsung di browser tanpa upload ke server, 100% berbasis JavaScript lokal. | JavaScript |

Field per project: `slug, name, url, shortDesc{en,id}, longDesc{en,id}, stack[], category, role{en,id}, featured, screenshot, embeddable`. **Jangan mengarang stack/fitur** yang tidak ada di sumber. Boleh membuka tiap URL untuk memverifikasi bahwa live, dan (jika perlu) memperkaya `longDesc` hanya dengan fakta yang terlihat di situs.

### 4.5 Skills
- **Frontend:** HTML, CSS, JavaScript, TypeScript, Bootstrap, Tailwind CSS, React.js, Next.js
- **Backend:** PHP, Laravel, Node.js, REST API, MySQL, phpMyAdmin
- **Mobile:** Flutter, Dart
- **Development Tools:** Git, GitHub, Figma, Vercel, Cloudflare, Google Cloud, VSCode, Laragon, Ngrok
- **AI Tools:** Claude, Google Gemini, GitHub Copilot, Kiro IDE
- **Soft skills:** Pemecahan Masalah, Berpikir Analitis, Kerja Tim, Kepemimpinan, Manajemen Waktu, Komunikasi, Berbicara di Depan Umum, Inovatif, Kreatif, Cermat & Teliti
- **Kategori "Hard Skill" ala portofolio PDF** (dipakai di template Portfolio): Frontend Development, Backend Development, Database Management, System Integration, Mobile App Basics, Deployment & Cloud.

### 4.6 Sertifikat (baseline dari PDF; **+ sertifikat baru dari direktori**)
1. Sertifikat Kompetensi Database Administrator — BNSP & LSP UBSI
2. Uji Kompetensi Basis Data – Advance — PT Jidoka System Indonesia
3. Fundamental Junior Web Developer — Digital Talent Scholarship 2025
4. Spec-Driven Development dengan Kiro — AWS AI Academy 2026 | Dicoding
5. Belajar Dasar Pemrograman Web — Coding Camp 2026 – DBS Foundation | Dicoding
6. AI For Work & Career Readiness — Maju Bareng AI | HACKTIV8
7. Workshop Bedah 9 Unit Pemrograman — Universitas Bina Sarana Informatika
8. Workshop ERD, LRS, dan UML — HIMASI UBSI PSDKU Karawang
9. Webinar Automation — UiPath x IOH
10. **… + semua sertifikat lain yang ditemukan di direktori** (hasil baca isi sertifikat, §1).

Field: `id, title{en,id}, issuer, date (ISO / tahun), credentialId?, category (competency | course | workshop | webinar), file, thumb, type (image|pdf), skills[]?, showInCv, showInPortfolio`. **Judul/penerbit/tanggal final harus mengikuti isi sertifikat asli**, bukan hanya nama file. Urutkan terbaru → lama.

Untuk **CV**, `showInCv: true` hanya pada sertifikat yang ada di CV asli (nomor 1–5) kecuali ruang cukup; CV **harus tetap 1 halaman A4**.

### 4.7 Pendidikan
- **Universitas Bina Sarana Informatika** — S1 Sistem Informasi — 2024 – Sekarang (Present)
- **SMK Plus Al Azhar Mariuk** — Otomatisasi Tata Kelola Perkantoran — 2021 – 2024

### 4.8 Organisasi & Kepemimpinan (hanya di web & Portfolio PDF; tidak di CV)
| Peran | Lembaga | Periode |
|---|---|---|
| Ketua Pengurus Pondok Pesantren | PP. Al-Azhar Mariuk | 2023 – 2024 |
| Ketua Marching Band | PP. Al-Azhar Mariuk | 2023 – 2024 |
| Ketua Hadroh | PP. Al-Azhar Mariuk | 2023 – 2024 |
| Ketua Panitia Acara IMTIHAN/Khataman | PP. Al-Azhar Mariuk | 2023 |
| Pelatih Pentas Seni & Hadroh | SMP Plus Al-Azhar Mariuk & MIN 2 Subang | 2022 – 2024 |
| Anggota Paskibra | SMK Plus Al-Azhar Mariuk | 2022 – 2023 |
| Anggota Pramuka | SMK Plus Al-Azhar Mariuk | 2022 – 2023 |
| Anggota Panitia Gema Pramuka | Kec. Tambak Dahan, Kab. Subang | 2023 |

> ⚠️ Periode untuk **Pelatih Pentas Seni & Hadroh** dan **Anggota Paskibra** berada di batas halaman 2→3 PDF dan teksnya tergabung ("2022 – 2024 2022 – 2023"). Tabel di atas adalah pemetaan terbaik. **Verifikasi dengan membuka PDF portofolio** (render halaman 2–3) dan koreksi bila perlu.

### 4.9 Ketidakkonsistenan sumber (keputusan default — wajib diikuti, jadikan konstanta di `site.ts`)
| Hal | CV | Portofolio | Keputusan |
|---|---|---|---|
| URL portofolio | `thomaslefvibaehaqi.my.id` | `thomaslefvibaehaqi.vercel.app` (di PDF) | **`https://thomaslefvibaehaqi.my.id/`** di mana pun |
| Nama perusahaan | FlavoryID Technology | FlavoryID Technologies | **FlavoryID Technologies** |
| Nama AI di Flavory | MineAI | FlavoryAI | **FlavoryAI** (jadikan satu konstanta `aiName`; laporkan di README agar pemilik bisa mengganti) |
| Gaya penulisan | "Key.Flavory", "Recomon" | "Key.Flavory.id", "Recomon.my.id" | Gunakan nama domain lengkap seperti portofolio |

---

## 5. Design System — "Galaxy Dark Blue", Profesional

### 5.1 Prinsip
Bayangkan situs buatan **frontend engineer senior**: tenang, presisi, tipografi kuat, whitespace lega, hierarki jelas. Efek "galaxy" cukup hadir sebagai **latar bintang yang sangat halus**, bukan dekorasi di setiap komponen.

### 5.2 Token warna (satu aksen saja)
```css
:root {
  --bg:        #050816;   /* ruang angkasa, biru-hitam */
  --bg-raised: #090e24;
  --surface:   #0d1330;   /* kartu */
  --surface-2: #121a3f;
  --border:    rgba(148,163,200,.16);
  --border-strong: rgba(148,163,200,.28);
  --text:      #e8ebf8;
  --text-muted:#98a1c4;   /* kontras ≥ 4.5:1 pada --bg */
  --accent:    #5b7cff;   /* SATU-SATUNYA warna aksen */
  --accent-hover: #7b95ff;
  --accent-ink:   #060a1f;/* teks di atas tombol aksen */
  --focus: #9db0ff;
  --radius-s: 6px; --radius-m: 10px; --radius-l: 14px;
}
```
- Latar: `--bg` datar + **satu** radial-gradient sangat redup (opasitas ≤ 0.08, warna biru tua) di area hero. Tidak ada gradient pelangi.
- Teks: hanya `--text`, `--text-muted`, dan `--accent`. **Dilarang** teks warna-warni, gradient text, neon.
- Tombol: primer = solid `--accent`; sekunder = outline `--border-strong`. Hanya dua gaya. Tanpa glow, tanpa `box-shadow` berwarna, tanpa glassmorphism berlebihan, tanpa blob/orb mengambang.
- Bayangan: maksimal `0 1px 0 rgba(255,255,255,.03) inset` + border 1px. Hindari drop-shadow besar.
- Dukung `color-scheme: dark`. (Tidak perlu light mode.)

### 5.2.1 Latar bintang (Starfield)
- Satu elemen `<canvas>` `position: fixed; inset: 0; z-index: -1`, **±60–90 bintang** (jumlah dikurangi di layar kecil), ukuran 0.5–1.5px, opasitas 0.2–0.7, **twinkle sangat pelan**, parallax super tipis saat scroll (opsional).
- Syarat performa: satu `requestAnimationFrame` loop, **pause saat `document.hidden`**, **pause saat tidak terlihat**, di-throttle ke ~30fps, DPR dibatasi ≤ 2, tidak re-layout. **Nonaktif total / statis** bila `prefers-reduced-motion: reduce` atau perangkat low-power (`navigator.hardwareConcurrency <= 2` → bintang statis).
- Render awal (SSR) harus tetap indah tanpa JS: sediakan fallback CSS (beberapa `radial-gradient` titik bintang pada `body::before`).

### 5.3 Tipografi
- Heading: Inter Variable 600–700, `letter-spacing: -0.02em`; Body: Inter 400/500; Label kecil/metadata: JetBrains Mono 12–13px uppercase `letter-spacing: .08em`.
- Skala fluid dengan `clamp()`: h1 `clamp(2.25rem, 1.2rem + 4.5vw, 4.25rem)`, h2 `clamp(1.75rem, 1.2rem + 2vw, 2.5rem)`, body 16–18px, line-height 1.6–1.7, lebar baris teks maks `65ch`.

### 5.4 Layout & responsif
- Container `max-width: 1120px`, padding horizontal `clamp(16px, 4vw, 32px)`. Grid CSS dengan `auto-fit/minmax`. Spacing berbasis skala 4/8px, jarak antar-section `clamp(72px, 10vw, 128px)`.
- Breakpoint acuan: 360 / 480 / 768 / 1024 / 1280 / 1536 / 1920+. **Wajib diuji** di: 320×568, 375×812, 390×844, 768×1024, 1024×768, 1280×800, 1440×900, 1920×1080, 2560×1440. Tidak boleh ada horizontal scroll, teks terpotong, atau elemen bertumpuk.
- Layar ultra-lebar: konten tetap di container, tidak melebar tak terkendali.
- Gunakan `dvh`, `safe-area-inset-*`, `min-height`, bukan `100vh` kaku. Target sentuh ≥ 44×44px.
- Gambar: `aspect-ratio`, `width/height` eksplisit (cegah CLS), `loading="lazy"` kecuali hero, `decoding="async"`, `srcset` untuk foto.

---

## 6. Section & Navigasi

Navbar sticky (blur ringan + border bawah tipis), berisi: logo/nama, link anchor, **Language switch (EN | ID)**, tombol sekunder "Download CV". Di mobile: menu hamburger → panel full-height dengan focus trap, tutup dengan Esc/klik di luar. Scrollspy menandai section aktif. Skip-link "Skip to content".

Urutan section (id anchor dalam huruf kecil, bahasa-netral):

1. `#home` — **Hero**
2. `#about` — **About**
3. `#experience` — **Experience**
4. `#projects` — **Projects** (dengan live preview)
5. `#skills` — **Skills**
6. `#certificates` — **Certificates**
7. `#education` — **Education** (dapat digabung visual dengan Organizations di desktop: 2 kolom)
8. `#organizations` — **Leadership & Organizations**
9. `#faq` — **FAQ** (untuk AEO; terlihat oleh pengguna)
10. `#contact` — **Contact**
Footer: nama, tahun otomatis, link sosial, "Back to top", link ke `/id/` atau `/`.

### 6.1 Hero
- Kiri: label mono ("Fullstack Web Developer · Karawang, Indonesia"), `<h1>` nama atau headline (satu saja `<h1>` per halaman), subheadline, 2 CTA: **View Projects** (primer) dan **Contact Me** (sekunder), baris kecil tautan GitHub/LinkedIn.
- Kanan: `foto-diri.webp` dalam bingkai persegi-membulat (radius `--radius-l`, border 1px). Tanpa ring glow. Preload gambar LCP, `fetchpriority="high"`.
- Indikator status kecil (mis. titik hijau kecil statis + "Open to opportunities") **hanya jika** pemilik menghendaki — default: tampilkan `availability` dari `site.ts` dan mudah dimatikan (`availability.show = false`). Jangan menambahkan klaim yang tidak dinyatakan; default `show: false`.

### 6.2 About
Dua kolom: paragraf `about.long` (dipecah 2–3 paragraf pendek) + kartu **Quick Facts** (dasar-data, bukan klaim baru): Role, Based in, Education (S1 Sistem Informasi UBSI), Founder of FlavoryID Technologies, Core stack (Laravel · Next.js · TypeScript · MySQL), Focus (POS F&B, HRMS, e-commerce, PWA, integrasi software–hardware), Languages (Indonesian, English — **hanya jika** pemilik mengonfirmasi; jika tidak, jangan tulis). Tambah ringkasan angka dari data: jumlah project (8), sertifikat (dihitung otomatis dari data), tahun pengalaman (dihitung dari data, tidak di-hardcode).

### 6.3 Experience
Timeline vertikal minimalis (garis 1px, titik kecil). Tiap item: role, perusahaan, periode (mono), deskripsi, dan chip teknologi bila ada. Item Founder FlavoryID tampil sebagai entri tersendiri.

### 6.4 Projects — dengan Live Preview (§8)
### 6.5 Skills
Kartu per kategori (Frontend, Backend, Mobile, Tools, AI Tools) berisi chip netral (border tipis, satu warna). **Tanpa progress bar/persentase** (tidak informatif & tidak ada datanya). Soft skills dalam satu baris chip terpisah.

### 6.6 Certificates — galeri (§9)
### 6.7 Education
Dua kartu sederhana (institusi, program, periode, "Present/Sekarang" untuk yang berjalan).
### 6.8 Organizations
Daftar/grid kecil: peran, lembaga, periode. Kelompokkan "Leadership" (Ketua…) dan "Activities" (anggota/pelatih/panitia).
### 6.9 FAQ (AEO)
6–8 pertanyaan dengan jawaban **langsung di kalimat pertama** (≤ 2–3 kalimat), diambil dari data, mis.:
- *Who is Thomas Lefvi Baehaqi?* / *What does Thomas build?* / *What technologies does he use?* / *What projects has he built?* / *Where is he based?* / *Is he available for freelance or internship?* (jawab hanya dari fakta: pernah freelance & magang; ajak menghubungi via email/WhatsApp) / *How can I contact him?* / *What certifications does he have?*
Gunakan `<details><summary>` (aksesibel, tanpa JS) dan **FAQPage JSON-LD** yang identik dengan teks yang terlihat.
### 6.10 Contact
Kartu kontak yang jelas: Email (mailto), WhatsApp (wa.me, dengan teks "+62 851-7828-6438"), Lokasi (Karawang, Jawa Barat), GitHub, LinkedIn, Website. Tombol "Copy email" dengan umpan balik "Copied" (live region). **Tanpa form backend** (situs statis). Sertakan juga tombol **Download CV** & **Download Portfolio**.

### 6.11 Tombol Download (di Navbar, Hero/Contact, dan Footer)
Lihat §10.

---

## 7. Animasi (profesional, user-friendly, ringan)

Semua animasi hanya menggunakan `transform` dan `opacity`, durasi 200–600ms, easing `cubic-bezier(.2,.7,.2,1)`.

- **Reveal on scroll:** `use:reveal` (IntersectionObserver, sekali jalan, `unobserve` setelah tampil). Fade + translateY 12–16px, **stagger 50–80ms** untuk grid/kartu. Tanpa JS, konten tetap terlihat (progressive enhancement: kelas `.js` pada `<html>` baru menyembunyikan elemen sebelum reveal).
- **Hero:** teks masuk berurutan (fade-up), foto fade + sedikit scale (0.98→1).
- **Navbar:** transisi border/blur saat scroll; underline aktif bergeser halus; menu mobile slide + fade.
- **Hover/focus kartu:** naik 2px + border berubah ke `--border-strong`/aksen; tombol: perubahan warna 150ms.
- **Project selector:** transisi crossfade preview, skeleton saat iframe memuat.
- **Lightbox sertifikat:** fade + scale 0.98→1.
- **Angka ringkas (counter):** boleh, ringan, sekali saat terlihat.
- **Starfield:** lihat §5.2.1.
- **Wajib:** hormati `prefers-reduced-motion` (matikan translate/parallax/twinkle; sisakan fade singkat), tidak ada animasi infinite selain twinkle starfield, tidak ada layout thrash, tidak ada animasi `width/height/top/left/box-shadow`. Gunakan `will-change` seperlunya dan lepas setelah selesai.
- Target: tidak ada long task > 50ms akibat animasi, 60fps di perangkat menengah.

---

## 8. Project Showcase dengan Live Preview (embed)

Pola **master–detail** agar hanya **satu iframe aktif** pada satu waktu (ringan):

- Desktop (≥ 1024px): kiri = daftar 8 project (nama, kategori, stack chip, deskripsi singkat); kanan = **bingkai browser** (address bar menampilkan domain, 3 titik netral abu-abu) berisi preview project terpilih + toolbar: **Desktop / Tablet / Mobile** (mengubah lebar viewport iframe: 1280 / 820 / 390, discale dengan CSS `transform: scale()` agar muat), tombol **Open site ↗** (`target="_blank" rel="noopener noreferrer"`), dan **Reload preview**.
- Mobile/tablet (< 1024px): daftar project berupa kartu horizontal-scroll (snap) atau accordion; preview tampil di bawah kartu terpilih dengan lebar 100% (mode mobile).
- Di bawah preview: deskripsi panjang, peran Thomas, stack, link.

Perilaku iframe:
- `<iframe loading="lazy" referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox" title="Live preview of {name}">`.
- **Baru dimuat saat section masuk viewport** (IntersectionObserver); iframe lama di-unmount saat ganti project. Preload tidak dilakukan.
- Skeleton + spinner kecil saat loading; **timeout 8 detik** atau event error → tampilkan **fallback**: screenshot statis `static/projects/{slug}.webp` + pesan "Live preview unavailable — open the site" + tombol Open site.
- Karena banyak situs menolak di-embed (header `X-Frame-Options` / CSP `frame-ancestors`), **sediakan `embeddable: boolean` per project**. Agent harus mengecek header tiap URL (script kecil `curl -I`) dan mencatat hasilnya di README; project yang memblokir langsung memakai fallback screenshot.
- **Untuk project milik Thomas sendiri** (semua project di atas), README harus memuat instruksi agar ia menambahkan header berikut di masing-masing project agar bisa di-embed oleh portofolio:
  `Content-Security-Policy: frame-ancestors 'self' https://thomaslefvibaehaqi.my.id` (dan hapus `X-Frame-Options: DENY/SAMEORIGIN`).
- `scripts/generate-screenshots.mjs` (Playwright) mengambil screenshot 1280×800 tiap URL → WebP ≤ 120KB. Bila sebuah situs tidak bisa dijangkau saat build, script tidak boleh menggagalkan build (pakai file lama / placeholder netral yang jujur).
- Aksesibilitas: daftar project berupa `role="tablist"`/tombol dengan `aria-selected`; iframe punya `title`; fokus keyboard bisa berpindah antar project dengan panah.
- SEO: konten teks tiap project (nama, deskripsi, link) harus ada di HTML hasil prerender (bukan hanya di iframe).

---

## 9. Galeri Sertifikat

- Grid responsif (`minmax(240px, 1fr)`) berisi kartu: thumbnail (rasio konsisten, `object-fit: cover`, lazy), judul, penerbit, tanggal/tahun, label kategori (satu gaya chip netral), nomor kredensial bila ada.
- Filter sederhana berdasarkan kategori (All / Competency / Course / Workshop / Webinar) + sorting default terbaru → lama. Filter bekerja tanpa reload dan **tidak menghapus konten dari HTML prerender** (sembunyikan dengan atribut `hidden`).
- Klik kartu → **Lightbox**: gambar penuh (atau PDF via `<object>`/`<iframe>` dengan tombol "Open PDF"), judul + metadata, navigasi prev/next (←/→), tutup (Esc, tombol, klik latar), **focus trap**, kembalikan fokus ke pemicu, `role="dialog" aria-modal="true"`, kunci scroll body. Pinch/zoom native tidak diblokir.
- Informasi diambil dari **hasil pembacaan isi sertifikat** (§1), bukan sekadar nama file. Tambahkan `alt` deskriptif ("Certificate: {title}, issued by {issuer}, {date}").
- Teks (judul, penerbit, tahun) harus ada di HTML agar terindeks.

---

## 10. Download CV & Download Portfolio (PDF dari data yang sama)

### 10.1 Perilaku
- Tombol **Download CV** dan **Download Portfolio** tersedia di Navbar, Hero, Contact, dan Footer.
- Klik → mengunduh PDF **sesuai bahasa yang sedang aktif** (EN atau ID). Gunakan `<a href download>` biasa (tanpa JS berat). Nama file: `CV_Thomas_Lefvi_Baehaqi_{EN|ID}.pdf` dan `Portfolio_Thomas_Lefvi_Baehaqi_{EN|ID}.pdf`. Tampilkan ukuran file bila memungkinkan.
- **Versi ID harus identik secara tata letak dan isi dengan PDF terlampir.** Versi EN memakai layout yang sama dengan teks diterjemahkan.
- **Perubahan data di `src/lib/data/*` otomatis tercermin di PDF setelah `npm run build`.** PDF tidak boleh berupa file statis buatan tangan; harus **dirender dari template** yang membaca data yang sama.

### 10.2 Mekanisme (build-time, hasil teks asli — bisa di-select/ATS-friendly)
1. Template HTML/CSS cetak di `src/lib/print/` dan route `src/routes/print/[doc]/[lang]/` (`doc` = `cv|portfolio`, `lang` = `en|id`), `prerender = true`, `<meta name="robots" content="noindex">`, **bukan** bagian navigasi/sitemap, dan `Disallow: /print/` di `robots.txt`.
2. `scripts/generate-pdfs.mjs`: jalankan server statis atas folder `build/`, buka tiap route dengan Playwright Chromium, `page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true })`, simpan ke `build/downloads/` **dan** `static/downloads/` (agar bisa di-commit sebagai fallback bila host tidak mendukung Playwright).
3. `package.json`:
   ```json
   "scripts": {
     "dev": "vite dev",
     "assets": "node scripts/generate-assets.mjs",
     "seo": "node scripts/generate-seo-files.mjs",
     "build": "npm run assets && npm run seo && vite build && node scripts/generate-pdfs.mjs",
     "preview": "vite preview",
     "check": "svelte-check --tsconfig ./tsconfig.json"
   }
   ```
4. Jika Playwright/Chromium tidak tersedia di lingkungan CI (mis. Vercel), script **keluar dengan peringatan jelas (bukan error)** dan memakai PDF terakhir di `static/downloads/`. README menjelaskan: jalankan `npm run build` secara lokal sebelum commit agar PDF selalu segar.
5. Script menguji hasil: CV harus **tepat 1 halaman**; jika lebih, build gagal dengan pesan jelas "CV overflow: kurangi `showInCv` atau perkecil konten". Portfolio dibatasi flow natural (±3 halaman) tanpa kartu/proyek terpotong di tengah (`break-inside: avoid`).

### 10.3 Spesifikasi format **CV** (replikasi PDF `CV_-_Thomas_Lefvi_Baehaqi.pdf`)
- **A4 portrait, 1 halaman, latar putih, teks hitam.** Font sans-serif bersih ala Arial/Helvetica (gunakan **Liberation Sans/Arimo** yang di-embed lokal agar hasil konsisten lintas mesin), ukuran isi ≈ 9.5–10pt, line-height ≈ 1.4. Margin ≈ 11–12mm.
- **Header:** foto `foto-formal.png` persegi (≈ 25–26mm) di kiri (crop `object-fit: cover`, fokus wajah); di kanan: **NAMA** huruf kapital tebal ukuran besar (≈ 22–24pt) dengan `letter-spacing` lebar; di bawahnya role "Fullstack Web Developer" (abu), lalu lokasi, `email | telepon` (dipisah garis tegak), dan baris "Portofolio: {url}" dengan link biru bergaris bawah. Di bawah header: **garis hitam tebal ± 2px** selebar halaman.
- **Judul section** (TENTANG, PENGALAMAN KERJA, PROYEK, PENDIDIKAN, KEMAMPUAN, LISENSI DAN SERTIFIKASI): huruf kapital, tebal, ≈ 9.5pt, `letter-spacing` lebar, diikuti garis hitam 1.5–2px di bawahnya. (EN: ABOUT, WORK EXPERIENCE, PROJECTS, EDUCATION, SKILLS, LICENSES & CERTIFICATIONS.)
- **Item pengalaman:** judul tebal di kiri, **periode rata kanan** (reguler); baris perusahaan *italic*; deskripsi sebagai satu bullet (•).
- **Item proyek:** nama tebal di kiri, domain *italic* rata kanan; satu bullet deskripsi + "Stack: …".
- **Pendidikan:** institusi tebal + periode rata kanan, program *italic* di baris berikut.
- **Kemampuan:** tabel 2 kolom — label tebal (Frontend, Backend, Mobile, Development Tools, AI Tools, Soft Skill) lalu nilai dipisah koma.
- **Sertifikasi:** baris-baris dengan judul tebal kiri dan penerbit *italic* abu rata kanan, dipisah garis tipis abu-abu.
- Isi teks ID **persis** seperti PDF sumber (gunakan varian `about.cv`, "FlavoryID Technology" → ikuti keputusan §4.9 dan catat di README bahwa ini perubahan terhadap sumber; "MineAI" → konstanta `aiName`).
- Tipografi & jarak boleh sedikit disetel agar tepat 1 halaman, namun **hierarki dan komposisi harus tetap sama**.

### 10.4 Spesifikasi format **Portfolio** (replikasi `Portofolio___Thomas_Lefvi_Baehaqi.pdf`)
- **A4 portrait, flow ±3 halaman**, latar putih. Font sans-serif (Inter lokal atau Arimo). Warna: teks utama navy gelap `#0f172a`, teks sekunder abu `#4b5563`, **aksen biru `#2b3cff`** (judul section, nama perusahaan, nama project, role), garis halus `#e2e8f0`.
- **Header:** foto `foto-formal.png` **bulat** (≈ 28mm) dengan **ring biru ≈ 3px** (`#2b3cff`) di kiri; di kanan: **NAMA** besar tebal navy huruf kapital, role biru tebal di bawahnya, lalu grid kontak 2 baris × 3 kolom dengan ikon kecil: email, telepon, lokasi / website, GitHub, LinkedIn. Di bawah header: **garis biru tebal ≈ 3px** selebar halaman. (Website di portfolio = `thomaslefvibaehaqi.my.id`, lihat §4.9.)
- **Judul section** (TENTANG SAYA, PENGALAMAN, PROYEK YANG DISELESAIKAN, PENDIDIKAN, HARD SKILL, SOFT SKILL, ORGANISASI, ALAT FAVORIT, SERTIFIKAT): biru, kapital, tebal, `letter-spacing` lebar, garis tipis abu di bawah.
- **Tentang:** satu paragraf rata kiri-kanan (justify) memakai `about.long`.
- **Pengalaman:** judul tebal navy kiri + periode abu rata kanan; baris perusahaan biru tebal; deskripsi abu.
- **Proyek:** **grid 2 kolom** kartu (border 1px abu muda, radius ≈ 8px, padding ≈ 4mm): nama biru tebal, deskripsi abu, link domain bergaris bawah biru. `break-inside: avoid`. Semua 8 project.
- **Pendidikan:** institusi tebal, "program · periode" di bawahnya.
- **Hard/Soft skill & Alat favorit:** **chip/pill** (border tipis, latar sangat muda) dalam baris yang membungkus.
- **Organisasi:** daftar peran tebal, lembaga di bawahnya, periode rata kanan.
- **Sertifikat:** daftar judul tebal + penerbit; sertakan seluruh sertifikat (`showInPortfolio: true`), termasuk yang baru.
- **Foto yang dipakai: `foto-formal.png`**, bukan `foto-diri.webp`.
- Beri nomor halaman kecil di footer (mis. "Thomas Lefvi Baehaqi — 1/3") hanya jika tidak mengubah komposisi; jangan menyertakan header/footer URL browser.

### 10.5 Pencocokan visual
Setelah PDF dihasilkan, agent merender halaman PDF ID menjadi gambar dan **membandingkannya dengan PDF sumber** (mata + checklist di atas). Perbedaan tata letak yang mencolok harus diperbaiki sebelum menyatakan selesai.

---

## 11. Internasionalisasi (default: English)

- Dua halaman prerender terpisah demi SEO: **`/` = English (default)**, **`/id/` = Indonesia**. `<html lang="en">` / `<html lang="id">`.
- **Language switch** (EN | ID) di navbar & footer: berupa **link biasa** ke `/` atau `/id/` yang mempertahankan hash section (`/id/#projects`). Pilihan disimpan di `localStorage`; **tidak ada redirect otomatis** dari `/` berdasarkan bahasa browser (agar crawler & share link stabil). Opsional: banner kecil non-intrusif menyarankan Indonesia bila `navigator.language` diawali `id`, dapat ditutup.
- Semua string UI di `data/ui.ts`; semua konten di data bertipe `{en, id}` — **kompilasi TypeScript gagal jika ada terjemahan yang hilang** (tipe `Localized`).
- `<link rel="alternate" hreflang="en" href="https://thomaslefvibaehaqi.my.id/">`, `hreflang="id"` → `/id/`, dan `hreflang="x-default"` → `/`. Canonical per halaman mengarah ke dirinya sendiri.
- Format tanggal mengikuti locale (`Intl.DateTimeFormat`), mis. "May 2026 – Jul 2026" vs "Mei 2026 – Juli 2026".
- Tombol Download menyesuaikan bahasa aktif (§10.1).

---

## 12. SEO, GEO, AEO

### 12.1 SEO teknis (semua halaman prerendered penuh, konten ada di HTML tanpa JS)
- `<title>` (≤ 60 karakter): EN: `Thomas Lefvi Baehaqi — Fullstack Web Developer | Laravel, Next.js` ; ID: `Thomas Lefvi Baehaqi — Fullstack Web Developer | Laravel, Next.js`.
- `<meta name="description">` (≤ 160 karakter) per bahasa, memuat nama, role, stack, kota.
- `<link rel="canonical">`, `<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">`, `theme-color` (`#050816`), `viewport`, `color-scheme`.
- Semantik HTML: `<header> <nav> <main> <section aria-labelledby> <article> <footer>`, **satu `<h1>`**, hierarki heading rapi, `alt` pada semua gambar, link bermakna (bukan "klik di sini").
- `sitemap.xml` (dengan `xhtml:link` hreflang, `lastmod` dari tanggal build), `robots.txt`, `site.webmanifest`, favicon lengkap (`favicon.ico`, `favicon.svg`/`.png` 32, `apple-touch-icon` 180, `icon-192`, `icon-512`) **dibuat dari `foto-diri.webp`** (crop persegi berpusat wajah).
- Performa = SEO: target Lighthouse mobile **Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100**; LCP < 2.0s, CLS < 0.05, INP < 200ms; JS awal (gzip) sebisa mungkin < 90KB; tidak ada render-blocking selain CSS kritis.
- Header keamanan & cache (file `vercel.json` **dan** `_headers` untuk Netlify/Cloudflare Pages): aset hashed `Cache-Control: public, max-age=31536000, immutable`; HTML `max-age=0, must-revalidate`; `X-Content-Type-Options: nosniff`; `Referrer-Policy: strict-origin-when-cross-origin`; `Permissions-Policy` minimal. **Jangan** mengatur CSP yang memblokir iframe project (`frame-src https:` harus diizinkan).

### 12.2 Structured data (JSON-LD, dihasilkan dari data via komponen `<JsonLd>`)
Satu `@graph` per halaman:
- `WebSite` (name, url, `inLanguage`), `ProfilePage` (`mainEntity` → Person).
- `Person`: `name`, `jobTitle`, `description`, `url`, `image` (URL absolut `foto-diri.webp`), `email`, `telephone`, `address` (Karawang, Jawa Barat, ID), `sameAs` [GitHub, LinkedIn], `alumniOf` (UBSI — `EducationalOrganization`), `worksFor`/`founder` → `Organization` FlavoryID Technologies, `knowsAbout` [daftar skill], `hasCredential` [sertifikat sebagai `EducationalOccupationalCredential`].
- `Organization` FlavoryID Technologies (founder: Thomas).
- `ItemList` project → tiap item `SoftwareApplication`/`WebApplication` (`name`, `url`, `description`, `applicationCategory`, `creator`).
- `FAQPage` (identik dengan FAQ yang terlihat).
- `BreadcrumbList` sederhana.
- Validasi JSON-LD sah (tidak ada field mengarang). Jangan menambahkan `aggregateRating`/`review`.

### 12.3 GEO / AEO (agar AI chatbot & answer engine mengutip dengan benar)
- **Entity-first copy:** kalimat pembuka halaman dan Hero/About menyebut jelas *siapa, melakukan apa, di mana, dengan apa* dalam bahasa lugas (mudah diekstrak).
- **Quick Facts + FAQ** berformat Q→A langsung (jawaban di kalimat pertama), konsisten dengan JSON-LD.
- **`/llms.txt`** (ringkas, markdown: nama, ringkasan, tautan ke bagian penting & project) dan **`/llms-full.txt`** (profil lengkap + semua project, pengalaman, sertifikat, kontak) — **dihasilkan otomatis dari data** oleh `scripts/generate-seo-files.mjs`, dua bahasa (`/llms.txt` EN, `/id/llms.txt` ID atau section ID di dalam file yang sama).
- **`robots.txt`** mengizinkan crawler AI & search: `Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, Bytespider (opsional)`, plus `Sitemap:` absolut; `Disallow: /print/`.
- Fakta konsisten di semua tempat (nama, role, email, link) — satu sumber data menjamin ini.
- Tautan keluar ke profil tepercaya (GitHub, LinkedIn) lewat `sameAs` dan di Contact.
- Tambahkan `<meta name="author">`, `<meta name="keywords">` (opsional, ringan), dan `rel="me"` pada link GitHub/LinkedIn.
- `last updated` terlihat di footer (tanggal build) dan di `llms.txt`.

### 12.4 Preview saat dibagikan (Open Graph / Twitter / WhatsApp / LinkedIn / Telegram)
Pada setiap halaman:
```html
<meta property="og:type" content="profile">
<meta property="og:site_name" content="Thomas Lefvi Baehaqi">
<meta property="og:title"       content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:url"         content="{canonical}">
<meta property="og:image"       content="https://thomaslefvibaehaqi.my.id/foto-diri.webp">
<meta property="og:image:type"  content="image/webp">
<meta property="og:image:width" content="{w}"><meta property="og:image:height" content="{h}">
<meta property="og:image:alt"   content="Portrait of Thomas Lefvi Baehaqi">
<meta property="og:locale" content="en_US">  <!-- id_ID untuk /id/ ; sertakan og:locale:alternate -->
<meta property="profile:first_name" content="Thomas"><meta property="profile:last_name" content="Lefvi Baehaqi">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}"><meta name="twitter:description" content="{description}">
<meta name="twitter:image" content="https://thomaslefvibaehaqi.my.id/foto-diri.webp">
```
- Gambar share **harus `foto-diri.webp`** (URL absolut). Karena sebagian crawler (mis. beberapa versi WhatsApp/LinkedIn) tidak konsisten menampilkan WebP, **tambahkan fallback `og:image` kedua** berupa `og-image.jpg` (1200×630, turunan `foto-diri.webp` dengan latar `--bg`, ukuran < 300KB). Urutan tag: `foto-diri.webp` dulu, `og-image.jpg` sesudahnya. Dokumentasikan di README.
- Pastikan semua URL absolut memakai domain produksi (dari `site.ts`), bukan `localhost`.

---

## 13. Aksesibilitas (WCAG 2.2 AA)
- Kontras teks ≥ 4.5:1 (UI ≥ 3:1), fokus terlihat jelas (`outline: 2px solid var(--focus); outline-offset: 2px`), navigasi penuh dengan keyboard, urutan tab logis, `aria-current` pada link aktif, `aria-live` untuk "Copied", lightbox/menu dengan focus trap, `prefers-reduced-motion`, `lang` benar, ukuran target sentuh memadai, `alt` bermakna, label tombol ikon (`aria-label`), tidak ada informasi hanya lewat warna.

---

## 14. Build, Verifikasi & Deploy

### 14.1 Urutan kerja Agent
1. `ls -R` direktori; baca PDF CV & Portfolio; inventarisasi + baca semua sertifikat; periksa `foto-diri.webp` & `foto-formal.png`.
2. Scaffold SvelteKit (TypeScript, adapter-static). Instal dependency.
3. Tulis **data** (en+id) terlebih dahulu → tipe → komponen → halaman → print templates → script build.
4. `npm run check` (0 error), `npm run build` (sukses), `npm run preview`.
5. Uji di browser (Playwright/Antigravity browser): semua breakpoint §5.4, bahasa EN & ID, tombol download (file terunduh & terbuka), lightbox, project preview (termasuk skenario fallback), keyboard nav, reduced-motion.
6. Jalankan Lighthouse (mobile) & perbaiki sampai target §12.1 tercapai.
7. Validasi: JSON-LD (schema.org validator/`ajv` sederhana), sitemap/robots, hreflang, OG tags, `llms.txt`.
8. Tulis `README.md` (edit data, build, deploy, header embed project, catatan data & keputusan §4.9, hasil uji ringkas).
9. Pastikan output akhir ada di `build/` dan **siap deploy** (§14.2).

### 14.2 Deploy
- Output statis: folder `build/`. Konfigurasi siap pakai untuk **Vercel** (`vercel.json`: `buildCommand`, `outputDirectory: "build"`, `cleanUrls`, `trailingSlash: true`, headers) dan **Cloudflare Pages/Netlify** (`_headers`, `_redirects` bila perlu).
- Domain: `thomaslefvibaehaqi.my.id` (jangan hardcode `localhost`/`vercel.app` di meta, sitemap, JSON-LD).
- README menyertakan: langkah deploy, cara memasang domain, dan cara submit sitemap ke Google Search Console & Bing Webmaster Tools.

---

## 15. Larangan (Anti "AI-Slop")

- ❌ Glow/neon, `box-shadow` berwarna, gradient teks, tombol/teks warna-warni, rainbow gradient, orb/blob melayang, grid-background berkedip, partikel berat, emoji sebagai ikon, ilustrasi 3D generik, glassmorphism di mana-mana, kartu miring/3D tilt, kursor kustom, efek typewriter berulang, counter berlebihan.
- ❌ Copywriting klise ("passionate", "cutting-edge", "seamless", "revolutionize", "elevate"), klaim tanpa dasar, angka karangan, testimoni palsu.
- ❌ Lebih dari **satu warna aksen**; lebih dari dua gaya tombol; lebih dari dua keluarga font.
- ❌ Library besar/tidak perlu; CDN pihak ketiga untuk font/ikon/script.
- ❌ Konten hanya di dalam iframe/canvas/JS (harus ada di HTML).
- ❌ Placeholder, lorem ipsum, link `#` mati, gambar rusak, TODO tertinggal.

---

## 16. Definition of Done (checklist akhir)

- [ ] `npm run check` bersih dan `npm run build` sukses; `build/` siap deploy.
- [ ] `/` (EN, default) dan `/id/` (ID) tampil lengkap; switch bahasa menjaga posisi section.
- [ ] Semua section §6 ada, tanpa horizontal scroll di 320–2560px; tampilan rapi di mobile, tablet, desktop, ultrawide.
- [ ] Tema galaxy dark blue konsisten, satu aksen, tanpa elemen terlarang §15.
- [ ] Animasi halus, ringan, patuh `prefers-reduced-motion`; Starfield pause saat tab tersembunyi.
- [ ] 8 project tampil dengan live preview (Desktop/Tablet/Mobile) + fallback screenshot + tombol Open site; hanya 1 iframe aktif.
- [ ] Semua sertifikat dari direktori (termasuk yang baru) tampil dengan data hasil pembacaan isi sertifikat; lightbox aksesibel.
- [ ] Tombol **Download CV** & **Download Portfolio** menghasilkan PDF yang **dirender dari data**; PDF ID identik layout dengan file terlampir; CV tepat 1 halaman; PDF EN tersedia.
- [ ] Mengubah data (mis. mengganti satu deskripsi project atau menambah sertifikat) lalu `npm run build` → situs, CV, Portfolio, JSON-LD, `llms.txt`, sitemap ikut berubah (buktikan dengan satu uji nyata dan jelaskan di README).
- [ ] Info kontak lengkap & benar (§4.1); WhatsApp/email/telepon berfungsi.
- [ ] SEO/GEO/AEO: title, description, canonical, hreflang, JSON-LD valid, FAQ, `llms.txt`, `robots.txt` (izinkan crawler AI), `sitemap.xml`, favicon dari `foto-diri.webp`.
- [ ] Preview share: OG/Twitter memakai `foto-diri.webp` (+ fallback `og-image.jpg`), URL absolut `https://thomaslefvibaehaqi.my.id/`.
- [ ] Lighthouse mobile ≥ 95 untuk Performance/Accessibility/Best Practices dan SEO 100.
- [ ] README lengkap termasuk "Catatan data" (ketidakkonsistenan sumber, keputusan default, item yang tidak terbaca/ambigu).
