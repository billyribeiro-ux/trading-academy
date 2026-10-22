import * as v from 'valibot';
import { describe, expect, it } from 'vitest';
import { subscribeSchema } from './subscribe.ts';

describe('subscribeSchema', () => {
	it('accepts a valid email and normalizes it', () => {
		const result = v.safeParse(subscribeSchema, { email: '  Trader@Example.COM ', source: 'hero' });

		expect(result.success).toBe(true);
		expect(result.output).toEqual({ email: 'trader@example.com', source: 'hero' });
	});

	it('rejects an empty email with a helpful message', () => {
		const result = v.safeParse(subscribeSchema, { email: '   ', source: 'hero' });

		expect(result.success).toBe(false);
		expect(result.issues?.[0]?.message).toBe('Enter your email address.');
	});

	it('rejects a malformed email', () => {
		const result = v.safeParse(subscribeSchema, { email: 'not-an-email', source: 'free-guide' });

		expect(result.success).toBe(false);
		expect(result.issues?.[0]?.message).toBe('Enter a valid email address, like name@example.com.');
	});

	it('rejects an unknown form source', () => {
		const result = v.safeParse(subscribeSchema, { email: 'a@example.com', source: 'footer' });

		expect(result.success).toBe(false);
	});
});
