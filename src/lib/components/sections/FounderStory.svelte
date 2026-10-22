<script lang="ts">
	import QuotesIcon from 'phosphor-svelte/lib/QuotesIcon';
</script>

<section class="section" aria-labelledby="founder-title">
	<div class="container inner">
		<div class="story">
			<p class="eyebrow">Our story</p>
			<h2 id="founder-title">Placeholder title: built by traders, for traders</h2>
			<p>
				Placeholder text: the founder started this community as a no-hype place for real traders to
				learn how to thrive in the markets. Over the years it grew into a team of professional
				traders who share their strategies, their tools and their trades in the open.
			</p>
			<p>
				Placeholder text: the goal has never changed: help members trade better and live more
				freely.
			</p>
		</div>

		<figure class="quote">
			<QuotesIcon aria-hidden="true" size="2.5rem" weight="fill" />
			<blockquote>
				<p>
					Placeholder quote: the edge is not a secret indicator. It is a plan you follow every
					single day.
				</p>
			</blockquote>
			<figcaption>
				<strong>Alex Morgan</strong>
				<span>Founder & Head Trader</span>
			</figcaption>
		</figure>
	</div>
</section>

<style>
	.inner {
		display: grid;
		gap: var(--space-xl);
		align-items: center;
	}

	.story {
		display: grid;
		gap: var(--space-s);
		max-inline-size: var(--prose-max);
	}

	.eyebrow {
		color: var(--color-brand);
		font-weight: var(--weight-semibold);
	}

	.story p:not(.eyebrow) {
		color: var(--color-text-muted);
		font-size: var(--step-1);
	}

	.quote {
		display: grid;
		gap: var(--space-s);
		padding: var(--space-l);
		border-radius: var(--radius-l);
		background-color: var(--color-brand);
		color: var(--color-on-brand);
	}

	blockquote {
		font-size: var(--step-2);
		font-weight: var(--weight-semibold);
		line-height: var(--leading-snug);
	}

	figcaption {
		display: grid;
	}

	@media (min-width: 52.5rem) {
		.inner {
			grid-template-columns: 1.2fr 1fr;
		}
	}
</style>
