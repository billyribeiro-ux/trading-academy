# 0010. Use trunk-based flow with squash merges

- **Status:** Accepted
- **Date:** 2026-10-19

## Context

We want a history where every commit on `main` works, explains itself and can be reverted on
its own, and a process that is the same on every project.

## Decision

- `main` is the only long-lived branch and is protected by a GitHub ruleset: no direct
  pushes, no force pushes, no deletion, linear history, and the CI check must pass.
- Every change: short-lived branch → atomic commits → pull request → CI green → squash merge
  → branch deleted.
- Branch names: `<type>/<short-description>`, for example `feat/hero-section`.
- Commit messages and pull request titles follow Conventional Commits 1.0.0, enforced
  locally by commitlint through a `commit-msg` hook.
- The squash commit uses the pull request title, so `main` reads like a changelog.
- Every user-visible change adds a line to `CHANGELOG.md` under `[Unreleased]` in the same
  pull request.

## Consequences

- `main` is always releasable.
- Rulesets on private repositories need GitHub Pro, Team or Enterprise.
- Working commits on a branch are folded into one commit on `main`; the pull request keeps
  the detailed history.
