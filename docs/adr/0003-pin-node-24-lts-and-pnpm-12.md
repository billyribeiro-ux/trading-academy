# 0003. Pin Node.js 24 LTS and pnpm 12

- **Status:** Accepted
- **Date:** 2026-10-19

## Context

"Works on my machine" bugs come from different tool versions on different machines and in
CI. We want every machine to run the exact same Node.js and pnpm.

## Decision

- **Node.js 24 LTS**, pinned to an exact version in `.nvmrc` (read by mise locally and by
  `actions/setup-node` in CI) and declared in `package.json` `engines`.
- **pnpm 12**, pinned exactly with `devEngines.packageManager` and `onFail: "download"`, so
  pnpm switches itself to the pinned version and records it in `pnpm-lock.yaml`.
- `pnpm-lock.yaml` is always committed.
- We move to the next even-numbered Node.js release once it is promoted to LTS, in its own
  pull request.

## Consequences

- Local and CI builds use identical tools.
- Running `npm install` in this project fails on purpose, because `devEngines` names pnpm.
- pnpm waits before installing very new releases (supply-chain protection), so the newest
  version of a package may lag by a day.
