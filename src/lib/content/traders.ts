/** A member of the trading team. */
export interface Trader {
	readonly name: string;
	readonly role: string;
}

/** Placeholder names for the team grid. */
export const traders: readonly Trader[] = [
	{ name: 'Alex Morgan', role: 'Founder & Head Trader' },
	{ name: 'Jordan Lee', role: 'Director of Futures' },
	{ name: 'Sam Rivera', role: 'Director of Options' },
	{ name: 'Taylor Brooks', role: 'Options Income Specialist' },
	{ name: 'Casey Nguyen', role: 'Director of Stocks' },
	{ name: 'Riley Patel', role: 'Head of Risk' },
	{ name: 'Morgan Diaz', role: 'Quantitative Analyst' },
	{ name: 'Jamie Chen', role: 'Small-Cap Specialist' }
];

/** "Alex Morgan" → "AM": the avatar shows initials instead of a photo. */
export function initials(name: string): string {
	return name
		.split(/\s+/)
		.filter(Boolean)
		.map((part) => part[0]?.toUpperCase() ?? '')
		.slice(0, 2)
		.join('');
}
