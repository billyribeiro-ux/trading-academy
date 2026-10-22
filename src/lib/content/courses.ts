import type { SitePath } from '#lib/config/navigation.ts';

/** How much experience a course assumes. */
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

/** A course featured on the homepage. */
export interface Course {
	readonly title: string;
	readonly summary: string;
	readonly level: CourseLevel;
	readonly lessons: number;
	/** Total video time, written out for display. */
	readonly duration: string;
	readonly href: SitePath;
}

export const featuredCourses: readonly Course[] = [
	{
		title: 'Placeholder Course: Trading Foundations',
		summary:
			'Placeholder text: charts, order types and risk management, explained from the ground up.',
		level: 'Beginner',
		lessons: 12,
		duration: '4 hours',
		href: 'courses'
	},
	{
		title: 'Placeholder Course: Options Strategies',
		summary:
			'Placeholder text: build, adjust and exit options positions with a repeatable process.',
		level: 'Intermediate',
		lessons: 18,
		duration: '7 hours',
		href: 'courses'
	},
	{
		title: 'Placeholder Course: Trading the Open',
		summary:
			'Placeholder text: plan, size and manage trades in the fastest hour of the trading day.',
		level: 'Advanced',
		lessons: 10,
		duration: '5 hours',
		href: 'courses'
	}
];
