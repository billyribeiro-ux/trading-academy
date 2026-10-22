import type { BreadcrumbList, Organization, Thing, WebSite, WithContext } from 'schema-dts';

/** The site facts the structured-data builders need. */
export interface SiteFacts {
	readonly name: string;
	readonly description: string;
	/** Canonical origin, such as `https://example.com`. */
	readonly url: string;
	/** Site-relative path to a square raster logo. */
	readonly logo: string;
	readonly language: string;
	readonly contact: { readonly phone: string; readonly email: string };
	readonly social: readonly { readonly href: string }[];
}

/** One step in a breadcrumb trail. */
export interface Crumb {
	readonly name: string;
	/** Site-relative path. */
	readonly path: string;
}

/**
 * Serializes structured data for a `<script type="application/ld+json">` tag.
 * Escapes `<`, `>` and `&` so no string in the data can close the script tag early, and the
 * two Unicode line separators that older JavaScript parsers treat as line breaks.
 */
export function serializeJsonLd(data: WithContext<Thing>): string {
	return JSON.stringify(data)
		.replace(/</g, '\\u003c')
		.replace(/>/g, '\\u003e')
		.replace(/&/g, '\\u0026')
		.replace(/\u2028/g, '\\u2028')
		.replace(/\u2029/g, '\\u2029');
}

/**
 * A complete `<script type="application/ld+json">` tag, ready for `{@html}` in `<svelte:head>`.
 * Built here rather than in markup because a literal closing script tag inside a Svelte
 * template ends the template's own parsing.
 */
export function jsonLdScript(data: WithContext<Thing>): string {
	return `<script type="application/ld+json">${serializeJsonLd(data)}</script>`;
}

/** `Organization` for the homepage, so Google can show the brand's logo and profiles. */
export function organizationSchema(site: SiteFacts): WithContext<Organization> {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': `${site.url}/#organization`,
		name: site.name,
		description: site.description,
		url: `${site.url}/`,
		logo: new URL(site.logo, site.url).href,
		email: site.contact.email,
		telephone: site.contact.phone,
		sameAs: site.social.map((profile) => profile.href)
	};
}

/** `WebSite` for the homepage, which tells Google the site's preferred name. */
export function websiteSchema(site: SiteFacts): WithContext<WebSite> {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${site.url}/#website`,
		name: site.name,
		url: `${site.url}/`,
		inLanguage: site.language,
		publisher: { '@id': `${site.url}/#organization` }
	};
}

/** `BreadcrumbList` describing where a page sits in the site hierarchy. */
export function breadcrumbSchema(
	origin: string,
	crumbs: readonly Crumb[]
): WithContext<BreadcrumbList> {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: crumbs.map((crumb, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: crumb.name,
			item: new URL(crumb.path, origin).href
		}))
	};
}
