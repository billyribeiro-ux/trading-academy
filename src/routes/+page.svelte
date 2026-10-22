<script lang="ts">
	import FeaturedCourses from '#lib/components/sections/FeaturedCourses.svelte';
	import FeaturedIndicators from '#lib/components/sections/FeaturedIndicators.svelte';
	import Hero from '#lib/components/sections/Hero.svelte';
	import Services from '#lib/components/sections/Services.svelte';
	import ValueProps from '#lib/components/sections/ValueProps.svelte';
	import { featuredCourses } from '#lib/content/courses.ts';
	import { featuredIndicators } from '#lib/content/indicators.ts';
	import { services } from '#lib/content/services.ts';
	import { valueProps } from '#lib/content/value-props.ts';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<Hero signup={form ?? undefined} />
<ValueProps items={valueProps} />
<Services items={services} />
<FeaturedIndicators items={featuredIndicators} />
<FeaturedCourses items={featuredCourses} />
