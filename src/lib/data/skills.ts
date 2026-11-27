import type { Localized } from "$lib/i18n";

export interface SkillCategory {
  name: Localized;
  items: string[];
}

export interface HardSkillGroup {
  title: Localized;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: { en: "Frontend", id: "Frontend" },
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "Bootstrap",
      "Tailwind CSS",
      "React.js",
      "Next.js",
    ],
  },
  {
    name: { en: "Backend", id: "Backend" },
    items: [
      "PHP",
      "Python",
      "Laravel",
      "CodeIgniter (CI)",
      "Node.js",
      "REST API",
      "MySQL",
      "phpMyAdmin",
    ],
  },
  {
    name: { en: "Mobile", id: "Mobile" },
    items: ["Flutter", "Dart"],
  },
  {
    name: { en: "Development Tools", id: "Development Tools" },
    items: [
      "Git",
      "GitHub",
      "Docker",
      "Figma",
      "Vercel",
      "Cloudflare",
      "VSCode",
      "Laragon",
      "Ngrok",
    ],
  },
  {
    name: { en: "AI Tools", id: "AI Tools" },
    items: ["Claude", "Google Gemini", "GitHub Copilot", "Kiro IDE"],
  },
];

export const softSkills: Localized<string[]> = {
  en: [
    "Problem Solving",
    "Analytical Thinking",
    "Teamwork",
    "Leadership",
    "Time Management",
    "Communication",
    "Public Speaking",
    "Innovative",
    "Creative",
    "Detail Oriented",
  ],
  id: [
    "Pemecahan Masalah",
    "Berpikir Analitis",
    "Kerja Tim",
    "Kepemimpinan",
    "Manajemen Waktu",
    "Komunikasi",
    "Berbicara di Depan Umum",
    "Inovatif",
    "Kreatif",
    "Cermat & Teliti",
  ],
};

// Hard Skills as formatted in reference Portfolio PDF
export const portfolioHardSkills: Localized<string[]> = {
  en: [
    "Frontend Development",
    "Backend Development",
    "Database Management",
    "System Integration",
    "Mobile App Basics",
    "Deployment & Cloud",
  ],
  id: [
    "Frontend Development",
    "Backend Development",
    "Database Management",
    "System Integration",
    "Mobile App Basics",
    "Deployment & Cloud",
  ],
};

export const favoriteTools: string[] = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "PHP",
  "Python",
  "MySQL",
  "Laravel",
  "CodeIgniter (CI)",
  "Next.js",
  "Bootstrap",
  "Tailwind CSS",
  "Flutter",
  "Dart",
  "Node.js",
  "React.js",
  "GitHub",
  "Docker",
  "VSCode",
  "Figma",
  "Laragon",
  "Vercel",
  "Cloudflare",
  "Ngrok",
  "Gemini AI",
  "Claude AI",
];
