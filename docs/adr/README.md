# Architectural Decision Records

This directory contains ADRs for the Gama Institute website.

## When to write an ADR

A decision warrants an ADR when it meets **all three**:

1. **Closed off real alternatives** — not just "we picked the obvious thing."
2. **Expensive to reverse** — a meaningful chunk of code is shaped around it.
3. **Future contributors would otherwise re-litigate it** — the rationale needs to outlive any one person's memory.

When a candidate decision surfaces in a session, flag it and **wait for confirmation before writing the file.**

## Format

ADRs follow [MADR 4.0](https://adr.github.io/madr/). File names: `NNNN-short-title.md` (zero-padded to 4 digits).

## Index

| ADR | Title | Status |
|---|---|---|
| [0001](0001-vite-react-ssg.md) | vite-react-ssg for static site generation | Accepted |
| [0002](0002-cloudflare-pages-functions.md) | Cloudflare Pages and Functions for hosting | Accepted |
| [0003](0003-client-side-i18n-single-url.md) | Single URL with client-side i18n toggle | Accepted |
