# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning 2.0.0](https://semver.org/).

## [Unreleased]

### Added

- Team member photos: `team.json` (fr/en) carries a per-member `photo` URL field (Google Drive-hosted in production), rendered via the new `Avatar` component; falls back to a generated initials avatar on a solid accent background when no photo is set. Currently populated with `randomuser.me` stock placeholder headshots pending real photos
- Homepage "Partenaires & collaborations" now shows real academic partner logos (IVADO, Mila, Polytechnique Montréal, Université de Montréal, McGill, HEC Montréal) instead of monogram placeholders; the Industrie and Institutionnel & gouvernement categories were removed pending real partners to list there
- Contact form now sends email via Resend (`POST /api/contact`) — requires `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, and `CONTACT_EMAIL_FROM` in Cloudflare Pages env vars
- Favicon: SVG + PNG + Apple Touch Icon (`logo-icon.svg` / `logo-icon.png`)
- Five-page website: Home, About, WeekPaper, Team, Contact (Training page is built but held back for a later release)
- Bilingual support (French / English) with client-side language toggle via react-i18next; persisted in `localStorage`
- Dark mode with system-preference detection and manual toggle; persisted in `localStorage`
- Animated NetworkArt hero graphic — 15-node knowledge network with copper-to-teal gradient, Framer Motion entrance, reduced-motion fallback
- BrandMark SVG logo icon using the full 15-node network; Footer uses the STACKED brand variant
- Contact form with Cloudflare Turnstile invisible bot protection and Zod validation (`POST /api/contact`)
- Newsletter subscription stub endpoint (`POST /api/newsletter`)
- GitHub Actions workflows: staging (develop → GitHub Pages) and production (main → Cloudflare Pages)
- Keyboard-accessible skip-to-content link and reduced-motion support throughout

### Fixed

- Homepage news/events cards, featured papers, metrics bar, and WeekPaper playlists could vanish (opacity stuck at 0) after switching language, since translated card titles were used as React keys, which forced Framer Motion's scroll-triggered reveal to remount cards after their one-time `viewport={{ once: true }}` animation had already fired. Cards are now keyed by array index instead
