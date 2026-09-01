# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning 2.0.0](https://semver.org/).

## [Unreleased]

### Changed

- Contact email updated to `contact@gamainstitute.ca` (displayed on the Contact page and used as the contact-form recipient)
- About page "Strategic pillars" cards now show a category icon (flask, school, rocket, people — Iconify `mdi` set, brand-colored) instead of a plain gradient bar
- Team page "Équipe de direction" and "Conseil consultatif" sections now list real people (Patrick Loic Foalem as Founder and Principal Research Scientist, Foutse Khomh as advisory board member) in place of the placeholder rosters; both sections currently show one member each pending further additions. Photos are now committed to `public/team/` per [D-13](DECISIONS.md), replacing the temporary hotlinks to their public academic/GitHub profiles
- `MemberCard` redesigned: larger circular centered photo (bio text removed to give it the room), role/title now shown above the name, and an optional LinkedIn badge pinned to the card's top-right corner when a member's `linkedin` URL is set
- Team page "Researchers" and "The people who move the work forward" (contributors) sections hidden pending real people to list — current entries were placeholder data
- WeekPaper release cadence moved from weekly to bi-weekly; page copy updated to say "every two weeks" / "toutes les deux semaines" (see [D-12](DECISIONS.md))
- Homepage "News & events" cards now show real content: the Research card links to Patrick Foalem's published paper on logging for responsible-ML auditing, and the Workshop card describes a session on how to read a research paper. Cards now show a brand-colored category icon over the gradient placeholder instead of a plain "image · category" label

### Added

- Team member photos: `team.json` (fr/en) carries a per-member `photo` URL field (Google Drive-hosted in production), rendered via the new `Avatar` component; falls back to a generated initials avatar on a solid accent background when no photo is set. Currently populated with `randomuser.me` stock placeholder headshots pending real photos
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

### Removed

- Homepage "Featured papers" cards (under the Research section) hidden pending a dedicated Research page, which will carry this content instead
- Homepage "Toutes les actualités" / "All news" link (News & events section) hidden — no news/archive page exists yet to point it to

### Fixed

- Several images and videos were blocked on the deployed site by the CSP, which was missing their host domains: YouTube video thumbnails and playback (Home "Notre vision" section, WeekPaper episodes) needed `img.youtube.com`/`i.ytimg.com` in `img-src` and `www.youtube.com` in `frame-src`; About page pillar icons needed `api.iconify.design`; Team page photos for Patrick Loic Foalem and Foutse Khomh needed `avatars.githubusercontent.com` and `swat.polymtl.ca` in `img-src`
- Homepage news/events cards, featured papers, metrics bar, and WeekPaper playlists could vanish (opacity stuck at 0) after switching language, since translated card titles were used as React keys, which forced Framer Motion's scroll-triggered reveal to remount cards after their one-time `viewport={{ once: true }}` animation had already fired. Cards are now keyed by array index instead
