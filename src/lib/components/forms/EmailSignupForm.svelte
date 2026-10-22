<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import Button from '#lib/components/ui/Button.svelte';
	import type { SubscribeResult, SubscribeSource } from '#lib/validation/subscribe.ts';

	interface Props {
		/** Which form this is. Every form posts to the same action and reads only its own result. */
		source: SubscribeSource;
		/** The latest result from the server, if any. Results for other forms are ignored. */
		result?: SubscribeResult | undefined;
		/** Visible label for the email field. */
		label: string;
		/** Text of the submit button. */
		buttonLabel: string;
		/** Shown in place of the form after a successful sign-up. */
		successMessage: string;
		/** Optional helper text under the field, such as a privacy note. */
		hint?: string;
		/**
		 * Id of the section that holds the form. Without JavaScript the browser reloads the page
		 * after a submit; the fragment scrolls it back to this form so the result is visible.
		 */
		anchor?: string;
	}

	let { source, result, label, buttonLabel, successMessage, hint, anchor }: Props = $props();

	// Unique on the server and in the browser, so label/field ids never collide or mismatch.
	const id = $props.id();

	let pending = $state(false);

	const ownResult = $derived(result?.source === source ? result : undefined);
	const failure = $derived(ownResult?.success === false ? ownResult : undefined);

	const describedBy = $derived(
		[failure ? `${id}-error` : '', hint ? `${id}-hint` : ''].filter(Boolean).join(' ') || undefined
	);

	const submit: SubmitFunction = () => {
		pending = true;
		return async ({ update }) => {
			await update({ reset: false });
			pending = false;
		};
	};
</script>

{#if ownResult?.success}
	<p class="success" role="status">{successMessage}</p>
{:else}
	<form
		class="signup"
		method="POST"
		action={anchor ? `?/subscribe#${anchor}` : '?/subscribe'}
		use:enhance={submit}
	>
		<input type="hidden" name="source" value={source} />

		<!-- Honeypot: hidden from people and screen readers, so only bots fill it in. -->
		<div class="honeypot" aria-hidden="true">
			<label for={`${id}-company`}>Company</label>
			<input id={`${id}-company`} name="company" type="text" tabindex="-1" autocomplete="off" />
		</div>

		<label class="label" for={`${id}-email`}>{label}</label>
		<div class="row">
			<input
				id={`${id}-email`}
				class="input"
				name="email"
				type="email"
				autocomplete="email"
				inputmode="email"
				placeholder="you@example.com"
				required
				defaultValue={failure?.email ?? ''}
				aria-invalid={failure ? 'true' : undefined}
				aria-describedby={describedBy}
			/>
			<Button type="submit" size="lg" disabled={pending}>
				{pending ? 'Sending…' : buttonLabel}
			</Button>
		</div>

		{#if failure}
			<p id={`${id}-error`} class="error" role="alert">{failure.error}</p>
		{/if}
		{#if hint}
			<p id={`${id}-hint`} class="hint">{hint}</p>
		{/if}
	</form>
{/if}

<style>
	.signup {
		display: grid;
		gap: var(--space-2xs);
		max-inline-size: 34rem;
	}

	.label {
		font-weight: var(--weight-semibold);
	}

	.row {
		display: grid;
		gap: var(--space-2xs);
	}

	.input {
		min-block-size: 3.25rem;
		padding-inline: var(--space-s);
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius-full);
		background-color: var(--color-surface);
		color: var(--color-text);
	}

	.input::placeholder {
		color: var(--color-text-muted);
	}

	.input[aria-invalid='true'] {
		border-color: var(--color-danger);
	}

	.error {
		color: var(--color-danger);
		font-weight: var(--weight-medium);
	}

	.hint {
		color: var(--color-text-muted);
		font-size: var(--step--1);
	}

	.success {
		max-inline-size: 34rem;
		padding: var(--space-s);
		border-radius: var(--radius-m);
		background-color: color-mix(in oklch, var(--color-success) 14%, transparent);
		color: var(--color-text);
		font-weight: var(--weight-semibold);
	}

	.honeypot {
		position: absolute;
		inline-size: 1px;
		block-size: 1px;
		overflow: hidden;
		clip-path: inset(50%);
	}

	@media (min-width: 37.5rem) {
		.row {
			grid-template-columns: 1fr auto;
		}
	}
</style>
