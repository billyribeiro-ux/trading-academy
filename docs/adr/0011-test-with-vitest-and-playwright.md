# 0011. Test with Vitest and Playwright

- **Status:** Accepted
- **Date:** 2026-10-19

## Context

We need fast feedback on logic, confidence that components render correctly in a real
browser, and proof that the whole site works for a visitor, including accessibility.

## Decision

- **Vitest** for unit tests (plain TypeScript, runs in Node) and component tests (runs in a
  real Chromium browser through `vitest-browser-svelte`). Test files sit next to the code
  they test: `foo.ts` → `foo.spec.ts`, `Foo.svelte` → `Foo.svelte.spec.ts`.
- **Playwright** for end-to-end tests against the production build (`*.e2e.ts`).
- **axe-core** inside Playwright checks every page for WCAG 2.2 A and AA violations.

## Consequences

- One test runner for unit and component tests, configured in `vite.config.ts`.
- CI must download a Chromium browser, which adds about a minute to each run.
