import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				if (path === '/resume.pdf') return;
				throw new Error(`${message} (${path} linked from ${referrer})`);
			}
		}
	}
};

export default config;
