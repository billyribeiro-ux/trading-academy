<script lang="ts">
	import { resolve } from '$app/paths';
	import AppleLogoIcon from 'phosphor-svelte/lib/AppleLogoIcon';
	import ArrowUpIcon from 'phosphor-svelte/lib/ArrowUpIcon';
	import EnvelopeSimpleIcon from 'phosphor-svelte/lib/EnvelopeSimpleIcon';
	import FacebookLogoIcon from 'phosphor-svelte/lib/FacebookLogoIcon';
	import GooglePlayLogoIcon from 'phosphor-svelte/lib/GooglePlayLogoIcon';
	import InstagramLogoIcon from 'phosphor-svelte/lib/InstagramLogoIcon';
	import MapPinIcon from 'phosphor-svelte/lib/MapPinIcon';
	import PhoneIcon from 'phosphor-svelte/lib/PhoneIcon';
	import XLogoIcon from 'phosphor-svelte/lib/XLogoIcon';
	import YoutubeLogoIcon from 'phosphor-svelte/lib/YoutubeLogoIcon';
	import Logo from '#lib/components/ui/Logo.svelte';
	import { footerNav } from '#lib/config/navigation.ts';
	import { site, type SocialProfile } from '#lib/config/site.ts';
	import { disclaimers } from '#lib/content/disclaimers.ts';

	const socialIcons = {
		YouTube: YoutubeLogoIcon,
		X: XLogoIcon,
		Facebook: FacebookLogoIcon,
		Instagram: InstagramLogoIcon
	} satisfies Record<SocialProfile['name'], unknown>;

	const year = new Date().getFullYear();
</script>

<footer class="site-footer">
	<div class="container">
		<div class="top">
			<div class="brand">
				<Logo />
				<p class="tagline">{site.description}</p>

				<address class="contact">
					<a href={`tel:${site.contact.phone}`}>
						<PhoneIcon aria-hidden="true" />
						{site.contact.phoneDisplay}
					</a>
					<a href={`mailto:${site.contact.email}`}>
						<EnvelopeSimpleIcon aria-hidden="true" />
						{site.contact.email}
					</a>
					<span>
						<MapPinIcon aria-hidden="true" />
						{site.address.street}, {site.address.city}, {site.address.region}
						{site.address.postalCode}
					</span>
				</address>

				<ul class="social" role="list">
					{#each site.social as profile (profile.name)}
						{@const Icon = socialIcons[profile.name]}
						<li>
							<a
								href={profile.href}
								aria-label={`${site.name} on ${profile.name}`}
								rel="me external"
							>
								<Icon aria-hidden="true" size="1.25rem" />
							</a>
						</li>
					{/each}
				</ul>

				<div class="apps">
					<a class="app" href={site.apps.appStore} rel="external">
						<AppleLogoIcon aria-hidden="true" size="1.25rem" />
						App Store
					</a>
					<a class="app" href={site.apps.googlePlay} rel="external">
						<GooglePlayLogoIcon aria-hidden="true" size="1.25rem" />
						Google Play
					</a>
				</div>
			</div>

			<nav class="columns" aria-label="Footer">
				{#each footerNav as column (column.title)}
					<div>
						<h2 class="column-title">{column.title}</h2>
						<ul role="list">
							{#each column.links as link (link.href)}
								<li><a href={resolve(link.href)}>{link.label}</a></li>
							{/each}
						</ul>
					</div>
				{/each}
			</nav>
		</div>

		<div class="disclaimers">
			<h2 class="visually-hidden">Risk disclosure</h2>
			{#each disclaimers as disclaimer (disclaimer)}
				<p>{disclaimer}</p>
			{/each}
		</div>

		<div class="bottom">
			<p>© {year} {site.name}. All rights reserved.</p>
			<a class="to-top" href="#main">
				Back to top
				<ArrowUpIcon aria-hidden="true" />
			</a>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		padding-block: var(--space-xl) var(--space-m);
		border-block-start: var(--border-width) solid var(--color-border);
		background-color: var(--color-surface);
		font-size: var(--step--1);
	}

	.top {
		display: grid;
		gap: var(--space-xl);
	}

	.brand {
		display: grid;
		justify-items: start;
		gap: var(--space-s);
	}

	.tagline {
		max-inline-size: 36ch;
		color: var(--color-text-muted);
	}

	.contact {
		display: grid;
		gap: var(--space-2xs);
		font-style: normal;
	}

	.contact a,
	.contact span {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2xs);
		min-block-size: 1.5rem;
		color: var(--color-text);
		text-decoration: none;
	}

	.contact a:hover {
		color: var(--color-brand);
	}

	.social {
		display: flex;
		gap: var(--space-2xs);
	}

	.social a {
		display: inline-grid;
		place-items: center;
		inline-size: var(--target-min);
		block-size: var(--target-min);
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius-full);
		color: var(--color-text);
	}

	.social a:hover {
		border-color: var(--color-brand);
		color: var(--color-brand);
	}

	.apps {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2xs);
	}

	.app {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2xs);
		min-block-size: var(--target-min);
		padding-inline: var(--space-s);
		border-radius: var(--radius-m);
		background-color: var(--color-text);
		color: var(--color-bg);
		font-weight: var(--weight-semibold);
		text-decoration: none;
	}

	.app:hover {
		color: var(--color-bg);
		opacity: 0.9;
	}

	.columns {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
		gap: var(--space-l);
	}

	.column-title {
		margin-block-end: var(--space-xs);
		font-size: var(--step-0);
	}

	.columns ul {
		display: grid;
		gap: var(--space-3xs);
	}

	.columns a {
		display: inline-flex;
		align-items: center;
		min-block-size: 1.75rem;
		color: var(--color-text-muted);
		text-decoration: none;
	}

	.columns a:hover {
		color: var(--color-brand);
		text-decoration: underline;
	}

	.disclaimers {
		display: grid;
		gap: var(--space-2xs);
		margin-block-start: var(--space-xl);
		padding-block-start: var(--space-m);
		border-block-start: var(--border-width) solid var(--color-border);
		color: var(--color-text-muted);
	}

	.bottom {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-s);
		margin-block-start: var(--space-m);
		color: var(--color-text-muted);
	}

	.to-top {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3xs);
		min-block-size: var(--target-min);
		font-weight: var(--weight-semibold);
	}

	@media (min-width: 52.5rem) {
		.top {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
		}
	}
</style>
