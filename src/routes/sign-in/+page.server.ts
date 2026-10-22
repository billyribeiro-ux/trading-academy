import { redirect } from '@sveltejs/kit';
import { isAPIError } from 'better-auth/api';
import * as v from 'valibot';
import { pageTitle } from '#lib/config/site.ts';
import { auth } from '#lib/server/auth.ts';
import { field } from '#lib/server/form-data.ts';
import { authFailure, fieldErrorsFrom, signInSchema } from '#lib/validation/auth.ts';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) redirect(303, '/account');

	return {
		seo: {
			title: pageTitle('Sign in'),
			description: 'Placeholder description: sign in to your account.',
			path: '/sign-in',
			noindex: true
		}
	};
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const values = { email: field(data, 'email') };
		const parsed = v.safeParse(signInSchema, { ...values, password: field(data, 'password') });

		if (!parsed.success) {
			return authFailure(400, {
				values,
				fieldErrors: fieldErrorsFrom(parsed.issues)
			});
		}

		try {
			await auth.api.signInEmail({ body: parsed.output, headers: request.headers });
		} catch (error) {
			// One message for a wrong email or a wrong password, so the form never confirms
			// which addresses have accounts.
			if (isAPIError(error) && (error.status === 'UNAUTHORIZED' || error.statusCode === 401)) {
				return authFailure(400, {
					values,
					message: 'That email and password do not match an account.',
					fieldErrors: {}
				});
			}
			console.error('Sign-in failed', error);
			return authFailure(500, {
				values,
				message: 'We could not sign you in just now. Please try again in a minute.',
				fieldErrors: {}
			});
		}

		redirect(303, '/account');
	}
} satisfies Actions;
