# 0004. Run as a Node server with adapter-node

- **Status:** Accepted
- **Date:** 2026-10-19

## Context

The site needs server features: form actions for email sign-ups, sessions for accounts and a
database connection. We want to avoid locking into one hosting vendor.

## Decision

Build with `@sveltejs/adapter-node`, which outputs a standalone Node.js server. Pages that
are the same for every visitor (blog articles) are prerendered to static HTML at build time;
everything else is rendered on the server per request.

## Consequences

- Runs anywhere Node.js runs: a VPS, a container platform or a managed Node host.
- We operate the server ourselves: process management, TLS and scaling are our job.
- Moving to a serverless host later means swapping the adapter, not rewriting the app.
