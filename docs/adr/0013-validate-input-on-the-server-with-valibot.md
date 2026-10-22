# 0013. Validate input on the server with Valibot

- **Status:** Accepted
- **Date:** 2026-10-19

## Context

Forms such as the email sign-up send data the server must never trust. Browser validation
(`type="email"`, `required`) helps people but is trivially bypassed. SvelteKit's docs use
Standard Schema validators (Valibot, Zod) for environment variables, route parameters and
remote functions.

## Decision

- Every form action validates its input on the server with a **Valibot** schema kept in
  `src/lib/validation/`, with human-readable error messages in the schema.
- The browser also validates with native HTML attributes, for instant feedback.
- Forms work without JavaScript and are progressively enhanced with `use:enhance`.
- Failed validation returns `fail(400, …)` with the submitted values (never secrets) so the
  visitor does not retype them.
- Public forms include a hidden honeypot field; submissions that fill it are accepted
  silently and discarded.

## Consequences

- Valibot is small and tree-shakable, and implements Standard Schema, so the same schemas
  can be reused if remote functions are adopted later.
- Honeypots stop simple bots only; rate limiting is a separate decision if abuse appears.
