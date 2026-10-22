/** A member quote. Shown with a "results not typical" note, as trading regulators expect. */
export interface Testimonial {
	readonly quote: string;
	readonly name: string;
	/** How long the person has been a member, or similar context. */
	readonly context: string;
}

export const testimonials: readonly Testimonial[] = [
	{
		quote:
			'Placeholder quote: the live room taught me to plan every trade before I place it. My process is calmer and more consistent.',
		name: 'Placeholder Member A',
		context: 'Member since 2023'
	},
	{
		quote:
			'Placeholder quote: the courses explain the why behind each setup, not just the what. I finally understand my charts.',
		name: 'Placeholder Member B',
		context: 'Member since 2024'
	},
	{
		quote:
			'Placeholder quote: the community is the best part. Asking questions in real time saved me from a lot of mistakes.',
		name: 'Placeholder Member C',
		context: 'Member since 2025'
	}
];
