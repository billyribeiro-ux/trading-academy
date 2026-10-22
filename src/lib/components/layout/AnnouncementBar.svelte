<script lang="ts">
	import { resolve } from '$app/paths';
	import ArrowRightIcon from 'phosphor-svelte/lib/ArrowRightIcon';
	import CalendarDotsIcon from 'phosphor-svelte/lib/CalendarDotsIcon';
	import type { Webinar } from '#lib/content/webinars.ts';

	interface Props {
		/** The free training to promote. */
		webinar: Webinar;
	}

	let { webinar }: Props = $props();
</script>

<aside class="announcement" aria-label="Upcoming free training">
	<div class="container inner">
		<CalendarDotsIcon aria-hidden="true" size="1.25em" />
		<p>
			<strong>Free live training:</strong>
			{webinar.title} ·
			<time datetime={webinar.startsAt}>{webinar.dateLabel}</time>
		</p>
		<a class="register" href={resolve(webinar.href)}>
			Reserve a spot
			<ArrowRightIcon aria-hidden="true" />
		</a>
	</div>
</aside>

<style>
	.announcement {
		background-color: var(--color-brand-subtle);
		color: var(--color-text);
		font-size: var(--step--1);
	}

	.inner {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: var(--space-3xs) var(--space-xs);
		padding-block: var(--space-2xs);
		text-align: center;
	}

	.register {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3xs);
		min-block-size: 1.5rem;
		font-weight: var(--weight-semibold);
	}
</style>
