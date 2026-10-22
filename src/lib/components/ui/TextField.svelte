<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLInputAttributes, 'id' | 'name' | 'children'> {
		/** Form field name, sent to the server. */
		name: string;
		label: string;
		/** Error message from the server; marks the field invalid and is read out with it. */
		error?: string | undefined;
		/** Helper text under the field. */
		hint?: string;
	}

	let { name, label, error, hint, ...rest }: Props = $props();

	const id = $props.id();
	const describedBy = $derived(
		[error ? `${id}-error` : '', hint ? `${id}-hint` : ''].filter(Boolean).join(' ') || undefined
	);
</script>

<div class="field">
	<label for={`${id}-input`}>{label}</label>
	<input
		id={`${id}-input`}
		{name}
		aria-invalid={error ? 'true' : undefined}
		aria-describedby={describedBy}
		{...rest}
	/>
	{#if hint}
		<p id={`${id}-hint`} class="hint">{hint}</p>
	{/if}
	{#if error}
		<p id={`${id}-error`} class="error">{error}</p>
	{/if}
</div>

<style>
	.field {
		display: grid;
		gap: var(--space-3xs);
	}

	label {
		font-weight: var(--weight-semibold);
	}

	input {
		min-block-size: 3rem;
		padding-inline: var(--space-s);
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius-m);
		background-color: var(--color-surface);
		color: var(--color-text);
	}

	input[aria-invalid='true'] {
		border-color: var(--color-danger);
	}

	.hint {
		color: var(--color-text-muted);
		font-size: var(--step--1);
	}

	.error {
		color: var(--color-danger);
		font-size: var(--step--1);
		font-weight: var(--weight-medium);
	}
</style>
