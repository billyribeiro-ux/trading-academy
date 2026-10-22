import type { SitePath } from '#lib/config/navigation.ts';

/** A free live training promoted across the site. */
export interface Webinar {
	readonly title: string;
	/** ISO 8601 start time with time zone, for the `<time>` element. */
	readonly startsAt: string;
	/** Human-readable date, written out so server and browser always render the same text. */
	readonly dateLabel: string;
	/** Registration page. */
	readonly href: SitePath;
}

/** The next free training, shown in the announcement bar. */
export const nextWebinar: Webinar = {
	title: 'Placeholder free training: reading the market open',
	startsAt: '2026-11-04T18:00:00-06:00',
	dateLabel: 'Wed, Nov 4 · 6 PM CT',
	href: 'classes'
};
