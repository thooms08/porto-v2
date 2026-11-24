import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	return [
		{ doc: 'cv', lang: 'en' },
		{ doc: 'cv', lang: 'id' },
		{ doc: 'portfolio', lang: 'en' },
		{ doc: 'portfolio', lang: 'id' }
	];
};

export const prerender = true;
