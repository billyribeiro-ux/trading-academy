import { fail } from '@sveltejs/kit';
import * as v from 'valibot';
import { emailField } from './fields.ts';

/**
 * Password length limits, matching `emailAndPassword` in `src/lib/server/auth.ts`. NIST SP
 * 800-63B-4 requires at least 15 characters when a password is the only sign-in factor, and
 * asks that up to 64 or more be allowed.
 */
export const PASSWORD_MIN = 15;
export const PASSWORD_MAX = 128;

/** Validates the sign-up form. */
export const signUpSchema = v.object({
	name: v.pipe(
		v.string('Enter your name.'),
		v.trim(),
		v.nonEmpty('Enter your name.'),
		v.maxLength(80, 'Use 80 characters or fewer for your name.')
	),
	email: emailField,
	password: v.pipe(
		v.string('Choose a password.'),
		v.minLength(PASSWORD_MIN, `Use at least ${PASSWORD_MIN} characters for your password.`),
		v.maxLength(PASSWORD_MAX, `Use ${PASSWORD_MAX} characters or fewer for your password.`)
	)
});

/** Validates the sign-in form. Length rules are not repeated here, so old passwords still work. */
export const signInSchema = v.object({
	email: emailField,
	password: v.pipe(v.string('Enter your password.'), v.nonEmpty('Enter your password.'))
});

/** Field names a form can report an error against. */
export type AuthField = 'name' | 'email' | 'password';

/** What a sign-in or sign-up action returns when it fails. Never includes the password. */
export interface AuthFailure {
	/** A message for the whole form, such as wrong credentials. */
	readonly message?: string;
	/** One message per field that failed validation. */
	readonly fieldErrors: Partial<Record<AuthField, string>>;
	/** Submitted values to refill the form with. */
	readonly values: { readonly name?: string; readonly email: string };
}

/** Turns Valibot issues into one message per field: the first problem found for each. */
export function fieldErrorsFrom(
	issues: readonly v.BaseIssue<unknown>[]
): AuthFailure['fieldErrors'] {
	const errors: Partial<Record<AuthField, string>> = {};
	for (const issue of issues) {
		const key = issue.path?.[0]?.key;
		if ((key === 'name' || key === 'email' || key === 'password') && !errors[key]) {
			errors[key] = issue.message;
		}
	}
	return errors;
}

/**
 * Returns a failed sign-in or sign-up. Typing the body as `AuthFailure` (rather than each
 * literal object) gives the page one predictable `form` type to read.
 */
export function authFailure(status: 400 | 500, failure: AuthFailure) {
	return fail(status, failure);
}
