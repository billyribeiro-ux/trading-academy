import { defineParams } from '@sveltejs/kit/params';
import { comingSoonPaths } from '#lib/config/routes.ts';

/**
 * Route parameter matchers. A route segment such as `[...path=comingSoon]` only matches when
 * its matcher returns a value; anything else falls through to a 404.
 */
export const params = defineParams({
	comingSoon: (param) => (comingSoonPaths.has(param) ? param : undefined)
});
