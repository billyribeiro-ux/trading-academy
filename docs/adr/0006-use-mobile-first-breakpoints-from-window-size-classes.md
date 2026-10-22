# 0006. Use mobile-first breakpoints from window size classes

- **Status:** Accepted
- **Date:** 2026-10-19

## Context

There is no official "enterprise" breakpoint standard. Picking widths after popular devices
goes stale as devices change. Google's Material Design 3 defines **window size classes**
based on available width, not device type: compact under 600 px, medium 600–839, expanded
840–1199, large 1200–1599 and extra-large 1600 and up.

## Decision

- Write every style for the smallest screen first (320 px), with no media query.
- Add enhancements with `min-width` media queries at exactly four widths:
  `37.5rem` (600 px), `52.5rem` (840 px), `75rem` (1200 px), `100rem` (1600 px).
- Breakpoints are written in `rem`, so they respect the visitor's browser font size.
- Components that live in different-sized containers (cards) respond to their own width with
  **container queries**, not the screen width.

## Consequences

- Phones get the smallest CSS path and no overrides.
- Four breakpoints keep layouts predictable and easy to test.
- CSS custom properties cannot be used inside media queries, so the four values are written
  literally; this ADR is the single reference for them.
