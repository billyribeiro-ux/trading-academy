import { index, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { subscribeSources } from '#lib/validation/subscribe.ts';

/** Which form an address came from. Kept in sync with the validation schema. */
export const subscriberSource = pgEnum('subscriber_source', subscribeSources);

/** Email addresses collected by the sign-up forms. One row per address. */
export const subscribers = pgTable(
	'subscribers',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		// Stored lowercase (the validation schema lowercases it), so `unique` is case-insensitive.
		email: text('email').notNull().unique(),
		source: subscriberSource('source').notNull(),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
	},
	(table) => [index('subscribers_created_at_idx').on(table.createdAt)]
);

export type Subscriber = typeof subscribers.$inferSelect;
export type NewSubscriber = typeof subscribers.$inferInsert;

export * from './auth.schema.ts';
