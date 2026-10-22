<script lang="ts">
	import { resolve } from '$app/paths';
	import Tag from '#lib/components/ui/Tag.svelte';
	import { formatPostDate } from '#lib/content/posts.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const post = $derived(data.post);
</script>

<article class="container article">
	<nav aria-label="Breadcrumb">
		<ol class="breadcrumbs" role="list">
			<li><a href={resolve('/')}>Home</a></li>
			<li><a href={resolve('/blog')}>Blog</a></li>
			<li><span aria-current="page">{post.title}</span></li>
		</ol>
	</nav>

	<header class="header">
		<Tag tone="brand">{post.category}</Tag>
		<h1>{post.title}</h1>
		<p class="lead">{post.description}</p>
		<p class="byline">
			By {post.author.name}, {post.author.role} ·
			<time datetime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
			{#if post.updatedAt !== post.publishedAt}
				· Updated <time datetime={post.updatedAt}>{formatPostDate(post.updatedAt)}</time>
			{/if}
			· {post.readingMinutes} min read
		</p>
	</header>

	<div class="body">
		{#each post.body as block, index (index)}
			{#if block.type === 'heading'}
				<h2>{block.text}</h2>
			{:else if block.type === 'list'}
				<ul>
					{#each block.items as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			{:else}
				<p>{block.text}</p>
			{/if}
		{/each}
	</div>

	<p class="back"><a href={resolve('/blog')}>← Back to all articles</a></p>
</article>

<style>
	.article {
		display: grid;
		gap: var(--space-l);
		max-inline-size: calc(var(--prose-max) + var(--gutter) * 2);
		padding-block: var(--space-xl) var(--space-2xl);
	}

	.breadcrumbs {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3xs);
		color: var(--color-text-muted);
		font-size: var(--step--1);
	}

	.breadcrumbs li:not(:last-child)::after {
		content: '/';
		margin-inline-start: var(--space-3xs);
	}

	.breadcrumbs a {
		color: var(--color-text-muted);
	}

	[aria-current='page'] {
		color: var(--color-text);
	}

	.header {
		display: grid;
		justify-items: start;
		gap: var(--space-xs);
	}

	h1 {
		font-size: var(--step-4);
	}

	.lead {
		color: var(--color-text-muted);
		font-size: var(--step-1);
	}

	.byline {
		color: var(--color-text-muted);
		font-size: var(--step--1);
	}

	.body {
		display: grid;
		gap: var(--space-s);
		font-size: var(--step-1);
	}

	.body h2 {
		margin-block-start: var(--space-s);
		font-size: var(--step-2);
	}

	.body ul {
		display: grid;
		gap: var(--space-2xs);
		padding-inline-start: 1.25em;
	}

	.back {
		font-weight: var(--weight-semibold);
	}
</style>
