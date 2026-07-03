# 0002 — Cloudflare Pages and Functions for hosting

Date: 2026-07-03
Status: Accepted

_Reconstructed from project scaffold on 2026-07-03; not the original decision record._

## Context

The site needs a CDN-backed host for static assets and two serverless endpoints (`/api/contact`, `/api/newsletter`). The team already uses Cloudflare for DNS.

## Decision

Host on Cloudflare Pages. Serverless logic lives in Cloudflare Pages Functions (`functions/api/*.ts`), which run on the CF Workers runtime and are co-deployed with the static site via `wrangler pages deploy`.

## Alternatives considered

- **Vercel** — excellent DX; not chosen because the project is already on Cloudflare DNS and Cloudflare Pages bundles serverless functions at no additional cost without a separate provider account.
- **Netlify** — similar trade-off; Netlify Functions run on Lambda (Node runtime) rather than CF Workers, which would mean a different type system and slightly different deployment model.
- **GitHub Pages only** — no serverless support; the contact form and newsletter would require a third-party service or client-only workaround.

## Consequences

- Two tsconfigs are required: `tsconfig.json` (src, DOM + `vite/client` types) and `tsconfig.functions.json` (functions, `@cloudflare/workers-types`). See [DECISIONS.md D-5](../../DECISIONS.md).
- `wrangler.toml` sets the project name (`gama-institute`) and build output directory (`dist`).
- Staging preview uses GitHub Pages (static files only; CF Functions are not available there).
- Runtime secrets (`TURNSTILE_SECRET_KEY`, `CONTACT_EMAIL_TO`, `RESEND_API_KEY`) are set in the Cloudflare Pages dashboard, not in source code.
