<script lang="ts">
	import EmailSignupForm from '#lib/components/forms/EmailSignupForm.svelte';
	import type { SubscribeResult } from '#lib/validation/subscribe.ts';

	interface Props {
		/** Latest sign-up result, passed through to the form. */
		signup?: SubscribeResult | undefined;
	}

	let { signup }: Props = $props();
</script>

<section class="hero" aria-labelledby="hero-title">
	<div class="container inner">
		<div class="copy">
			<p class="eyebrow">Placeholder eyebrow · Trading education</p>
			<h1 id="hero-title">Placeholder headline: sharpen your trading edge</h1>
			<p class="lead">
				Placeholder text: a free daily email with clear, practical market updates from a team of
				experienced traders, delivered every weekday before the open.
			</p>
			<EmailSignupForm
				source="hero"
				result={signup}
				label="Get the free daily market email"
				buttonLabel="Subscribe free"
				successMessage="You're subscribed. Placeholder text: look for the first email tomorrow morning."
				hint="Placeholder text: one email per weekday. Unsubscribe any time."
			/>
			<p class="trust">Placeholder trust line: read by thousands of traders every morning.</p>
		</div>

		<div class="visual" aria-hidden="true">
			<svg viewBox="0 0 400 260" class="chart">
				<defs>
					<linearGradient id="hero-fill" x1="0" x2="0" y1="0" y2="1">
						<stop offset="0%" stop-color="currentColor" stop-opacity="0.35" />
						<stop offset="100%" stop-color="currentColor" stop-opacity="0" />
					</linearGradient>
				</defs>
				<path
					class="area"
					d="M0 210 L50 190 L90 200 L140 150 L180 165 L230 110 L270 125 L320 70 L360 85 L400 40 L400 260 L0 260 Z"
				/>
				<path
					class="line"
					d="M0 210 L50 190 L90 200 L140 150 L180 165 L230 110 L270 125 L320 70 L360 85 L400 40"
				/>
			</svg>
		</div>
	</div>
</section>

<style>
	.hero {
		padding-block: var(--space-xl) var(--space-2xl);
		background:
			radial-gradient(60rem 30rem at 85% -10%, var(--color-brand-subtle), transparent 70%),
			var(--color-bg);
	}

	.inner {
		display: grid;
		gap: var(--space-xl);
		align-items: center;
	}

	.copy {
		display: grid;
		gap: var(--space-s);
	}

	.eyebrow {
		color: var(--color-brand);
		font-weight: var(--weight-semibold);
	}

	h1 {
		max-inline-size: 16ch;
	}

	.lead {
		max-inline-size: var(--prose-max);
		color: var(--color-text-muted);
		font-size: var(--step-1);
	}

	.trust {
		color: var(--color-text-muted);
		font-size: var(--step--1);
	}

	.visual {
		display: none;
	}

	.chart {
		inline-size: 100%;
		color: var(--color-accent);
	}

	.area {
		fill: url(#hero-fill);
	}

	.line {
		fill: none;
		stroke: currentColor;
		stroke-width: 4;
		stroke-linejoin: round;
	}

	@media (min-width: 52.5rem) {
		.inner {
			grid-template-columns: 1.2fr 1fr;
		}

		.visual {
			display: block;
			padding: var(--space-m);
			border: var(--border-width) solid var(--color-border);
			border-radius: var(--radius-l);
			background-color: var(--color-surface);
			box-shadow: var(--shadow-l);
		}
	}
</style>
