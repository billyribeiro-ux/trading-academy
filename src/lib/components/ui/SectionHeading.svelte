<script lang="ts">
	interface Props {
		/** Id for the `h2`, so the section can point to it with `aria-labelledby`. */
		id: string;
		/** Short label above the title. */
		eyebrow?: string;
		title: string;
		/** One or two sentences under the title. */
		lead?: string;
		/** `center` for standalone sections; `start` when the heading sits beside content. */
		align?: 'start' | 'center';
	}

	let { id, eyebrow, title, lead, align = 'center' }: Props = $props();
</script>

<header class={['heading', align]}>
	{#if eyebrow}
		<p class="eyebrow">{eyebrow}</p>
	{/if}
	<h2 {id}>{title}</h2>
	{#if lead}
		<p class="lead">{lead}</p>
	{/if}
</header>

<style>
	.heading {
		display: grid;
		gap: var(--space-2xs);
		margin-block-end: var(--space-xl);
	}

	.center {
		justify-items: center;
		text-align: center;
	}

	.eyebrow {
		color: var(--color-brand);
		font-weight: var(--weight-semibold);
	}

	h2 {
		max-inline-size: 22ch;
		font-size: var(--step-4);
	}

	.lead {
		max-inline-size: var(--prose-max);
		color: var(--color-text-muted);
		font-size: var(--step-1);
	}
</style>
