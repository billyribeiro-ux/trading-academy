import type { SitePath } from '#lib/config/navigation.ts';

/** A proprietary indicator featured on the homepage. */
export interface Indicator {
	readonly name: string;
	readonly summary: string;
	/** Charting platforms the indicator is available on. */
	readonly platforms: readonly string[];
	readonly href: SitePath;
}

export const featuredIndicators: readonly Indicator[] = [
	{
		name: 'Placeholder Momentum Indicator',
		summary:
			'Placeholder text: highlights when momentum is building before a move, so you can plan entries early.',
		platforms: ['TradingView', 'thinkorswim'],
		href: 'indicators'
	},
	{
		name: 'Placeholder Trend Ribbon',
		summary:
			'Placeholder text: shows the direction and strength of the trend across several timeframes at a glance.',
		platforms: ['TradingView', 'thinkorswim'],
		href: 'indicators'
	},
	{
		name: 'Placeholder Volatility Bands',
		summary:
			'Placeholder text: marks unusually tight and unusually wide ranges, where breakouts tend to start.',
		platforms: ['TradingView'],
		href: 'indicators'
	}
];
