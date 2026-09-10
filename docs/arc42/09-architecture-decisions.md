# 9. Architecture Decisions

The full rationale for every non-obvious choice in this project lives in two places, kept deliberately separate by weight:

- **[docs/adr/](../adr/)** — full Architecture Decision Records for the three choices that were expensive to reverse and closed off real alternatives: the overall framework choice, the hosting model, and the i18n URL strategy.
- **[DECISIONS.md](../../DECISIONS.md)** — a running ledger of shorter-form rationale for every other non-obvious choice, numbered sequentially (D-1 through D-13 as of this writing).

This section is an index into both, grouped by topic, so a reader doesn't have to open every file to find the one they need. It intentionally does not restate the rationale itself — that's what the links are for, and duplicating it here would just create a second copy to keep in sync.

## Full ADRs

| ADR | Decision |
|---|---|
| [0001](../adr/0001-vite-react-ssg.md) | `vite-react-ssg` for static site generation, instead of Next.js |
| [0002](../adr/0002-cloudflare-pages-functions.md) | Cloudflare Pages + Pages Functions for hosting, instead of Vercel/Netlify |
| [0003](../adr/0003-client-side-i18n-single-url.md) | Single URL structure with client-side i18n toggle, instead of `/fr/`/`/en/` path prefixes |

## Ledger entries (DECISIONS.md), by topic

| Topic | Entries |
|---|---|
| Styling | [D-1](../../DECISIONS.md#d-1-drop-daisyui-use-pure-tailwind-v3--css-custom-properties) (drop DaisyUI), [D-9](../../DECISIONS.md#d-9-tailwind-darkmode-set-to-selector-data-themedark) (dark mode wiring) |
| Bot protection / email | [D-2](../../DECISIONS.md#d-2-invisible-cloudflare-turnstile--no-visible-widget) (invisible Turnstile), [D-3](../../DECISIONS.md#d-3-contact-form-and-newsletter-both-use-resend--no-separate-crm) (Resend for contact + newsletter) |
| i18n / theme persistence | [D-4](../../DECISIONS.md#d-4-anti-fouc-inline-script-in-indexhtml) (anti-FOUC inline script) |
| TypeScript configuration | [D-5](../../DECISIONS.md#d-5-split-tsconfig--separate-configs-for-src-and-functions) (split tsconfig for `src/` vs `functions/`) |
| Branching / deployment | [D-6](../../DECISIONS.md#d-6-production-deploy-on-main-branch) (production deploys from `main`) |
| Brand assets | [D-7](../../DECISIONS.md#d-7-brandmark-uses-the-full-15-node-network-not-the-simplified-7-node-version) (BrandMark's network graphic — historical; BrandMark is now a static logo image, see [docs/pages/README.md](../pages/README.md#brand)) |
| Performance testing | [D-8](../../DECISIONS.md#d-8-perf-test-scriptsperf-testmjs-gates-on-bundle-size-first-timing-second) (bundle-size-first perf gate) |
| Content management (photos, logos) | [D-10](../../DECISIONS.md#d-10-team-member-photos-are-linked-via-url-google-drive-not-committed-to-the-repo) (Drive-hosted team photos), [D-13](../../DECISIONS.md#d-13-patrick-foalems-and-foutse-khomhs-photos-are-committed-locally-not-drive-hosted) (exception for two committed photos), [D-11](../../DECISIONS.md#d-11-academic-partner-logos-on-the-homepage-are-hotlinked-from-wikimedia-commons-and-partner-sites) (hotlinked partner logos) |
| Product naming | [D-12](../../DECISIONS.md#d-12-weekpaper-kept-its-name-after-moving-from-a-weekly-to-a-bi-weekly-release-cadence) (WeekPaper name vs. release cadence) |

## When to add a new one

Per the rule in [CLAUDE.md](../../CLAUDE.md): a full ADR is warranted only when a decision closed off real alternatives, is expensive to reverse, and would otherwise be re-litigated by a future contributor. Everything else that's non-obvious and worth a reason goes in `DECISIONS.md` instead. This document's index should be updated in the same change whenever either file gains a new entry with architectural weight.
