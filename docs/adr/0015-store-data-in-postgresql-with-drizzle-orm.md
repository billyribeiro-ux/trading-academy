# 0015. Store data in PostgreSQL with Drizzle ORM

- **Status:** Accepted
- **Date:** 2026-10-19

## Context

The site needs to store email sign-ups now and user accounts, sessions and memberships next.
The data is relational (users have sessions and memberships), must be consistent, and must
work with Better Auth. The official `sv` CLI ships a Drizzle add-on that supports PostgreSQL
and is compatible with its Better Auth add-on.

## Decision

- **PostgreSQL** as the only database. Version 18 locally through Docker Compose
  (`compose.yaml`), and a managed PostgreSQL in production.
- **Drizzle ORM** with the **postgres.js** driver, configured by hand. The schema is
  TypeScript in `src/lib/server/db/schema.ts`, so table types flow into application code.
- **Migrations, not pushes.** Every schema change is generated with `pnpm db:generate`,
  reviewed and committed in `drizzle/`, and applied with `pnpm db:migrate`. A migration that
  has run anywhere is never edited; a new one corrects it.
- Database code lives in `src/lib/server/`, which SvelteKit never sends to the browser.
- `DATABASE_URL` is declared and validated in `src/env.ts`.

## Consequences

- Local development needs Docker (or any PostgreSQL 18 server) running.
- CI starts a PostgreSQL service so end-to-end tests run against a real database.
- Changing database vendor later means a new driver and migrations, not new application code.
