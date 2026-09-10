# 10. Quality Requirements

arc42 recommends expressing quality goals as concrete scenarios — not "the site should be secure," but "when X happens, the system does Y." This section states each scenario, what actually happens today (verified against the running code, not assumed), and the evidence. Gaps identified here are cross-referenced to [11 — Risks and Technical Debt](11-risks-and-technical-debt.md) rather than repeated in full.

## Performance

| Scenario | Current state | Evidence |
|---|---|---|
| A visitor requests any page for the first time | Receives complete, pre-rendered HTML on the first response — not a blank page waiting for JavaScript | Static Site Generation via `vite-react-ssg`; confirmed by inspecting `dist/*.html` output, which contains full page content |
| A visitor navigates from one page to another | Only that page's own code downloads, not the whole site's | Per-route code splitting via React Router `lazy()`, verified in `src/routes.tsx` |
| The shared/eager JavaScript bundle grows unexpectedly (e.g. a library accidentally imported into the non-lazy root) | Caught automatically, not by a human noticing a slow page | `npm run test:perf` enforces a hard 400KB budget on the main bundle — but see the gap noted below |
| **Gap** | The performance test is **not run automatically in CI** — it exists as a manual `npm run` script only, per [CLAUDE.md](../../CLAUDE.md)'s command table | Neither `deploy-staging.yml` nor `deploy-production.yml` invokes it |

## Security

| Scenario | Current state | Evidence |
|---|---|---|
| A bot or script submits the contact form or newsletter signup without solving a real challenge | Rejected server-side (`403 turnstile_failed`) | Both endpoints verify a Cloudflare Turnstile token via `functions/_lib/turnstile.ts`, as of 2026-09-09 |
| A form submission contains malformed or oversized input, bypassing client-side validation | Rejected server-side regardless of what the client sent | Shared Zod schemas re-validate server-side in both Pages Functions |
| A submitted message is echoed into an outbound email | HTML-escaped before interpolation — no HTML/header injection into the email body | `esc()` in `functions/api/contact.ts` escapes every field before building the email |
| **Gap** | Every API response, including the two POST endpoints, carries a wildcard `Access-Control-Allow-Origin: *` — confirmed live in production, allowing any third-party site's script to call these endpoints cross-origin | Verified via `curl` against the production `/api/contact` endpoint headers |
| **Gap** | No confirmed rate limiting beyond Turnstile on either endpoint | No rate-limiting code found in `functions/`; no Cloudflare Rate Limiting configuration present in the repo (may or may not exist at the dashboard level — not verifiable from the codebase) |
| **Gap** | CSP allows `unsafe-inline` for scripts and styles, weakening defense-in-depth against any future injected-script vulnerability | `public/_headers` — required today by the anti-FOUC inline script; no current injection vector exists, but the mitigation-in-depth isn't there if one is introduced later |
| **Gap** | One runtime dependency (`react-router-dom`) has a known moderate-severity CVE (open redirect, SSR hydration constructor injection) with no fix released yet on its 6.x line | `npm audit`, run 2026-09-09 |

## Maintainability

| Scenario | Current state | Evidence |
|---|---|---|
| A new contributor needs to understand how a specific page works | Documented section-by-section, per page, including exact component/data sources and common "how to" recipes | [docs/pages/](../pages/README.md) |
| A non-technical staff member needs to update team info, course text, or news content | Achievable by editing JSON files (and, for photos, a Google Drive link) — no code change or developer involvement required | [docs/guides/content-editing.md](../guides/content-editing.md) |
| A developer makes a change and wants confidence it didn't break anything | **No automated test suite exists** — correctness relies on manual testing and `npm run type-check` | No test framework (Vitest/Jest/Playwright/Cypress) is present in `package.json`; see [11 — Risks and Technical Debt](11-risks-and-technical-debt.md) |
| A change with a type error is pushed to `main` | **Not blocked automatically** — `npm run type-check` is a manual pre-commit step only, not run in either CI workflow | Verified against both `.github/workflows/*.yml` |

## Availability

| Scenario | Current state | Evidence |
|---|---|---|
| Production traffic | Served from Cloudflare's global edge network (CDN, TLS, DDoS protection at the edge) | Cloudflare Pages hosting, [ADR 0002](../adr/0002-cloudflare-pages-functions.md) |
| The site or an endpoint goes down | **No automated detection exists** — the SRS proposed uptime monitoring (e.g. UptimeRobot or Cloudflare Health Checks); nothing of the kind was found configured | No monitoring configuration, dashboard integration, or related dependency found in the repo |
| A production JavaScript error occurs in a visitor's browser | **No visibility** — the SRS proposed Sentry error tracking; not implemented | No Sentry SDK or equivalent in `package.json`/`src/` |

## Usability / Accessibility

| Scenario | Current state | Evidence |
|---|---|---|
| A visitor has `prefers-reduced-motion` set | Animated components (`NetworkArt`, `Reveal`, `Modal`) render static equivalents instead | `useReducedMotion()` checks in each component |
| A keyboard-only visitor opens the newsletter modal | Focus is trapped inside the dialog, cycles correctly, and returns to the triggering element on close | `Modal.tsx` focus-trap implementation |
| A visitor toggles language mid-session | Every string on the current page updates immediately, no reload | `react-i18next` client-side language switch |
| **Gap** | The Contact page's hero copy and meta description are hardcoded strings, not translated via the same JSON mechanism every other page uses | [docs/pages/contact.md](../pages/contact.md#a-structural-difference-from-every-other-page) |

## Cost

| Scenario | Current state | Evidence |
|---|---|---|
| Monthly hosting cost at current traffic | $0 — both hosting environments and CI run on free tiers | Cloudflare Pages free tier, GitHub Pages, GitHub Actions free minutes for a public/small-team repo |
