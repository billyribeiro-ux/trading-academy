# 0009. Self-host the Inter variable font

- **Status:** Accepted
- **Date:** 2026-10-19

## Context

Fonts loaded from a third-party server cost an extra connection on every first visit and
share visitor data with that server. System fonts look different on every platform.

## Decision

- Use **Inter** as a variable font, installed from npm with `@fontsource-variable/inter` and
  bundled by Vite, so it is served from our own domain.
- `font-display: swap` (the package default) so text is visible immediately.
- A fallback stack of system fonts in the `--font-sans` token.

## Consequences

- One self-hosted font file covers every weight.
- Text may briefly render in the fallback font on a first visit; the size-matched fallback
  stack keeps the shift small.
