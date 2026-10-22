import { indexablePaths } from '#lib/config/routes.ts';
import { absoluteUrl } from '#lib/config/site.ts';
import type { RequestHandler } from './$types';

export const prerender = true;

/** Escapes the five characters XML treats as markup. */
function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

// Google ignores <priority> and <changefreq>, and only trusts <lastmod> when it is accurate,
// so each entry lists just the canonical URL.
export const GET: RequestHandler = () => {
	const urls = indexablePaths
		.map((path) => `\t<url><loc>${escapeXml(absoluteUrl(path))}</loc></url>`)
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
};
