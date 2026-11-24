import type { Localized } from '$lib/i18n';

export interface ProjectItem {
	slug: string;
	name: string;
	url: string;
	displayUrl: string;
	shortDesc: Localized;
	longDesc: Localized;
	stack: string[];
	category: Localized;
	role: Localized;
	featured: boolean;
	screenshot: string; // fallback image in static/projects/
	embeddable: boolean; // based on X-Frame-Options / CSP verification
	showInCv: boolean;
	showInPortfolio: boolean;
	showOnWeb: boolean;
}

export const projects: ProjectItem[] = [
	{
		slug: 'flavory-pos',
		name: 'Flavory.id',
		url: 'https://flavory.id',
		displayUrl: 'flavory.id',
		shortDesc: {
			en: 'Integrated digital POS system for F&B businesses: real-time order management, automated financial reporting, and FlavoryAI analytics.',
			id: 'Aplikasi POS/Kasir digital terintegrasi untuk bisnis F&B: manajemen pesanan real-time, laporan keuangan otomatis, dan analitik berbasis FlavoryAI.'
		},
		longDesc: {
			en: 'An all-in-one Point of Sale (POS) solution tailored for the food and beverage industry. Features real-time order dispatching, table management, automated end-of-day financial reconciliation, and intelligent sales forecasting powered by FlavoryAI.',
			id: 'Solusi Point of Sale (POS) menyeluruh untuk industri makanan dan minuman (F&B). Menyediakan manajemen pesanan real-time, pengaturan meja, rekapitulasi keuangan harian otomatis, dan prediksi penjualan berbasis kecerdasan buatan FlavoryAI.'
		},
		stack: ['Laravel', 'MySQL'],
		category: {
			en: 'F&B POS Ecosystem',
			id: 'Ekosistem POS F&B'
		},
		role: {
			en: 'Founder & Fullstack Developer',
			id: 'Founder & Fullstack Developer'
		},
		featured: true,
		screenshot: '/projects/flavory-pos.webp',
		embeddable: true,
		showInCv: true,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		slug: 'key-flavory',
		name: 'Key.Flavory.id',
		url: 'https://key.flavory.id',
		displayUrl: 'key.flavory.id',
		shortDesc: {
			en: 'HRMS platform for MSMEs: employee data management, attendance tracking, and work schedules in one unified system.',
			id: 'Platform HRMS untuk UMKM: kelola data karyawan, absensi, dan jadwal kerja dalam satu sistem terpadu.'
		},
		longDesc: {
			en: 'Human Resource Management System designed to eliminate administrative friction for growing businesses. Delivers digital employee profiles, geolocation-based shift attendance, leave requests, and payroll-ready reporting.',
			id: 'Sistem Manajemen Sumber Daya Manusia (HRMS) untuk menyederhanakan administrasi bisnis dan UMKM. Memuat profil digital karyawan, absensi shift berbasis lokasi, pengajuan cuti, serta laporan rekapitulasi presensi terintegrasi.'
		},
		stack: ['Laravel', 'MySQL'],
		category: {
			en: 'HRMS Platform',
			id: 'Platform HRMS'
		},
		role: {
			en: 'Fullstack Developer',
			id: 'Fullstack Developer'
		},
		featured: true,
		screenshot: '/projects/key-flavory.webp',
		embeddable: true,
		showInCv: true,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		slug: 'libix-tech',
		name: 'Libix.Tech',
		url: 'https://libix.tech',
		displayUrl: 'libix.tech',
		shortDesc: {
			en: 'Main website of LIBIX, a digital startup focused on web development and digital solutions.',
			id: 'Website utama LIBIX, startup digital yang berfokus pada pengembangan web dan solusi digital.'
		},
		longDesc: {
			en: 'The main digital hub of LIBIX startup, showcasing their suite of digital products, team, and mission. Built as a high-performance web presence representing the brand across all touchpoints.',
			id: 'Hub digital utama startup LIBIX, memperkenalkan rangkaian produk digital, tim, dan misi perusahaan. Dibangun sebagai kehadiran web berperforma tinggi yang merepresentasikan brand di semua titik kontak.'
		},
		stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
		category: {
			en: 'Startup Website',
			id: 'Website Startup'
		},
		role: {
			en: 'Founder & Fullstack Developer',
			id: 'Founder & Fullstack Developer'
		},
		featured: true,
		screenshot: '/projects/libix-tech.webp',
		embeddable: true,
		showInCv: true,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		slug: 'blog-libix',
		name: 'Blog.Libix',
		url: 'https://blog.libix.tech',
		displayUrl: 'blog.libix.tech',
		shortDesc: {
			en: 'LIBIX blog platform for technology and digital solutions content.',
			id: 'Platform blog LIBIX untuk konten teknologi dan solusi digital.'
		},
		longDesc: {
			en: 'High-performance digital publication platform for LIBIX. Built with Next.js and TypeScript, designed for rapid article indexing, markdown editing workflows, and optimal reader readability across all devices.',
			id: 'Platform publikasi digital berkinerja tinggi untuk LIBIX. Dibangun dengan Next.js dan TypeScript, dirancang untuk pengindeksan artikel cepat, alur penulisan markdown, dan kenyamanan membaca di seluruh perangkat.'
		},
		stack: ['Next.js', 'TypeScript', 'Prisma ORM'],
		category: {
			en: 'Digital Media Publication',
			id: 'Media Publikasi Digital'
		},
		role: {
			en: 'Fullstack Developer',
			id: 'Fullstack Developer'
		},
		featured: true,
		screenshot: '/projects/blog-flavory.webp',
		embeddable: true,
		showInCv: true,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		slug: 'supermura',
		name: 'Supermura.id',
		url: 'https://supermura.id',
		displayUrl: 'supermura.id',
		shortDesc: {
			en: 'Low-MOQ fashion e-commerce platform connecting local fashion brands and resellers directly with suppliers.',
			id: 'Platform e-commerce fashion kuantitas minimum rendah, menghubungkan brand lokal dan reseller dengan supplier.'
		},
		longDesc: {
			en: 'B2B/B2C fashion marketplace connecting local clothing manufacturers with emerging fashion retailers. Features bulk pricing matrices, secure checkout, automated inventory sync, and supplier shipment management.',
			id: 'Platform e-commerce fashion berbasis web untuk penjualan dan pengelolaan produk fashion grosir dan retail. Dilengkapi fitur kuantitas minimum rendah (low MOQ), katalog produk dinamis, integrasi checkout pembayaran, dan pelacakan pengiriman.'
		},
		stack: ['Laravel', 'MySQL', 'Bootstrap'],
		category: {
			en: 'Fashion E-Commerce',
			id: 'E-Commerce Fashion'
		},
		role: {
			en: 'Fullstack Web Developer & Deployment (Freelance)',
			id: 'Fullstack Web Developer & Deployment (Freelance)'
		},
		featured: true,
		screenshot: '/projects/supermura.webp',
		embeddable: true,
		showInCv: true,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		slug: 'recomon',
		name: 'Recomon.my.id',
		url: 'https://recomon.my.id',
		displayUrl: 'recomon.my.id',
		shortDesc: {
			en: 'Interactive digital card creation platform: greetings, invitations, and personalized memorable messages.',
			id: 'Platform pembuatan kartu digital interaktif: kartu ucapan, undangan, atau pesan personal yang lebih berkesan.'
		},
		longDesc: {
			en: 'A flexible web application allowing users to compose and share bespoke interactive digital cards. Offers customized multimedia content, interactive animations, RSVP collection, and instant link-based sharing.',
			id: 'Aplikasi web interaktif untuk merancang dan membagikan kartu digital kustom. Menyediakan kartu ucapan, undangan, dan pesan personal interaktif yang lebih fleksibel, cepat dibagikan, dan berkesan dibandingkan kartu konvensional.'
		},
		stack: ['Laravel', 'MySQL'],
		category: {
			en: 'Interactive Card Generator',
			id: 'Generator Kartu Digital'
		},
		role: {
			en: 'Fullstack Developer',
			id: 'Fullstack Developer'
		},
		featured: false,
		screenshot: '/projects/recomon.webp',
		embeddable: true,
		showInCv: true,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		slug: 'mysems',
		name: 'mysems.my.id',
		url: 'https://mysems.my.id',
		displayUrl: 'mysems.my.id',
		shortDesc: {
			en: 'School event management system: centralized scheduling, committee coordination, and real-time announcements.',
			id: 'Sistem manajemen event sekolah: jadwal, koordinasi panitia, dan distribusi informasi.'
		},
		longDesc: {
			en: 'Dedicated school event operations platform designed to coordinate activities, agendas, student registrations, committee assignments, and timely updates across administrative staff and attendees.',
			id: 'Platform manajemen acara sekolah untuk menyelaraskan jadwal kegiatan, pembagian divisi panitia, registrasi peserta, dan publikasi pengumuman acara dalam satu portal terpusat.'
		},
		stack: ['PHP', 'MySQL'],
		category: {
			en: 'Event Management System',
			id: 'Sistem Manajemen Event'
		},
		role: {
			en: 'Fullstack Developer',
			id: 'Fullstack Developer'
		},
		featured: false,
		screenshot: '/projects/mysems.webp',
		embeddable: true,
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	},
	{
		slug: 'imkompres',
		name: 'Imkompres',
		url: 'https://imkompres.vercel.app',
		displayUrl: 'imkompres.vercel.app',
		shortDesc: {
			en: 'In-browser image compressor running 100% locally via client-side JavaScript without server uploads.',
			id: 'Kompres gambar langsung di browser tanpa upload ke server, 100% berbasis JavaScript lokal.'
		},
		longDesc: {
			en: 'Client-first media utility that compresses images entirely inside the browser using HTML5 Canvas and local JavaScript APIs. Maximizes privacy and eliminates bandwidth transfer delays.',
			id: 'Aplikasi utilitas kompresi gambar yang berjalan sepenuhnya di sisi browser tanpa pernah mengirim berkas ke server. Menggunakan Canvas API dan Web APIs untuk menjaga privasi berkas pengguna secara maksimal.'
		},
		stack: ['JavaScript', 'HTML5 Canvas', 'Web APIs'],
		category: {
			en: 'Client-Side Media Tool',
			id: 'Utilitas Web Client-Side'
		},
		role: {
			en: 'Frontend Developer',
			id: 'Frontend Developer'
		},
		featured: false,
		screenshot: '/projects/imkompres.webp',
		embeddable: true,
		showInCv: false,
		showInPortfolio: true,
		showOnWeb: true
	}
];
