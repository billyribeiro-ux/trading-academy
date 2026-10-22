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
	},
	BETTER_AUTH_SECRET: {
		description: 'Signs session cookies. Generate one with: openssl rand -base64 32',
		schema: (value) => {
			// The build loads the auth module, and Better Auth refuses to load without a secret.
			// This stand-in exists only during the build; a running server always needs the real one.
			if (building) return value || 'build-time-only-secret-never-used-to-sign-anything';
			if (!value || value.length < 32) {
				throw new Error('BETTER_AUTH_SECRET must be at least 32 characters');
			}
			return value;
		}
	}
});
