<script lang="ts">
	import { resolve } from '$app/paths';
	import Button from '#lib/components/ui/Button.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<section class="container coming-soon">
	<p class="eyebrow">Coming soon</p>
	<h1>{data.title}</h1>
	<p class="lead">
		Placeholder text: this page is part of the menu structure and will be built in a later release.
	</p>
	<Button href={resolve('/')}>Back to the homepage</Button>
</section>

<style>
	.coming-soon {
		display: grid;
		justify-items: start;
		gap: var(--space-s);
		padding-block: var(--space-3xl);
	}

	.eyebrow {
		color: var(--color-brand);
		font-weight: var(--weight-semibold);
	}

	.lead {
		max-inline-size: var(--prose-max);
		color: var(--color-text-muted);
		font-size: var(--step-1);
	}
</style>
