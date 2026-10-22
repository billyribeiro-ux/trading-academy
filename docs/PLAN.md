# Plan: Trading Academy website

## 1. Brief

**What:** a trading-education website that sells memberships, shows courses and proprietary
indicators, publishes a blog, and grows an email list with a free PDF guide.

**Who it is for:** retail traders, from beginners to experienced, mostly on phones.

**Why it exists:** this is a learning build. The structure follows a real industry homepage
(live trading rooms, courses, indicators, alerts, traders, memberships, blog). All copy is
placeholder text; the code, process and quality bar are production grade.

## 2. Goals

1. A homepage with every section a trading-education business needs, each its own component.
2. Fast on phones: passes Core Web Vitals (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1).
3. Accessible: meets WCAG 2.2 level AA.
4. Search-ready: unique titles and descriptions, canonical URLs, sitemap, robots.txt and
   structured data that Google supports today.
5. A real email sign-up stored in a database, and accounts ready for memberships.

## 3. Non-goals

- Real payments and checkout (a later project).
- A content management system. Blog posts live in the codebase as typed data.
- Real trading data, charts or brand assets.

## 4. Pages

| Route                  | Purpose                                                   |
| ---------------------- | --------------------------------------------------------- |
| `/`                    | Homepage                                                  |
| `/blog`                | List of articles                                          |
| `/blog/[slug]`         | One article                                               |
| Menu destinations      | One shared "coming soon" page per menu link (not indexed) |
| `/sitemap.xml`         | Sitemap for search engines                                |
| `/robots.txt`          | Crawl rules and sitemap location                          |
| `/sign-in`, `/sign-up` | Accounts (Part 2)                                         |

## 5. Homepage sections

Each section is one component in `src/lib/components/sections/`. "Done" means every
acceptance check passes.

| #   | Section             | Acceptance checks                                                                  |
| --- | ------------------- | ---------------------------------------------------------------------------------- |
| 1   | Announcement bar    | Shows the next free webinar with a link; readable at 320 px wide                   |
| 2   | Header and menu     | Logo, five menus, Pricing, Sign in; works by keyboard; mobile menu at small widths |
| 3   | Hero                | One `h1`; email sign-up form with validation; trust line                           |
| 4   | Value proposition   | Four points with icons (Watch, Chat, Learn, Find)                                  |
| 5   | Services            | Four cards: trading rooms, classes, indicators, alerts; each links onward          |
| 6   | Featured indicators | Three indicator cards                                                              |
| 7   | Featured courses    | Three course cards with level and length                                           |
| 8   | Founder story       | Short story and a quote                                                            |
| 9   | Our traders         | Grid of traders with role and a link                                               |
| 10  | Testimonials        | Three quotes with a "results not typical" note                                     |
| 11  | Press               | "As seen in" strip of placeholder outlets                                          |
| 12  | Memberships         | Three plans; monthly/yearly switch updates every price                             |
| 13  | Free PDF            | Email form for the free guide                                                      |
| 14  | Latest articles     | Three newest blog posts, linked                                                    |
| 15  | FAQ                 | Expandable questions, work without JavaScript                                      |
| 16  | Support             | Phone and email contact                                                            |
| 17  | Footer              | Link columns, social links, app links, address, legal links, risk disclaimers      |

## 6. Quality bar (applies to every pull request)

- `pnpm verify` passes: zero type errors, zero lint warnings, all tests green, build succeeds.
- Mobile first: designed at 320 px, then enhanced at 600, 840, 1200 and 1600 px.
- Keyboard: every control reachable and visible on focus; nothing traps focus.
- No layout shift from fonts, icons or late content.
- No secrets in the repository.

## 7. Phases

**Part 1, frontend (release 0.1.0):** foundation, design system, SEO, every homepage section,
blog, placeholder pages, error page, security headers, end-to-end and accessibility tests.

**Part 2, backend (release 0.2.0):** PostgreSQL with Drizzle, stored email sign-ups, and
accounts with Better Auth.

## 8. Definition of done for the project

- Both releases tagged and published on GitHub with changelog entries.
- Every decision that is expensive to reverse has an ADR in `docs/adr/`.
- A fresh clone runs with `pnpm install` and `pnpm dev` and the README alone.
