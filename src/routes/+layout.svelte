<script lang="ts">
	import '#lib/styles/app.css';
	import { page } from '$app/state';
	import favicon from '#lib/assets/favicon.svg';
	import Seo from '#lib/components/seo/Seo.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if page.data.seo}
	<Seo seo={page.data.seo} />
{/if}

{@render children()}
