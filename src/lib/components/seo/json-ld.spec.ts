import { describe, expect, it } from 'vitest';
import {
	blogPostingSchema,
	breadcrumbSchema,
	jsonLdScript,
	organizationSchema,
	serializeJsonLd,
	websiteSchema,
	type SiteFacts
} from './json-ld.ts';

const site: SiteFacts = {
	name: 'Test Site',
	description: 'A test description',
	url: 'https://example.com',
	logo: '/images/logo.png',
	language: 'en',
	contact: { phone: '+1-555-000-0000', email: 'hello@example.com' },
	social: [{ href: 'https://x.com/example' }]
};

describe('serializeJsonLd', () => {
	it('escapes characters that could close the script tag', () => {
		const output = serializeJsonLd({
			'@context': 'https://schema.org',
			'@type': 'Thing',
			name: '</script><script>alert(1)</script> & more'
		});

		expect(output).not.toContain('<');
		expect(output).not.toContain('>');
		expect(output).not.toContain('&');
		expect(JSON.parse(output)).toMatchObject({
			name: '</script><script>alert(1)</script> & more'
		});
	});
});

describe('jsonLdScript', () => {
	it('wraps the escaped data in exactly one JSON-LD script tag', () => {
		const tag = jsonLdScript({
			'@context': 'https://schema.org',
			'@type': 'Thing',
			name: '</script>'
		});

		expect(tag.startsWith('<script type="application/ld+json">')).toBe(true);
		expect(tag.match(/<\/script>/g)).toHaveLength(1);
	});
});

describe('organizationSchema', () => {
	it('uses absolute URLs for the page and the logo', () => {
		const schema = organizationSchema(site);

		expect(schema).toMatchObject({
			'@type': 'Organization',
			url: 'https://example.com/',
			logo: 'https://example.com/images/logo.png',
			sameAs: ['https://x.com/example']
		});
	});
});

describe('websiteSchema', () => {
	it('links the website to its publisher organization', () => {
		const schema = websiteSchema(site);

		expect(schema).toMatchObject({
			'@type': 'WebSite',
			name: 'Test Site',
			publisher: { '@id': 'https://example.com/#organization' }
		});
	});
});

describe('breadcrumbSchema', () => {
	it('numbers crumbs from 1 and resolves each path', () => {
		const schema = breadcrumbSchema('https://example.com', [
			{ name: 'Home', path: '/' },
			{ name: 'Blog', path: '/blog' }
		]);

		expect(schema.itemListElement).toEqual([
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://example.com/' },
			{ '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://example.com/blog' }
		]);
	});
});

describe('blogPostingSchema', () => {
	it('builds absolute URLs and keeps both dates', () => {
		const schema = blogPostingSchema(site, {
			title: 'A post',
			description: 'About things',
			path: '/blog/a-post',
			image: '/images/og-default.png',
			publishedAt: '2026-10-01T08:00:00-05:00',
			updatedAt: '2026-10-02T08:00:00-05:00',
			authorName: 'Alex Morgan'
		});

		expect(schema).toMatchObject({
			'@type': 'BlogPosting',
			mainEntityOfPage: 'https://example.com/blog/a-post',
			image: ['https://example.com/images/og-default.png'],
			datePublished: '2026-10-01T08:00:00-05:00',
			dateModified: '2026-10-02T08:00:00-05:00',
			author: { '@type': 'Person', name: 'Alex Morgan' }
		});
	});
});
