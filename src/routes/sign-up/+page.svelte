<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import AuthCard from '#lib/components/forms/AuthCard.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import TextField from '#lib/components/ui/TextField.svelte';
	import { PASSWORD_MAX, PASSWORD_MIN } from '#lib/validation/auth.ts';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();

	let pending = $state(false);
</script>

<AuthCard
	title="Create your account"
	lead="Placeholder text: start with a free account, then choose a membership when you are ready."
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
			name="name"
			label="Full name"
			autocomplete="name"
			required
			maxlength={80}
			defaultValue={form?.values.name ?? ''}
			error={form?.fieldErrors.name}
		/>
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
			autocomplete="new-password"
			required
			minlength={PASSWORD_MIN}
			maxlength={PASSWORD_MAX}
			hint={`At least ${PASSWORD_MIN} characters. A passphrase of a few words works well.`}
			error={form?.fieldErrors.password}
		/>
		<Button type="submit" size="lg" block disabled={pending}>
			{pending ? 'Creating your account…' : 'Create account'}
		</Button>
	</form>

	{#snippet footer()}
		Already have an account? <a href={resolve('/sign-in')}>Sign in</a>
	{/snippet}
</AuthCard>

<style>
	.form {
		display: grid;
		gap: var(--space-s);
	}
</style>
