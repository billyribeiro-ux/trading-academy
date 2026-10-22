<script lang="ts">
	interface Props {
		/** Outlet names to show. */
		outlets: readonly string[];
	}

	let { outlets }: Props = $props();
</script>

<section class="press" aria-labelledby="press-title">
	<div class="container">
		<h2 id="press-title" class="title">As seen in</h2>
		<ul class="list" role="list">
			{#each outlets as outlet (outlet)}
				<li>{outlet}</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.press {
		padding-block: var(--space-xl);
		border-block: var(--border-width) solid var(--color-border);
	}

	.title {
		margin-block-end: var(--space-s);
		color: var(--color-text-muted);
		font-size: var(--step--1);
		font-weight: var(--weight-semibold);
		letter-spacing: 0.08em;
		text-align: center;
		text-transform: uppercase;
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-s) var(--space-l);
		color: var(--color-text-muted);
		font-size: var(--step-1);
		font-weight: var(--weight-bold);
		letter-spacing: -0.02em;
	}
</style>
