# WordPress / Elementor implementation plan

## Content model

Register four public custom post types with archive and single templates: `stay` (`/stays/`), `experience` (`/experiences/`), `destination` (`/destinations/`), and `travel_article` (`/travel-guide/`). Use stable slugs, and native WordPress titles, excerpts, featured images, and body content where suitable. Migrate only approved content; sample properties are fictional.

| Model | ACF fields and taxonomies |
| --- | --- |
| Stay | Property type taxonomy; destination relationship; starting price (number), currency, unit, disclaimer, last verified date; gallery; amenities taxonomy; room repeater (name, beds, maximum adults/children, size, room photo); meal plan taxonomy; transfer text; check-in/out; cancellation and child policies; featured boolean. |
| Experience | Activity category taxonomy; destination relationships; price/currency/unit/disclaimer; duration; group size; difficulty; gallery; inclusion, exclusion, requirement, and itinerary repeaters; safety text; seasonal advice; featured boolean. |
| Destination | Island/atoll type, atoll taxonomy, travel interests taxonomy; overview; gallery; transfer advice; verified duration and verification date where available; highlights and travel tips repeaters. Query related stays/experiences from relationships to avoid inconsistent duplicated lists. |
| Article | Category taxonomy; featured image; excerpt; rich article body; reading time; destination relationships; related article relationships. |

Use an options page for brand name/logo, palette, verified WhatsApp number, email, social URLs, business story, footer details, global price disclaimer, and canonical site settings. Never put sensitive credentials in public ACF fields. Enforce required names/slugs/relationships and validate structured pricing before publication.

## Layout and components

| Prototype component | Elementor Pro implementation |
| --- | --- |
| Global tokens | Site Settings: colors, Manrope typography, spacing variables, container widths, radii. Small global CSS file for focus states and fine responsive adjustments. |
| Header, wordmark, mobile navigation | Theme Builder header; flex container with logo/text wordmark, WordPress menu, and inquiry button. Accessible mobile toggle with focus management. Absolute over heroes; solid navy on detail pages. |
| Footer | Theme Builder footer with four desktop columns, mobile wrap, dynamic contact/social links, and client-approved disclosure. Do not show broken empty links. |
| Hero | Full-width container with actual image widget/background, overlay, responsive heading and text, and CTA row. Desktop home hero approximately 92vh, mobile intentionally cropped. Optimize LCP image and avoid lazy loading it. |
| Quick discovery links | Four linked flex containers with icon, heading, description, and arrow; two columns on mobile. |
| Section heading / buttons | Saved container templates; global typography and button styles. Use real links with accessible names. |
| Stay / experience / destination / article cards | Separate Loop Item templates. Bind featured image, title, taxonomies, price fields, and permalink through Dynamic Tags. Keep indicative label and disclaimer visible. |
| Homepage curated sections | Loop Grids using featured flags or curated query IDs. Asymmetrical discovery tiles are simple containers with per-breakpoint widths and margins. |
| Cinematic island and final CTA | Wide image-backed containers with overlay and copy. Use no scroll-jacking or heavy carousel. |
| Filter bar and mobile drawer | FacetWP or a compatible JetSmartFilters configuration on Loop Grid queries. Cover type, destination, price, amenities, and meal plan. Apply AND across different facets; sorting by numeric price and title. Mobile drawer needs a real toggle, close control, and focus behavior. Show result count, clear filters, and empty state. |
| Image gallery | ACF gallery with Elementor gallery/lightbox or an accessible lightweight gallery widget. Provide captions, keyboard arrows, close/Escape, focus containment and return. |
| Amenities | Taxonomy or repeater displayed in icon/list containers, using consistent icons and text. |
| Room cards | ACF repeater renderer or room child post type with Loop Grid if repeaters are awkward. Display maximum occupancy, beds, optional child arrangements, and inquiry CTA; no rate availability engine. |
| Price panel | Single-stay sidebar container with dynamic price/currency/unit/disclaimer, desktop sticky positioning, mobile inquiry strip. No reservation button or payment integration. |
| Breadcrumbs | SEO plugin breadcrumb widget with semantic links. |
| FAQs | Accessible accordion or native details elements; real headings and keyboard behavior, no decorative inaccessible controls. |
| Related content | Loop Grids with relationship queries by destination; exclude current post. Ensure adding records updates all relevant templates. |
| Inquiry buttons | Small audited shortcode/helper generates `https://wa.me/` URLs from a validated options-page number and encoded post context. Blank number routes to the inquiry form. No hardcoded invented number. |
| Inquiry form | Elementor Pro Form with required name/email, optional planning fields, date-order validation, consent/privacy copy approved by client, honeypot and server-side abuse controls. Configure and test a secure destination before claiming submission succeeded. Never log inquiry details publicly. |
| Editorial articles | Theme Builder single template with constrained reading-width content, image captions, relevant destinations, related stories, and planning CTA. |
| Loading, empty, and 404 states | Native query loading states, designed no-results container, and Theme Builder 404 template with working discovery links. |

## Interaction and responsive behavior

Use CSS hover image scaling and button transitions; respect `prefers-reduced-motion`. Native details and modal dialogs can be replicated with modest JavaScript if widget accessibility is insufficient. No complex application state, WebGL, scroll hijacking, or booking API is needed.

Match five widths: 1440, 1280, 768, 390, and 360px. Validate heading wrapping, hero image focal points, drawer controls, mobile sticky CTA, form field sizing, tap targets, gallery navigation, and overflow. Use AVIF/WebP responsive images, self-hosted fonts, proper alt text, and lazy loading below the fold. Avoid copying the long mock-content disclaimers into a live site once real content is independently verified, but retain accurate rate and availability caveats.

## Before launch

Obtain approved identity, verified business contacts, property/experience facts, transfer schedules, price inclusions, policy terms, rights-cleared photography, and company copy. Set up privacy information, secure inquiry handling, delivery monitoring, data retention, and spam protection. Test actual WhatsApp messages, form delivery and failure handling, metadata, indexing, custom 404 HTTP status, accessible keyboard flows, mobile views, and performance. No payments or instant booking are in scope.
