import type { Localized } from '$lib/i18n';

export type CertificateCategory = 'competency' | 'course' | 'workshop' | 'webinar';

export interface CertificateItem {
	id: string;
	title: Localized;
	issuer: string;
	issuerDisplay: Localized;
	date: string; // ISO format or year
	displayDate: Localized;
	credentialId?: string;
	category: CertificateCategory;
	file: string; // relative to /certificates/
	thumb: string; // relative to /certificates/
	type: 'image' | 'pdf';
	skills?: string[];
	description?: Localized;
	showInCv: boolean;
	showInPortfolio: boolean;
	showOnWeb: boolean;
}

export const certificates: CertificateItem[] = [
	{
		id: 'bnsp-database-administrator',
		title: {
			en: 'Database Administrator Competence Certificate',
			id: 'Sertifikat Kompetensi Database Administrator'
		},
		issuer: 'Badan Nasional Sertifikasi Profesi (BNSP) & LSP UBSI',
		issuerDisplay: {
			en: 'BNSP & LSP UBSI',
			id: 'BNSP & LSP UBSI'
		},
		date: '2026-03-06',
		displayDate: {
			en: 'March 6, 2026',
			id: '06 Maret 2026'
		},
		credentialId: '63120 2521 6 0000214 2026',
		category: 'competency',
		file: 'sertifikat-kompetensi-database-administrator.webp',
		thumb: 'sertifikat-kompetensi-database-administrator-thumb.webp',
		type: 'image',
		skills: ['Database Administration', 'SQL', 'Data Management'],
		showInCv: true,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		id: 'jidoka-database-advance',
		title: {
			en: 'Database Competency Assessment – Advanced',
			id: 'Uji Kompetensi Basis Data – Advance'
		},
		issuer: 'PT Jidoka System Indonesia',
		issuerDisplay: {
			en: 'PT Jidoka System Indonesia',
			id: 'PT Jidoka System Indonesia'
		},
		date: '2025-07-01',
		displayDate: {
			en: 'July 1, 2025',
			id: '1 Juli 2025'
		},
		category: 'competency',
		file: 'sertifikat-uji-kompetensi-basis-data-advance.webp',
		thumb: 'sertifikat-uji-kompetensi-basis-data-advance-thumb.webp',
		type: 'image',
		skills: ['Database Optimization', 'Relational Database Design', 'SQL'],
		showInCv: true,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		id: 'dts-junior-web-developer',
		title: {
			en: 'Fundamental Junior Web Developer',
			id: 'Fundamental Junior Web Developer'
		},
		issuer: 'Komdigi - Digital Talent Scholarship 2025',
		issuerDisplay: {
			en: 'Digital Talent Scholarship 2025',
			id: 'Digital Talent Scholarship 2025'
		},
		date: '2025-08-16',
		displayDate: {
			en: 'August 16, 2025',
			id: '16 Agustus 2025'
		},
		credentialId: '19310734840-9/VSGA/BLSDM.Komdigi/2025',
		category: 'course',
		file: 'sertifikat-fundamental-junior-web-developer.pdf',
		thumb: 'sertifikat-fundamental-junior-web-developer-thumb.webp',
		type: 'pdf',
		skills: ['HTML', 'CSS', 'JavaScript', 'UI Implementation'],
		showInCv: true,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		id: 'dicoding-kiro',
		title: {
			en: 'Spec-Driven Development with Kiro',
			id: 'Spec-Driven Development dengan Kiro'
		},
		issuer: 'AWS AI Academy 2026 | Dicoding',
		issuerDisplay: {
			en: 'AWS AI Academy 2026 | Dicoding',
			id: 'AWS AI Academy 2026 | Dicoding'
		},
		date: '2026',
		displayDate: {
			en: '2026',
			id: '2026'
		},
		category: 'course',
		file: 'sertifikat-spec-driven-development-kiro.webp',
		thumb: 'sertifikat-spec-driven-development-kiro-thumb.webp',
		type: 'image',
		skills: ['AI-Assisted Development', 'Specification-Driven Design', 'Kiro IDE'],
		showInCv: true,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		id: 'dicoding-web-dasar',
		title: {
			en: 'Learn Basic Web Programming',
			id: 'Belajar Dasar Pemrograman Web'
		},
		issuer: 'Coding Camp 2026 – DBS Foundation | Dicoding',
		issuerDisplay: {
			en: 'Coding Camp 2026 – DBS Foundation | Dicoding',
			id: 'Coding Camp 2026 – DBS Foundation | Dicoding'
		},
		date: '2026-04-03',
		displayDate: {
			en: 'April 3, 2026',
			id: '03 April 2026'
		},
		credentialId: '53XE1YKDKZRN',
		category: 'course',
		file: 'sertifikat-belajar-dasar-pemrograman-web.pdf',
		thumb: 'sertifikat-belajar-dasar-pemrograman-web-thumb.webp',
		type: 'pdf',
		skills: ['HTML5', 'CSS3', 'Web Fundamentals', 'Responsive Web Design'],
		showInCv: true,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		id: 'hacktiv8-ai-work',
		title: {
			en: 'AI for Work & Career Readiness with Google AI Products',
			id: 'AI For Work & Career Readiness'
		},
		issuer: 'Maju Bareng AI | HACKTIV8',
		issuerDisplay: {
			en: 'Maju Bareng AI | HACKTIV8',
			id: 'Maju Bareng AI | HACKTIV8'
		},
		date: '2026-03-30',
		displayDate: {
			en: 'March 30, 2026',
			id: '30 Maret 2026'
		},
		credentialId: '00949/H8/CSR/MBA2/III/2026',
		category: 'course',
		file: 'sertifikat-ai-work-career-readiness.webp',
		thumb: 'sertifikat-ai-work-career-readiness-thumb.webp',
		type: 'image',
		skills: ['Generative AI', 'Google AI Products', 'Workflow Automation'],
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		id: 'ubsi-9-unit',
		title: {
			en: 'Workshop on 9 Programming Units',
			id: 'Workshop Bedah 9 Unit Pemrograman'
		},
		issuer: 'Universitas Bina Sarana Informatika',
		issuerDisplay: {
			en: 'Universitas Bina Sarana Informatika',
			id: 'Universitas Bina Sarana Informatika'
		},
		date: '2025',
		displayDate: {
			en: '2025',
			id: '2025'
		},
		category: 'workshop',
		file: 'sertifikat-bedah-9-unit-pemrograman.webp',
		thumb: 'sertifikat-bedah-9-unit-pemrograman-thumb.webp',
		type: 'image',
		skills: ['Programming Competencies', 'Software Development'],
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		id: 'ubsi-erd-lrs-uml',
		title: {
			en: 'ERD, LRS, and UML Workshop',
			id: 'Workshop ERD, LRS, dan UML'
		},
		issuer: 'HIMASI UBSI PSDKU Karawang',
		issuerDisplay: {
			en: 'HIMASI UBSI PSDKU Karawang',
			id: 'HIMASI UBSI PSDKU Karawang'
		},
		date: '2025-06-25',
		displayDate: {
			en: 'June 25, 2025',
			id: '25 Juni 2025'
		},
		category: 'workshop',
		file: 'sertifikat-workshop-erd-lrs-uml.webp',
		thumb: 'sertifikat-workshop-erd-lrs-uml-thumb.webp',
		type: 'image',
		skills: ['ERD', 'LRS', 'UML', 'Database Modeling', 'System Analysis'],
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		id: 'uipath-webinar-automation',
		title: {
			en: 'Automation Webinar: UiPath x IOH',
			id: 'Webinar Automation'
		},
		issuer: 'UiPath x IOH',
		issuerDisplay: {
			en: 'UiPath x IOH',
			id: 'UiPath x IOH'
		},
		date: '2026-04-09',
		displayDate: {
			en: 'April 9, 2026',
			id: '9 April 2026'
		},
		credentialId: '1077/ONE-WEBINAR-SERTIF/IV/2026',
		category: 'webinar',
		file: 'sertifikat-webinar-automation-uipath.webp',
		thumb: 'sertifikat-webinar-automation-uipath-thumb.webp',
		type: 'image',
		skills: ['Robotic Process Automation', 'UiPath', 'Business Automation'],
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	},
	// --- New certificates discovered in directory ---
	{
		id: 'farkatech-internship-achievement',
		title: {
			en: 'IT Developer Internship Achievement (Score 95 - Grade A)',
			id: 'Sertifikat Magang IT Developer (Nilai 95 - Grade A)'
		},
		issuer: 'PT Farkatech International Nexus',
		issuerDisplay: {
			en: 'PT Farkatech International Nexus',
			id: 'PT Farkatech International Nexus'
		},
		date: '2026-10-16',
		displayDate: {
			en: 'October 16, 2026',
			id: '16 Oktober 2026'
		},
		credentialId: 'FT/CERT/IT/2026/9548',
		category: 'competency',
		file: 'certificate-farkatech-internship.pdf',
		thumb: 'certificate-farkatech-internship-thumb.webp',
		type: 'pdf',
		skills: ['Web Architecture', 'Fullstack Delivery', 'Commercial Software'],
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		id: 'ubsi-workshop-web-programming',
		title: {
			en: 'Web Pro Workshop: Build Your First AI-Assisted Website',
			id: 'Workshop Web Pro: Build Your First AI-Assisted Website'
		},
		issuer: 'HIMASI UBSI PSDKU Karawang',
		issuerDisplay: {
			en: 'HIMASI UBSI PSDKU Karawang',
			id: 'HIMASI UBSI PSDKU Karawang'
		},
		date: '2026-11-14',
		displayDate: {
			en: 'November 14, 2026',
			id: '14 November 2026'
		},
		category: 'workshop',
		file: 'sertifikat-workshop-web-programming.pdf',
		thumb: 'sertifikat-workshop-web-programming-thumb.webp',
		type: 'pdf',
		skills: ['AI-Assisted Web Development', 'Frontend Architecture'],
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		id: 'bisa-ai-ml-beginner',
		title: {
			en: 'Machine Learning For Beginner Training',
			id: 'Pelatihan Asinkronus: Machine Learning For Beginner'
		},
		issuer: 'BISA.AI (LKP BISA AI Academy)',
		issuerDisplay: {
			en: 'BISA.AI Academy',
			id: 'BISA.AI Academy'
		},
		date: '2026-11-21',
		displayDate: {
			en: 'November 21, 2026',
			id: '21 November 2026'
		},
		credentialId: '2026/260/76750',
		category: 'course',
		file: 'sertifikat-bisa-ai-machine-learning.webp',
		thumb: 'sertifikat-bisa-ai-machine-learning-thumb.webp',
		type: 'image',
		skills: ['Machine Learning', 'Data Modeling', 'Python Basics'],
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		id: 'icwc-top10-website-competition',
		title: {
			en: 'TOP 10 .ID Community Website Competition (ICWC)',
			id: 'TOP 10 .ID Community Website Competition (ICWC)'
		},
		issuer: '.ID Community Medan',
		issuerDisplay: {
			en: '.ID Community Medan',
			id: '.ID Community Medan'
		},
		date: '2026-09-05',
		displayDate: {
			en: 'September 5, 2026',
			id: '05 September 2026'
		},
		category: 'competency',
		file: 'sertifikat-icwc-top10-website-competition.webp',
		thumb: 'sertifikat-icwc-top10-website-competition-thumb.webp',
		type: 'image',
		skills: ['Web Design', 'Fullstack Development', 'Performance Optimization'],
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		id: 'badan-ekraf-digital-talent',
		title: {
			en: 'Creative Economy Agency Digital Talent 2026 Participation',
			id: 'Sertifikat Partisipasi: Badan Ekraf Digital Talent 2026'
		},
		issuer: 'Kementerian Ekonomi Kreatif RI & Dicoding',
		issuerDisplay: {
			en: 'Kementerian Ekraf RI & Dicoding',
			id: 'Kementerian Ekraf RI & Dicoding'
		},
		date: '2026-05-31',
		displayDate: {
			en: 'May 31, 2026',
			id: '31 Mei 2026'
		},
		category: 'workshop',
		file: 'sertifikat-badan-ekraf-digital-talent.webp',
		thumb: 'sertifikat-badan-ekraf-digital-talent-thumb.webp',
		type: 'image',
		skills: ['Digital Technology', 'Creative Economy', 'Software Engineering'],
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		id: 'futureleaders-national-webinar',
		title: {
			en: 'FutureLeaders National Webinar: Youth Unite, Create and Impact',
			id: 'Webinar Nasional FutureLeaders: Pemuda Bersatu, Berkarya dan Berdampak'
		},
		issuer: 'FutureShield Community & Diskominfo Konawe Selatan',
		issuerDisplay: {
			en: 'FutureShield & Diskominfo Konawe Selatan',
			id: 'FutureShield & Diskominfo Konawe Selatan'
		},
		date: '2026-10-29',
		displayDate: {
			en: 'October 29, 2026',
			id: '29 Oktober 2026'
		},
		credentialId: '500.12/8365',
		category: 'webinar',
		file: 'sertifikat-webinar-futureleaders.webp',
		thumb: 'sertifikat-webinar-futureleaders-thumb.webp',
		type: 'image',
		skills: ['Youth Leadership', 'Digital Impact', 'Community Building'],
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	}
];
