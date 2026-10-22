<script lang="ts">
	import { resolve } from '$app/paths';
	import Button from '#lib/components/ui/Button.svelte';
	import PostCard from '#lib/components/ui/PostCard.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import type { Post } from '#lib/content/posts.ts';

	interface Props {
		posts: readonly Post[];
	}

	let { posts }: Props = $props();
</script>

<section class="section blog-preview" aria-labelledby="blog-title">
	<div class="container">
		<SectionHeading
			id="blog-title"
			eyebrow="News & commentary"
			title="Placeholder title: the latest from our traders"
		/>

		<ul class="grid" role="list">
			{#each posts as post (post.slug)}
				<li><PostCard {post} /></li>
			{/each}
		</ul>

		<p class="all">
			<Button href={resolve('/blog')} variant="secondary">Read all articles</Button>
		</p>
	</div>
</section>

<style>
	.blog-preview {
		background-color: var(--color-surface-raised);
	}

	.grid {
		display: grid;
		gap: var(--space-s);
	}

	.all {
		margin-block-start: var(--space-l);
		text-align: center;
	}

	@media (min-width: 52.5rem) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
