// See https://svelte.dev/docs/kit/types#app.d.ts
import type { SeoData } from '#lib/components/seo/types.ts';

declare global {
	namespace App {
		interface PageData {
			/** Returned by every page's `load` function and rendered by the root layout. */
			seo?: SeoData;
		}
	}
}

export {};
