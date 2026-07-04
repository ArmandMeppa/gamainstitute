# CLAUDE.md — Gama Institute website

_Last updated: 2026-07-03_

## Overview

Marketing and information website for Gama Institute, a bilingual (FR/EN) research and training institute at the intersection of software engineering and AI. Six pages: Home, About, Training, WeekPaper, Team, Contact. Statically generated (SSG), deployed to Cloudflare Pages with two serverless Functions handling the contact form and newsletter stub.

See [ARCHITECTURE.md](ARCHITECTURE.md) for the system map.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR (no CF Functions) |
| `npm run dev:cf` | Build then serve with Wrangler — tests CF Functions locally (use this to test the contact form); no HMR, rebuild to pick up changes |
| `npm run build` | SSG build — outputs to `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run type-check` | TypeScript check for `src/` **and** `functions/` |

## Pre-commit checks

Run before committing — no automated hook, do it manually:

```bash
npm run type-check   # must pass; covers tsconfig.json + tsconfig.functions.json
```

## Environment and secrets

| Variable | Where set | Required for |
|---|---|---|
| `VITE_TURNSTILE_SITE_KEY` | GitHub Actions secret + local `.env` | Contact form — build-time Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Cloudflare Pages dashboard | CF Function — server-side Turnstile verification |
| `CONTACT_EMAIL_TO` | Cloudflare Pages dashboard | CF Function — recipient address (`agamainstitute07@gmail.com`) |
| `CONTACT_EMAIL_FROM` | Cloudflare Pages dashboard | CF Function — verified Resend sender, e.g. `Gama Institute <noreply@gama.institute>` |
| `RESEND_API_KEY` | Cloudflare Pages dashboard | CF Function — Resend API key for email delivery |
| `CLOUDFLARE_API_TOKEN` | GitHub Actions secret | Production deploy via Wrangler |
| `CLOUDFLARE_ACCOUNT_ID` | GitHub Actions secret | Production deploy via Wrangler |

Create a `.env` file at the project root (gitignored) for local dev:

```
VITE_TURNSTILE_SITE_KEY=your_site_key_here
```

## Conventions

- **CSS:** Pure Tailwind v3 utilities + CSS custom properties (`--bg`, `--ink`, `--accent`, etc.). No DaisyUI. Token system lives in `src/styles/base.css`.
- **i18n:** All user-facing copy lives in `src/i18n/locales/{fr,en}/<namespace>.json`. Namespaces: `common`, `home`, `about`, `training`, `weekpaper`, `team`. Default language is French; English toggled client-side via `localStorage` (`gama-lang`).
- **Components:** UI primitives in `src/components/ui/`, layout in `src/components/layout/`, brand assets in `src/components/brand/`, page-specific in `src/components/<page>/`.
- **Animation constants:** Use `ANIM.*` from `src/constants/index.ts` — not ad-hoc numbers.
- **Brand gradient:** `GRAD_STOPS` in `src/constants/index.ts` — copper (#B56418) → teal (#165C71). Used by both `NetworkArt` and `BrandMark`.
- **No em dashes:** Use `,` for mid-sentence pauses, `|` for page-title separators (`Page | Gama Institute`).

## Gotchas

- **Two tsconfigs are intentional.** `tsconfig.json` covers `src/` with DOM types; `tsconfig.functions.json` covers `functions/` with `@cloudflare/workers-types`. Merging them causes `Response` type conflicts. See [D-5](DECISIONS.md).
- **Font `@import` must precede `@tailwind` directives** in `src/styles/base.css`. Reordering them breaks the Vite CSS pipeline.
- **Anti-FOUC inline script in `index.html` must not be removed.** It reads `gama-theme` and `gama-lang` from `localStorage` before React hydrates, preventing a flash of wrong theme/language on return visits. See [D-4](DECISIONS.md).
- **`react-helmet-async` must be in `ssr.noExternal`** in `vite.config.ts`. Without it the SSG build fails — the package loads as CJS in Node and its named exports are not found.
- **`NetworkArt` and `BrandMark` share node/edge data.** Source of truth is `src/data/network.ts`. Edit there, not in the components.
- **Newsletter is a stub** — `POST /api/newsletter` always returns `{ ok: true }` without storing anything. See [D-3](DECISIONS.md).
- **Contact form does not yet send email** — `POST /api/contact` verifies Turnstile and logs to CF worker logs, but `RESEND_API_KEY` is not yet wired. See [D-3](DECISIONS.md).

## Where things live

| What | Where |
|---|---|
| Pages | `src/pages/` |
| Layout (Header, Footer) | `src/components/layout/` |
| Reusable UI primitives | `src/components/ui/` |
| Brand assets (NetworkArt, BrandMark) | `src/components/brand/` |
| Design tokens and animation constants | `src/constants/index.ts` |
| Network graph data | `src/data/network.ts` |
| Course data | `src/data/courses.ts` |
| i18n locale files | `src/i18n/locales/{fr,en}/` |
| CSS (tokens, base, utilities) | `src/styles/base.css` |
| CF Functions | `functions/api/` |
| Shared Zod schema (contact) | `src/types/contact.ts` |
| CI workflows | `.github/workflows/` |
| Public assets (CSP headers, redirects) | `public/` |

## Documentation

- [README.md](README.md) — human-facing repo overview and quick start
- [ARCHITECTURE.md](ARCHITECTURE.md) — system map, component overview, deployment topology
- [CHANGELOG.md](CHANGELOG.md) — user- and contributor-facing changes; Keep a Changelog 1.1.0
- [DECISIONS.md](DECISIONS.md) — short-form rationale for non-obvious choices (D-1 through D-7)
- [docs/adr/](docs/adr/) — full ADRs for the three heaviest architectural choices
- [docs/sessions/](docs/sessions/) — session logs (write only when warranted; see rule below)

README is for humans; CLAUDE.md is for AI context — keep them distinct. Update CLAUDE.md and ARCHITECTURE.md when conventions or structure change; stale routing docs are worse than none. Add a guide to `docs/guides/` when answering the same "how to" question for the second time. Prefer generated reference where possible; mark hand-written reference with a "last verified" date.

## Keeping CHANGELOG.md current

Add an entry to `## [Unreleased]` in [CHANGELOG.md](CHANGELOG.md) when — and only when — the work would matter to a user or contributor reading the next release notes. **Default is no entry.**

Apply this in the same turn as the change; no need to be asked.

**Triggers** (necessary but not sufficient — apply the "would a reader thank me for this line?" test):

- New user-visible feature, page, or component → **Added**
- Behavior change a visitor would notice on upgrade → **Changed**
- Removed feature or page → **Removed**
- Bug fix the affected user would describe in their own words → **Fixed**
- Security-relevant change (vulnerability patched, CSP tightened, Turnstile logic changed) → **Security**
- Feature marked deprecated → **Deprecated**

**Don't add for:** refactors, renames, comment tweaks, internal wiring, documentation-only edits, dependency bumps with no observable effect.

When the project version moves, rename `## [Unreleased]` to `## [X.Y.Z] - YYYY-MM-DD` and open a fresh `## [Unreleased]` above it.

## Keeping ADRs current

Write an ADR when, and only when, a decision meets **all three**:

1. Closed off real alternatives — not just "we picked the obvious thing."
2. Expensive to reverse — a meaningful chunk of code is shaped around it.
3. Future contributors would otherwise re-litigate it.

When a decision meets the bar: flag it in one sentence and **wait for confirmation before writing the file.** Format and numbering: see [docs/adr/README.md](docs/adr/README.md). When an ADR is written, also add or update the matching entry in DECISIONS.md and cross-link the two.

## Keeping DECISIONS.md current

Add an entry to [DECISIONS.md](DECISIONS.md) when the choice is non-obvious *and* future contributors would want the rationale. **Default is no entry.** Apply in the same turn as the change.

**Triggers** (apply the "would a contributor six months from now ask why?" test):

- Picking a library, pattern, or tool over a named alternative a reader would assume
- Deviating from the SRS spec, an ADR, or a previously-recorded decision
- Choosing a workaround for an upstream limitation
- Locking in a convention that other code will follow

**Don't add for:** routine refactors, bug fixes, or choices obvious from the code.

One entry per choice. Format: `## D-N. <one-line decision>` + `**Why:**` + optional `**Alternative considered:**` / `**Revisit when:**`. If an entry becomes obsolete, update it with a note rather than deleting it.

Promote a ledger entry to a full ADR only when it starts getting re-litigated and meets the three-criteria bar.

## Keeping the session log current

Write `docs/sessions/YYYY-MM-DD.md` **only** when the session:

- Produced a decision another session might re-litigate (link to/from any ADR written)
- Left something deliberately deferred — note what, why, and the trigger for picking it back up
- Touched an unfamiliar subsystem in a way worth carrying forward
- Produced handoff context another contributor would need

Skip for routine work. Add a one-line entry to `docs/sessions/INDEX.md` (newest first) when you do write one.

## Do not document

Behavior that's clear from code + tests; transient debugging notes; personal preferences not adopted as conventions; anything that restates code structure rather than explaining intent.

---

_If this contradicts the code, the code wins — flag the doc as stale._

At the end of any session that changed conventions, dependencies, commands, structure, or load-bearing behavior, re-read CLAUDE.md + ARCHITECTURE.md and update them before ending the session.
