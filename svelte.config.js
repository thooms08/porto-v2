import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		prerender: {
			entries: [
				'*',
				'/print/cv/en',
				'/print/cv/id',
				'/print/portfolio/en',
				'/print/portfolio/id'
			],
			crawl: true,
			handleHttpError: ({ path, message }) => {
				if (path.startsWith('/downloads/')) {
					return;
				}
				throw new Error(message);
			}
		}
	}
};

export default config;
