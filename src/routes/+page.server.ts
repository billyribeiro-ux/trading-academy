import { fail } from '@sveltejs/kit';
import * as v from 'valibot';
import { addSubscriber } from '#lib/server/subscribers.ts';
import {
	subscribeSchema,
	subscribeSources,
	type SubscribeResult,
	type SubscribeSource
} from '#lib/validation/subscribe.ts';
import type { Actions } from './$types';

/** Reads a form field as a string; anything else (a file, or nothing) becomes empty. */
function field(data: FormData, name: string): string {
	const value = data.get(name);
	return typeof value === 'string' ? value : '';
}

/** Falls back to the hero form when a tampered request sends an unknown source. */
function toSource(value: string): SubscribeSource {
	return subscribeSources.find((source) => source === value) ?? 'hero';
}

export const actions = {
	subscribe: async ({ request }) => {
		const data = await request.formData();
		const source = toSource(field(data, 'source'));

		// Honeypot: the field is hidden from people, so only bots fill it in. Pretend it
		// worked so they get no signal to adapt.
		if (field(data, 'company') !== '') {
			return { source, success: true } satisfies SubscribeResult;
		}

		const parsed = v.safeParse(subscribeSchema, { email: field(data, 'email'), source });

		if (!parsed.success) {
			return fail(400, {
				source,
				success: false,
				email: field(data, 'email'),
				error: parsed.issues[0]?.message ?? 'Check your email address and try again.'
			} satisfies SubscribeResult);
		}

		try {
			await addSubscriber(parsed.output);
		} catch (error) {
			console.error('Saving a subscriber failed', error);
			return fail(503, {
				source,
				success: false,
				email: parsed.output.email,
				error: 'We could not save your sign-up just now. Please try again in a minute.'
			} satisfies SubscribeResult);
		}

		return { source: parsed.output.source, success: true } satisfies SubscribeResult;
	}
} satisfies Actions;
