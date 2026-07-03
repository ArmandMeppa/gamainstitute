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

## D-3. Newsletter endpoint is a stub; contact form logs but does not send email

**Why:** Email delivery (Resend / SendGrid) was deferred to keep the initial deploy unblocked. Both endpoints validate input and return `{ ok: true }` without sending or storing anything.

**TODO:** Wire up `RESEND_API_KEY` in `functions/api/contact.ts` and replace the `console.log` with an actual Resend/SendGrid call. Add a real storage or CRM integration in `functions/api/newsletter.ts`.

**Revisit when:** First live visitor contact form submission is expected.

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
