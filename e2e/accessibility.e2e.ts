import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const pages = [
	'/',
	'/blog',
	'/blog/placeholder-how-to-plan-a-trade',
	'/courses',
	'/sign-in',
	'/sign-up',
	'/not-a-page'
];

// Every rule tag up to WCAG 2.2 level AA.
const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

for (const colorScheme of ['light', 'dark'] as const) {
	test.describe(`accessibility (${colorScheme} theme)`, () => {
		test.use({ colorScheme });

		for (const path of pages) {
			test(`${path} has no WCAG 2.2 AA violations`, async ({ page }) => {
				await page.goto(path);

				const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

				expect(results.violations.map((violation) => violation.id)).toEqual([]);
			});
		}
	});
}
