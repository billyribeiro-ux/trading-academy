import { expect, test } from '@playwright/test';

const pages = ['/', '/blog', '/blog/placeholder-how-to-plan-a-trade'];

test.describe('search engine tags', () => {
	for (const path of pages) {
		test(`${path} has a title, description, canonical and valid JSON-LD`, async ({ page }) => {
			await page.goto(path);

			await expect(page).toHaveTitle(/Trading Academy/);
			await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{50,}/);
			await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
				'href',
				new RegExp(`${path === '/' ? '/' : path}$`)
			);

			const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
			expect(blocks.length).toBeGreaterThan(0);
			for (const block of blocks) {
				expect(() => JSON.parse(block)).not.toThrow();
			}
		});
	}

	test('coming-soon pages are kept out of search results', async ({ page }) => {
		await page.goto('/courses');

		await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
	});

	test('robots.txt points to the sitemap, which lists every article', async ({ request }) => {
		const robots = await (await request.get('/robots.txt')).text();
		expect(robots).toContain('Sitemap: ');

		const sitemap = await (await request.get('/sitemap.xml')).text();
		expect(sitemap).toContain('/blog/placeholder-how-to-plan-a-trade</loc>');
	});
});
