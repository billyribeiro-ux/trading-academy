import type { Path } from '$app/types';

/**
 * A path inside the site, written the way SvelteKit's `resolve()` expects: relative to the
 * site root, without a leading slash (`''` is the homepage), optionally with a `#hash`.
 */
export type SitePath = Path | `${Path}#${string}`;

/** One link in the site menu. */
export interface NavLink {
	readonly label: string;
	readonly href: SitePath;
}

/** A titled group of links inside a menu. */
export interface NavGroup {
	readonly title: string;
	readonly links: readonly NavLink[];
}

/** A top-level menu that opens to show one or more groups. */
export interface NavMenu {
	readonly label: string;
	readonly groups: readonly NavGroup[];
}

/** The primary navigation, mirroring the structure of a trading-education site. */
export const primaryNav: readonly NavMenu[] = [
	{
		label: 'Live Trading',
		groups: [
			{
				title: 'Trading rooms',
				links: [
					{ label: 'Day Trading Room', href: 'trading-rooms/day-trading' },
					{ label: 'Swing Trading Room', href: 'trading-rooms/swing-trading' },
					{ label: 'Small Account Room', href: 'trading-rooms/small-account' },
					{ label: 'Options Income Room', href: 'trading-rooms/options-income' }
				]
			},
			{
				title: 'Alert services',
				links: [
					{ label: 'Stock Alerts', href: 'alerts/stock-alerts' },
					{ label: 'Options Alerts', href: 'alerts/options-alerts' }
				]
			}
		]
	},
	{
		label: 'Learning',
		groups: [
			{
				title: 'Education',
				links: [
					{ label: 'Courses', href: 'courses' },
					{ label: 'Trading 101', href: 'trading-101' },
					{ label: 'Live & On-Demand Classes', href: 'classes' }
				]
			}
		]
	},
	{
		label: 'Tools',
		groups: [
			{
				title: 'Trading tools',
				links: [
					{ label: 'Indicators', href: 'indicators' },
					{ label: 'Scanner', href: 'scanner' },
					{ label: 'Market Scorecard', href: 'market-scorecard' }
				]
			}
		]
	},
	{
		label: 'Resources',
		groups: [
			{
				title: 'Free resources',
				links: [
					{ label: 'Blog', href: 'blog' },
					{ label: 'Daily Videos', href: 'daily-videos' },
					{ label: 'News', href: 'news' },
					{ label: 'Newsletters', href: 'newsletters' }
				]
			}
		]
	},
	{
		label: 'About',
		groups: [
			{
				title: 'Company',
				links: [
					{ label: 'Who We Are', href: 'about' },
					{ label: 'Our Traders', href: 'traders' }
				]
			}
		]
	}
];

/** Links shown next to the menus. */
export const headerLinks = {
	pricing: { label: 'Pricing', href: '#memberships' },
	signIn: { label: 'Sign in', href: 'sign-in' },
	cta: { label: 'Start free', href: '#free-guide' }
} as const satisfies Record<string, NavLink>;
