<script lang="ts">
	import FeaturedCourses from '#lib/components/sections/FeaturedCourses.svelte';
	import FeaturedIndicators from '#lib/components/sections/FeaturedIndicators.svelte';
	import FounderStory from '#lib/components/sections/FounderStory.svelte';
	import Hero from '#lib/components/sections/Hero.svelte';
	import Memberships from '#lib/components/sections/Memberships.svelte';
	import PressStrip from '#lib/components/sections/PressStrip.svelte';
	import Services from '#lib/components/sections/Services.svelte';
	import Testimonials from '#lib/components/sections/Testimonials.svelte';
	import TradersGrid from '#lib/components/sections/TradersGrid.svelte';
	import ValueProps from '#lib/components/sections/ValueProps.svelte';
	import { featuredCourses } from '#lib/content/courses.ts';
	import { featuredIndicators } from '#lib/content/indicators.ts';
	import { plans } from '#lib/content/plans.ts';
	import { pressOutlets } from '#lib/content/press.ts';
	import { services } from '#lib/content/services.ts';
	import { testimonials } from '#lib/content/testimonials.ts';
	import { traders } from '#lib/content/traders.ts';
	import { valueProps } from '#lib/content/value-props.ts';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<Hero signup={form ?? undefined} />
<ValueProps items={valueProps} />
<Services items={services} />
<FeaturedIndicators items={featuredIndicators} />
<FeaturedCourses items={featuredCourses} />
<FounderStory />
<TradersGrid items={traders} />
<Testimonials items={testimonials} />
<PressStrip outlets={pressOutlets} />
<Memberships {plans} />
