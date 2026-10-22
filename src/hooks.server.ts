import { building } from '$app/env';
import { sequence, type Handle } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { auth } from '#lib/server/auth.ts';

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

const handleSecurityHeaders: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	for (const [name, value] of Object.entries(securityHeaders)) {
		response.headers.set(name, value);
	}

	return response;
};

/**
 * Puts the signed-in user, if any, on `event.locals` for every request, and lets Better Auth
 * answer its own routes under `/api/auth`. Skipped while prerendering: there is no visitor,
 * and the build must not need a database.
 */
const handleAuth: Handle = async ({ event, resolve }) => {
	if (building) return resolve(event);

	const session = await auth.api.getSession({ headers: event.request.headers });
	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

export const handle = sequence(handleSecurityHeaders, handleAuth);
