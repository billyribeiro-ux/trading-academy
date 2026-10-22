<script lang="ts">
	import { asset } from '$app/paths';
	import DownloadSimpleIcon from 'phosphor-svelte/lib/DownloadSimpleIcon';
	import FilePdfIcon from 'phosphor-svelte/lib/FilePdfIcon';
	import EmailSignupForm from '#lib/components/forms/EmailSignupForm.svelte';
	import type { SubscribeResult } from '#lib/validation/subscribe.ts';

	interface Props {
		/** Latest sign-up result, passed through to the form. */
		signup?: SubscribeResult | undefined;
	}

	let { signup }: Props = $props();

	const unlocked = $derived(signup?.source === 'free-guide' && signup.success);
</script>

<section id="free-guide" class="section lead-magnet" aria-labelledby="free-guide-title">
	<div class="container">
		<div class="panel">
			<div class="cover" aria-hidden="true">
				<FilePdfIcon size="4rem" weight="duotone" />
				<span>Free PDF</span>
			</div>

			<div class="copy">
				<p class="eyebrow">Free guide</p>
				<h2 id="free-guide-title">Placeholder title: the trading plan checklist</h2>
				<p class="lead">
					Placeholder text: the six questions our traders answer before every trade, on one
					printable page. Enter your email and the guide is yours.
				</p>

				<EmailSignupForm
					source="free-guide"
					anchor="free-guide"
					result={signup}
					label="Email address for the free guide"
					buttonLabel="Send me the guide"
					successMessage="Thanks! Your guide is ready."
					hint="Placeholder text: we also send a short weekly email. Unsubscribe any time."
				/>

				{#if unlocked}
					<a
						class="download"
						href={asset('guides/trading-plan-checklist.pdf')}
						download
						type="application/pdf"
					>
						<DownloadSimpleIcon aria-hidden="true" weight="bold" />
						Download the checklist (PDF)
					</a>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.panel {
		display: grid;
		gap: var(--space-l);
		padding: var(--space-l) var(--space-m);
		border-radius: var(--radius-l);
		background:
			radial-gradient(40rem 20rem at 0% 0%, var(--color-brand-subtle), transparent 70%),
			var(--color-surface);
		border: var(--border-width) solid var(--color-border);
	}

	.cover {
		display: grid;
		place-items: center;
		align-content: center;
		gap: var(--space-2xs);
		min-block-size: 12rem;
		border-radius: var(--radius-m);
		background-color: var(--color-brand);
		color: var(--color-on-brand);
		font-weight: var(--weight-bold);
	}

	.copy {
		display: grid;
		gap: var(--space-s);
	}

	.eyebrow {
		color: var(--color-brand);
		font-weight: var(--weight-semibold);
	}

	h2 {
		font-size: var(--step-3);
	}

	.lead {
		color: var(--color-text-muted);
		font-size: var(--step-1);
	}

	.download {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2xs);
		min-block-size: var(--target-min);
		font-weight: var(--weight-semibold);
	}

	@media (min-width: 52.5rem) {
		.panel {
			grid-template-columns: 16rem 1fr;
			padding: var(--space-xl);
		}
	}
</style>
