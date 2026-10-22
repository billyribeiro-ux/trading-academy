<script lang="ts">
	import Hero from '#lib/components/sections/Hero.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<Hero signup={form ?? undefined} />
