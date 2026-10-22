import { redirect } from '@sveltejs/kit';
import { isAPIError } from 'better-auth/api';
import * as v from 'valibot';
import { pageTitle } from '#lib/config/site.ts';
import { auth } from '#lib/server/auth.ts';
import { field } from '#lib/server/form-data.ts';
import { authFailure, fieldErrorsFrom, signUpSchema } from '#lib/validation/auth.ts';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) redirect(303, '/account');

	return {
		seo: {
			title: pageTitle('Create your account'),
			description: 'Placeholder description: create a free account to start learning.',
			path: '/sign-up',
			noindex: true
		}
	};
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const values = { name: field(data, 'name'), email: field(data, 'email') };
		const parsed = v.safeParse(signUpSchema, { ...values, password: field(data, 'password') });

		if (!parsed.success) {
			return authFailure(400, {
				values,
				fieldErrors: fieldErrorsFrom(parsed.issues)
			});
		}

		try {
			await auth.api.signUpEmail({ body: parsed.output, headers: request.headers });
		} catch (error) {
			if (isAPIError(error) && error.body?.code?.startsWith('USER_ALREADY_EXISTS')) {
				return authFailure(400, {
					values,
					fieldErrors: { email: 'An account with this email already exists. Sign in instead.' }
				});
			}
			console.error('Sign-up failed', error);
			return authFailure(500, {
				values,
				message: 'We could not create your account just now. Please try again in a minute.',
				fieldErrors: {}
			});
		}

		redirect(303, '/account');
	}
} satisfies Actions;
