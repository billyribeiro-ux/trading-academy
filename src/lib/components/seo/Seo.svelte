<script lang="ts">
	import { absoluteUrl, site } from '#lib/config/site.ts';
	import { jsonLdScript } from './json-ld.ts';
	import type { SeoData } from './types.ts';

	interface Props {
		/** SEO data for the current page, returned by its `load` function. */
		seo: SeoData;
	}

	let { seo }: Props = $props();

	const canonical = $derived(absoluteUrl(seo.path));
	const image = $derived(seo.image ?? site.ogImage);
	const imageUrl = $derived(absoluteUrl(image.src));
	// `max-image-preview:large` lets Google show big image previews in Discover and Search.
	const robots = $derived(
		seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'
	);
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta name="robots" content={robots} />
	<link rel="canonical" href={canonical} />

	<meta property="og:site_name" content={site.name} />
	<meta property="og:locale" content={site.locale} />
	<meta property="og:type" content={seo.type ?? 'website'} />
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:width" content={String(image.width)} />
	<meta property="og:image:height" content={String(image.height)} />
	<meta property="og:image:alt" content={image.alt} />
	<meta name="twitter:card" content="summary_large_image" />

	{#if seo.article}
		<meta property="article:published_time" content={seo.article.publishedTime} />
		<meta property="article:modified_time" content={seo.article.modifiedTime} />
		<meta property="article:author" content={seo.article.authorName} />
	{/if}

	{#each seo.jsonLd ?? [] as data, index (index)}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- jsonLdScript escapes <, > and & -->
		{@html jsonLdScript(data)}
	{/each}
</svelte:head>
