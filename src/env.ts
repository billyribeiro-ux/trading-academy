import { building } from '$app/env';
import { defineEnvVars } from '@sveltejs/kit/env';

/**
 * Every environment variable the app reads, declared in one place.
 * Values come from `.env` in development and from the host's environment in production.
 * Invalid values stop the app from building or starting, so mistakes surface immediately.
 */
export const variables = defineEnvVars({
	SITE_URL: {
		public: true,
		// Inlined at build time: the canonical origin never changes while the app runs.
		static: true,
		description: 'Public origin of the site, used for canonical URLs, e.g. https://example.com',
		schema: (value) => {
			if (!value) throw new Error('SITE_URL is required, e.g. SITE_URL=http://localhost:5173');
			const url = new URL(value);
			if (url.protocol !== 'https:' && url.protocol !== 'http:') {
				throw new Error('SITE_URL must start with http:// or https://');
			}
			if (url.pathname !== '/' || value.endsWith('/')) {
				throw new Error('SITE_URL must be an origin only, with no path or trailing slash');
			}
			return url.origin;
		}
	},
	DATABASE_URL: {
		description: 'PostgreSQL connection string, e.g. postgres://user:password@host:5432/db',
		// Not needed to build, but the server refuses to start without a valid value.
		schema: (value) => {
			if (building) return value ?? '';
			if (!value) throw new Error('DATABASE_URL is required to start the server');
			const { protocol } = new URL(value);
			if (protocol !== 'postgres:' && protocol !== 'postgresql:') {
				throw new Error('DATABASE_URL must start with postgres:// or postgresql://');
			}
			return value;
		}
	}
});
