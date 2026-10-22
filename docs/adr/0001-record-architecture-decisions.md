# 0001. Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-10-19

## Context

Decisions that are expensive to reverse (framework, hosting, data storage, security) get
made once and then forgotten. Months later nobody, including the person who made them,
remembers why. The result is re-arguing settled questions or quietly undoing good choices.

## Decision

We record every significant decision as an Architecture Decision Record (ADR) in
`docs/adr/`, using the format described by Michael Nygard:

- One decision per file, named `NNNN-short-decision-in-kebab-case.md`.
- Numbers increase in the order the records are written and are never reused.
- Each record has a status, a date, and the sections **Context**, **Decision** and
  **Consequences**.
- An accepted record is never edited. To change a decision, write a new record and mark the
  old one `Superseded by NNNN`.

## Consequences

- The reasoning behind the codebase is searchable and versioned with the code.
- Writing a record takes a few minutes per decision.
- Pull requests that change an accepted decision must include a new ADR.
