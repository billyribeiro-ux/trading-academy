import { expect, test } from '@playwright/test';

test.describe('homepage', () => {
	test('has one h1 and every section in order', async ({ page }) => {
		await page.goto('/');

		await expect(page.locator('h1')).toHaveCount(1);
		const sectionTitles = await page.locator('main h2').allTextContents();
		expect(sectionTitles.length).toBeGreaterThanOrEqual(12);
		await expect(page.locator('#memberships')).toBeVisible();
		await expect(page.locator('#free-guide')).toBeVisible();
		await expect(page.locator('#support')).toBeVisible();
	});

	test('switches membership prices between monthly and yearly', async ({ page }) => {
		await page.goto('/#memberships');
		const prices = page.locator('#memberships .price:visible .amount');

		await expect(prices).toHaveText(['$49', '$149', '$299']);
		await page.getByLabel(/Yearly/).check();
		await expect(prices).toHaveText(['$39', '$119', '$239']);
	});

	test('opens and closes an FAQ answer', async ({ page }) => {
		await page.goto('/');
		const item = page.locator('details', { hasText: 'can I cancel at any time' });

		await item.locator('summary').click();
		await expect(item).toHaveAttribute('open', '');
		await item.locator('summary').click();
		await expect(item).not.toHaveAttribute('open', '');
	});
});
