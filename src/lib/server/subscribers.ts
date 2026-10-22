import { db } from '#lib/server/db/index.ts';
import { subscribers } from '#lib/server/db/schema.ts';
import type { SubscribeInput } from '#lib/validation/subscribe.ts';

/**
 * Saves a validated sign-up. Signing up twice with the same address is not an error: the
 * existing row is kept, and the caller treats both cases the same way, so the form never
 * reveals whether an address is already on the list.
 */
export async function addSubscriber(input: SubscribeInput): Promise<'created' | 'existing'> {
	const inserted = await db
		.insert(subscribers)
		.values({ email: input.email, source: input.source })
		.onConflictDoNothing({ target: subscribers.email })
		.returning({ id: subscribers.id });

	return inserted.length > 0 ? 'created' : 'existing';
}
