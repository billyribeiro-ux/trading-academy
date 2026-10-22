# 0016. Sign in with email and password using Better Auth

- **Status:** Accepted
- **Date:** 2026-10-19

## Context

Memberships need accounts. Building authentication by hand (password hashing, sessions,
cookie handling, timing-safe checks) is where most security bugs come from. The official
`sv` CLI ships a Better Auth add-on that stores everything through our Drizzle setup.

## Decision

- **Better Auth** with email and password, configured by hand, storing users,
  sessions and accounts in PostgreSQL through the Drizzle adapter.
- Its table definitions are generated with `pnpm auth:schema` and applied with a normal
  Drizzle migration.
- Pages use **form actions** that call `auth.api` on the server, so sign-up and sign-in work
  without JavaScript; the `sveltekitCookies` plugin sets the session cookie.
- `src/hooks.server.ts` puts the signed-in user on `event.locals`. Protected pages check
  `locals.user` in their server `load` and redirect to `/sign-in`.
- Passwords: at least 15 characters and up to 128, with no composition rules, following NIST
  SP 800-63B-4 for passwords used as the only factor. Fields allow pasting and password
  managers (WCAG 2.2, 3.3.8).
- A failed sign-in shows one message for a wrong email or a wrong password.
- The header always shows "Sign in", so pages can stay prerendered; `/sign-in` sends
  signed-in members to `/account`.

## Consequences

- Email verification and password reset need an email service, which is a separate decision.
- NIST also requires checking new passwords against a list of breached passwords. Better
  Auth's `haveIBeenPwned` plugin does this and is the next step once outbound access to its
  API is confirmed for every environment.
- `BETTER_AUTH_SECRET` must be at least 32 characters and unique per environment.
