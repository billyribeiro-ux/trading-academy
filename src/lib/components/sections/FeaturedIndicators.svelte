<script lang="ts">
	import FeatureCard from '#lib/components/ui/FeatureCard.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import Tag from '#lib/components/ui/Tag.svelte';
	import type { Indicator } from '#lib/content/indicators.ts';

	interface Props {
		items: readonly Indicator[];
	}

	let { items }: Props = $props();
</script>

<section class="section" aria-labelledby="indicators-title">
	<div class="container">
		<SectionHeading
			id="indicators-title"
			eyebrow="Proprietary indicators"
			title="Placeholder title: the tools our traders use every day"
			lead="Placeholder text: put the same edge on your charts, with clear rules for reading every signal."
		/>

		<ul class="grid" role="list">
			{#each items as item (item.name)}
				<li>
					<FeatureCard
						title={item.name}
						text={item.summary}
						href={item.href}
						cta="See the indicator"
					>
						{#snippet meta()}
							{#each item.platforms as platform (platform)}
								<Tag tone="brand">{platform}</Tag>
							{/each}
						{/snippet}
					</FeatureCard>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
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
