/**
 * Site-relative paths that search engines should index. The sitemap is generated from this
 * list, so adding a public page means adding its path here.
 */
export const indexablePaths: readonly string[] = ['/'];

/**
 * Menu destinations that are not built yet. Each one renders a shared "coming soon" page that
 * search engines are told not to index. When a real page is built, its path moves out of this
 * list and into the routes folder.
 */
export const comingSoonPaths: ReadonlySet<string> = new Set([
	'trading-rooms/day-trading',
	'trading-rooms/swing-trading',
	'trading-rooms/small-account',
	'trading-rooms/options-income',
	'alerts/stock-alerts',
	'alerts/options-alerts',
	'courses',
	'trading-101',
	'classes',
	'indicators',
	'scanner',
	'market-scorecard',
	'blog',
	'daily-videos',
	'news',
	'newsletters',
	'about',
	'traders',
	'sign-in',
	'sign-up',
	'privacy',
	'terms',
	'risk-disclosure'
]);
