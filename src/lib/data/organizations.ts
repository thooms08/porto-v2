import type { Localized } from '$lib/i18n';

export interface OrganizationItem {
	role: Localized;
	institution: string;
	period: string;
	type: 'leadership' | 'activity';
	showInCv: boolean;
	showInPortfolio: boolean;
	showOnWeb: boolean;
}

export const organizations: OrganizationItem[] = [
	{
		role: {
			en: 'Team Leader – TRIA NOVA (Web Application Competition)',
			id: 'Team Leader TRIA NOVA (Lomba Web Application)'
		},
		institution: 'Tim Kompetisi Lomba Web Application',
		period: 'Sekarang – Januari 2027',
		type: 'leadership',
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		role: {
			en: 'Head of Boarding School Committee',
			id: 'Ketua Pengurus Pondok Pesantren'
		},
		institution: 'PP. Al-Azhar Mariuk',
		period: '2023 – 2024',
		type: 'leadership',
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		role: {
			en: 'Head of Marching Band',
			id: 'Ketua Marching Band'
		},
		institution: 'PP. Al-Azhar Mariuk',
		period: '2023 – 2024',
		type: 'leadership',
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		role: {
			en: 'Head of Hadroh Ensemble',
			id: 'Ketua Hadroh'
		},
		institution: 'PP. Al-Azhar Mariuk',
		period: '2023 – 2024',
		type: 'leadership',
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		role: {
			en: 'Event Committee Chairman (IMTIHAN / Graduation)',
			id: 'Ketua Panitia Acara IMTIHAN/Khataman'
		},
		institution: 'PP. Al-Azhar Mariuk',
		period: '2023',
		type: 'leadership',
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		role: {
			en: 'Performing Arts & Hadroh Trainer',
			id: 'Pelatih Pentas Seni & Hadroh'
		},
		institution: 'SMP Plus Al-Azhar Mariuk & MIN 2 Subang',
		period: '2022 – 2024',
		type: 'activity',
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		role: {
			en: 'Flag Troop (Paskibra) Member',
			id: 'Anggota Paskibra'
		},
		institution: 'SMK Plus Al-Azhar Mariuk',
		period: '2022 – 2023',
		type: 'activity',
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		role: {
			en: 'Scout Member (Pramuka)',
			id: 'Anggota Pramuka'
		},
		institution: 'SMK Plus Al-Azhar Mariuk',
		period: '2022 – 2023',
		type: 'activity',
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		role: {
			en: 'Scout Rally (Gema Pramuka) Committee Member',
			id: 'Anggota Panitia Gema Pramuka'
		},
		institution: 'Kec. Tambak Dahan, Kab. Subang',
		period: '2023',
		type: 'activity',
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	}
];
