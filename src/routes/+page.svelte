<script lang="ts">
	import Hero from '#lib/components/sections/Hero.svelte';
	import Services from '#lib/components/sections/Services.svelte';
	import ValueProps from '#lib/components/sections/ValueProps.svelte';
	import { services } from '#lib/content/services.ts';
	import { valueProps } from '#lib/content/value-props.ts';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<Hero signup={form ?? undefined} />
<ValueProps items={valueProps} />
<Services items={services} />
