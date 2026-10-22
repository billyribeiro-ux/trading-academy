# 0005. Style with plain CSS and design tokens

- **Status:** Accepted
- **Date:** 2026-10-19

## Context

We want styles that are fast, readable in ten years and teach the platform rather than a
framework. Modern CSS now covers what utility frameworks were adopted for: variables,
nesting, cascade layers, container queries and built-in light and dark themes.

## Decision

- No Tailwind or CSS framework. Plain CSS only.
- **Design tokens** (color, type scale, spacing, radius, shadow, motion) are CSS custom
  properties in `src/lib/styles/tokens.css`.
- **Cascade layers** fix the order once: `reset, tokens, base, layout, components, utilities`.
- **Component styles** live in each `.svelte` file, where Svelte scopes them automatically.
- **Light and dark themes** use `color-scheme` and the `light-dark()` function, following the
  visitor's system setting.
- **Fluid type and spacing** use `clamp()`, so sizes scale smoothly between breakpoints.
- Logical properties (`margin-inline`, `padding-block`) instead of left and right.

## Consequences

- No build-time CSS dependency and no class-name soup in markup.
- Every color and size has one source of truth.
- Contributors must know modern CSS; the tokens file is the reference.
