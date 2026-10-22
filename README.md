# Trading Academy

A trading-education website: homepage, blog, memberships and a free-guide sign-up. Built with
SvelteKit 3 and Svelte 5 as a learning project that follows production practice end to end.

> [!NOTE]
> All copy on the site is placeholder text. The structure, code and process are the real
> deliverable.

## Tech stack

| Layer            | Choice                                       |
| ---------------- | -------------------------------------------- |
| Framework        | SvelteKit 3.1 · Svelte 5 (runes)             |
| Language         | TypeScript 6 (strict)                        |
| Runtime          | Node.js 24 LTS (`.nvmrc`)                    |
| Package manager  | pnpm 12 (pinned in `package.json`)           |
| Styling          | Plain CSS: custom properties, cascade layers |
| Icons            | Phosphor (`phosphor-svelte`)                 |
| Tests            | Vitest (unit + browser), Playwright (e2e)    |
| Backend (Part 2) | PostgreSQL · Drizzle ORM · Better Auth       |

## Requirements

- Node.js 24 LTS, the exact version in `.nvmrc`. With [mise](https://mise.jdx.dev), run
  `mise settings add idiomatic_version_file_enable_tools node` once per machine, then
  `mise install` in this folder.
- pnpm 12. `pnpm --version` should print `12.x`.

## Getting started

```sh
pnpm install
cp .env.example .env
pnpm dev
```

The site runs at <http://localhost:5173>.

## Scripts

| Command          | What it does                                          |
| ---------------- | ----------------------------------------------------- |
| `pnpm dev`       | Start the dev server with hot reload                  |
| `pnpm build`     | Build for production                                  |
| `pnpm preview`   | Serve the production build locally                    |
| `pnpm check`     | Type-check Svelte and TypeScript files                |
| `pnpm lint`      | Check formatting (Prettier) and code quality (ESLint) |
| `pnpm format`    | Format every file with Prettier                       |
| `pnpm test:unit` | Run unit and component tests (Vitest)                 |
| `pnpm test:e2e`  | Run end-to-end tests (Playwright)                     |
| `pnpm verify`    | The full gate: check, lint, unit tests and build      |

Run `pnpm verify` before every commit. CI runs the same gate on every pull request.

## Project structure

```text
src/
├─ lib/
│  ├─ components/   UI components: layout, sections, SEO, primitives
│  ├─ content/      Placeholder content as typed data
│  ├─ config/       Site-wide settings: name, URL, navigation
│  └─ styles/       Design tokens and global CSS
└─ routes/          Pages and endpoints (file-based routing)
docs/
├─ PLAN.md          What we are building and how we know it works
└─ adr/             Architecture Decision Records
```

## How we work

- **Branches:** `main` is protected. Every change goes through a branch and a pull request.
- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), one
  logical change per commit.
- **Changelog:** every user-visible change adds a line to `CHANGELOG.md` under `[Unreleased]`
  in the same pull request.
- **Decisions:** significant technical choices are recorded in `docs/adr/`.

## Maintenance

On the first working day of each month, update npm dependencies on a branch
(see [ADR 0012](docs/adr/0012-update-npm-dependencies-manually-on-a-schedule.md)):

```sh
git switch -c chore/update-dependencies
pnpm outdated
pnpm up --latest
pnpm audit
pnpm verify
```

Dependabot opens pull requests for GitHub Actions updates every week.

## License

Copyright © 2026 Billy Ribeiro. All rights reserved. See [LICENSE](LICENSE).
