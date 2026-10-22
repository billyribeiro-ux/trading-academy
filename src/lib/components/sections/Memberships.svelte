<script lang="ts">
	import { resolve } from '$app/paths';
	import CheckIcon from 'phosphor-svelte/lib/CheckIcon';
	import Button from '#lib/components/ui/Button.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import { formatPrice, yearlySavingsPercent, type Plan } from '#lib/content/plans.ts';

	interface Props {
		plans: readonly Plan[];
	}

	let { plans }: Props = $props();

	const bestSaving = $derived(Math.max(...plans.map(yearlySavingsPercent)));
</script>

<!--
	The billing switch is two radio buttons, and CSS (`:has(:checked)`) shows the matching
	prices. It works before JavaScript loads, and without it.
-->
<section id="memberships" class="section memberships" aria-labelledby="memberships-title">
	<div class="container">
		<SectionHeading
			id="memberships-title"
			eyebrow="Memberships"
			title="Placeholder title: pick the plan that fits your trading"
			lead="Placeholder text: every plan includes the course library and community. Cancel any time."
		/>

		<fieldset class="billing">
			<legend class="visually-hidden">Billing period</legend>
			<label class="option">
				<input type="radio" name="billing" value="monthly" checked />
				<span>Monthly</span>
			</label>
			<label class="option">
				<input type="radio" name="billing" value="yearly" />
				<span>Yearly <span class="save">Save up to {bestSaving}%</span></span>
			</label>
		</fieldset>

		<ul class="grid" role="list">
			{#each plans as plan (plan.id)}
				<li class={['plan', { featured: plan.featured }]}>
					{#if plan.featured}
						<p class="badge">Most popular</p>
					{/if}
					<h3>{plan.name}</h3>
					<p class="description">{plan.description}</p>

					<p class="price price-monthly">
						<span class="amount">{formatPrice(plan.monthly)}</span>
						<span class="period">per month</span>
					</p>
					<p class="price price-yearly">
						<span class="amount">{formatPrice(plan.yearly)}</span>
						<span class="period">per month, billed yearly ({formatPrice(plan.yearly * 12)})</span>
					</p>

					<ul class="features" role="list">
						{#each plan.features as feature (feature)}
							<li>
								<CheckIcon aria-hidden="true" weight="bold" />
								{feature}
							</li>
						{/each}
					</ul>

					<Button href={resolve(plan.href)} variant={plan.featured ? 'primary' : 'secondary'} block>
						Choose {plan.name}
					</Button>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.billing {
		display: flex;
		justify-content: center;
		gap: var(--space-3xs);
		inline-size: fit-content;
		margin: 0 auto var(--space-l);
		padding: var(--space-3xs);
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius-full);
		background-color: var(--color-surface);
	}

	.option {
		position: relative;
		display: inline-flex;
		align-items: center;
		min-block-size: var(--target-min);
		padding-inline: var(--space-s);
		border-radius: var(--radius-full);
		font-weight: var(--weight-semibold);
		cursor: pointer;
	}

	/* The real radio stays in place, invisible, so keyboard and screen readers use it. */
	.option input {
		position: absolute;
		inset: 0;
		margin: 0;
		opacity: 0;
		cursor: pointer;
	}

	.option:has(input:checked) {
		background-color: var(--color-brand);
		color: var(--color-on-brand);
	}

	.option:has(input:focus-visible) {
		outline: var(--focus-ring);
		outline-offset: var(--focus-offset);
	}

	.save {
		margin-inline-start: var(--space-3xs);
		font-size: var(--step--1);
		font-weight: var(--weight-medium);
	}

	.grid {
		display: grid;
		gap: var(--space-s);
	}

	.plan {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-l) var(--space-m);
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius-l);
		background-color: var(--color-surface);
	}

	.featured {
		border: 2px solid var(--color-brand);
		box-shadow: var(--shadow-l);
	}

	.badge {
		position: absolute;
		inset-block-start: 0;
		inset-inline-start: 50%;
		translate: -50% -50%;
		padding: var(--space-3xs) var(--space-xs);
		border-radius: var(--radius-full);
		background-color: var(--color-brand);
		color: var(--color-on-brand);
		font-size: var(--step--1);
		font-weight: var(--weight-semibold);
		white-space: nowrap;
	}

	h3 {
		font-size: var(--step-2);
	}

	.description {
		color: var(--color-text-muted);
	}

	.price {
		display: grid;
	}

	.amount {
		font-size: var(--step-4);
		font-weight: var(--weight-bold);
		letter-spacing: -0.03em;
		line-height: 1.1;
	}

	.period {
		color: var(--color-text-muted);
		font-size: var(--step--1);
	}

	/* Show the prices for the selected billing period only. */
	.price-yearly {
		display: none;
	}

	.memberships:has(input[value='yearly']:checked) .price-yearly {
		display: grid;
	}

	.memberships:has(input[value='yearly']:checked) .price-monthly {
		display: none;
	}

	.features {
		display: grid;
		gap: var(--space-2xs);
		flex: 1;
		align-content: start;
		margin-block: var(--space-xs) var(--space-s);
	}

	.features li {
		display: flex;
		align-items: flex-start;
		gap: var(--space-2xs);
	}

	.features :global(svg) {
		flex-shrink: 0;
		margin-block-start: 0.3em;
		color: var(--color-success);
	}

	@media (min-width: 52.5rem) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
			align-items: stretch;
		}
	}
</style>
