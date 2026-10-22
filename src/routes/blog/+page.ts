import { breadcrumbSchema } from '#lib/components/seo/json-ld.ts';
import { pageTitle, site } from '#lib/config/site.ts';
import { allPosts } from '#lib/content/posts.ts';
import type { PageLoad } from './$types';

// Every visitor sees the same list, so the page is written to static HTML at build time.
export const prerender = true;

export const load: PageLoad = () => ({
	posts: allPosts,
	seo: {
		title: pageTitle('Blog: Market Commentary and Trading Lessons'),
		description:
			'Placeholder description: market commentary, strategy breakdowns and trading lessons from our team.',
		path: '/blog',
		jsonLd: [
			breadcrumbSchema(site.url, [
				{ name: 'Home', path: '/' },
				{ name: 'Blog', path: '/blog' }
			])
		]
	}
});
