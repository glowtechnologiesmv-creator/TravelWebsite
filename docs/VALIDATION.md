# Validation — 31 October 2026

## Verified capabilities

- Dependencies installed with TLS and package-integrity verification enabled; lockfile included.
- Stable runtime packages resolved to Next.js 16.4.3, React/React DOM 19.3.1, Tailwind 4.3.3, Lucide 1.66.0, TypeScript 7.0.2. Node 24 type definitions intentionally match the installed runtime.
- TypeScript checks and webpack production builds passed, including static generation for all 27 detail records.
- Production server started successfully and served all 34 content URLs.
- 12 Playwright checks passed: all content routes and client exceptions; stays filtering/sorting/empty state/deep link; other listing filters; gallery arrows/Escape and FAQ expansion; form validation and honest demo success; mobile navigation/filter drawer; each of five viewport sizes; custom 404 content.
- Five viewport checks covered all 11 page types at 1440, 1280, 768, 390, and 360px, without horizontal overflow.
- 22 individual full-page PNGs captured at 1440px desktop and 390px mobile. They are in `artifacts/layout-only`, with machine-readable image counts in `capture-report.json`.

A separate HTTP check found streaming returned status 200 for an unknown top-level section even though the custom 404 content displayed. The global loading boundary was moved to the detail-template route so top-level `notFound()` can return a true 404. The browser check now asserts HTTP 404 for both unknown sections and unknown stays; both route rendering and the strengthened HTTP 404 checks passed again after this correction (2 tests).

## External blocker: photography

No reference photos loaded in cloud Chromium: the current environment policy denies `images.unsplash.com` (observed proxy CONNECT 403). This is separate from successful route, layout, and interaction checks. The responsive image loader uses the provider’s CDN directly with width/quality parameters, without server-side image fetching. It preserves `next/image` sizing and lazy loading. Photography will still require the visitor/browser network to permit this host, or approved local assets.

A domain addition to `images.unsplash.com`, installation script, and service startup instructions were saved in the cloud configuration draft. This does not apply or publish the draft. Review and save environment settings, then publish the prepared environment. Re-run actual image checks and capture new screenshots after access is active.

The screenshot filenames deliberately identify layout-only review. They are not photography-complete client presentation material. Visual inspection confirmed the designed hierarchy and mobile structure, but image content, focal points, contrast over real photographs, and compliance with approved references remain unverified.

## Troubleshooting completed

The initial sandbox rejected package-registry socket access. Installation succeeded through approved execution permissions. Turbopack's internal process/port binding failed; the supported webpack option builds successfully. No checks, TLS verification, or assertions were disabled.

Read-only Git access also succeeded; the remote has no `main` branch reference yet. The implementation remains as reviewable local files and has not been committed or pushed.

An early test run was interrupted by development-server reloads during formatting. A later form assertion matched Next.js’s route-announcer alert as well as the form error; it was scoped to the main content. The original aggregate 55-navigation viewport check exceeded its timeout; it was split into five independent viewport cases, retaining every route and assertion. Production-server runs avoid development reload interruptions.

## Before a client presentation / launch

- Apply the saved photo-domain setting or provide approved local photographs, then verify delivery and desktop/mobile cropping.
- Supply approved visual references and actual property/destination photographs; current named stays are fictional and all rates are illustrative.
- Configure the real WhatsApp number; without it, buttons deliberately use the trip inquiry form. External WhatsApp delivery was not tested with a real business number.
- Supply approved company, email, and social information. None has been invented.
- Connect and test a secure form backend before accepting real inquiries. The current demo does not send, store, or email data.
- Recheck image-heavy performance, final contrast/cropping, and client visual approval once real assets are available.
