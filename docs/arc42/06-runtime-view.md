# 6. Runtime View

Key scenarios, chosen because each illustrates a different architectural mechanism worth understanding rather than being an exhaustive list of every user action.

## Scenario 1: Visitor submits the contact form

```mermaid
sequenceDiagram
    actor V as Visitor
    participant F as ContactForm (browser)
    participant T as Cloudflare Turnstile
    participant Fn as /api/contact (CF Function)
    participant TV as Turnstile siteverify
    participant R as Resend

    V->>F: Fills form, clicks Send
    F->>F: Validate fields client-side (Zod)
    F->>T: Render invisible widget, execute
    T-->>F: Solved token
    F->>Fn: POST { form fields, turnstileToken }
    Fn->>Fn: Re-validate body server-side (Zod)
    Fn->>TV: Verify token
    TV-->>Fn: success: true/false
    alt token invalid
        Fn-->>F: 403 turnstile_failed
        F-->>V: Show inline error, keep form filled in
    else token valid
        Fn->>R: Send email (from/to/replyTo, HTML body)
        R-->>Fn: ok
        Fn-->>F: 200 { ok: true }
        F-->>V: Replace form with confirmation card
    end
```

Client-side validation happens first purely for fast feedback — the server-side Zod check in the Function is what's actually trusted; a request that skipped the browser entirely (e.g. a script hitting the endpoint directly) still gets fully re-validated. See [8 — Cross-cutting Concepts](08-crosscutting-concepts.md) for why this matters.

## Scenario 2: Visitor subscribes to the newsletter

Structurally identical to Scenario 1 — same Turnstile-then-Resend pattern, same shared `functions/_lib/turnstile.ts` helper — except it calls `resend.contacts.create({ email })` instead of sending an email, and there's no visible error message on failure (see [docs/pages/README.md](../pages/README.md#newsletter) for that specific gap). This endpoint gained Turnstile protection on 2026-09-09; before that it had no bot protection at all — see [11 — Risks and Technical Debt](11-risks-and-technical-debt.md) for the history.

## Scenario 3: Visitor switches language

```mermaid
sequenceDiagram
    actor V as Visitor
    participant H as Header
    participant I as i18next (in-memory)
    participant LS as localStorage

    V->>H: Clicks "EN"
    H->>I: i18n.changeLanguage('en')
    I-->>H: All t() calls re-render in English
    H->>LS: setItem('gama-lang', 'en')
    Note over V,LS: Visitor closes tab, returns later
    V->>LS: Browser loads index.html
    Note over LS: Anti-FOUC inline script runs<br/>before React hydrates
    LS-->>V: <html lang="en" data-lang="en"><br/>set synchronously, no flash
```

No network request is involved anywhere in this scenario — every page's text for both languages is already in the downloaded JavaScript bundle (see the "all namespaces load eagerly" gotcha in [docs/pages/README.md](../pages/README.md)). The only reason a page reload doesn't flash the wrong language back is the inline script described in [D-4](../../DECISIONS.md#d-4-anti-fouc-inline-script-in-indexhtml).

## Scenario 4: Visitor navigates to a page for the first time

```mermaid
sequenceDiagram
    actor V as Visitor
    participant B as Browser
    participant R as React Router

    V->>B: Clicks a nav link (e.g. "About")
    B->>R: Client-side navigation (no full page reload)
    R->>B: Dynamically import AboutPage's JS chunk
    Note over B: Chunk wasn't downloaded yet —<br/>only fetched now, on demand
    B-->>V: Page renders once the chunk resolves
```

Because every page is registered with React Router's `lazy()` loader (not `React.lazy()` — see [docs/pages/README.md](../pages/README.md#how-every-page-is-put-together) for why that distinction matters for the static build), a first-time visit to any page only ever downloads that page's own code, plus the shared eager bundle (layout, i18n data, shared UI primitives). A **direct** first visit to `/about` (typed URL, or a search result) skips this entirely — the pre-rendered static HTML for that page is served immediately, and the JS chunk is only needed for any further client-side interaction on the page.
