import type { Thing, WithContext } from 'schema-dts';

/** A social sharing image. Google and Open Graph both expect absolute URLs and real sizes. */
export interface SeoImage {
	/** Site-relative path or absolute URL. */
	readonly src: string;
	readonly width: number;
	readonly height: number;
	/** Describes the image for people who cannot see it. */
	readonly alt: string;
}

/** Extra Open Graph fields for articles (https://ogp.me/#type_article). */
export interface SeoArticle {
	/** ISO 8601 date-time with time zone. */
	readonly publishedTime: string;
	/** ISO 8601 date-time with time zone. */
	readonly modifiedTime: string;
	readonly authorName: string;
}

/**
 * Everything a page needs for search engines and social previews.
 * Every page's `load` function returns one of these as `seo`; the root layout renders it.
 */
export interface SeoData {
	/** The full `<title>`. Use `pageTitle()` to add the site name consistently. */
	readonly title: string;
	/** The meta description: unique per page, written for people, not keywords. */
	readonly description: string;
	/** Site-relative path of this page's canonical URL, such as `/blog`. */
	readonly path: string;
	/** Open Graph type. Defaults to `website`. */
	readonly type?: 'website' | 'article';
	/** Sharing image. Defaults to the site image. */
	readonly image?: SeoImage;
	/** Keeps the page out of search results, for pages like "coming soon". */
	readonly noindex?: boolean;
	/** Article dates and author, required when `type` is `article`. */
	readonly article?: SeoArticle;
	/** Structured data objects, each rendered as its own JSON-LD script. */
	readonly jsonLd?: readonly WithContext<Thing>[];
}
