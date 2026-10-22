import { organizationSchema, websiteSchema } from '#lib/components/seo/json-ld.ts';
import { site } from '#lib/config/site.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({
	seo: {
		title: `${site.name}: Placeholder Tagline for Live Trading Education`,
		description: site.description,
		path: '/',
		jsonLd: [organizationSchema(site), websiteSchema(site)]
	}
});
