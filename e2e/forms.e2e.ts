import { expect, test, uniqueEmail } from './support/database.ts';

for (const javaScriptEnabled of [true, false]) {
	test.describe(`email sign-up (JavaScript ${javaScriptEnabled ? 'on' : 'off'})`, () => {
		test.use({ javaScriptEnabled });

		test('rejects a bad address and accepts a good one', async ({ page, sql }) => {
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

			const email = uniqueEmail('Hero');
			await page.getByLabel('Get the free daily market email').fill(email);
			await page.getByRole('button', { name: 'Subscribe free' }).click();
			await expect(page.getByRole('status')).toContainText("You're subscribed");

			const rows = await sql`select source from subscribers where email = ${email.toLowerCase()}`;
			expect(rows).toEqual([{ source: 'hero' }]);
		});

		test('treats a repeat sign-up as a success without duplicating it', async ({ page, sql }) => {
			const email = uniqueEmail('repeat');

			for (let attempt = 0; attempt < 2; attempt++) {
				await page.goto('/');
				await page.getByLabel('Get the free daily market email').fill(email);
				await page.getByRole('button', { name: 'Subscribe free' }).click();
				await expect(page.getByRole('status')).toContainText("You're subscribed");
			}

			const [row] =
				await sql`select count(*)::int as count from subscribers where email = ${email}`;
			expect(row).toEqual({ count: 1 });
		});

		test('unlocks the free guide download', async ({ page, sql }) => {
			await page.goto('/');

			const email = uniqueEmail('guide');
			await page.getByLabel('Email address for the free guide').fill(email);
			await page.getByRole('button', { name: 'Send me the guide' }).click();

			const download = page.getByRole('link', { name: /Download the checklist/ });
			await expect(download).toBeVisible();
			const response = await page.request.get((await download.getAttribute('href')) ?? '');
			expect(response.headers()['content-type']).toBe('application/pdf');

			const rows = await sql`select source from subscribers where email = ${email}`;
			expect(rows).toEqual([{ source: 'free-guide' }]);
		});
	});
}
