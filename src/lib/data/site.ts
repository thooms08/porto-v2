import type { Localized } from '$lib/i18n';

export interface SiteConfig {
	name: string;
	firstName: string;
	lastName: string;
	role: Localized;
	headline: Localized;
	subheadline: Localized;
	email: string;
	phone: string;
	phoneDisplay: string;
	whatsappUrl: string;
	location: Localized;
	cityCountry: string;
	siteUrl: string;
	githubUrl: string;
	githubUser: string;
	linkedinUrl: string;
	linkedinUser: string;
	companyName: string;
	aiName: string; // FlavoryAI (PRD §4.9 default decision)
	availability: {
		show: boolean;
		text: Localized;
	};
	seo: {
		title: Localized;
		description: Localized;
		ogImage: string;
		ogImageAlt: Localized;
		themeColor: string;
	};
}

export const siteConfig: SiteConfig = {
	name: 'Thomas Lefvi Baehaqi',
	firstName: 'Thomas',
	lastName: 'Lefvi Baehaqi',
	role: {
		en: 'Fullstack Web Developer',
		id: 'Fullstack Web Developer'
	},
	headline: {
		en: 'Fullstack web developer building business-ready digital products.',
		id: 'Fullstack web developer yang membangun solusi digital bernilai bisnis nyata.'
	},
	subheadline: {
		en: 'Founder of LIBIX. I design and ship POS systems, HRMS, e-commerce, and Progressive Web Apps with Laravel, Next.js, and TypeScript.',
		id: 'Founder LIBIX. Merancang dan mengembangkan sistem POS, HRMS, e-commerce, dan Progressive Web App menggunakan Laravel, Next.js, dan TypeScript.'
	},
	email: 'thomaslefvibaehaqi@gmail.com',
	phone: '+6285178286438',
	phoneDisplay: '+62 851-7828-6438',
	whatsappUrl: 'https://wa.me/6285178286438',
	location: {
		en: 'Karawang, West Java, Indonesia',
		id: 'Karawang, Jawa Barat, Indonesia'
	},
	cityCountry: 'Karawang, Indonesia',
	siteUrl: 'https://thomaslefvibaehaqi.my.id',
	githubUrl: 'https://github.com/Thooms08',
	githubUser: 'Thooms08',
	linkedinUrl: 'https://www.linkedin.com/in/thomaslb08',
	linkedinUser: 'thomaslb08',
	companyName: 'LIBIX',
	aiName: 'FlavoryAI',
	availability: {
		show: false,
		text: {
			en: 'Open to opportunities',
			id: 'Terbuka untuk peluang'
		}
	},
	seo: {
		title: {
			en: 'Thomas Lefvi Baehaqi — Fullstack Web Developer | Laravel, Next.js',
			id: 'Thomas Lefvi Baehaqi — Fullstack Web Developer | Laravel, Next.js'
		},
		description: {
			en: 'Portfolio of Thomas Lefvi Baehaqi, a Fullstack Web Developer based in Karawang, Indonesia. Building business-ready digital products with Laravel, Next.js, and TypeScript.',
			id: 'Portofolio Thomas Lefvi Baehaqi, Fullstack Web Developer di Karawang, Indonesia. Membangun produk digital bernilai bisnis dengan Laravel, Next.js, dan TypeScript.'
		},
		ogImage: 'https://thomaslefvibaehaqi.my.id/foto-diri.webp',
		ogImageAlt: {
			en: 'Portrait of Thomas Lefvi Baehaqi',
			id: 'Foto Thomas Lefvi Baehaqi'
		},
		themeColor: '#050816'
	}
};
