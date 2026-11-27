import type { Localized } from "$lib/i18n";

export interface ExperienceItem {
  id: string;
  role: Localized;
  company: string;
  companyDisplay: Localized;
  period: Localized;
  location: Localized;
  type: Localized;
  description: Localized;
  bullets?: Localized<string[]>;
  technologies?: string[];
  showInCv: boolean;
  showInPortfolio: boolean;
  showOnWeb: boolean;
}

export const experiences: ExperienceItem[] = [
  {
    id: "diskominfo",
    role: {
      en: "Software Developer (Internship)",
      id: "Software Developer (Magang)",
    },
    company: "Diskominfo Kabupaten Karawang",
    companyDisplay: {
      en: "Diskominfo Kabupaten Karawang",
      id: "Diskominfo Kabupaten Karawang",
    },
    period: {
      en: "Aug 2026 – Nov 2026",
      id: "Agustus 2026 – November 2026",
    },
    location: {
      en: "Karawang, West Java",
      id: "Karawang, Jawa Barat",
    },
    type: {
      en: "Internship",
      id: "Magang",
    },
    description: {
      en: "Designed and built a document automation system (file generation) to solve the problem of manual document creation with thousands of records, a process that previously took weeks, now completed in minutes.",
      id: "Merancang dan membangun sistem otomatisasi pembuatan dokumen (generate file) untuk menyelesaikan masalah pembuatan dokumen manual dengan ribuan data yang memakan waktu berminggu-minggu, sehingga prosesnya kini hanya hitungan menit.",
    },
    technologies: ["Laravel", "PHP", "MySQL", "JavaScript"],
    showInCv: true,
    showInPortfolio: true,
    showOnWeb: true,
  },
  {
    id: "farkatech",
    role: {
      en: "IT Developer (Internship)",
      id: "IT Developer (Magang)",
    },
    company: "PT. Farkatech International Nexus",
    companyDisplay: {
      en: "PT. Farkatech International Nexus",
      id: "PT. Farkatech International Nexus",
    },
    period: {
      en: "May 2026 – Jul 2026",
      id: "Mei 2026 – Juli 2026",
    },
    location: {
      en: "Remote (WFH)",
      id: "WFH",
    },
    type: {
      en: "Internship",
      id: "Magang",
    },
    description: {
      en: "Remote internship as IT Developer. Independently assigned each month to architect, develop, and deliver commercial-grade, market-ready web applications from concept to production.",
      id: "Magang WFH sebagai IT Developer. Setiap bulan ditugaskan membangun satu aplikasi siap jual secara mandiri, mulai dari perencanaan, pengembangan, hingga delivery.",
    },
    technologies: ["Laravel", "PHP", "MySQL", "JavaScript"],
    showInCv: true,
    showInPortfolio: true,
    showOnWeb: true,
  },
  {
    id: "supermura",
    role: {
      en: "Fullstack Web Developer & Deployment",
      id: "Fullstack Web Developer & Deployment",
    },
    company: "PT Bryclo Mega Jaya",
    companyDisplay: {
      en: "Freelance – E-Commerce Supermura.id · PT Bryclo Mega Jaya",
      id: "Freelance – E-Commerce Supermura.id · PT Bryclo Mega Jaya",
    },
    period: {
      en: "Feb – Apr 2026",
      id: "Feb – Apr 2026",
    },
    location: {
      en: "Indonesia",
      id: "Indonesia",
    },
    type: {
      en: "Freelance",
      id: "Freelance",
    },
    description: {
      en: "Led full-cycle development and deployment of the Supermura.id e-commerce platform end-to-end, including core feature architecture, payment gateway integration, and production stability assurance.",
      id: "Bertanggung jawab penuh atas pengembangan dan deployment platform e-commerce Supermura.id secara end-to-end, meliputi arsitektur fitur inti, integrasi sistem pembayaran, dan memastikan stabilitas di lingkungan produksi.",
    },
    technologies: ["Laravel", "MySQL", "Payment Gateway", "Bootstrap"],
    showInCv: true,
    showInPortfolio: true,
    showOnWeb: true,
  },
];
