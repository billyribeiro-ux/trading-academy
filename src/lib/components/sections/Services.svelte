<script lang="ts">
	import { resolve } from '$app/paths';
	import ArrowRightIcon from 'phosphor-svelte/lib/ArrowRightIcon';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import type { Service } from '#lib/content/services.ts';

	interface Props {
		items: readonly Service[];
	}

	let { items }: Props = $props();
</script>

<section class="section services" aria-labelledby="services-title">
	<div class="container">
		<SectionHeading
			id="services-title"
			eyebrow="Placeholder eyebrow"
			title="Placeholder title: everything you need to trade with an edge"
			lead="Placeholder text: expert strategies, tools and live trades, with support at every step of your journey."
		/>

		<ul class="grid" role="list">
			{#each items as item (item.title)}
				<li class="card">
					<div class="card-body">
						<span class="icon">
							<item.icon aria-hidden="true" size="1.5rem" weight="bold" />
						</span>
						<h3>
							<!-- The heading link covers the whole card (see .card-link::after). -->
							<a class="card-link" href={resolve(item.href)}>{item.title}</a>
						</h3>
						<p>{item.text}</p>
						<span class="more" aria-hidden="true">
							Learn more
							<ArrowRightIcon />
						</span>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.services {
		background-color: var(--color-surface-raised);
	}

	.grid {
		display: grid;
		gap: var(--space-s);
	}

	.card {
		position: relative;
		container-type: inline-size;
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius-l);
		background-color: var(--color-surface);
		box-shadow: var(--shadow-s);
		transition:
			box-shadow var(--duration-normal) var(--ease-out),
			translate var(--duration-normal) var(--ease-out);
	}

	.card:hover {
		box-shadow: var(--shadow-l);
		translate: 0 -2px;
	}

	.card:has(.card-link:focus-visible) {
		outline: var(--focus-ring);
		outline-offset: var(--focus-offset);
	}

	.card-body {
		display: grid;
		gap: var(--space-xs);
		padding: var(--space-m);
	}

	.icon {
		display: inline-grid;
		place-items: center;
		inline-size: 2.75rem;
		block-size: 2.75rem;
		border-radius: var(--radius-m);
		background-color: var(--color-brand);
		color: var(--color-on-brand);
	}

	h3 {
		font-size: var(--step-2);
	}

	.card-link {
		color: var(--color-text);
		text-decoration: none;
	}

	/* Stretch the link's click area over the whole card. */
	.card-link::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
	}

	.card-link:focus-visible {
		outline: none;
	}

	p {
		color: var(--color-text-muted);
	}

	.more {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3xs);
		color: var(--color-brand);
		font-weight: var(--weight-semibold);
	}

	/* Wide cards put the icon beside the text. */
	@container (min-width: 30rem) {
		.card-body {
			grid-template-columns: auto 1fr;
			column-gap: var(--space-s);
		}

		.card-body > :not(.icon) {
			grid-column: 2;
		}
	}

	@media (min-width: 52.5rem) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
