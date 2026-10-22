import type { Handle } from '@sveltejs/kit/hooks';

/**
 * Security headers for every server-rendered response. The Content Security Policy itself is
 * configured in `vite.config.ts`, because SvelteKit adds nonces to it per request.
 * Prerendered pages and static files are served without running this hook; set the same
 * headers at the reverse proxy in production (see README, Deployment).
 */
const securityHeaders = {
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
	'Cross-Origin-Opener-Policy': 'same-origin',
	'X-Frame-Options': 'DENY'
} as const;

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	for (const [name, value] of Object.entries(securityHeaders)) {
		response.headers.set(name, value);
	}

	return response;
};
