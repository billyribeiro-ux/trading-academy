import * as v from 'valibot';
import { describe, expect, it } from 'vitest';
import { fieldErrorsFrom, signInSchema, signUpSchema } from './auth.ts';

describe('signUpSchema', () => {
	it('accepts a valid sign-up and normalizes the email', () => {
		const result = v.safeParse(signUpSchema, {
			name: '  Alex  ',
			email: 'Alex@Example.com',
			password: 'correct horse battery staple'
		});

		expect(result.success).toBe(true);
		expect(result.output).toMatchObject({ name: 'Alex', email: 'alex@example.com' });
	});

	it('reports one message per invalid field', () => {
		const result = v.safeParse(signUpSchema, { name: '', email: 'nope', password: 'short' });

		expect(result.success).toBe(false);
		expect(fieldErrorsFrom(result.issues ?? [])).toEqual({
			name: 'Enter your name.',
			email: 'Enter a valid email address, like name@example.com.',
			password: 'Use at least 15 characters for your password.'
		});
	});
});

describe('signInSchema', () => {
	it('requires a password but not a minimum length', () => {
		expect(v.safeParse(signInSchema, { email: 'a@example.com', password: 'x' }).success).toBe(true);
		expect(v.safeParse(signInSchema, { email: 'a@example.com', password: '' }).success).toBe(false);
	});
});
