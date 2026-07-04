# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning 2.0.0](https://semver.org/).

## [Unreleased]

### Added

- Contact form now sends email via Resend (`POST /api/contact`) — requires `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, and `CONTACT_EMAIL_FROM` in Cloudflare Pages env vars
- OpenStreetMap embed on Contact page showing 359 Rue Briggs, Longueuil, QC J4J 1R8
- Favicon: SVG + PNG + Apple Touch Icon (`logo-icon.svg` / `logo-icon.png`)
- Full six-page website: Home, About, Training, WeekPaper, Team, Contact
- Bilingual support (French / English) with client-side language toggle via react-i18next; persisted in `localStorage`
- Dark mode with system-preference detection and manual toggle; persisted in `localStorage`
- Animated NetworkArt hero graphic — 15-node knowledge network with copper-to-teal gradient, Framer Motion entrance, reduced-motion fallback
- BrandMark SVG logo icon using the full 15-node network; Footer uses the STACKED brand variant
- Contact form with Cloudflare Turnstile invisible bot protection and Zod validation (`POST /api/contact`)
- Newsletter subscription stub endpoint (`POST /api/newsletter`)
- GitHub Actions workflows: staging (develop → GitHub Pages) and production (main → Cloudflare Pages)
- Keyboard-accessible skip-to-content link and reduced-motion support throughout
