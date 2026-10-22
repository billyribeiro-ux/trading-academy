<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import AuthCard from '#lib/components/forms/AuthCard.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import TextField from '#lib/components/ui/TextField.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();

	let pending = $state(false);
</script>

<AuthCard
	title="Sign in"
	lead="Placeholder text: welcome back. Sign in to reach your trading rooms and courses."
	message={form?.message}
>
	<form
		class="form"
		method="POST"
		use:enhance={({ formElement }) => {
			pending = true;
			return async ({ result, update }) => {
				await update();
				// After a failure, behave like a page reload: refill the fields from the
				// server's values (their defaultValue) and clear the password.
				if (result.type === 'failure') formElement.reset();
				pending = false;
			};
		}}
	>
		<TextField
			name="email"
			label="Email"
			type="email"
			autocomplete="email"
			required
			defaultValue={form?.values.email ?? ''}
			error={form?.fieldErrors.email}
		/>
		<TextField
			name="password"
			label="Password"
			type="password"
			autocomplete="current-password"
			required
			error={form?.fieldErrors.password}
		/>
		<Button type="submit" size="lg" block disabled={pending}>
			{pending ? 'Signing in…' : 'Sign in'}
		</Button>
	</form>

	{#snippet footer()}
		New here? <a href={resolve('/sign-up')}>Create an account</a>
	{/snippet}
</AuthCard>

<style>
	.form {
		display: grid;
		gap: var(--space-s);
	}
</style>
