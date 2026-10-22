/** One block of article content. Typed blocks keep posts safe to render without raw HTML. */
export type PostBlock =
	| { readonly type: 'paragraph'; readonly text: string }
	| { readonly type: 'heading'; readonly text: string }
	| { readonly type: 'list'; readonly items: readonly string[] };

/** A blog article. */
export interface Post {
	/** URL segment: `/blog/<slug>`. Lowercase words joined by hyphens. */
	readonly slug: string;
	readonly title: string;
	/** Used as the meta description and the summary on cards. */
	readonly description: string;
	readonly category: string;
	/** ISO 8601 date-time with time zone. */
	readonly publishedAt: string;
	/** ISO 8601 date-time with time zone. Equal to `publishedAt` until the post is edited. */
	readonly updatedAt: string;
	readonly author: { readonly name: string; readonly role: string };
	readonly readingMinutes: number;
	readonly body: readonly PostBlock[];
}

const posts: readonly Post[] = [
	{
		slug: 'placeholder-how-to-plan-a-trade',
		title: 'Placeholder Article: How to Plan a Trade Before the Open',
		description:
			'Placeholder description: a five-step routine for planning entries, stops and targets before the market opens.',
		category: 'Strategy',
		publishedAt: '2026-10-12T08:00:00-05:00',
		updatedAt: '2026-10-12T08:00:00-05:00',
		author: { name: 'Alex Morgan', role: 'Founder & Head Trader' },
		readingMinutes: 6,
		body: [
			{
				type: 'paragraph',
				text: 'Placeholder text: most trading mistakes happen in the first minutes of the session, when prices move fast and decisions feel urgent. A written plan moves those decisions to a calmer moment.'
			},
			{ type: 'heading', text: 'Placeholder heading: start with the setup' },
			{
				type: 'paragraph',
				text: 'Placeholder text: describe the pattern you are waiting for in one sentence. If you cannot, you are not ready to trade it.'
			},
			{ type: 'heading', text: 'Placeholder heading: the checklist' },
			{
				type: 'list',
				items: [
					'Placeholder: the entry trigger',
					'Placeholder: the stop-loss level',
					'Placeholder: the position size',
					'Placeholder: the profit target'
				]
			},
			{
				type: 'paragraph',
				text: 'Placeholder text: review the plan after the close and note what you would change next time.'
			}
		]
	},
	{
		slug: 'placeholder-position-sizing-basics',
		title: 'Placeholder Article: Position Sizing Basics',
		description:
			'Placeholder description: why the size of a trade matters more than the entry, and a simple formula to set it.',
		category: 'Risk management',
		publishedAt: '2026-10-05T08:00:00-05:00',
		updatedAt: '2026-10-08T09:30:00-05:00',
		author: { name: 'Riley Patel', role: 'Head of Risk' },
		readingMinutes: 5,
		body: [
			{
				type: 'paragraph',
				text: 'Placeholder text: a good setup with the wrong size can still ruin an account. Sizing from the stop keeps every loss small and predictable.'
			},
			{ type: 'heading', text: 'Placeholder heading: risk a fixed amount' },
			{
				type: 'paragraph',
				text: 'Placeholder text: decide the most you will lose on one trade, then divide it by the distance to your stop to get the number of shares.'
			}
		]
	},
	{
		slug: 'placeholder-reading-market-internals',
		title: 'Placeholder Article: Reading Market Internals',
		description:
			'Placeholder description: what breadth, volume and sector strength tell you about the day ahead.',
		category: 'Market analysis',
		publishedAt: '2026-09-28T08:00:00-05:00',
		updatedAt: '2026-09-28T08:00:00-05:00',
		author: { name: 'Morgan Diaz', role: 'Quantitative Analyst' },
		readingMinutes: 7,
		body: [
			{
				type: 'paragraph',
				text: 'Placeholder text: the index price is only the headline. Internals show whether the move has broad support underneath it.'
			},
			{ type: 'heading', text: 'Placeholder heading: three numbers to watch' },
			{
				type: 'list',
				items: [
					'Placeholder: advancing versus declining stocks',
					'Placeholder: up volume versus down volume',
					'Placeholder: how many sectors are rising'
				]
			}
		]
	}
];

/** Every post, newest first. */
export const allPosts: readonly Post[] = [...posts].sort(
	(a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)
);

/** The newest posts, for the homepage preview. */
export function latestPosts(count: number): readonly Post[] {
	return allPosts.slice(0, count);
}

/** Finds a post by its URL slug. */
export function findPost(slug: string): Post | undefined {
	return allPosts.find((post) => post.slug === slug);
}

const dateFormat = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'long',
	// A fixed time zone so the server and every browser print the same date.
	timeZone: 'America/Chicago'
});

/** `2026-10-12T08:00:00-05:00` → `October 12, 2026`. */
export function formatPostDate(iso: string): string {
	return dateFormat.format(new Date(iso));
}
