<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';
	import ArrowRightIcon from 'phosphor-svelte/lib/ArrowRightIcon';
	import type { SitePath } from '#lib/config/navigation.ts';

	interface Props {
		title: string;
		text: string;
		href: SitePath;
		/** Text of the link at the bottom of the card. */
		cta: string;
		/** Small facts above the title, such as level or platform. */
		meta?: Snippet;
		/** Facts under the text, such as lesson count. */
		footer?: Snippet;
	}

	let { title, text, href, cta, meta, footer }: Props = $props();
</script>

<article class="card">
	{#if meta}
		<div class="meta">{@render meta()}</div>
	{/if}
	<h3>{title}</h3>
	<p class="text">{text}</p>
	{#if footer}
		<div class="footer">{@render footer()}</div>
	{/if}
	<a class="cta" href={resolve(href)}>
		{cta}<span class="visually-hidden">: {title}</span>
		<ArrowRightIcon aria-hidden="true" />
	</a>
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		block-size: 100%;
		padding: var(--space-m);
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius-l);
		background-color: var(--color-surface);
		box-shadow: var(--shadow-s);
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3xs);
	}

	h3 {
		font-size: var(--step-1);
	}

	.text {
		color: var(--color-text-muted);
	}

	.footer {
		color: var(--color-text-muted);
		font-size: var(--step--1);
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3xs);
		min-block-size: var(--target-min);
		margin-block-start: auto;
		font-weight: var(--weight-semibold);
		text-decoration: none;
	}

	.cta:hover {
		text-decoration: underline;
	}
</style>
