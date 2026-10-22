// See https://svelte.dev/docs/kit/types#app.d.ts
import type { Session, User } from 'better-auth';
import type { SeoData } from '#lib/components/seo/types.ts';

declare global {
	namespace App {
		interface PageData {
			/** Returned by every page's `load` function and rendered by the root layout. */
			seo?: SeoData;
		}

		interface Locals {
			/** The signed-in user, set by `src/hooks.server.ts`. Missing for visitors. */
			user?: User;
			/** The current session, set alongside `user`. */
			session?: Session;
		}
	}
}

export {};
