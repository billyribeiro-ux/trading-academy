import * as v from 'valibot';
import { emailField } from './fields.ts';

/** Where a sign-up form sits on the page. Each form sees only the result of its own submit. */
export const subscribeSources = ['hero', 'free-guide'] as const;

export type SubscribeSource = (typeof subscribeSources)[number];

/** Validates an email sign-up. The same schema runs on the server for every submission. */
export const subscribeSchema = v.object({
	email: emailField,
	source: v.picklist(subscribeSources, 'Unknown form.')
});

export type SubscribeInput = v.InferOutput<typeof subscribeSchema>;

/** What the server sends back to a sign-up form after a submit. */
export type SubscribeResult =
	| { readonly source: SubscribeSource; readonly success: true }
	| {
			readonly source: SubscribeSource;
			readonly success: false;
			/** The submitted email, so the visitor does not have to type it again. */
			readonly email: string;
			readonly error: string;
	  };
