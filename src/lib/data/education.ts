import type { Localized } from "$lib/i18n";

export interface EducationItem {
  institution: string;
  degree: Localized;
  field: Localized;
  period: Localized;
  current: boolean;
  showInCv: boolean;
  showInPortfolio: boolean;
  showOnWeb: boolean;
}

export const educationList: EducationItem[] = [
  {
    institution: "Universitas Bina Sarana Informatika",
    degree: {
      en: "Bachelor's Degree in Information Systems",
      id: "S1 Sistem Informasi",
    },
    field: {
      en: "Information Systems",
      id: "Sistem Informasi",
    },
    period: {
      en: "2024 – Present",
      id: "2024 – Sekarang",
    },
    current: true,
    showInCv: true,
    showInPortfolio: true,
    showOnWeb: true,
  },
  {
    institution: "SMK Plus Al Azhar Mariuk",
    degree: {
      en: "Vocational High School Diploma",
      id: "Otomatisasi Tata Kelola Perkantoran",
    },
    field: {
      en: "Office Automation and Governance",
      id: "Otomatisasi Tata Kelola Perkantoran",
    },
    period: {
      en: "2021 – 2024",
      id: "2021 – 2024",
    },
    current: false,
    showInCv: true,
    showInPortfolio: true,
    showOnWeb: true,
  },
];
