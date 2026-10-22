<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Button from '#lib/components/ui/Button.svelte';
	import { pageTitle } from '#lib/config/site.ts';

	const notFound = $derived(page.status === 404);
	const title = $derived(notFound ? 'Page not found' : 'Something went wrong');
</script>

<svelte:head>
	<title>{pageTitle(title)}</title>
	<!-- Error pages must never appear in search results. -->
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="container error">
	<p class="status">Error {page.status}</p>
	<h1>{title}</h1>
	<p class="lead">
		{#if notFound}
			The page you are looking for does not exist or has moved.
		{:else}
			{page.error?.message ?? 'An unexpected error happened.'} Please try again in a moment.
		{/if}
	</p>
	<div class="actions">
		<Button href={resolve('/')}>Go to the homepage</Button>
		<Button href={resolve('/blog')} variant="secondary">Read the blog</Button>
	</div>
</section>

<style>
	.error {
		display: grid;
		justify-items: start;
		gap: var(--space-s);
		padding-block: var(--space-3xl);
	}

	.status {
		color: var(--color-brand);
		font-weight: var(--weight-semibold);
	}

	.lead {
		max-inline-size: var(--prose-max);
		color: var(--color-text-muted);
		font-size: var(--step-1);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2xs);
	}
</style>
