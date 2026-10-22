import { redirect } from '@sveltejs/kit';
import { pageTitle } from '#lib/config/site.ts';
import { auth } from '#lib/server/auth.ts';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.user) redirect(303, '/sign-in');

	return {
		user: { name: locals.user.name, email: locals.user.email },
		seo: {
			title: pageTitle('Your account'),
			description: 'Your account details.',
			path: '/account',
			noindex: true
		}
	};
};

export const actions = {
	signOut: async ({ request, locals }) => {
		await auth.api.signOut({ headers: request.headers });
		delete locals.user;
		delete locals.session;
		redirect(303, '/sign-in');
	}
} satisfies Actions;
