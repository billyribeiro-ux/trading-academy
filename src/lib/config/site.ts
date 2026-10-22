import { SITE_URL } from '$app/env/public';

/** A link to one of the brand's social profiles. */
export interface SocialProfile {
	/** Network name, used for the accessible label. */
	readonly name: 'YouTube' | 'X' | 'Facebook' | 'Instagram';
	/** Absolute profile URL. */
	readonly href: string;
}

/**
 * Site-wide facts used by the layout, SEO tags and structured data.
 * Every value is placeholder content for this learning project.
 */
export const site = {
	name: 'Trading Academy',
	/** Default description for pages that do not set their own. */
	description:
		'Placeholder description: live trading rooms, courses and proprietary indicators for traders at every level.',
	url: SITE_URL,
	locale: 'en_US',
	language: 'en',
	/** Square logo for structured data. Google asks for at least 112×112 px. */
	logo: '/images/logo.png',
	/** Default social sharing image, 1200×630 px. */
	ogImage: {
		src: '/images/og-default.png',
		width: 1200,
		height: 630,
		alt: 'Trading Academy placeholder sharing image'
	},
	contact: {
		phone: '+1-555-010-0199',
		phoneDisplay: '(555) 010-0199',
		email: 'support@example.com'
	},
	address: {
		street: '100 Placeholder Avenue, Suite 200',
		city: 'Austin',
		region: 'TX',
		postalCode: '78701',
		country: 'US'
	},
	social: [
		{ name: 'YouTube', href: 'https://www.youtube.com/@example' },
		{ name: 'X', href: 'https://x.com/example' },
		{ name: 'Facebook', href: 'https://www.facebook.com/example' },
		{ name: 'Instagram', href: 'https://www.instagram.com/example' }
	] satisfies readonly SocialProfile[]
} as const;

/** Builds a page `<title>` with the site name at the end, one of the two placements Google's title guidance suggests. */
export function pageTitle(part: string): string {
	return `${part} | ${site.name}`;
}

/** Turns a site-relative path such as `/blog` into an absolute URL on the canonical origin. */
export function absoluteUrl(path: string): string {
	return new URL(path, site.url).href;
}
