<script lang="ts">
	import { resolve } from '$app/paths';
	import StarIcon from 'phosphor-svelte/lib/StarIcon';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import type { Testimonial } from '#lib/content/testimonials.ts';

	interface Props {
		items: readonly Testimonial[];
	}

	let { items }: Props = $props();
</script>

<section class="section" aria-labelledby="testimonials-title">
	<div class="container">
		<SectionHeading
			id="testimonials-title"
			eyebrow="Member stories"
			title="Placeholder title: what members say"
		/>

		<ul class="grid" role="list">
			{#each items as item (item.name)}
				<li>
					<figure class="card">
						<span class="stars" aria-hidden="true">
							{#each { length: 5 }, index (index)}
								<StarIcon weight="fill" />
							{/each}
						</span>
						<blockquote>
							<p>{item.quote}</p>
						</blockquote>
						<figcaption>
							<strong>{item.name}</strong>
							<span>{item.context}</span>
						</figcaption>
					</figure>
				</li>
			{/each}
		</ul>

		<p class="note">
			Testimonials are not typical, and individual results vary.
			<a href={resolve('risk-disclosure')}>Read the risk disclosure</a>.
		</p>
	</div>
</section>

<style>
	.grid {
		display: grid;
		gap: var(--space-s);
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: var(--space-s);
		block-size: 100%;
		padding: var(--space-m);
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius-l);
		background-color: var(--color-surface);
	}

	.stars {
		display: flex;
		gap: 2px;
		color: var(--color-rating);
	}

	blockquote {
		flex: 1;
		font-size: var(--step-1);
		line-height: var(--leading-snug);
	}

	figcaption {
		display: grid;
		color: var(--color-text-muted);
		font-size: var(--step--1);
	}

	figcaption strong {
		color: var(--color-text);
		font-size: var(--step-0);
	}

	.note {
		margin-block-start: var(--space-m);
		color: var(--color-text-muted);
		font-size: var(--step--1);
		text-align: center;
	}

	@media (min-width: 52.5rem) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
