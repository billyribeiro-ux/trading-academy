import { expect, test, uniqueEmail } from './support/database.ts';

const password = 'correct horse battery staple';

test.describe('accounts', () => {
	test('sign up, sign out and sign back in', async ({ page, sql }) => {
		const email = uniqueEmail('member');

		await page.goto('/sign-up');
		await page.getByLabel('Full name').fill('Placeholder Member');
		await page.getByLabel('Email').fill(email);
		await page.getByLabel('Password').fill(password);
		await page.getByRole('button', { name: 'Create account' }).click();

		await expect(page).toHaveURL(/\/account$/);
		await expect(page.locator('h1')).toHaveText('Welcome, Placeholder Member');

		const users = await sql`select name from "user" where email = ${email}`;
		expect(users).toEqual([{ name: 'Placeholder Member' }]);

		await page.getByRole('button', { name: 'Sign out' }).click();
		await expect(page).toHaveURL(/\/sign-in$/);

		await page.getByLabel('Email').fill(email);
		await page.getByLabel('Password').fill(password);
		await page.getByRole('button', { name: 'Sign in' }).click();
		await expect(page).toHaveURL(/\/account$/);
	});

	test('rejects a wrong password without saying which part was wrong', async ({ page }) => {
		await page.goto('/sign-in');
		await page.getByLabel('Email').fill(uniqueEmail('nobody'));
		await page.getByLabel('Password').fill('not the right password');
		await page.getByRole('button', { name: 'Sign in' }).click();

		await expect(page.getByRole('alert')).toHaveText(
			'That email and password do not match an account.'
		);
	});

	test('explains every problem with an invalid sign-up', async ({ page }) => {
		await page.goto('/sign-up');
		await page
			.locator('form')
			.first()
			.evaluate((form) => form.setAttribute('novalidate', ''));
		await page.getByLabel('Email').fill('not-an-email');
		await page.getByLabel('Password').fill('short');
		await page.getByRole('button', { name: 'Create account' }).click();

		await expect(page.getByText('Enter your name.')).toBeVisible();
		await expect(
			page.getByText('Enter a valid email address, like name@example.com.')
		).toBeVisible();
		await expect(page.getByText('Use at least 15 characters for your password.')).toBeVisible();
		await expect(page.getByLabel('Email')).toHaveValue('not-an-email');
		await expect(page.getByLabel('Password')).toHaveValue('');
	});

	test('sends visitors who are not signed in from the account page to sign in', async ({
		page
	}) => {
		await page.goto('/account');

		await expect(page).toHaveURL(/\/sign-in$/);
	});
});

test.describe('accounts without JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	test('sign up still works and lands on the account page', async ({ page }) => {
		await page.goto('/sign-up');
		await page.getByLabel('Full name').fill('No Script Member');
		await page.getByLabel('Email').fill(uniqueEmail('noscript'));
		await page.getByLabel('Password').fill(password);
		await page.getByRole('button', { name: 'Create account' }).click();

		await expect(page).toHaveURL(/\/account$/);
		await expect(page.locator('h1')).toHaveText('Welcome, No Script Member');
	});
});
