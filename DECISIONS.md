# Decisions

Short-form rationale for non-obvious choices that don't warrant a full ADR. Numbered sequentially.

See [docs/adr/](docs/adr/) for decisions that are expensive to reverse and would otherwise be re-litigated.

---

## D-1. Drop DaisyUI; use pure Tailwind v3 + CSS custom properties

**Why:** DaisyUI's component overrides conflicted with the bespoke design token system (CSS vars for `--bg`, `--ink`, `--accent`, etc.) and required non-trivial specificity workarounds. Pure Tailwind utilities give direct control over every token value and dark mode behavior.

**Alternative considered:** Keep DaisyUI for form and button primitives — rejected because the token conflict surfaced immediately during the first component pass.

---

## D-2. Invisible Cloudflare Turnstile — no visible widget

**Why:** UX decision. Invisible mode obtains a bot-protection token silently when the user submits the form, with no checkbox or challenge interrupting the flow. The token is verified server-side in the CF Function.

---

## D-3. Contact form sends via Resend; newsletter endpoint remains a stub

**Why:** Email delivery was deferred in the initial deploy to keep the pipeline unblocked. The contact form (`POST /api/contact`) now calls `https://api.resend.com/emails` after Turnstile verification. Three Cloudflare Pages env vars are required: `RESEND_API_KEY`, `CONTACT_EMAIL_TO` (recipient — `agamainstitute07@gmail.com`), and `CONTACT_EMAIL_FROM` (verified Resend sender, e.g. `Gama Institute <noreply@gama.institute>`). The newsletter endpoint (`POST /api/newsletter`) still returns `{ ok: true }` without storing anything.

**Revisit when:** A newsletter CRM (Mailchimp, ConvertKit, etc.) is chosen.

---

## D-4. Anti-FOUC inline script in index.html

**Why:** React hydration happens after the browser paints. Without a synchronous script that reads `gama-theme` and `gama-lang` from `localStorage` before paint, users on return visits see a flash of the wrong theme or language. The inline script sets `data-theme` and `lang` on `<html>` during the synchronous HTML parse phase, before any stylesheet or React bundle loads.

---

## D-5. Split tsconfig — separate configs for src/ and functions/

**Why:** `@cloudflare/workers-types` redefines `Response`, `Request`, and other globals in ways that conflict with the DOM typings used by Vite/React. A single tsconfig that includes both causes irresolvable type errors. Solution: `tsconfig.json` covers `src/` with `"types": ["vite/client"]`; `tsconfig.functions.json` covers `functions/` with `"types": ["@cloudflare/workers-types"]`.

See [ADR 0002](docs/adr/0002-cloudflare-pages-functions.md).

---

## D-6. Production deploy on main branch

**Why:** Simplest possible branching model for a small team. `develop` → GitHub Pages staging preview; `main` → Cloudflare Pages production. No separate release branch needed.

---

## D-7. BrandMark uses the full 15-node network, not the simplified 7-node version

**Why:** The brand sheet shows the full knowledge-network graphic as the logo icon. The simplified 7-node version found in the design handoff HTML was a placeholder. The full network is shared from `src/data/network.ts` (`NETWORK_NODES`, `NETWORK_EDGES`) and rendered statically in `BrandMark` and animated in `NetworkArt`.

**Alternative considered:** Keep the simplified version for readability at small sizes — rejected after the brand sheet confirmed the full network is the intended mark.

---

## D-8. Perf test (`scripts/perf-test.mjs`) gates on bundle size first, timing second

**Why:** Wall-clock timing under CPU throttling in a shared/virtualized environment swings widely enough between back-to-back runs to flip pass/fail with no code change at all (observed ±40% on load time). A direct check of the main `app-*.js` chunk size is deterministic and is what actually caught the regression this test was built for — importing framer-motion in `routes.tsx` (the non-lazy root) pulled it out of the lazy per-page chunks and into the eager bundle, 340KB → 452KB, invisible to a human eyeballing the page. Timing (median of 3 runs, generous budgets) stays as a secondary signal for genuine main-thread cost, not the primary gate.

**Alternative considered:** Timing-only budgets — rejected as too noisy to trust in CI without averaging over many more runs than is practical per commit.

**Revisit when:** This runs in CI on dedicated (non-shared) runners, where timing variance would be low enough to tighten the timing budgets or promote them to a primary gate.
