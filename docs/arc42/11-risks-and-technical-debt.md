# 11. Risks and Technical Debt

Everything here was verified against the running code as of 2026-09-09, not assumed from the original SRS. Items are grouped by category; each has an impact statement and a suggested mitigation, so this doubles as a punch list rather than just a list of complaints.

## SRS-specified capabilities that were never built

The original SRS (v2.2) specified several things that the actual codebase does not have. None of these block the site from working today — they're gaps in visibility, resilience, or process, not in core functionality.

| Item | SRS said | Actually found | Impact |
|---|---|---|---|
| Error tracking | Sentry (free tier), front-end and Pages Functions | No Sentry SDK or equivalent anywhere in the codebase | A JavaScript error in a visitor's browser, or an unhandled exception in a Pages Function, produces **no signal to anyone** — the team only learns about it if a visitor reports it directly |
| Traffic analytics | Cloudflare Web Analytics | Not found configured (no script tag, no dashboard reference in the repo) | No visibility into traffic, popular pages, or conversion (contact form / newsletter submission rates) beyond raw Cloudflare request logs |
| Rate limiting | "Cloudflare Rate Limiting rules, and inside Pages Functions for the contact endpoint" | No rate-limiting code in `functions/`; no Cloudflare Rate Limiting configuration present in the repo | Turnstile is the only current defense against automated abuse of the contact/newsletter endpoints — see [10 — Quality Requirements](10-quality-requirements.md) |
| Structured, shippable logging | A Workers-compatible logger, shipping to Cloudflare Logpush, replacing Node's Pino | Plain `console.error` calls only, in `functions/api/contact.ts` and `functions/api/newsletter.ts` | Debugging a production Function failure means whatever Cloudflare's default console-log retention gives you, not queryable structured logs |
| Uptime monitoring | A free-tier checker (UptimeRobot) or Cloudflare Health Checks | Not found configured | The team would learn about an outage from a visitor or partner, not automatically |
| Automatic per-PR preview deployments | Cloudflare Pages preview URL, full stack including Functions, on every PR targeting `main` | Only two push-triggered workflows exist (`develop` → GitHub Pages, `main` → Cloudflare Pages); no PR-triggered workflow | A pull request's backend changes (contact form, newsletter) cannot be exercised end-to-end before merge — only after |
| CI-enforced type-checking / tests | Implied by "lint/type-check/tests → build" in the SRS's deployment strategy | Neither `deploy-staging.yml` nor `deploy-production.yml` runs `npm run type-check`, and no test suite exists to run | A type error, or any regression a test would have caught, can reach production without CI catching it — see below |

**Note on DaisyUI:** the SRS specified DaisyUI as a UI component library; this one was a deliberate, documented reversal (not an oversight) — see [D-1](../../DECISIONS.md#d-1-drop-daisyui-use-pure-tailwind-v3--css-custom-properties). Listed here only for completeness against the SRS diff, not as a gap.

## Testing and CI

| Item | Impact | Suggested mitigation |
|---|---|---|
| No automated test suite of any kind — no unit tests, no component tests, no end-to-end tests | Every change relies on manual testing and `npm run type-check` for confidence. A regression in, say, the contact form's validation logic would only surface through a real failed submission | Introduce a minimal test layer scoped to the highest-risk logic first — the shared Zod schemas and the two Pages Functions — before attempting broad UI test coverage |
| `npm run type-check` is not run in CI | A type error can be pushed straight to `main` and deployed to production if a developer forgets the manual step | Add a `type-check` step to both GitHub Actions workflows, before the build step |
| `npm run test:perf` (the bundle-size regression gate) is not run in CI | The one regression this script is proven to catch (see [D-8](../../DECISIONS.md#d-8-perf-test-scriptsperf-testmjs-gates-on-bundle-size-first-timing-second)) can silently reoccur | Wire it into the production workflow, or at minimum the staging one, as a required check |

## Security

Covered in detail with evidence in [10 — Quality Requirements](10-quality-requirements.md); summarized here as actionable items:

| Item | Impact | Suggested mitigation |
|---|---|---|
| Wildcard CORS (`Access-Control-Allow-Origin: *`) on `/api/*` | Any third-party page's script can call the contact/newsletter endpoints cross-origin | Confirm whether this is a Cloudflare Pages platform default or explicit configuration; if avoidable, restrict to the production origin |
| No confirmed rate limiting | Turnstile is the sole automated-abuse defense | Add a Cloudflare Rate Limiting rule, or lightweight in-Function throttling, for both endpoints |
| CSP allows `unsafe-inline` for scripts/styles | No defense-in-depth against a future injected-script bug | Migrate the anti-FOUC inline script to a nonce- or hash-based CSP exception, freeing `script-src` to drop `unsafe-inline` |
| `react-router-dom` has an unpatched moderate CVE on its 6.x line | Open redirect / SSR hydration constructor injection; fix requires a major-version bump (to v7) that isn't currently compatible with the project's pinned Vite 5 / `vite-react-ssg` | Monitor for a 6.x backport, or plan the v7 + Vite 6/7/8 migration as a deliberate piece of work |

## Content and scaffolding debt

Several pages ship intentionally incomplete sections — this is documented, deliberate deferral (each has a `TODO` comment explaining the blocker), not accidental, but it's still visible technical/content debt worth a stakeholder knowing about:

| Item | Where | Blocked on |
|---|---|---|
| Training page built but not routed — not reachable by any visitor | [docs/pages/training.md](../pages/training.md) | Business decision to hold the page back for a later release |
| Team page: Researchers, Contributors, and Advisory board sections hidden | [docs/pages/team.md](../pages/team.md) | Real people to list — Researchers/Contributors currently hold placeholder stock-photo data that must not ship as-is |
| Home page: Partners and Featured Papers sections hidden | [docs/pages/home.md](../pages/home.md) | Confirmed partnerships; a dedicated Research page |
| About page: History timeline has translated copy but no component to render it | [docs/pages/about.md](../pages/about.md) | Someone needs to write the section — the JSX was deleted, not just hidden |
| WeekPaper: episodes grid built but hidden | [docs/pages/weekpaper.md](../pages/weekpaper.md) | Real episode data — currently placeholder |
| Several dead `#` links (Training's "Enroll" buttons and "Full catalogue" link, WeekPaper's episode/featured-hero CTA) | [docs/pages/training.md](../pages/training.md), [docs/pages/weekpaper.md](../pages/weekpaper.md) | Destination pages/routes that don't exist yet |
| Home's "Research area" rows all link to the YouTube channel as a placeholder, not a real per-area destination | [docs/pages/home.md](../pages/home.md) | A dedicated Research page |

## i18n / consistency debt

| Item | Impact | Suggested mitigation |
|---|---|---|
| Contact page's hero and meta description are hardcoded strings, not driven by a `contact.json` namespace like every other page | Breaks the "all copy is in JSON" convention documented in [CLAUDE.md](../../CLAUDE.md) and [docs/guides/content-editing.md](../guides/content-editing.md) — a content editor looking for this text in JSON won't find it | Introduce `contact.json` (fr/en) and migrate the hardcoded strings, matching every other page's pattern |
| `CourseCard`'s placeholder-image fallback text is hardcoded French regardless of active language | Minor but real bilingual-correctness gap | Move the fallback text into the `training` namespace |
| No shared source of truth ties `ContactSubject` (client + server enum), the dropdown's JSX options, and the server's `SUBJECT_LABEL` record together | Adding/renaming a subject requires editing three files by hand, with no compiler error if one is missed | See [docs/pages/contact.md](../pages/contact.md#the-subject-dropdown-three-places-kept-in-sync) for the exact three spots; consider generating the option list from the enum |

## Not a risk, but worth remembering

`BrandMark` no longer draws an inline SVG network graphic — it's a static logo image. This is called out here only because the original codebase gotcha (still corrected in [CLAUDE.md](../../CLAUDE.md)) claimed otherwise; a reader who last looked at this months ago may still be working from the old mental model.
