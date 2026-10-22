<script lang="ts">
	import { resolve } from '$app/paths';
	import { site } from '#lib/config/site.ts';
</script>

<a class="logo" href={resolve('/')}>
	<svg class="mark" viewBox="0 0 32 32" aria-hidden="true">
		<rect width="32" height="32" rx="7" />
		<polyline points="5,23 10,19 14,21 19,13 23,15 27,8" />
	</svg>
	<span class="wordmark">{site.name}</span>
</a>

<style>
	.logo {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2xs);
		min-block-size: var(--target-min);
		color: var(--color-text);
		font-size: var(--step-1);
		font-weight: var(--weight-bold);
		letter-spacing: -0.02em;
		text-decoration: none;
	}

	.logo:hover {
		color: var(--color-text);
	}

	.mark {
		inline-size: 2rem;
		block-size: 2rem;
		flex-shrink: 0;
	}

	.mark rect {
		fill: var(--color-brand);
	}

	.mark polyline {
		fill: none;
		stroke: var(--color-on-brand);
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
</style>
