<script lang="ts">
	import '#lib/styles/app.css';
	import { page } from '$app/state';
	import favicon from '#lib/assets/favicon.svg';
	import AnnouncementBar from '#lib/components/layout/AnnouncementBar.svelte';
	import SiteFooter from '#lib/components/layout/SiteFooter.svelte';
	import SiteHeader from '#lib/components/layout/SiteHeader.svelte';
	import SkipLink from '#lib/components/layout/SkipLink.svelte';
	import Seo from '#lib/components/seo/Seo.svelte';
	import { nextWebinar } from '#lib/content/webinars.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if page.data.seo}
	<Seo seo={page.data.seo} />
{/if}

<SkipLink target="main" />
<AnnouncementBar webinar={nextWebinar} />
<SiteHeader />

<!-- tabindex="-1" lets the skip link move focus here in every browser. -->
<main id="main" tabindex="-1">
	{@render children()}
</main>

<SiteFooter />
