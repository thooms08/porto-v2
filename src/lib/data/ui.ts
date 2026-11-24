import type { Localized } from '$lib/i18n';

export interface UiStrings {
	skipToContent: Localized;
	nav: {
		home: Localized;
		about: Localized;
		experience: Localized;
		projects: Localized;
		skills: Localized;
		certificates: Localized;
		education: Localized;
		faq: Localized;
		contact: Localized;
		menu: Localized;
		closeMenu: Localized;
	};
	hero: {
		kicker: Localized;
		viewProjects: Localized;
		contactMe: Localized;
		downloadCv: Localized;
		downloadPortfolio: Localized;
	};
	about: {
		title: Localized;
		subtitle: Localized;
		quickFactsTitle: Localized;
		statProjects: Localized;
		statCertificates: Localized;
		statYears: Localized;
	};
	experience: {
		title: Localized;
		subtitle: Localized;
		present: Localized;
	};
	projects: {
		title: Localized;
		subtitle: Localized;
		allProjects: Localized;
		openSite: Localized;
		reloadPreview: Localized;
		livePreview: Localized;
		fallbackNotice: Localized;
		fallbackAction: Localized;
		role: Localized;
		stack: Localized;
		viewportDesktop: Localized;
		viewportTablet: Localized;
		viewportMobile: Localized;
	};
	skills: {
		title: Localized;
		subtitle: Localized;
		softSkillsTitle: Localized;
	};
	certificates: {
		title: Localized;
		subtitle: Localized;
		allCategories: Localized;
		categoryCompetency: Localized;
		categoryCourse: Localized;
		categoryWorkshop: Localized;
		categoryWebinar: Localized;
		viewCertificate: Localized;
		credentialId: Localized;
		issuer: Localized;
		date: Localized;
		openPdf: Localized;
		closeLightbox: Localized;
		prevCertificate: Localized;
		nextCertificate: Localized;
	};
	education: {
		title: Localized;
		subtitle: Localized;
		organizationsTitle: Localized;
		organizationsSubtitle: Localized;
		leadershipTitle: Localized;
		activitiesTitle: Localized;
	};
	faq: {
		title: Localized;
		subtitle: Localized;
	};
	contact: {
		title: Localized;
		subtitle: Localized;
		emailLabel: Localized;
		phoneLabel: Localized;
		locationLabel: Localized;
		socialLabel: Localized;
		copyEmail: Localized;
		emailCopied: Localized;
		openWhatsApp: Localized;
		downloadsTitle: Localized;
	};
	footer: {
		rights: Localized;
		backToTop: Localized;
		builtWith: Localized;
		switchLang: Localized;
		lastUpdated: Localized;
	};
	downloads: {
		cvBtn: Localized;
		portfolioBtn: Localized;
		cvFilename: Localized;
		portfolioFilename: Localized;
	};
}

export const ui: UiStrings = {
	skipToContent: {
		en: 'Skip to content',
		id: 'Lompat ke konten'
	},
	nav: {
		home: { en: 'Home', id: 'Beranda' },
		about: { en: 'About', id: 'Tentang' },
		experience: { en: 'Experience', id: 'Pengalaman' },
		projects: { en: 'Projects', id: 'Proyek' },
		skills: { en: 'Skills', id: 'Keahlian' },
		certificates: { en: 'Certificates', id: 'Sertifikat' },
		education: { en: 'Education', id: 'Pendidikan' },
		faq: { en: 'FAQ', id: 'FAQ' },
		contact: { en: 'Contact', id: 'Kontak' },
		menu: { en: 'Menu', id: 'Menu' },
		closeMenu: { en: 'Close menu', id: 'Tutup menu' }
	},
	hero: {
		kicker: {
			en: 'Fullstack Web Developer · Karawang, Indonesia',
			id: 'Fullstack Web Developer · Karawang, Indonesia'
		},
		viewProjects: { en: 'View Projects', id: 'Lihat Proyek' },
		contactMe: { en: 'Contact Me', id: 'Hubungi Saya' },
		downloadCv: { en: 'Download CV', id: 'Unduh CV' },
		downloadPortfolio: { en: 'Download Portfolio', id: 'Unduh Portofolio' }
	},
	about: {
		title: { en: 'About Me', id: 'Tentang Saya' },
		subtitle: {
			en: 'Software craft, business orientation, and scalable system engineering.',
			id: 'Keahlian rekayasa web, orientasi bisnis, dan skalabilitas sistem.'
		},
		quickFactsTitle: { en: 'Quick Facts', id: 'Fakta Singkat' },
		statProjects: { en: 'Completed Projects', id: 'Proyek Selesai' },
		statCertificates: { en: 'Verified Certifications', id: 'Sertifikasi Terverifikasi' },
		statYears: { en: 'Years Experience', id: 'Tahun Pengalaman' }
	},
	experience: {
		title: { en: 'Work Experience', id: 'Pengalaman Kerja' },
		subtitle: {
			en: '',
			id: ''
		},
		present: { en: 'Present', id: 'Sekarang' }
	},
	projects: {
		title: { en: 'Featured Projects', id: 'Proyek Pilihan' },
		subtitle: {
			en: '',
			id: ''
		},
		allProjects: { en: 'All Projects', id: 'Semua Proyek' },
		openSite: { en: 'Open site', id: 'Buka situs' },
		reloadPreview: { en: 'Reload preview', id: 'Muat ulang' },
		livePreview: { en: 'Live Preview', id: 'Pratinjau Langsung' },
		fallbackNotice: {
			en: 'Live preview unavailable in frame, open the site directly to explore.',
			id: 'Pratinjau live tidak dapat dimuat di frame, buka situs langsung untuk melihat.'
		},
		fallbackAction: { en: 'Open Site in New Tab', id: 'Buka Situs di Tab Baru' },
		role: { en: 'Role', id: 'Peran' },
		stack: { en: 'Technology Stack', id: 'Teknologi' },
		viewportDesktop: { en: 'Desktop', id: 'Desktop' },
		viewportTablet: { en: 'Tablet', id: 'Tablet' },
		viewportMobile: { en: 'Mobile', id: 'Mobile' }
	},
	skills: {
		title: { en: 'Technical Skills', id: 'Keahlian Teknis' },
		subtitle: {
			en: '',
			id: ''
		},
		softSkillsTitle: { en: 'Soft Skills & Work Ethic', id: 'Soft Skills & Etos Kerja' }
	},
	certificates: {
		title: { en: 'Licenses & Certifications', id: 'Lisensi & Sertifikasi' },
		subtitle: {
			en: '',
			id: ''
		},
		allCategories: { en: 'All', id: 'Semua' },
		categoryCompetency: { en: 'Competency', id: 'Kompetensi' },
		categoryCourse: { en: 'Course', id: 'Pelatihan' },
		categoryWorkshop: { en: 'Workshop', id: 'Workshop' },
		categoryWebinar: { en: 'Webinar', id: 'Webinar' },
		viewCertificate: { en: 'View Certificate', id: 'Lihat Sertifikat' },
		credentialId: { en: 'Credential ID', id: 'No. Kredensial' },
		issuer: { en: 'Issued by', id: 'Diterbitkan oleh' },
		date: { en: 'Date', id: 'Tanggal' },
		openPdf: { en: 'Open Original Document', id: 'Buka Berkas Asli' },
		closeLightbox: { en: 'Close', id: 'Tutup' },
		prevCertificate: { en: 'Previous', id: 'Sebelumnya' },
		nextCertificate: { en: 'Next', id: 'Berikutnya' }
	},
	education: {
		title: { en: 'Education', id: 'Pendidikan' },
		subtitle: {
			en: '',
			id: ''
		},
		organizationsTitle: { en: 'Leadership & Organizations', id: 'Organisasi & Kepemimpinan' },
		organizationsSubtitle: {
			en: '',
			id: ''
		},
		leadershipTitle: { en: 'Leadership Roles', id: 'Peran Kepemimpinan' },
		activitiesTitle: { en: 'Activities & Committees', id: 'Aktivitas & Kepanitiaan' }
	},
	faq: {
		title: { en: 'FAQ', id: 'FAQ' },
		subtitle: {
			en: '',
			id: ''
		}
	},
	contact: {
		title: { en: 'Get In Touch', id: 'Hubungi Saya' },
		subtitle: {
			en: '',
			id: ''
		},
		emailLabel: { en: 'Email', id: 'Email' },
		phoneLabel: { en: 'WhatsApp / Phone', id: 'WhatsApp / Telepon' },
		locationLabel: { en: 'Location', id: 'Lokasi' },
		socialLabel: { en: 'Profiles & Code', id: 'Profil & Kode' },
		copyEmail: { en: 'Copy email address', id: 'Salin alamat email' },
		emailCopied: { en: 'Email copied to clipboard!', id: 'Email berhasil disalin!' },
		openWhatsApp: { en: 'Chat on WhatsApp', id: 'Chat via WhatsApp' },
		downloadsTitle: { en: 'Curriculum Vitae & Portfolio', id: 'Curriculum Vitae & Portofolio' }
	},
	footer: {
		rights: { en: 'All rights reserved.', id: 'Hak cipta dilindungi.' },
		backToTop: { en: 'Back to top', id: 'Kembali ke atas' },
		builtWith: {
			en: 'Single-source static site built with SvelteKit & TypeScript',
			id: 'Situs statis single-source dibangun dengan SvelteKit & TypeScript'
		},
		switchLang: { en: 'Bahasa Indonesia', id: 'English' },
		lastUpdated: { en: 'Last updated', id: 'Pembaruan terakhir' }
	},
	downloads: {
		cvBtn: { en: 'Download CV (PDF)', id: 'Unduh CV (PDF)' },
		portfolioBtn: { en: 'Download Portfolio (PDF)', id: 'Unduh Portofolio (PDF)' },
		cvFilename: { en: 'CV_Thomas_Lefvi_Baehaqi.pdf', id: 'CV_Thomas_Lefvi_Baehaqi.pdf' },
		portfolioFilename: {
			en: 'Portofolio-Thomas_Lefvi_Baehaqi.pdf',
			id: 'Portofolio-Thomas_Lefvi_Baehaqi.pdf'
		}
	}
};
