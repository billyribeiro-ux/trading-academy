# 0002. Use SvelteKit 3 and Svelte 5 with TypeScript

- **Status:** Accepted
- **Date:** 2026-10-19

## Context

We need a framework that renders HTML on the server (for search engines and fast first
paint), handles routing, data loading and forms, and keeps the JavaScript sent to phones
small. The team already works in Svelte.

## Decision

- **SvelteKit 3.1** as the application framework, scaffolded with the official `sv` CLI.
- **Svelte 5** in runes mode for every component (`$state`, `$derived`, `$props`).
- **TypeScript 6** in strict mode, plus `noUncheckedIndexedAccess`, `noImplicitOverride`,
  `noImplicitReturns`, `noFallthroughCasesInSwitch` and `noPropertyAccessFromIndexSignature`.
- TypeScript stays on 6.x: SvelteKit 3.1 and `svelte-check` declare `typescript: ^6.0.0`
  as their supported range, and `typescript-eslint` supports `<6.1.0`. TypeScript 7 is
  adopted only when all three support it.
- Experimental features (remote functions, async components) stay off until stable.

## Consequences

- Server-side rendering by default, which the SvelteKit SEO guide recommends keeping on.
- SvelteKit 3 conventions apply: configuration lives in `vite.config.ts`, shared code is
  imported with `#lib`, environment variables are declared in `src/env.ts`.
- Upgrading to TypeScript 7 later is a deliberate change with its own ADR.
