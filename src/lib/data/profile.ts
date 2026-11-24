import type { Localized } from '$lib/i18n';

export interface QuickFact {
	label: Localized;
	value: Localized;
}

export interface ProfileData {
	about: {
		long: Localized<string[]>; // paragraphs for web & portfolio
		cv: Localized<string>; // 1 concise paragraph for CV
	};
	quickFacts: QuickFact[];
	stats: {
		projectsCount: number;
		startYear: number;
	};
}

export const profileData: ProfileData = {
	about: {
		long: {
			en: [
				'I am an Information Systems student and Fullstack Web Developer focused on building digital solutions that deliver real business value. As the Founder of LIBIX — a digital startup focused on web development and digital solutions — I combine fullstack expertise across HTML, CSS, JavaScript, TypeScript, PHP, MySQL, Laravel, and Next.js to craft products that are efficient, secure, and user-friendly.',
				'I have built AI-powered F&B POS systems and HRMS that automate outlet operations, as well as Progressive Web Apps and software-hardware integrations. Every project emphasizes high performance, long-term scalability, and intuitive user experiences through modern AI-assisted development practices.'
			],
			id: [
				'Saya mahasiswa Sistem Informasi sekaligus Fullstack Web Developer yang berfokus pada membangun solusi digital bernilai bisnis nyata. Sebagai Founder startup digital LIBIX yang berfokus pada pengembangan web dan solusi digital, saya menggabungkan keahlian fullstack HTML, CSS, JavaScript, TypeScript, PHP, MySQL, Laravel, dan Next.js untuk menciptakan produk yang efisien, aman, dan mudah digunakan.',
				'Saya telah membangun Aplikasi POS F&B dan HRMS berbasis AI yang mengotomatisasi pengelolaan operasional outlet, serta berpengalaman mengembangkan Progressive Web App dan integrasi software dengan hardware. Setiap proyek berfokus pada performa tinggi, skalabilitas jangka panjang, dan pengalaman pengguna yang intuitif, dengan pendekatan modern berbasis AI-assisted development.'
			]
		},
		cv: {
			en: 'I am an Information Systems student at Bina Sarana Informatika University and a Fullstack Web Developer with proven experience delivering business-driven digital solutions. Founder of LIBIX — a digital startup focused on web development and digital solutions. Experienced in developing AI-based F&B POS systems, HRMS, Progressive Web Apps, and software-hardware integrations using Laravel, Next.js, PHP, TypeScript, and MySQL, with a strong focus on high performance, scalability, and intuitive UX.',
			id: 'Saya Mahasiswa Sistem Informasi Universitas Bina Sarana Informatika dan Fullstack Web Developer dengan pengalaman nyata membangun solusi digital bernilai bisnis. Saya adalah Founder startup digital LIBIX yang berfokus pada pengembangan web dan solusi digital. Saya telah membangun Aplikasi POS F&B dan HRMS berbasis AI yang mengotomatisasi pengelolaan operasional outlet, serta berpengalaman mengembangkan Progressive Web App dan integrasi software-hardware menggunakan Laravel, Next.js, PHP, TypeScript, dan MySQL. Saya berorientasi pada performa tinggi, skalabilitas, dan pengalaman pengguna yang intuitif.'
		}
	},
	quickFacts: [
		{
			label: { en: 'Role', id: 'Peran' },
			value: { en: 'Fullstack Web Developer', id: 'Fullstack Web Developer' }
		},
		{
			label: { en: 'Based in', id: 'Lokasi' },
			value: { en: 'Karawang, West Java, Indonesia', id: 'Karawang, Jawa Barat, Indonesia' }
		},
		{
			label: { en: 'Education', id: 'Pendidikan' },
			value: {
				en: 'BSc Information Systems, UBSI (2024 – Present)',
				id: 'S1 Sistem Informasi, Universitas Bina Sarana Informatika (2024 – Sekarang)'
			}
		},
		{
			label: { en: 'Founder', id: 'Founder' },
			value: { en: 'LIBIX (Digital Startup)', id: 'LIBIX (Startup Digital)' }
		},
		{
			label: { en: 'Core Stack', id: 'Stack Utama' },
			value: { en: 'Laravel · Next.js · TypeScript · MySQL', id: 'Laravel · Next.js · TypeScript · MySQL' }
		},
		{
			label: { en: 'Focus Areas', id: 'Fokus' },
			value: {
				en: 'POS F&B · HRMS · E-Commerce · PWA · Software-Hardware Integration',
				id: 'POS F&B · HRMS · E-Commerce · PWA · Integrasi Software-Hardware'
			}
		}
	],
	stats: {
		projectsCount: 8,
		startYear: 2024
	}
};
