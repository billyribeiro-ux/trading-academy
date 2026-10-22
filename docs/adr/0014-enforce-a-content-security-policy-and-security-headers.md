# 0014. Enforce a Content Security Policy and security headers

- **Status:** Accepted
- **Date:** 2026-10-19

## Context

The site collects email addresses and will hold accounts. Cross-site scripting (XSS) is the
most common way such sites are attacked. A Content Security Policy (CSP) tells the browser to
refuse scripts and other resources the site did not intend to load.

## Decision

- Configure SvelteKit's built-in CSP in `vite.config.ts` with `mode: 'auto'`: nonces on
  server-rendered pages, hashes on prerendered pages.
- Scripts, stylesheets, fonts and connections are limited to this site (`'self'`). Plugins
  (`object-src`) and framing (`frame-ancestors`) are blocked.
- Inline style **attributes** are allowed (`style-src-attr 'unsafe-inline'`), because
  SvelteKit and Svelte write a few that cannot carry a nonce. Inline `<style>` elements and
  every script stay locked down.
- `src/hooks.server.ts` adds `X-Content-Type-Options`, `Referrer-Policy`,
  `Permissions-Policy`, `Cross-Origin-Opener-Policy` and `X-Frame-Options` to every
  server-rendered response.
- Prerendered pages and static files skip hooks, so production also sets these headers, plus
  `Strict-Transport-Security`, at the reverse proxy.

## Consequences

- Any new third-party script, font or API needs an explicit CSP change in review.
- On prerendered pages the CSP is delivered as a `<meta>` tag, where browsers ignore
  `frame-ancestors`; the proxy header covers it.
