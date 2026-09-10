# Contact page

_Last verified: 2026-09-09_

- **Route:** `/contact`
- **File:** [src/pages/ContactPage.tsx](../../src/pages/ContactPage.tsx)
- **i18n namespace:** mostly **not i18n'd** — see [A structural difference from every other page](#a-structural-difference-from-every-other-page) below.
- **Shared components used:** see [README.md](README.md) for `SectionWrapper`, `FormField`, `useTurnstileToken` — only what's specific to Contact is covered below.

## A structural difference from every other page

Every other page on the site is fully driven by its own i18n namespace JSON. `ContactPage.tsx` isn't: its `<Helmet>` title/meta description are **hardcoded French strings, not translated per-language at all**, and its hero `<h1>`/lead paragraph are hardcoded French/English strings selected inline via a `lang` ternary rather than pulled from a `contact.json` namespace (there is no `contact.json` — this page only uses `common.json`, for the small "Contact" eyebrow label and a handful of shared strings). This is a real inconsistency with the rest of the site's content-editing pattern, not a stylistic choice worth copying elsewhere — if you're adding a new page, follow the pattern in [about.md](about.md) or [weekpaper.md](weekpaper.md) instead, not this one. If you're editing Contact's own copy, you're editing strings directly in `ContactPage.tsx`, not in a JSON file.

## Section-by-section (rendering order)

| # | Section | Component(s) | Data |
|---|---|---|---|
| 1 | Hero | inline JSX | hardcoded FR/EN strings + `common.json → nav.contact` |
| 2 | Form + info | `ContactForm` + inline info block | `?subject=` query param, `CONTACT_EMAIL.general` |

### 1. Hero

`SectionWrapper spacing="tight"`. Just the small eyebrow (`t('nav.contact')` from `common.json`) plus hardcoded `<h1>`/lead text branching on `lang` (`i18n.language?.startsWith('en') ? 'en' : 'fr'`, computed the same way `ContactForm` computes it internally — see below).

### 2. Form + info

Two-column grid (`1.4fr / 1fr`, stacks under 760px). Left: `<ContactForm defaultSubject={defaultSubject} />`. Right: a plain "Contact info" block with a `mailto:` link built from `CONTACT_EMAIL.general` ([src/constants/index.ts](../../src/constants/index.ts)) — also hardcoded FR/EN text, same pattern as the hero.

`defaultSubject` lets other parts of the site deep-link into this form with a subject pre-selected:

```
const [searchParams] = useSearchParams()
const parsed = ContactSubject.safeParse(searchParams.get('subject'))
const defaultSubject = parsed.success ? parsed.data : undefined
```

A link like `/contact?subject=weekpaper` arrives with "WeekPaper" pre-selected in the dropdown; an invalid or missing `subject` param just leaves the dropdown at its default. This is exactly how the Team page's "Join us" cards and About's "Join CTA" button pick a subject — see [team.md](team.md#6-join-us) and [about.md](about.md).

## The subject dropdown: three places kept in sync

There is no shared, generated source of truth between the client dropdown and the server — the options must be kept in sync by hand across three files. As of this writing, all three list exactly `research, supervision, university, industry, training, weekpaper, press, other`, same order, verified against each other directly:

1. **[src/types/contact.ts](../../src/types/contact.ts)** — the Zod enum, `ContactSubject`. This is what validates the `?subject=` query param above, and what the server-side schema (`contactSchema`) is built from.
2. **[src/components/forms/ContactForm.tsx](../../src/components/forms/ContactForm.tsx)** — the actual `<option>` list in the JSX, with FR/EN display labels.
3. **[functions/api/contact.ts](../../functions/api/contact.ts)** — `SUBJECT_LABEL`, a French display-label record used to build the outbound email's subject line and body.

**To add, remove, or rename a subject, edit all three in the same change**, and check whether anything deep-links to it via `?subject=` (Team's `JOIN_SUBJECTS`, About's Join CTA) that should be updated to point at the new value instead of falling back to `other`.

## `ContactForm` — the full submit flow

[src/components/forms/ContactForm.tsx](../../src/components/forms/ContactForm.tsx), props: `{ defaultSubject?: ContactSubject }`.

- **Validation:** `react-hook-form` + Zod, via `makeContactFormSchema(lang)` from `src/types/contact.ts` — note the schema itself is regenerated (`useMemo`) whenever `lang` changes, because it bakes localized error messages (`'Requis'` vs `'Required'`) directly into the schema rather than looking them up separately. A `useEffect` re-triggers validation (`trigger()`) whenever `lang` changes after a first submit attempt, so error messages switch language live instead of staying stuck in whatever language was active at submit time.
- **Bot protection:** identical pattern to `NewsletterForm` — `useTurnstileToken(turnstileRef)`, resolved before the network request, appended to the POST body as `turnstileToken`. See [README.md](README.md#newsletter) for how the hook works.
- **Submit:** `POST /api/contact` with `{ ...formData, turnstileToken }`.
- **States:** `idle | submitting | error | success`.
  - `success` **replaces the entire form** with a standalone confirmation card ("Message envoyé ✓" / "Message sent ✓").
  - `error` does **not** replace the form — it shows an inline red message just above the submit button while leaving every entered field intact, so the visitor can fix something and retry without re-typing. This is a deliberately different UX from `NewsletterForm`, which has no visible error message at all (see [README.md](README.md#newsletter)).

**`FormField`** ([src/components/forms/FormField.tsx](../../src/components/forms/FormField.tsx)) is what renders every field in this form, including the `subject` `<select>` — see [README.md](README.md#forms) for the component itself.

## Server side (`functions/api/contact.ts`)

Not this page's code, but worth knowing what happens after submit: the Cloudflare Pages Function re-validates the body against `contactSchema` (which additionally requires `turnstileToken`, unlike the client-only `makeContactFormSchema`), verifies the Turnstile token server-side via `verifyTurnstile` (shared with the newsletter endpoint, see [README.md](README.md#newsletter)), then sends the message via Resend — `from`/`to` from env vars, `replyTo` set to the visitor's own email, HTML body built with every field escaped (`esc()`) before interpolation. Requires four Cloudflare Pages env vars: `TURNSTILE_SECRET_KEY`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM`, `RESEND_API_KEY` — see the environment table in [CLAUDE.md](../../CLAUDE.md).

## How-to recipes

**Add/remove/rename a subject option:** edit all three files listed in [The subject dropdown](#the-subject-dropdown-three-places-kept-in-sync) above, in the same change.

**Deep-link into the form with a subject pre-selected:** link to `/contact?subject=<value>`, where `<value>` is one of the `ContactSubject` enum values. An invalid value is safely ignored (`safeParse`), not an error.

**Change the hero copy or contact info block:** these are hardcoded strings directly in `ContactPage.tsx`, not JSON — edit the file directly, remembering to update both the French and English branches of the `lang` ternary.
