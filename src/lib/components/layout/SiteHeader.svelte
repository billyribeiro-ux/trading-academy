<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import CaretDownIcon from 'phosphor-svelte/lib/CaretDownIcon';
	import ListIcon from 'phosphor-svelte/lib/ListIcon';
	import XIcon from 'phosphor-svelte/lib/XIcon';
	import { dismissible } from '#lib/attachments/dismissible.ts';
	import Button from '#lib/components/ui/Button.svelte';
	import Logo from '#lib/components/ui/Logo.svelte';
	import { headerLinks, primaryNav } from '#lib/config/navigation.ts';

	/**
	 * On small screens the menu is a popover sheet. Reading `page.url.href` subscribes this
	 * attachment to navigation, so it re-runs, and closes the sheet, whenever the URL changes,
	 * including jumps to a section such as `#memberships` on the same page.
	 */
	function closeOnNavigation(menu: HTMLElement) {
		void page.url.href;
		if (menu.matches(':popover-open')) menu.hidePopover();
	}
</script>

<header class="site-header">
	<div class="container bar">
		<Logo />

		<button class="menu-toggle" type="button" popovertarget="site-menu" aria-label="Open menu">
			<ListIcon aria-hidden="true" size="1.5rem" />
		</button>

		<nav id="site-menu" class="menu" aria-label="Main" popover {@attach closeOnNavigation}>
			<div class="menu-head">
				<Logo />
				<button
					class="menu-close"
					type="button"
					popovertarget="site-menu"
					popovertargetaction="hide"
					aria-label="Close menu"
				>
					<XIcon aria-hidden="true" size="1.5rem" />
				</button>
			</div>

			<ul class="menus" role="list">
				{#each primaryNav as navMenu (navMenu.label)}
					<li>
						<details name="site-nav" {@attach dismissible}>
							<summary>
								{navMenu.label}
								<CaretDownIcon class="caret" aria-hidden="true" />
							</summary>
							<div class="panel">
								{#each navMenu.groups as group (group.title)}
									<div class="group">
										<p class="group-title">{group.title}</p>
										<ul role="list">
											{#each group.links as link (link.href)}
												<li><a href={resolve(link.href)}>{link.label}</a></li>
											{/each}
										</ul>
									</div>
								{/each}
							</div>
						</details>
					</li>
				{/each}
				<li>
					<a class="top-link" href={resolve(headerLinks.pricing.href)}>
						{headerLinks.pricing.label}
					</a>
				</li>
			</ul>

			<div class="actions">
				<Button href={resolve(headerLinks.signIn.href)} variant="ghost">
					{headerLinks.signIn.label}
				</Button>
				<Button href={resolve(headerLinks.cta.href)}>
					{headerLinks.cta.label}
				</Button>
			</div>
		</nav>
	</div>
</header>

<style>
	.site-header {
		position: sticky;
		inset-block-start: 0;
		z-index: 50;
		border-block-end: var(--border-width) solid var(--color-border);
		background-color: color-mix(in oklch, var(--color-bg) 88%, transparent);
		backdrop-filter: blur(12px);
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-s);
		min-block-size: var(--header-height);
	}

	.menu-toggle,
	.menu-close {
		display: inline-grid;
		place-items: center;
		inline-size: var(--target-min);
		block-size: var(--target-min);
		padding: 0;
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius-m);
		background-color: var(--color-surface);
		cursor: pointer;
	}

	/* ---- Small screens: the menu is a full-height popover sheet ---------------------- */
	.menu {
		inset: 0 0 0 auto;
		inline-size: min(100%, 24rem);
		block-size: 100dvh;
		max-block-size: none;
		margin: 0;
		padding: var(--space-s);
		border: 0;
		border-inline-start: var(--border-width) solid var(--color-border);
		background-color: var(--color-bg);
		color: var(--color-text);
		overflow-y: auto;
		box-shadow: var(--shadow-l);
	}

	.menu::backdrop {
		background-color: oklch(0% 0 0 / 45%);
	}

	.menu-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-block-end: var(--space-s);
	}

	.menus {
		display: grid;
		gap: var(--space-3xs);
	}

	summary,
	.top-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3xs);
		min-block-size: var(--target-min);
		padding-inline: var(--space-2xs);
		border-radius: var(--radius-s);
		color: var(--color-text);
		font-weight: var(--weight-semibold);
		text-decoration: none;
		white-space: nowrap;
		cursor: pointer;
		list-style: none;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary:hover,
	.top-link:hover {
		background-color: var(--color-surface-raised);
		color: var(--color-text);
	}

	summary :global(.caret) {
		transition: rotate var(--duration-normal) var(--ease-out);
	}

	details[open] summary :global(.caret) {
		rotate: 180deg;
	}

	.panel {
		display: grid;
		gap: var(--space-s);
		padding: var(--space-2xs) var(--space-2xs) var(--space-s) var(--space-s);
	}

	.group-title {
		margin-block-end: var(--space-3xs);
		color: var(--color-text-muted);
		font-size: var(--step--1);
		font-weight: var(--weight-semibold);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.group a {
		display: flex;
		align-items: center;
		min-block-size: 2.25rem;
		color: var(--color-text);
		text-decoration: none;
	}

	.group a:hover {
		color: var(--color-brand);
		text-decoration: underline;
	}

	.actions {
		display: grid;
		gap: var(--space-2xs);
		margin-block-start: var(--space-m);
	}

	/* ---- Large screens: the same menu sits inline in the header ---------------------- */
	@media (min-width: 75rem) {
		.menu-toggle,
		.menu-head {
			display: none;
		}

		/* Undo the popover's built-in hiding and sheet styles. */
		.menu {
			position: static;
			display: flex;
			flex: 1;
			align-items: center;
			justify-content: space-between;
			inline-size: auto;
			block-size: auto;
			padding: 0;
			border: 0;
			background-color: transparent;
			overflow: visible;
			box-shadow: none;
		}

		.menus {
			display: flex;
			gap: var(--space-3xs);
			margin-inline: auto;
		}

		.menus > li {
			position: relative;
		}

		summary {
			justify-content: flex-start;
			padding-inline: var(--space-xs);
		}

		.top-link {
			padding-inline: var(--space-xs);
		}

		.panel {
			position: absolute;
			inset-block-start: calc(100% + var(--space-2xs));
			inset-inline-start: 0;
			grid-auto-flow: column;
			min-inline-size: 15rem;
			padding: var(--space-s);
			border: var(--border-width) solid var(--color-border);
			border-radius: var(--radius-m);
			background-color: var(--color-surface);
			box-shadow: var(--shadow-l);
		}

		.group {
			min-inline-size: 13rem;
		}

		.actions {
			display: flex;
			margin-block-start: 0;
		}
	}
</style>
