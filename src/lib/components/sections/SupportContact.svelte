<script lang="ts">
	import EnvelopeSimpleIcon from 'phosphor-svelte/lib/EnvelopeSimpleIcon';
	import PhoneIcon from 'phosphor-svelte/lib/PhoneIcon';
	import { site } from '#lib/config/site.ts';
</script>

<section id="support" class="section support" aria-labelledby="support-title">
	<div class="container inner">
		<div>
			<h2 id="support-title">Have questions?</h2>
			<p class="lead">
				Placeholder text: talk to a real person on our support team, Monday to Friday, 8 AM to 5 PM
				Central.
			</p>
		</div>

		<ul class="channels" role="list">
			<li>
				<a class="channel" href={`tel:${site.contact.phone}`}>
					<PhoneIcon aria-hidden="true" size="1.5rem" />
					<span>
						<strong>Call us</strong>
						{site.contact.phoneDisplay}
					</span>
				</a>
			</li>
			<li>
				<a class="channel" href={`mailto:${site.contact.email}`}>
					<EnvelopeSimpleIcon aria-hidden="true" size="1.5rem" />
					<span>
						<strong>Email us</strong>
						{site.contact.email}
					</span>
				</a>
			</li>
		</ul>
	</div>
</section>

<style>
	.support {
		background-color: var(--color-brand);
		color: var(--color-on-brand);
	}

	.inner {
		display: grid;
		gap: var(--space-l);
		align-items: center;
	}

	h2 {
		font-size: var(--step-3);
	}

	.lead {
		margin-block-start: var(--space-2xs);
		max-inline-size: 40ch;
	}

	.channels {
		display: grid;
		gap: var(--space-s);
	}

	.channel {
		display: flex;
		align-items: center;
		gap: var(--space-s);
		padding: var(--space-s) var(--space-m);
		border-radius: var(--radius-l);
		background-color: var(--color-bg);
		color: var(--color-text);
		text-decoration: none;
	}

	.channel:hover {
		color: var(--color-text);
		box-shadow: var(--shadow-l);
	}

	.channel :global(svg) {
		flex-shrink: 0;
	}

	.channel span {
		display: grid;
		min-inline-size: 0;
		overflow-wrap: anywhere;
	}

	@media (min-width: 52.5rem) {
		.inner {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
