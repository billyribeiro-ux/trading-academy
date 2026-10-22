import { expect, test } from '@playwright/test';

for (const javaScriptEnabled of [true, false]) {
	test.describe(`email sign-up (JavaScript ${javaScriptEnabled ? 'on' : 'off'})`, () => {
		test.use({ javaScriptEnabled });

		test('rejects a bad address and accepts a good one', async ({ page }) => {
			await page.goto('/');
			const field = page.getByLabel('Get the free daily market email');

			await field.fill('not-an-email');
			// Skip the browser's own check so the server-side validation is what gets tested.
			await page
				.locator('form.signup')
				.first()
				.evaluate((form) => form.setAttribute('novalidate', ''));
			await page.getByRole('button', { name: 'Subscribe free' }).click();

			await expect(page.getByRole('alert')).toHaveText(
				'Enter a valid email address, like name@example.com.'
			);
			await expect(page.getByLabel('Get the free daily market email')).toHaveValue('not-an-email');

			await page.getByLabel('Get the free daily market email').fill('trader@example.com');
			await page.getByRole('button', { name: 'Subscribe free' }).click();
			await expect(page.getByRole('status')).toContainText("You're subscribed");
		});

		test('unlocks the free guide download', async ({ page }) => {
			await page.goto('/');

			await page.getByLabel('Email address for the free guide').fill('guide@example.com');
			await page.getByRole('button', { name: 'Send me the guide' }).click();

			const download = page.getByRole('link', { name: /Download the checklist/ });
			await expect(download).toBeVisible();
			const response = await page.request.get((await download.getAttribute('href')) ?? '');
			expect(response.headers()['content-type']).toBe('application/pdf');
		});
	});
}
