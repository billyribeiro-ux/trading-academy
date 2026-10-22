import type { SitePath } from '#lib/config/navigation.ts';

/** A membership plan on the pricing section. */
export interface Plan {
	/** Stable id, used for element ids and keys. */
	readonly id: string;
	readonly name: string;
	readonly description: string;
	/** Price per month when billed monthly, in whole US dollars. */
	readonly monthly: number;
	/** Price per month when billed yearly, in whole US dollars. */
	readonly yearly: number;
	readonly features: readonly string[];
	/** Marks the plan most people should pick. */
	readonly featured?: boolean;
	readonly href: SitePath;
}

export const plans: readonly Plan[] = [
	{
		id: 'starter',
		name: 'Starter',
		description: 'Placeholder text: the essentials for learning to trade.',
		monthly: 49,
		yearly: 39,
		features: [
			'Placeholder: full course library',
			'Placeholder: daily market email',
			'Placeholder: community chat'
		],
		href: 'sign-up'
	},
	{
		id: 'pro',
		name: 'Pro',
		description: 'Placeholder text: trade alongside our team every market day.',
		monthly: 149,
		yearly: 119,
		features: [
			'Placeholder: everything in Starter',
			'Placeholder: all live trading rooms',
			'Placeholder: real-time trade alerts',
			'Placeholder: weekly live classes'
		],
		featured: true,
		href: 'sign-up'
	},
	{
		id: 'elite',
		name: 'Elite',
		description: 'Placeholder text: every tool, room and class we offer.',
		monthly: 299,
		yearly: 239,
		features: [
			'Placeholder: everything in Pro',
			'Placeholder: proprietary indicators',
			'Placeholder: scanner and market scorecard',
			'Placeholder: monthly one-to-one review'
		],
		href: 'sign-up'
	}
];

const usd = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 0
});

/** Formats a whole-dollar price, such as `149` → `$149`. */
export function formatPrice(dollars: number): string {
	return usd.format(dollars);
}

/** Percentage saved by paying yearly, rounded down so the claim is never overstated. */
export function yearlySavingsPercent(plan: Pick<Plan, 'monthly' | 'yearly'>): number {
	return Math.floor(((plan.monthly - plan.yearly) / plan.monthly) * 100);
}
