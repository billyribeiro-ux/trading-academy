<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	interface CommonProps {
		/** Visual weight: `primary` for the main action, `secondary` and `ghost` for others. */
		variant?: 'primary' | 'secondary' | 'ghost';
		/** `md` for most buttons, `lg` for hero calls to action. */
		size?: 'md' | 'lg';
		/** Stretch to the full width of the container. */
		block?: boolean;
		children: Snippet;
	}

	/** A link that looks like a button. Use it whenever the action navigates. */
	interface LinkProps extends CommonProps, Omit<HTMLAnchorAttributes, 'children'> {
		href: string;
	}

	/** A real button. Use it for actions that do not navigate, such as submitting a form. */
	interface ButtonProps extends CommonProps, Omit<HTMLButtonAttributes, 'children'> {
		href?: undefined;
	}

	type Props = LinkProps | ButtonProps;

	let { variant = 'primary', size = 'md', block = false, children, ...rest }: Props = $props();
</script>

{#if rest.href !== undefined}
	<a class={['button', variant, size, { block }]} {...rest}>
		{@render children()}
	</a>
{:else}
	<button class={['button', variant, size, { block }]} type="button" {...rest}>
		{@render children()}
	</button>
{/if}

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2xs);
		min-block-size: var(--target-min);
		padding-inline: var(--space-s);
		border: var(--border-width) solid transparent;
		border-radius: var(--radius-full);
		font-size: var(--step-0);
		font-weight: var(--weight-semibold);
		line-height: 1;
		text-decoration: none;
		white-space: nowrap;
		cursor: pointer;
		transition:
			background-color var(--duration-fast) var(--ease-out),
			border-color var(--duration-fast) var(--ease-out),
			color var(--duration-fast) var(--ease-out);
	}

	.lg {
		min-block-size: 3.25rem;
		padding-inline: var(--space-m);
		font-size: var(--step-1);
	}

	.block {
		inline-size: 100%;
	}

	.primary {
		background-color: var(--color-brand);
		color: var(--color-on-brand);
	}

	.primary:hover {
		background-color: var(--color-brand-strong);
		color: var(--color-on-brand);
	}

	.secondary {
		border-color: var(--color-border);
		background-color: var(--color-surface);
		color: var(--color-text);
	}

	.secondary:hover {
		border-color: var(--color-brand);
		color: var(--color-text);
	}

	.ghost {
		background-color: transparent;
		color: var(--color-text);
	}

	.ghost:hover {
		background-color: var(--color-surface-raised);
		color: var(--color-text);
	}

	.button:disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}
</style>
