export type Locale = 'en' | 'id';

export interface Localized<T = string> {
	en: T;
	id: T;
}

export function t<T>(obj: Localized<T>, locale: Locale): T {
	return obj[locale] ?? obj.en;
}
