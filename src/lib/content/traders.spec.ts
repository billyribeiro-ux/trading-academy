import { describe, expect, it } from 'vitest';
import { initials } from './traders.ts';

describe('initials', () => {
	it('uses the first letter of the first two words', () => {
		expect(initials('Alex Morgan')).toBe('AM');
		expect(initials('Mary Ann Smith')).toBe('MA');
	});

	it('handles extra spaces and lower case', () => {
		expect(initials('  sam   rivera ')).toBe('SR');
	});
});
