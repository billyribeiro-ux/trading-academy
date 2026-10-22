import { BETTER_AUTH_SECRET } from '$app/env/private';
import { SITE_URL } from '$app/env/public';
import { getRequestEvent } from '$app/server';
import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { db } from '#lib/server/db/index.ts';

/**
 * The Better Auth server: email and password accounts stored in PostgreSQL through Drizzle.
 * Pages call it through `auth.api` from form actions, so every form works without JavaScript.
 */
export const auth = betterAuth({
	baseURL: SITE_URL,
	secret: BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'pg' }),
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 15,
		maxPasswordLength: 128
	},
	// Lets SvelteKit actions set and clear the session cookie. Must stay the last plugin.
	plugins: [sveltekitCookies(getRequestEvent)]
});
