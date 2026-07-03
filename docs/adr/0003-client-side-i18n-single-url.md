# 0003 — Single URL with client-side i18n toggle

Date: 2026-07-03
Status: Accepted

_Reconstructed from project scaffold on 2026-07-03; not the original decision record._

## Context

The site serves French and English content. The SRS specifies a single domain without locale prefixes. Both languages need to work correctly after static pre-rendering with vite-react-ssg.

## Decision

Use a single set of URLs (e.g. `/about`, not `/fr/about` vs `/en/about`). Language is toggled client-side via react-i18next; the selection is stored in `localStorage` (`gama-lang`). An anti-FOUC inline script in `index.html` reads the stored language and sets `<html lang>` before React hydrates, preventing a flash of the wrong language on return visits.

## Alternatives considered

- **Separate locale URLs (`/fr/`, `/en/`)** — more SEO-friendly (`hreflang` tags, distinct canonical URLs per language); but doubles the number of pre-rendered routes, adds routing complexity, and was ruled out by the SRS requirement for a single URL structure.
- **Server-side language detection** — a CF Worker could inspect `Accept-Language` and redirect; not warranted when the SRS already mandates client-side toggle and the team is small.

## Consequences

- SSG pre-renders pages once; the HTML output contains French content by default (`lng: 'fr'` in i18next config).
- English content loads client-side after React hydrates and reads `localStorage`.
- `hreflang` alternate links are absent; accepted trade-off per the SRS.
- The anti-FOUC inline script in `index.html` must not be removed. See [DECISIONS.md D-4](../../DECISIONS.md).
