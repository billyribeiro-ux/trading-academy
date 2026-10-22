import { describe, expect, it } from 'vitest';
import { footerNav, headerLinks, primaryNav } from './navigation.ts';
import { builtPaths, comingSoonPaths } from './routes.ts';

describe('menu destinations', () => {
	it('gives every menu link that is not a homepage anchor a page', () => {
		const menuPaths = [
			...primaryNav.flatMap((menu) => menu.groups.flatMap((group) => group.links)),
			...Object.values(headerLinks),
			...footerNav.flatMap((column) => column.links)
		]
			.map((link) => link.href)
			.filter((href) => !href.startsWith('#'));

		for (const path of menuPaths) {
			expect(comingSoonPaths.has(path) || builtPaths.has(path), `missing page for "${path}"`).toBe(
				true
			);
		}
	});

	it('never lists a built page as coming soon', () => {
		for (const path of builtPaths) {
			expect(comingSoonPaths.has(path), `"${path}" is built`).toBe(false);
		}
	});
});
