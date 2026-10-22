import { describe, expect, it } from 'vitest';
import { formatPrice, plans, yearlySavingsPercent } from './plans.ts';

describe('formatPrice', () => {
	it('formats whole dollars without cents', () => {
		expect(formatPrice(149)).toBe('$149');
		expect(formatPrice(1200)).toBe('$1,200');
	});
});

describe('yearlySavingsPercent', () => {
	it('rounds down so the saving is never overstated', () => {
		expect(yearlySavingsPercent({ monthly: 149, yearly: 119 })).toBe(20);
		expect(yearlySavingsPercent({ monthly: 3, yearly: 2 })).toBe(33);
	});
});

describe('plans', () => {
	it('always makes yearly billing cheaper than monthly', () => {
		for (const plan of plans) {
			expect(plan.yearly).toBeLessThan(plan.monthly);
		}
	});

	it('features exactly one plan', () => {
		expect(plans.filter((plan) => plan.featured)).toHaveLength(1);
	});
});
