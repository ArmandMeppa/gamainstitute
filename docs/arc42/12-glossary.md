# 12. Glossary

Terms used throughout this document, in plain language, for readers who aren't developers.

| Term | Meaning |
|---|---|
| **arc42** | A standard template for documenting software architecture, organized into 12 sections (this document follows it). Not specific to any technology. |
| **ADR** (Architecture Decision Record) | A short document recording *why* a significant, hard-to-reverse technical decision was made, and what alternatives were considered. See [docs/adr/](../adr/). |
| **SSG** (Static Site Generation) | Building every page of the site into a plain HTML file *in advance* (at build/deploy time), rather than generating it fresh on every visitor request. Makes pages load fast and lets search engines read the full content immediately. |
| **SPA** (Single-Page Application) | A website where navigating between pages happens in the browser via JavaScript, without a full page reload — used here *together with* SSG (SSG for the first load, SPA behavior for navigation afterward), not instead of it. |
| **SSR** (Server-Side Rendering) | Generating a page's HTML fresh on the server for every single request. This site does *not* do this — it uses SSG instead, since its content doesn't change per-visitor. |
| **CDN** (Content Delivery Network) | A network of servers around the world that cache and serve static files (HTML, images, JS) from a location physically close to the visitor, for speed. Cloudflare provides this automatically for this site. |
| **Serverless function** | A small piece of backend code that runs on-demand, without a permanently-running server to manage or pay for. This site's contact form and newsletter signup are handled by two of these ("Cloudflare Pages Functions"). |
| **CI** (Continuous Integration) | Automated steps (build, checks, deploy) that run automatically when code is pushed — here, via GitHub Actions. |
| **i18n** (internationalization) | The mechanism that lets the site show content in more than one language (French/English here). The "18" stands for the 18 letters between the "i" and the "n" in the word — an industry-standard abbreviation. |
| **FOUC** (Flash of Unstyled/Incorrect Content) | The brief, jarring moment a returning visitor might see the wrong theme or language before the page finishes loading correctly. This site specifically prevents it ("anti-FOUC") with a small script that runs before anything else. |
| **CSP** (Content Security Policy) | A browser security setting, delivered via an HTTP header, that restricts which external sources a page is allowed to load scripts, images, or embeds from — a defense against malicious injected content. |
| **CORS** (Cross-Origin Resource Sharing) | A browser rule controlling whether a script on one website is allowed to make requests to a different website's server and read the response. `Access-Origin-Allow-Origin: *` means "any website may." |
| **Bot / spam protection (Cloudflare Turnstile)** | An invisible check that runs when a visitor submits the contact form or newsletter signup, to confirm a real person (not an automated script) is submitting it — without showing an annoying "click the traffic lights" puzzle. |
| **Zod** | A code library used to define the *exact shape* a piece of data (like a form submission) must have, and reject anything that doesn't match — used both in the visitor's browser (for instant feedback) and again on the server (as the real security check). |
| **CVE** (Common Vulnerabilities and Exposures) | A publicly cataloged, known security flaw in a piece of software — used here when discussing a known issue in a third-party code library the site depends on. |
| **Bundle / chunk** | A packaged-up file of JavaScript code the browser downloads. "Code-splitting" means breaking the site's code into several smaller chunks (one per page) instead of one giant file, so a visitor only downloads what the page they're actually viewing needs. |
| **Repository (repo)** | The project's complete set of source code and history, hosted on GitHub. |
| **Env var / secret** | A configuration value (like an API key) kept outside the code itself, set separately per environment, so sensitive values are never committed to the repository. |
| **Domain registrar** | The company a domain name (like `gamainstitute.ca`) is purchased/rented through — here, Namecheap. Registering a domain is a separate thing from hosting a website on it; a registrar's job ends once it points the domain at whoever actually serves the DNS records (Cloudflare, in this case). |
| **DNS** (Domain Name System) | The internet's system for translating a human-readable domain name (`gamainstitute.ca`) into the technical address a browser actually connects to. "Nameservers" are what a registrar points a domain at to say who's in charge of answering these translation requests. |
| **DNS record** | One entry in a domain's DNS configuration — e.g. "this domain points at this server" or "this domain is allowed to send email through this provider." |
| **SPF / DKIM / DMARC** | Three DNS records, together, that let a mailbox provider (Gmail, Outlook, etc.) verify an incoming email genuinely came from an authorized sender for that domain, rather than being spoofed/spam. Required for the contact form's outbound emails to reliably land in an inbox instead of a spam folder. |
| **TLS / SSL certificate** | What makes a website load as `https://` with the padlock icon in the browser, encrypting traffic between the visitor and the server. Cloudflare issues and automatically renews this one at no cost, as part of hosting the domain's DNS. |
