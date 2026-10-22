<script lang="ts">
	import PostCard from '#lib/components/ui/PostCard.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<section class="section">
	<div class="container">
		<header class="intro">
			<p class="eyebrow">Blog</p>
			<h1>Placeholder title: market commentary and trading lessons</h1>
			<p class="lead">
				Placeholder text: weekly articles from our traders on strategy, risk and the markets.
			</p>
		</header>

		<ul class="grid" role="list">
			{#each data.posts as post (post.slug)}
				<li><PostCard {post} headingLevel={2} /></li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.intro {
		display: grid;
		gap: var(--space-2xs);
		margin-block-end: var(--space-xl);
	}

	.eyebrow {
		color: var(--color-brand);
		font-weight: var(--weight-semibold);
	}

	h1 {
		max-inline-size: 20ch;
		font-size: var(--step-4);
	}

	.lead {
		max-inline-size: var(--prose-max);
		color: var(--color-text-muted);
		font-size: var(--step-1);
	}

	.grid {
		display: grid;
		gap: var(--space-s);
	}

	@media (min-width: 52.5rem) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
