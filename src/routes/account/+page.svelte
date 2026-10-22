<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import Button from '#lib/components/ui/Button.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<section class="container account">
	<p class="eyebrow">Your account</p>
	<h1>Welcome, {data.user.name}</h1>

	<dl class="details">
		<div>
			<dt>Name</dt>
			<dd>{data.user.name}</dd>
		</div>
		<div>
			<dt>Email</dt>
			<dd>{data.user.email}</dd>
		</div>
		<div>
			<dt>Membership</dt>
			<dd>Free account · <a href={resolve('/#memberships')}>See plans</a></dd>
		</div>
	</dl>

	<form method="POST" action="?/signOut" use:enhance>
		<Button type="submit" variant="secondary">Sign out</Button>
	</form>
</section>

<style>
	.account {
		display: grid;
		justify-items: start;
		gap: var(--space-m);
		padding-block: var(--space-2xl);
	}

	.eyebrow {
		color: var(--color-brand);
		font-weight: var(--weight-semibold);
	}

	h1 {
		font-size: var(--step-4);
	}

	.details {
		display: grid;
		gap: var(--space-s);
		inline-size: min(100%, 32rem);
		padding: var(--space-m);
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius-l);
		background-color: var(--color-surface);
	}

	dt {
		color: var(--color-text-muted);
		font-size: var(--step--1);
	}

	dd {
		margin: 0;
		font-weight: var(--weight-semibold);
	}
</style>
