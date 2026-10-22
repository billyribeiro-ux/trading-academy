<script lang="ts">
	import PlusIcon from 'phosphor-svelte/lib/PlusIcon';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import type { FaqItem } from '#lib/content/faq.ts';

	interface Props {
		items: readonly FaqItem[];
	}

	let { items }: Props = $props();
</script>

<!--
	Native <details> elements: they open and close without JavaScript, work by keyboard, and
	their content stays in the page for search engines.
-->
<section class="section" aria-labelledby="faq-title">
	<div class="container narrow">
		<SectionHeading id="faq-title" eyebrow="FAQ" title="Placeholder title: common questions" />

		<div class="list">
			{#each items as item (item.question)}
				<details class="item">
					<summary>
						<span>{item.question}</span>
						<PlusIcon class="icon" aria-hidden="true" weight="bold" />
					</summary>
					<p>{item.answer}</p>
				</details>
			{/each}
		</div>
	</div>
</section>

<style>
	.narrow {
		max-inline-size: calc(var(--prose-max) + var(--gutter) * 2);
	}

	.list {
		border-block-start: var(--border-width) solid var(--color-border);
	}

	.item {
		border-block-end: var(--border-width) solid var(--color-border);
	}

	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-s);
		min-block-size: var(--target-min);
		padding-block: var(--space-s);
		font-size: var(--step-1);
		font-weight: var(--weight-semibold);
		cursor: pointer;
		list-style: none;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary :global(.icon) {
		flex-shrink: 0;
		color: var(--color-brand);
		transition: rotate var(--duration-normal) var(--ease-out);
	}

	.item[open] summary :global(.icon) {
		rotate: 45deg;
	}

	.item p {
		padding-block-end: var(--space-s);
		color: var(--color-text-muted);
	}
</style>
