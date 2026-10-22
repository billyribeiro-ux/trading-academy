# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- PostgreSQL database with Drizzle ORM, a local Docker setup and versioned migrations.
- Email sign-ups from the hero and the free guide are saved. Signing up twice keeps one
  record and still shows a success message.
- Accounts: sign up, sign in and sign out with email and a password of at least 15
  characters, and an account page for signed-in members. Every form works without
  JavaScript.

### Removed

- Coming-soon placeholders for Sign in and Sign up, replaced by the real pages.

## [0.1.0] - 2026-10-19

### Added

- Design system: color, type, spacing, shape and motion tokens with automatic light and dark
  themes.
- Self-hosted Inter variable font.
- Search engine basics: unique titles and descriptions, canonical URLs, Open Graph tags,
  `robots.txt` and `sitemap.xml`.
- Structured data for the homepage (`Organization` and `WebSite`).
- Brand favicon, logo and default social sharing image.
- Site header with five dropdown menus, Pricing, Sign in and a call to action. On small
  screens the menu opens as a full-height sheet.
- Announcement bar promoting the next free live training.
- "Skip to main content" link for keyboard users.
- Coming-soon pages for menu links that are not built yet, hidden from search engines.
- Site footer with contact details, social and app links, three link columns, risk
  disclaimers and a back-to-top link.
- Homepage hero with a free daily email sign-up. The form validates on the server, works
  without JavaScript and shows clear error messages.
- Homepage "why join" section with four value points, and a services section with cards for
  trading rooms, classes, indicators and alerts.
- Featured indicators and featured courses sections.
- Founder story, trading team grid, member testimonials with a "results not typical" note,
  and an "As seen in" press strip.
- Memberships section with three plans and a monthly/yearly switch that works without
  JavaScript.
- Free PDF guide offer: sign up with an email address to unlock the download.
- Blog with an article list, article pages with breadcrumbs, `BlogPosting` and
  `BreadcrumbList` structured data, and a "latest articles" section on the homepage.
- Frequently asked questions that open and close without JavaScript, and a support section
  with phone and email contact.
- Friendly error and "page not found" pages, hidden from search engines.

### Security

- Content Security Policy that only allows scripts, styles, fonts and connections from the
  site itself.
- Security headers on every server-rendered response: `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy` and
  `X-Frame-Options`.

[Unreleased]: https://github.com/billyribeiro-ux/trading-academy/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/billyribeiro-ux/trading-academy/releases/tag/v0.1.0
