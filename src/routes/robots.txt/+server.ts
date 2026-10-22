import { absoluteUrl } from '#lib/config/site.ts';
import type { RequestHandler } from './$types';

// The same for every request, so it is written to a static file at build time.
export const prerender = true;

export const GET: RequestHandler = () => {
	const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${absoluteUrl('/sitemap.xml')}`, ''];

	return new Response(body.join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
};
