# Trading Academy

Trading-education website: homepage, blog, memberships and a free-guide sign-up. All copy is
placeholder text; code quality is production grade.

## Before you plan

1. Read `docs/PLAN.md` for scope and acceptance checks.
2. Read the ADRs in `docs/adr/` that touch the area you are changing.
3. Never contradict an accepted ADR. If a change needs a different decision, write a new ADR
   that supersedes it and say so in the pull request.

## Stack

- SvelteKit 3.1, Svelte 5 (runes only), TypeScript 6 strict
- Node.js 24 LTS (`.nvmrc`), pnpm 12 (never npm or yarn)
- Plain CSS with design tokens. No Tailwind, no CSS frameworks
- Icons: `phosphor-svelte`, deep imports only
- Tests: Vitest (unit + browser components), Playwright (e2e + axe)

## Commands

- Install: `pnpm install`
- Dev server: `pnpm dev`
- Full gate, run before saying a task is done: `pnpm verify`
- Format: `pnpm format`
- Unit and component tests: `pnpm test:unit --run`
- End-to-end tests: `pnpm test:e2e`

## Layout

- `src/routes/` pages and endpoints
- `src/lib/components/layout/` header, navigation, footer
- `src/lib/components/sections/` one component per homepage section
- `src/lib/components/ui/` small reusable pieces
- `src/lib/components/seo/` `Seo.svelte` and JSON-LD helpers
- `src/lib/content/` placeholder content as typed data
- `src/lib/config/` site settings and navigation
- `src/lib/styles/` tokens, reset, base styles
- `src/env.ts` every environment variable, declared and validated

## Svelte and SvelteKit rules

- Runes only: `$state`, `$derived`, `$props`. Use `$effect` only for real side effects,
  never to copy one piece of state into another.
- Snippets and `{@render}`, never slots. Event attributes (`onclick`), never `on:click`.
- Every component declares a `Props` interface. No `any`, no `@ts-ignore`, no `!` assertions
  without a comment explaining why the value cannot be null.
- Import shared code with `#lib/...`. Read state with `$app/state`, never `$app/stores`.
- Read environment variables from `$app/env/public` or `$app/env/private`, never `$env/*`.
- Pages get SEO data from their `load` function as `seo`; the root layout renders it.

## CSS rules

- Mobile first. Base styles target 320 px. Enhance only with `min-width` queries at
  `37.5rem`, `52.5rem`, `75rem`, `100rem` (ADR 0006). Use container queries for cards.
- Use tokens from `src/lib/styles/tokens.css` for every color, size, radius and shadow.
- Logical properties (`margin-inline`, `padding-block`), never left/right.
- Respect `prefers-reduced-motion`.

## Accessibility rules (WCAG 2.2 AA)

- One `h1` per page; headings never skip a level.
- Every interactive element works by keyboard and shows a visible focus ring.
- Touch targets are at least 24×24 px.
- Decorative icons get `aria-hidden="true"`; icon-only links and buttons get an
  `aria-label`.

## Comments

- Explain why, never what. No commented-out code, no TODOs.
- TSDoc on every exported function and every component `Props` field.

## Git

- Never commit to `main`. Branch as `<type>/<short-description>`.
- Conventional Commits, one logical change per commit.
- Every user-visible change adds a line under `## [Unreleased]` in `CHANGELOG.md`, in the
  same pull request, in the right category (Added, Changed, Deprecated, Removed, Fixed,
  Security).

## Definition of done

`pnpm verify` passes, new code has tests, the changelog is updated, and no warnings remain.
