<script lang="ts">
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import type { ValueProp } from '#lib/content/value-props.ts';

	interface Props {
		items: readonly ValueProp[];
	}

	let { items }: Props = $props();
</script>

<section class="section" aria-labelledby="value-title">
	<div class="container">
		<SectionHeading
			id="value-title"
			eyebrow="Placeholder eyebrow"
			title="Placeholder title: why traders wish they found us sooner"
			lead="Placeholder text: our mission is to share what really works, so you can find your own edge."
		/>

		<ul class="grid" role="list">
			{#each items as item (item.title)}
				<li class="item">
					<span class="icon">
						<item.icon aria-hidden="true" size="1.75rem" weight="duotone" />
					</span>
					<h3>{item.title}</h3>
					<p>{item.text}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.grid {
		display: grid;
		gap: var(--space-l);
	}

	.item {
		display: grid;
		justify-items: start;
		gap: var(--space-2xs);
	}

	.icon {
		display: inline-grid;
		place-items: center;
		inline-size: 3rem;
		block-size: 3rem;
		border-radius: var(--radius-m);
		background-color: var(--color-brand-subtle);
		color: var(--color-brand);
	}

	h3 {
		font-size: var(--step-1);
	}

	p {
		color: var(--color-text-muted);
	}

	@media (min-width: 37.5rem) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 75rem) {
		.grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
