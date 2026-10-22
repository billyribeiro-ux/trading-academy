/** One question and answer. */
export interface FaqItem {
	readonly question: string;
	readonly answer: string;
}

export const faqs: readonly FaqItem[] = [
	{
		question: 'Placeholder question: do I need trading experience to join?',
		answer:
			'Placeholder answer: no. Every plan includes beginner courses, and the live rooms explain each trade as it happens.'
	},
	{
		question: 'Placeholder question: which markets do you trade?',
		answer:
			'Placeholder answer: mostly US stocks, options and index futures, with a focus on liquid, widely traded names.'
	},
	{
		question: 'Placeholder question: can I cancel at any time?',
		answer:
			'Placeholder answer: yes. Cancel from your account page and you keep access until the end of the billing period.'
	},
	{
		question: 'Placeholder question: do the indicators work on my charting platform?',
		answer:
			'Placeholder answer: each indicator lists the platforms it supports, such as TradingView and thinkorswim.'
	},
	{
		question: 'Placeholder question: is this financial advice?',
		answer:
			'Placeholder answer: no. Everything here is education. You make your own decisions and take your own risk.'
	}
];
