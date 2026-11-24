import type { Localized } from "$lib/i18n";

export interface DokumentasiItem {
  slug: string;
  label: Localized;
  thumb: string;
  full: string;
  width: number;
  height: number;
}

export const dokumentasiList: DokumentasiItem[] = [
  {
    slug: "dokumentasi-1",
    label: {
      en: "Internship at Diskominfo Karawang 2026",
      id: "Magang di Diskominfo Pemda Karawang 2026",
    },
    thumb: "/dokumentasi/dokumentasi-1-thumb.webp",
    full: "/dokumentasi/dokumentasi-1.webp",
    width: 1200,
    height: 1599,
  },
  {
    slug: "dokumentasi-2",
    label: {
      en: "Workshop Website Pro 2026",
      id: "Workshop Website Pro 2026",
    },
    thumb: "/dokumentasi/dokumentasi-2-thumb.webp",
    full: "/dokumentasi/dokumentasi-2.webp",
    width: 1200,
    height: 678,
  },
  {
    slug: "dokumentasi-3",
    label: {
      en: "Socialization at MAN 2 Karawang 2026",
      id: "Sosialisasi di MAN 2 Karawang 2026",
    },
    thumb: "/dokumentasi/dokumentasi-3-thumb.webp",
    full: "/dokumentasi/dokumentasi-3.webp",
    width: 1200,
    height: 675,
  },
  {
    slug: "dokumentasi-4",
    label: {
      en: "Best Student Award 2024",
      id: "Penghargaan Siswa Terapih 2024",
    },
    thumb: "/dokumentasi/dokumentasi-4-thumb.webp",
    full: "/dokumentasi/dokumentasi-4.webp",
    width: 1200,
    height: 800,
  },
  {
    slug: "dokumentasi-5",
    label: {
      en: "Class of 2024 Representative at Graduation Ceremony 2023",
      id: "Perwakilan Angkatan 2024 di Acara Kelulusan Angkatan 2023",
    },
    thumb: "/dokumentasi/dokumentasi-5-thumb.webp",
    full: "/dokumentasi/dokumentasi-5.webp",
    width: 864,
    height: 1296,
  },
  {
    slug: "dokumentasi-6",
    label: {
      en: "Handover of Boarding School Committee Chair, PP. Al-Azhar 2023",
      id: "Serah Terima Jabatan Ketua Pengurus Ponpes Al-Azhar 2023",
    },
    thumb: "/dokumentasi/dokumentasi-6-thumb.webp",
    full: "/dokumentasi/dokumentasi-6.webp",
    width: 900,
    height: 1600,
  },
  {
    slug: "dokumentasi-7",
    label: {
      en: "Marching Band Activity, PP. Al-Azhar 2023",
      id: "Kegiatan Marching Band Ponpes Al-Azhar 2023",
    },
    thumb: "/dokumentasi/dokumentasi-7-thumb.webp",
    full: "/dokumentasi/dokumentasi-7.webp",
    width: 1200,
    height: 675,
  },
  {
    slug: "dokumentasi-8",
    label: {
      en: "Hadroh Trainer Documentation, MIN 2 Subang 2023",
      id: "Dokumentasi Pelatih Hadroh MIN 2 Subang 2023",
    },
    thumb: "/dokumentasi/dokumentasi-8-thumb.webp",
    full: "/dokumentasi/dokumentasi-8.webp",
    width: 1200,
    height: 675,
  },
  {
    slug: "dokumentasi-9",
    label: {
      en: "Gema Pramuka Scout Rally Committee, Tambakdahan 2022",
      id: "Panitia Gema Pramuka Tambakdahan 2022",
    },
    thumb: "/dokumentasi/dokumentasi-9-thumb.webp",
    full: "/dokumentasi/dokumentasi-9.webp",
    width: 1200,
    height: 697,
  },
  {
    slug: "dokumentasi-10",
    label: {
      en: "Persami Scout Overnight Camp Committee, MIN 2 Subang 2022",
      id: "Panitia Persami MIN 2 Subang 2022",
    },
    thumb: "/dokumentasi/dokumentasi-10-thumb.webp",
    full: "/dokumentasi/dokumentasi-10.webp",
    width: 720,
    height: 672,
  },
];
