import { describe, expect, it } from 'vitest';
import { footerNav, headerLinks, primaryNav } from './navigation.ts';
import { comingSoonPaths } from './routes.ts';

describe('comingSoonPaths', () => {
	it('covers every menu link that is not a homepage anchor', () => {
		const menuPaths = [
			...primaryNav.flatMap((menu) => menu.groups.flatMap((group) => group.links)),
			...Object.values(headerLinks),
			...footerNav.flatMap((column) => column.links)
		]
			.map((link) => link.href)
			.filter((href) => !href.startsWith('#'));

		for (const path of menuPaths) {
			expect(comingSoonPaths, `missing page for "${path}"`).toContain(path);
		}
	});
});
