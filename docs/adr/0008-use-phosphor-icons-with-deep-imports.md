# 0008. Use Phosphor icons with deep imports

- **Status:** Accepted
- **Date:** 2026-10-19

## Context

The site needs a consistent icon set. There is no official `@phosphor-icons/svelte` package;
the community package `phosphor-svelte` 3.1.1 supports Svelte 5 and is actively published.
Its README recommends importing each icon from its own file, because importing from the
package root slows down compilation.

## Decision

- Use `phosphor-svelte`.
- Import every icon by its own path, for example
  `import ChartLineUpIcon from 'phosphor-svelte/lib/ChartLineUpIcon'`.
- Use the `…Icon` names; the old names without the suffix are deprecated.
- Decorative icons get `aria-hidden="true"`. An icon that is the only content of a link or
  button gets an accessible name on that link or button instead.

## Consequences

- Only the icons we use end up in the bundle.
- Icons are inline SVG: no extra requests and no layout shift.
