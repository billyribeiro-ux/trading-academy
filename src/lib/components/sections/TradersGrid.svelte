<script lang="ts">
	import { resolve } from '$app/paths';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import { initials, type Trader } from '#lib/content/traders.ts';

	interface Props {
		items: readonly Trader[];
	}

	let { items }: Props = $props();
</script>

<section class="section traders" aria-labelledby="traders-title">
	<div class="container">
		<SectionHeading
			id="traders-title"
			eyebrow="Our traders"
			title="Placeholder title: learn from people who trade for a living"
			lead="Placeholder text: every trader on the team trades their own account and teaches what they actually do."
		/>

		<ul class="grid" role="list">
			{#each items as trader (trader.name)}
				<li class="trader">
					<span class="avatar" aria-hidden="true">{initials(trader.name)}</span>
					<h3>{trader.name}</h3>
					<p>{trader.role}</p>
				</li>
			{/each}
		</ul>

		<p class="all">
			<a href={resolve('traders')}>Meet the whole team</a>
		</p>
	</div>
</section>

<style>
	.traders {
		background-color: var(--color-surface-raised);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-s);
	}

	.trader {
		display: grid;
		justify-items: center;
		gap: var(--space-3xs);
		padding: var(--space-m) var(--space-xs);
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius-l);
		background-color: var(--color-surface);
		text-align: center;
	}

	.avatar {
		display: inline-grid;
		place-items: center;
		inline-size: 4.5rem;
		block-size: 4.5rem;
		margin-block-end: var(--space-2xs);
		border-radius: var(--radius-full);
		background: linear-gradient(135deg, var(--color-brand), var(--color-accent));
		color: var(--color-on-brand);
		font-size: var(--step-1);
		font-weight: var(--weight-bold);
	}

	h3 {
		font-size: var(--step-0);
	}

	.trader p {
		color: var(--color-text-muted);
		font-size: var(--step--1);
	}

	.all {
		margin-block-start: var(--space-l);
		text-align: center;
		font-weight: var(--weight-semibold);
	}

	@media (min-width: 52.5rem) {
		.grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
