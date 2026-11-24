
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/id" | "/print" | "/print/[doc]" | "/print/[doc]/[lang]";
		RouteParams(): {
			"/print/[doc]": { doc: string };
			"/print/[doc]/[lang]": { doc: string; lang: string }
		};
		LayoutParams(): {
			"/": { doc?: string | undefined; lang?: string | undefined };
			"/id": Record<string, never>;
			"/print": { doc?: string | undefined; lang?: string | undefined };
			"/print/[doc]": { doc: string; lang?: string | undefined };
			"/print/[doc]/[lang]": { doc: string; lang: string }
		};
		Pathname(): "/" | "/id/" | `/print/${string}/${string}` & {} | `/print/${string}/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.htaccess" | "/_headers" | "/apple-touch-icon.png" | "/certificates/certificate-farkatech-internship-thumb.webp" | "/certificates/certificate-farkatech-internship.pdf" | "/certificates/sertifikat-ai-work-career-readiness-thumb.webp" | "/certificates/sertifikat-ai-work-career-readiness.webp" | "/certificates/sertifikat-badan-ekraf-digital-talent-thumb.webp" | "/certificates/sertifikat-badan-ekraf-digital-talent.webp" | "/certificates/sertifikat-bedah-9-unit-pemrograman-thumb.webp" | "/certificates/sertifikat-bedah-9-unit-pemrograman.webp" | "/certificates/sertifikat-belajar-dasar-pemrograman-web-thumb.webp" | "/certificates/sertifikat-belajar-dasar-pemrograman-web.pdf" | "/certificates/sertifikat-bisa-ai-machine-learning-thumb.webp" | "/certificates/sertifikat-bisa-ai-machine-learning.webp" | "/certificates/sertifikat-fundamental-junior-web-developer-thumb.webp" | "/certificates/sertifikat-fundamental-junior-web-developer.pdf" | "/certificates/sertifikat-icwc-top10-website-competition-thumb.webp" | "/certificates/sertifikat-icwc-top10-website-competition.webp" | "/certificates/sertifikat-kompetensi-database-administrator-thumb.webp" | "/certificates/sertifikat-kompetensi-database-administrator.webp" | "/certificates/sertifikat-spec-driven-development-kiro-thumb.webp" | "/certificates/sertifikat-spec-driven-development-kiro.webp" | "/certificates/sertifikat-uji-kompetensi-basis-data-advance-thumb.webp" | "/certificates/sertifikat-uji-kompetensi-basis-data-advance.webp" | "/certificates/sertifikat-webinar-automation-uipath-thumb.webp" | "/certificates/sertifikat-webinar-automation-uipath.webp" | "/certificates/sertifikat-webinar-futureleaders-thumb.webp" | "/certificates/sertifikat-webinar-futureleaders.webp" | "/certificates/sertifikat-workshop-erd-lrs-uml-thumb.webp" | "/certificates/sertifikat-workshop-erd-lrs-uml.webp" | "/certificates/sertifikat-workshop-web-programming-thumb.webp" | "/certificates/sertifikat-workshop-web-programming.pdf" | "/dokumentasi/dokumentasi-1-thumb.webp" | "/dokumentasi/dokumentasi-1.webp" | "/dokumentasi/dokumentasi-10-thumb.webp" | "/dokumentasi/dokumentasi-10.webp" | "/dokumentasi/dokumentasi-2-thumb.webp" | "/dokumentasi/dokumentasi-2.webp" | "/dokumentasi/dokumentasi-3-thumb.webp" | "/dokumentasi/dokumentasi-3.webp" | "/dokumentasi/dokumentasi-4-thumb.webp" | "/dokumentasi/dokumentasi-4.webp" | "/dokumentasi/dokumentasi-5-thumb.webp" | "/dokumentasi/dokumentasi-5.webp" | "/dokumentasi/dokumentasi-6-thumb.webp" | "/dokumentasi/dokumentasi-6.webp" | "/dokumentasi/dokumentasi-7-thumb.webp" | "/dokumentasi/dokumentasi-7.webp" | "/dokumentasi/dokumentasi-8-thumb.webp" | "/dokumentasi/dokumentasi-8.webp" | "/dokumentasi/dokumentasi-9-thumb.webp" | "/dokumentasi/dokumentasi-9.webp" | "/downloads/CV_Thomas_Lefvi_Baehaqi.pdf" | "/downloads/CV_Thomas_Lefvi_Baehaqi_EN.pdf" | "/downloads/CV_Thomas_Lefvi_Baehaqi_ID.pdf" | "/downloads/Portfolio_Thomas_Lefvi_Baehaqi_EN.pdf" | "/downloads/Portfolio_Thomas_Lefvi_Baehaqi_ID.pdf" | "/downloads/Portofolio-Thomas_Lefvi_Baehaqi.pdf" | "/favicon.ico" | "/favicon.svg" | "/foto-diri-2.webp" | "/foto-diri.webp" | "/foto-formal.png" | "/icon-192.png" | "/icon-512.png" | "/llms-full.txt" | "/llms.txt" | "/og-image.jpg" | "/projects/blog-flavory.webp" | "/projects/flavory-pos.webp" | "/projects/imkompres.webp" | "/projects/key-flavory.webp" | "/projects/libix-tech.webp" | "/projects/mysems.webp" | "/projects/recomon.webp" | "/projects/rekain.webp" | "/projects/supermura.webp" | "/robots.txt" | "/site.webmanifest" | "/sitemap.xml" | string & {};
	}
}