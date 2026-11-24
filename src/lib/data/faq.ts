import type { Localized } from "$lib/i18n";

export interface FaqItem {
  id: string;
  question: Localized;
  answer: Localized;
}

export const faqs: FaqItem[] = [
  {
    id: "who-is-thomas",
    question: {
      en: "Who is Thomas Lefvi Baehaqi?",
      id: "Siapa itu Thomas Lefvi Baehaqi?",
    },
    answer: {
      en: "Thomas Lefvi Baehaqi is an Information Systems student and Fullstack Web Developer based in Karawang, West Java, Indonesia. He is the Founder of FlavoryID Technologies and builds business-driven digital solutions ranging from POS systems to modern e-commerce.",
      id: "Thomas Lefvi Baehaqi adalah mahasiswa Sistem Informasi dan Fullstack Web Developer yang berdomisili di Karawang, Jawa Barat. Ia merupakan Founder FlavoryID Technologies yang berfokus membangun solusi digital bernilai bisnis nyata mulai dari sistem kasir POS hingga e-commerce modern.",
    },
  },
  {
    id: "what-does-thomas-build",
    question: {
      en: "What kind of digital products does Thomas build?",
      id: "Produk digital apa saja yang dibangun oleh Thomas?",
    },
    answer: {
      en: "Thomas develops end-to-end web applications including F&B Point of Sale (POS) systems, Human Resource Management Systems (HRMS), e-commerce platforms, Progressive Web Apps (PWAs), and software-hardware integrations.",
      id: "Thomas mengembangkan aplikasi web end-to-end meliputi sistem POS/Kasir F&B, Human Resource Management System (HRMS), platform e-commerce, Progressive Web Apps (PWA), serta integrasi perangkat lunak dengan perangkat keras.",
    },
  },
  {
    id: "technologies-used",
    question: {
      en: "What technologies does Thomas specialize in?",
      id: "Teknologi apa saja yang dikuasai oleh Thomas?",
    },
    answer: {
      en: "His core technology stack comprises Laravel, Next.js, TypeScript, PHP, MySQL, and modern JavaScript, complemented by tools like Git, Vercel, and Cloudflare alongside modern AI-assisted workflows.",
      id: "Keahlian utamanya berpusat pada Laravel, Next.js, TypeScript, PHP, MySQL, dan JavaScript modern, didukung perkakas pengembangan seperti Git, Vercel, Cloudflare, serta alur kerja AI-assisted development modern.",
    },
  },
  {
    id: "notable-projects",
    question: {
      en: "What are some notable projects built by Thomas?",
      id: "Apa saja proyek unggulan yang telah diselesaikan oleh Thomas?",
    },
    answer: {
      en: "Key projects include Flavory.id (an F&B POS with AI analytics), Key.Flavory.id (an HRMS for MSMEs), Supermura.id (a fashion e-commerce platform built as a freelance developer), and Imkompres (an entirely in-browser media compression tool).",
      id: "Proyek utamanya meliputi Flavory.id (POS F&B dengan analitik AI), Key.Flavory.id (HRMS UMKM), Supermura.id (e-commerce fashion yang dikerjakan secara freelance), serta Imkompres (utilitas kompresi media lokal di browser).",
    },
  },
  {
    id: "location",
    question: {
      en: "Where is Thomas Lefvi Baehaqi located?",
      id: "Di mana domisili Thomas Lefvi Baehaqi?",
    },
    answer: {
      en: "Thomas is based in Karawang, West Java, Indonesia, and works effectively in both remote and hybrid development environments.",
      id: "Thomas berdomisili di Karawang, Jawa Barat, Indonesia, dan terbiasa bekerja secara remote (WFH) maupun hybrid.",
    },
  },
  {
    id: "availability",
    question: {
      en: "Is Thomas available for freelance or development work?",
      id: "Apakah Thomas menerima proyek freelance atau peluang kerja?",
    },
    answer: {
      en: "Yes, with verified experience in freelance fullstack delivery and IT developer internships, Thomas is open to discussing high-impact freelance projects and development opportunities via email or WhatsApp.",
      id: "Ya, dengan pengalaman kerja freelance dan magang IT Developer yang terverifikasi, Thomas terbuka mendiskusikan peluang proyek web dan kolaborasi pengembangan melalui email atau WhatsApp.",
    },
  },
  {
    id: "how-to-contact",
    question: {
      en: "How can I contact Thomas Lefvi Baehaqi?",
      id: "Bagaimana cara menghubungi Thomas Lefvi Baehaqi?",
    },
    answer: {
      en: "You can reach Thomas directly via email at thomaslefvibaehaqi@gmail.com or via WhatsApp at +62 851-7828-6438.",
      id: "Anda dapat menghubungi Thomas langsung melalui email di thomaslefvibaehaqi@gmail.com atau melalui WhatsApp di nomor +62 851-7828-6438.",
    },
  },
  {
    id: "certifications",
    question: {
      en: "What certifications does Thomas hold?",
      id: "Sertifikasi apa saja yang dimiliki oleh Thomas?",
    },
    answer: {
      en: "Thomas holds national BNSP certification as a Database Administrator, advanced database competency from PT Jidoka System Indonesia, Junior Web Developer certification from Komdigi Digital Talent Scholarship, and multiple credentials from Dicoding, BISA.AI, and Hacktiv8.",
      id: "Thomas memiliki sertifikasi kompetensi nasional BNSP Database Administrator, Uji Kompetensi Basis Data Advance dari PT Jidoka System Indonesia, sertifikasi Junior Web Developer dari Komdigi Digital Talent Scholarship, serta lisensi Dicoding, BISA.AI, dan Hacktiv8.",
    },
  },
];
