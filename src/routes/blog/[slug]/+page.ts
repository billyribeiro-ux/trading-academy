import { error } from '@sveltejs/kit';
import { blogPostingSchema, breadcrumbSchema } from '#lib/components/seo/json-ld.ts';
import { pageTitle, site } from '#lib/config/site.ts';
import { allPosts, findPost } from '#lib/content/posts.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

/** Tells the prerenderer every slug that exists, even ones no page links to yet. */
export const entries: EntryGenerator = () => allPosts.map((post) => ({ slug: post.slug }));

export const load: PageLoad = ({ params }) => {
	const post = findPost(params.slug);
	if (!post) error(404, 'Article not found');

	const path = `/blog/${post.slug}`;

	return {
		post,
		seo: {
			title: pageTitle(post.title),
			description: post.description,
			path,
			type: 'article',
			article: {
				publishedTime: post.publishedAt,
				modifiedTime: post.updatedAt,
				authorName: post.author.name
			},
			jsonLd: [
				blogPostingSchema(site, {
					title: post.title,
					description: post.description,
					path,
					image: site.ogImage.src,
					publishedAt: post.publishedAt,
					updatedAt: post.updatedAt,
					authorName: post.author.name
				}),
				breadcrumbSchema(site.url, [
					{ name: 'Home', path: '/' },
					{ name: 'Blog', path: '/blog' },
					{ name: post.title, path }
				])
			]
		}
	};
};
