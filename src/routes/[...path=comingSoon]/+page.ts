import { footerNav, headerLinks, primaryNav } from '#lib/config/navigation.ts';
import { pageTitle, site } from '#lib/config/site.ts';
import type { PageLoad } from './$types';

/** Finds the menu label for a path, so the page heading matches the link that led here. */
function labelFor(path: string): string {
	const links = [
		...primaryNav.flatMap((menu) => menu.groups.flatMap((group) => group.links)),
		...Object.values(headerLinks),
		...footerNav.flatMap((column) => column.links)
	];
	return links.find((link) => link.href === path)?.label ?? 'Coming soon';
}

export const load: PageLoad = ({ params }) => {
	const title = labelFor(params.path);

	return {
		title,
		seo: {
			title: pageTitle(title),
			description: `${title} is coming soon to ${site.name}.`,
			path: `/${params.path}`,
			noindex: true
		}
	};
};
