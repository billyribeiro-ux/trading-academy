<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		lead: string;
		/** A form-wide error, such as wrong credentials. */
		message?: string | undefined;
		/** The form itself. */
		children: Snippet;
		/** Links under the form, such as "Already have an account?". */
		footer: Snippet;
	}

	let { title, lead, message, children, footer }: Props = $props();
</script>

<section class="container auth">
	<div class="card">
		<h1>{title}</h1>
		<p class="lead">{lead}</p>
		{#if message}
			<p class="message" role="alert">{message}</p>
		{/if}
		{@render children()}
		<p class="footer">{@render footer()}</p>
	</div>
</section>

<style>
	.auth {
		display: grid;
		place-items: center;
		padding-block: var(--space-2xl);
	}

	.card {
		display: grid;
		gap: var(--space-s);
		inline-size: min(100%, 28rem);
		padding: var(--space-l) var(--space-m);
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius-l);
		background-color: var(--color-surface);
		box-shadow: var(--shadow-m);
	}

	h1 {
		font-size: var(--step-3);
	}

	.lead {
		color: var(--color-text-muted);
	}

	.message {
		padding: var(--space-xs) var(--space-s);
		border-radius: var(--radius-m);
		background-color: color-mix(in oklch, var(--color-danger) 12%, transparent);
		color: var(--color-text);
		font-weight: var(--weight-medium);
	}

	.footer {
		color: var(--color-text-muted);
		font-size: var(--step--1);
		text-align: center;
	}
</style>
