import { expect, test } from '@playwright/test';

test.describe('site menu', () => {
	test('works from the mobile sheet', async ({ page, isMobile }) => {
		test.skip(!isMobile, 'The sheet only exists on small screens');
		await page.goto('/');

		await page.getByRole('button', { name: 'Open menu' }).click();
		await expect(page.locator('#site-menu')).toBeVisible();

		await page.locator('summary', { hasText: 'Live Trading' }).click();
		await page.getByRole('link', { name: 'Day Trading Room' }).click();

		await expect(page).toHaveURL(/\/trading-rooms\/day-trading$/);
		await expect(page.locator('h1')).toHaveText('Day Trading Room');
		await expect(page.locator('#site-menu')).toBeHidden();
	});

	test('closes desktop dropdowns with Escape and returns focus', async ({ page, isMobile }) => {
		test.skip(isMobile, 'Dropdowns sit inline on large screens');
		await page.goto('/');
		const tools = page.locator('details', { has: page.locator('summary', { hasText: 'Tools' }) });

		await tools.locator('summary').click();
		await expect(tools).toHaveAttribute('open', '');
		await page.keyboard.press('Escape');
		await expect(tools).not.toHaveAttribute('open', '');
		await expect(tools.locator('summary')).toBeFocused();
	});

	test('skip link moves focus to the main content', async ({ page, isMobile }) => {
		test.skip(isMobile, 'Keyboard navigation is tested on desktop');
		await page.goto('/');

		await page.keyboard.press('Tab');
		await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
		await page.keyboard.press('Enter');
		await expect(page.locator('#main')).toBeFocused();
	});

	test('returns 404 for unknown pages', async ({ page }) => {
		const response = await page.goto('/this-page-does-not-exist');

		expect(response?.status()).toBe(404);
		await expect(page.locator('h1')).toHaveText('Page not found');
	});
});
