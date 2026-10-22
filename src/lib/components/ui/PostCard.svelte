<script lang="ts">
	import { resolve } from '$app/paths';
	import Tag from '#lib/components/ui/Tag.svelte';
	import { formatPostDate, type Post } from '#lib/content/posts.ts';

	interface Props {
		post: Post;
		/** Heading level of the title, so cards fit the page outline they sit in. */
		headingLevel?: 2 | 3;
	}

	let { post, headingLevel = 3 }: Props = $props();
</script>

<article class="card">
	<div class="meta">
		<Tag tone="brand">{post.category}</Tag>
		<span>{post.readingMinutes} min read</span>
	</div>
	<svelte:element this={`h${headingLevel}`} class="title">
		<a class="link" href={resolve('/blog/[slug]', { slug: post.slug })}>{post.title}</a>
	</svelte:element>
	<p class="description">{post.description}</p>
	<p class="byline">
		{post.author.name} ·
		<time datetime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
	</p>
</article>

<style>
	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		block-size: 100%;
		padding: var(--space-m);
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius-l);
		background-color: var(--color-surface);
		transition: box-shadow var(--duration-normal) var(--ease-out);
	}

	.card:hover {
		box-shadow: var(--shadow-m);
	}

	.card:has(.link:focus-visible) {
		outline: var(--focus-ring);
		outline-offset: var(--focus-offset);
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2xs);
		color: var(--color-text-muted);
		font-size: var(--step--1);
	}

	.title {
		font-size: var(--step-1);
		line-height: var(--leading-snug);
	}

	.link {
		color: var(--color-text);
		text-decoration: none;
	}

	/* The title link covers the whole card. */
	.link::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
	}

	.link:focus-visible {
		outline: none;
	}

	.description {
		flex: 1;
		color: var(--color-text-muted);
	}

	.byline {
		color: var(--color-text-muted);
		font-size: var(--step--1);
	}
</style>
