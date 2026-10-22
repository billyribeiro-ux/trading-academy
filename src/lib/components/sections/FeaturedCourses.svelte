<script lang="ts">
	import FeatureCard from '#lib/components/ui/FeatureCard.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import Tag from '#lib/components/ui/Tag.svelte';
	import type { Course } from '#lib/content/courses.ts';

	interface Props {
		items: readonly Course[];
	}

	let { items }: Props = $props();
</script>

<section class="section courses" aria-labelledby="courses-title">
	<div class="container">
		<SectionHeading
			id="courses-title"
			eyebrow="Courses"
			title="Placeholder title: learn the strategies we trade"
			lead="Placeholder text: step-by-step courses for every level, taught by the traders who use them."
		/>

		<ul class="grid" role="list">
			{#each items as item (item.title)}
				<li>
					<FeatureCard
						title={item.title}
						text={item.summary}
						href={item.href}
						cta="View the course"
					>
						{#snippet meta()}
							<Tag tone="brand">{item.level}</Tag>
						{/snippet}
						{#snippet footer()}
							{item.lessons} lessons · {item.duration}
						{/snippet}
					</FeatureCard>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.courses {
		background-color: var(--color-surface-raised);
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
