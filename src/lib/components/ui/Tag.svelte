<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** `brand` for highlights, `neutral` for plain facts. */
		tone?: 'brand' | 'neutral';
		children: Snippet;
	}

	let { tone = 'neutral', children }: Props = $props();
</script>

<span class={['tag', tone]}>{@render children()}</span>

<style>
	.tag {
		display: inline-flex;
		align-items: center;
		padding: var(--space-3xs) var(--space-2xs);
		border-radius: var(--radius-full);
		font-size: var(--step--1);
		font-weight: var(--weight-semibold);
		line-height: 1.2;
	}

	.brand {
		background-color: var(--color-brand-subtle);
		color: var(--color-brand-strong);
	}

	.neutral {
		background-color: var(--color-surface-raised);
		color: var(--color-text);
	}
</style>
