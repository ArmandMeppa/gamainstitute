# Gama Institute website — arc42 architecture documentation

_Last verified: 2026-09-09 — describes the system as actually built and deployed today, not the original spec. Where the original Software Requirements Specification (SRS v2.2) called for something that was never built, that's flagged explicitly in [11 — Risks and Technical Debt](11-risks-and-technical-debt.md) rather than presented as if it exists._

This is a full [arc42](https://arc42.org/) architecture description, adapted for a small static marketing website. It's written for a mixed audience — institute leadership and non-technical staff on one side, developers and technical contributors on the other. Sections lean toward plain language where the audience is mixed (goals, context, quality, risks) and get more technical where the subject matter demands it (building blocks, runtime, deployment, cross-cutting concepts).

**If you're not a developer**, start with [01](01-introduction-and-goals.md), [03](03-system-scope-and-context.md), [10](10-quality-requirements.md), and [11](11-risks-and-technical-debt.md) — those explain what the site is, who it talks to, how well it's actually meeting its goals, and what's known to be incomplete or risky. [12 — Glossary](12-glossary.md) explains any term that trips you up along the way.

**If you're a developer working on the code day-to-day**, this document is the system-level picture — for the file-by-file "how do I change X" reference, see [docs/pages/](../pages/README.md) (one file per website page) and [ARCHITECTURE.md](../../ARCHITECTURE.md) (quick component map). This arc42 doc is where those fit into the bigger picture, and where the *why* behind non-obvious choices lives (or is linked to).

## Sections

| # | Section | What it answers |
|---|---|---|
| 1 | [Introduction and Goals](01-introduction-and-goals.md) | What is this system, who is it for, what does "good" look like? |
| 2 | [Architecture Constraints](02-architecture-constraints.md) | What couldn't be changed, and why? |
| 3 | [System Scope and Context](03-system-scope-and-context.md) | Who and what does the system talk to? |
| 4 | [Solution Strategy](04-solution-strategy.md) | The handful of decisions that shaped everything else |
| 5 | [Building Block View](05-building-block-view.md) | What are the pieces, and how do they fit together? |
| 6 | [Runtime View](06-runtime-view.md) | What actually happens, step by step, for key user actions? |
| 7 | [Deployment View](07-deployment-view.md) | Where does this run, and how does a change get there? |
| 8 | [Cross-cutting Concepts](08-crosscutting-concepts.md) | Ideas that show up everywhere — i18n, theming, security, accessibility, animation |
| 9 | [Architecture Decisions](09-architecture-decisions.md) | Index of the *why* behind non-obvious choices |
| 10 | [Quality Requirements](10-quality-requirements.md) | How well does the system actually meet its goals, with evidence |
| 11 | [Risks and Technical Debt](11-risks-and-technical-debt.md) | What's known to be incomplete, fragile, or deferred |
| 12 | [Glossary](12-glossary.md) | Terms used throughout this document |

## Sources

This document is built from the project's Software Requirements Specification (`Gama_Institute_Website_SRS_v2.pdf`, v2.2 — supplied by the institute, not checked into this repo) cross-checked line by line against the actual codebase (`/home/mdab/Work/dev/gama-institute` at the time of writing) — package.json, CI workflows, Cloudflare/CSP configuration, and the running code itself. Every claim about what's *implemented* was verified against the code, not assumed from the SRS. Where the two disagree, the code wins, and the SRS's un-built intent is recorded as a gap rather than silently dropped.
