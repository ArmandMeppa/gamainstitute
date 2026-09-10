# 2. Architecture Constraints

Constraints are things the architecture had to work within, not choices made for their own sake. Where a constraint directly caused a specific technology choice, the choice itself is covered in [4 — Solution Strategy](04-solution-strategy.md) and [9 — Architecture Decisions](09-architecture-decisions.md); this section is about the *why it had to be this way*.

## Organizational constraints

| Constraint | Effect on the architecture |
|---|---|
| Small or solo development team, no dedicated ops role | Ruled out anything requiring server administration, container orchestration, or a separately-operated backend. Every hosting choice runs on a managed platform (Cloudflare Pages, GitHub Pages) with no servers to patch. |
| Near-zero hosting budget goal | Both hosting environments (Cloudflare Pages, GitHub Pages) and the CI runner (GitHub Actions) run on their respective free tiers at current traffic scale. |
| Bilingual requirement (French default, English toggle) is non-negotiable | Every page's content model is namespace-split JSON per language, checked in pairs (see [8 — Cross-cutting Concepts](08-crosscutting-concepts.md)); there's no path to shipping a page in only one language. |
| Non-technical staff must be able to update routine content | Team photos, course text, and news items are editable via plain JSON files and Google Drive image links, deliberately avoiding a requirement to touch component code for routine updates — see [docs/guides/content-editing.md](../guides/content-editing.md). |

## Technical constraints

| Constraint | Effect on the architecture |
|---|---|
| Two hosting environments with different capabilities | GitHub Pages (staging) serves static files only — it cannot run Cloudflare Pages Functions. This means the contact form and newsletter signup backend genuinely does not work on the staging environment; only Cloudflare Pages (production) runs the full stack. See [7 — Deployment View](07-deployment-view.md). |
| No server-side rendering at request time | The chosen stack (`vite-react-ssg`) pre-renders every route to static HTML *at build time*, not per-request. Content changes require a rebuild and redeploy (a few minutes via GitHub Actions) — there's no live/dynamic personalization possible without changing this fundamentally. |
| `@cloudflare/workers-types` and browser DOM types cannot share one TypeScript config | Cloudflare Workers types redefine globals (`Response`, `Request`) in ways that conflict with DOM typings. This forced a split into two `tsconfig` files — one for `src/` (browser code), one for `functions/` (server code) — see [D-5 in DECISIONS.md](../../DECISIONS.md#d-5-split-tsconfig--separate-configs-for-src-and-functions). |
| Client-side-only language and theme state | Because there's no server session, language and theme preference live in `localStorage`, applied via an inline script that runs before React hydrates, to avoid a flash of the wrong language/theme on repeat visits — see [D-4 in DECISIONS.md](../../DECISIONS.md#d-4-anti-fouc-inline-script-in-indexhtml). |

## Conventions

Project-wide conventions that constrain how new code is written are documented once, authoritatively, in [CLAUDE.md](../../CLAUDE.md) — this document doesn't repeat them, only points at the ones with architectural weight:

- Pure Tailwind CSS utilities + CSS custom properties for styling — no component library (DaisyUI was tried and dropped, see [D-1](../../DECISIONS.md#d-1-drop-daisyui-use-pure-tailwind-v3--css-custom-properties)).
- All user-facing copy lives in per-namespace JSON translation files, never hardcoded in components (with one known exception — see [11 — Risks and Technical Debt](11-risks-and-technical-debt.md)).
- Animation timing is centralized in one constants object (`ANIM` in `src/constants/index.ts`), not ad-hoc per component.
