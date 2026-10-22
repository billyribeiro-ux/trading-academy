import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import EmailSignupForm from './EmailSignupForm.svelte';

const baseProps = {
	source: 'hero',
	label: 'Your email',
	buttonLabel: 'Subscribe',
	successMessage: 'You are subscribed.'
} as const;

describe('EmailSignupForm', () => {
	it('labels the email field and requires it', async () => {
		render(EmailSignupForm, baseProps);

		const input = page.getByLabelText('Your email');
		await expect.element(input).toBeRequired();
		await expect.element(input).toHaveAttribute('type', 'email');
	});

	it('shows the server error, keeps the typed email and marks the field invalid', async () => {
		render(EmailSignupForm, {
			...baseProps,
			result: { source: 'hero', success: false, email: 'bad@', error: 'Enter a valid email.' }
		});

		const input = page.getByLabelText('Your email');
		await expect.element(page.getByRole('alert')).toHaveTextContent('Enter a valid email.');
		await expect.element(input).toHaveValue('bad@');
		await expect.element(input).toHaveAttribute('aria-invalid', 'true');
	});

	it('ignores results that belong to another form on the page', async () => {
		render(EmailSignupForm, {
			...baseProps,
			result: { source: 'free-guide', success: true }
		});

		await expect.element(page.getByLabelText('Your email')).toBeVisible();
		await expect.element(page.getByRole('status')).not.toBeInTheDocument();
	});

	it('replaces the form with the success message after signing up', async () => {
		render(EmailSignupForm, { ...baseProps, result: { source: 'hero', success: true } });

		await expect.element(page.getByRole('status')).toHaveTextContent('You are subscribed.');
	});
});
