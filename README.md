# MALDIVES — your islands, your way

A responsive travel discovery prototype built with Next.js App Router, TypeScript, Tailwind CSS, Lucide icons, and self-hosted Manrope. This is an inquiry website: no booking, payments, inventory, or fabricated availability.

## Run on Linux

Use Node.js 24 LTS (minimum 20.9) and npm. From this directory:

```sh
npm install
cp .env.example .env.local
npm run dev
```

For repeatable installs use `npm ci` with the included lockfile. Visit the dev server on port 3000 in your local browser. Production:

```sh
npm run typecheck
npm run build
npm start
```

Webpack is selected explicitly because the cloud sandbox blocks Turbopack's internal worker-port binding. No verification or checks are disabled.

## Configure inquiries

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to the approved business number in international digits, without `+`, spaces, or punctuation. Restart development, or rebuild production after changing public variables. Contextual inquiry buttons encode the stay, room, experience, or destination in the WhatsApp message. With an unset or invalid number they route to the trip inquiry form and prefill the selected interest. No invented number is included.

Set `NEXT_PUBLIC_SITE_URL` to the public origin for correct Open Graph URLs. Email and social contacts are deliberately unconfigured until the client supplies them; there are no fake contact links.

The inquiry form validates required name/email, numeric ranges, and date order. Its success screen explicitly states that nothing was transmitted, saved, or emailed. It is not a backend and must be integrated with a secure service before launch. Use sample personal information while reviewing.

## Content and architecture

- `app/page.tsx`: editorial homepage.
- `app/[section]/page.tsx`: stays, experiences, destinations, guide, and about pages.
- `app/[section]/[slug]/page.tsx`: reusable stay, experience, destination, and article templates, generated from records.
- `app/plan-your-trip/page.tsx`: inquiry page.
- `components/ui.tsx`: shared server-rendered cards, hero, headings, price, FAQs, amenities, breadcrumbs, and benefits.
- `components/interactive.tsx`: navigation, WhatsApp links, gallery dialog, and client filters.
- `components/inquiry-form.tsx`: validated demonstration inquiry.
- `lib/data.ts`: typed mock records, relationships, photography references.
- `app/globals.css`: centralized tokens and intentional desktop, tablet, and mobile layouts.

There are 11 page types, with 6 sample stays, 8 experiences, 6 destinations, and 7 editorial articles. Adding a record makes it available to its listing and detail template. Destination relations use slugs, rather than copied page content. Prices are illustrative USD rates; fictional properties and unverified details are explicitly labeled.

Stay filters cover type, destination, price, amenities, and meal plan. Stays and experiences sort by name and price. Destinations filter by type and interest; articles filter by category. The homepage guesthouse link initializes its listing filter. All filtered collections provide a reset and an empty state.

## Photography and visual review

The photo IDs in `lib/data.ts` reference Unsplash development photographs. They are illustrative, not verified photographs of any named island or fictional property. No AI images, testimonials, employees, company history, awards, or partnerships have been fabricated. The written brief was supplied; approved image references and visual mockups were not attached.

**Cloud limitation:** the runtime currently blocks `images.unsplash.com`. A domain addition has been saved to the environment draft, but saving a draft does not apply it. Review and save environment settings, then publish the prepared environment. Recheck photograph delivery afterward. The custom Next.js image loader uses the photography provider’s responsive CDN directly, so images do not depend on server-side remote fetching. Your browser must be able to access that host. Approved local assets can replace remote URLs without introducing a server proxy. Preserve injected proxy and CA settings for cloud network tools; never disable TLS verification.

Before a client presentation, verify every source photo, its usage terms, and appropriate cropping, or replace the photo map with approved local assets. Cloud screenshots currently show layout with unavailable photos and must not be presented as final photography-complete designs.

## Browser QA

```sh
npx playwright install chromium
npm run test:e2e
```

To use a system Chromium already installed on Linux:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm run test:e2e
```

The suite checks every data-driven route, client errors, filtering/sorting, empty states, gallery controls, FAQ expansion, form date validation/demo outcome, mobile navigation/drawer, custom 404 content, and overflow at 1440, 1280, 768, 390, and 360px. Image availability is a separate check: route/interaction tests do not establish successful photo delivery. Browser screenshots are in `artifacts/`; see `docs/VALIDATION.md` for actual outcomes and limitations.

## WordPress handoff

See `docs/ELEMENTOR.md` for component mapping, custom post types, ACF field architecture, relationships, filters, inquiries, and launch prerequisites. The UI uses normal container/grid layouts and modest native interactions that can be reproduced in Elementor Pro.
