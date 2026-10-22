<script lang="ts">
	interface Props {
		/** Id of the element that holds the page's main content. */
		target: string;
	}

	let { target }: Props = $props();
</script>

<!-- The first focusable element on every page, so keyboard users can skip the menu. -->
<a class="skip-link" href={`#${target}`}>Skip to main content</a>

<style>
	.skip-link {
		position: absolute;
		inset-block-start: var(--space-2xs);
		inset-inline-start: var(--space-2xs);
		z-index: 100;
		padding: var(--space-2xs) var(--space-s);
		border-radius: var(--radius-s);
		background-color: var(--color-brand);
		color: var(--color-on-brand);
		font-weight: var(--weight-semibold);
		text-decoration: none;
		translate: 0 -200%;
	}

	.skip-link:focus-visible {
		translate: 0 0;
	}
</style>
