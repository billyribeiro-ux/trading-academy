# 0012. Update npm dependencies manually on a schedule

- **Status:** Accepted
- **Date:** 2026-10-19

## Context

We want dependency updates to arrive as reviewable pull requests. On 2026-10-19, GitHub's
Dependabot documentation lists pnpm support for versions 7, 8, 9 and 10 only. This project
pins pnpm 12, so Dependabot updates for npm packages are not supported.

## Decision

- Dependabot updates **GitHub Actions** versions weekly.
- npm dependencies are updated by hand on the first working day of each month, on a
  `chore/update-dependencies` branch: `pnpm outdated`, then `pnpm up --latest`, then
  `pnpm verify`, then a pull request.
- Security advisories are checked at the same time with `pnpm audit`.
- Revisit this decision when Dependabot lists pnpm 12 support.

## Consequences

- Updates are batched monthly instead of arriving continuously.
- One manual task per month, which the README documents.
