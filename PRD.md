### Product Requirements Document (PRD) — Padel Ready Shopify Theme

**Project:** Padel Ready — Cinematic Minimalist E-Commerce Theme
**Goal:** Create a Shopify Online Store 2.0 theme directly from Cursor with no API dependencies.
**Launch Date:** Today
**Source:** Lovable project `padel-cinematic-muse` (GitHub-synced)

---

## 1. Objective

Deliver a fully responsive, cinematic Shopify theme for Padel Ready using static data and local assets. The theme must mirror the Lovable preview exactly, with premium visual tone, accessible code, and Shopify export compatibility.

---

## 2. Core Pages

1. **Home Page** (`index.json`)

   * Hero section with cinematic background and tagline.
   * Product grid (Best Sellers) with clickable cards.
   * Brand story CTA section.
   * Footer with Padel Ready logo and minimal nav.

2. **Product Detail Page** (`product.json`)

   * Cinematic hero with product imagery.
   * Key specs and materials grid.
   * Story and design philosophy section.
   * Related products grid.

3. **Events Page** (`events.json`)

   * Elegant toggle (Upcoming/Past).
   * Event cards styled consistently with product cards.

4. **About Us Page** (`about.json`)

   * Somerset heritage and Babington House collaboration.
   * Tagline: *By Creatives, For Creatives.*
   * SEO-rich content structure.
   * Imagery with consistent cinematic tone.

5. **Technology Page** (optional future section)

   * Material design, craftsmanship, and innovation story.

---

## 3. Design System

**Typography:**

* Mollen ExtraBold — Headings.
* SA Triumph Regular — Body.
* Inter Medium — Captions.

**Colors:**

* Champagne Gold: `#D6C2A8`
* Black: `#000000`
* Off-White: `#FEFAF3`
* Red Accent: `#E3271C`

**Shadows:**

* `shadow-subtle`: 0 2px 6px rgba(0, 0, 0, 0.05)
* `shadow-elegant`: 0 6px 20px rgba(0, 0, 0, 0.12)

**Animations:**

* Fade-in and hover-lift.
* Parallax hero image motion.
* Transition timing: 450ms cubic-bezier(0.4, 0, 0.2, 1).

**Spacing rhythm:**

* Section padding: `py-24 lg:py-32`
* Grid gap: `gap-8 lg:gap-12`

---

## 4. Technical Stack

* **Framework:** React 18.3 (Vite build)
* **Styling:** TailwindCSS + custom tokens
* **Component Library:** shadcn/ui
* **Icons:** lucide-react
* **Routing:** React Router DOM
* **Static Data:** `/src/data/`
* **Build Export:** Custom script → `/shopify-theme/`

---

## 5. File Structure

```
root/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── hero/
│   │   │   ├── products/
│   │   │   └── backgrounds/
│   │   ├── icons/
│   │   └── fonts/
│   ├── components/
│   ├── pages/
│   ├── data/
│   │   ├── products.ts
│   │   ├── site.ts
│   │   ├── about.ts
│   │   └── meta.ts
│   ├── index.css
│   └── main.tsx
└── shopify-theme/
    ├── assets/
    ├── config/
    ├── layout/
    ├── sections/
    ├── templates/
    └── snippets/
```

---

## 6. Asset Migration Plan

All assets in Lovable GitHub must sync into Cursor repo before build.

**Source → Destination mapping:**

```
src/assets/**/* → shopify-theme/assets/**/*
```

All fonts, icons, and images must be **local**, **optimized**, and **webp/avif**.

Font import example:

```css
@font-face {
  font-family: 'Mollen';
  src: url('/assets/fonts/Mollen-ExtraBold.woff2') format('woff2');
  font-display: swap;
}
```

---

## 7. Data Layer

All content and products are static, stored in `src/data/`.

**products.ts**

```ts
export const products = [
  {
    id: 'rdy-pro-carbon',
    name: 'RDY Pro Carbon',
    price: 299,
    image: '/assets/images/products/rdy-pro-carbon.webp',
    description: 'Precision-engineered carbon frame, matte finish, designed in Somerset.',
    specs: ['Weight: 365g', 'Balance: Medium', 'Material: 3K Carbon'],
    tags: ['Limited', 'Signature']
  }
];
```

---

## 8. SEO and Metadata

Each page imports data from `meta.ts`:

```ts
export const meta = {
  siteTitle: 'Padel Ready | Premium Padel Equipment',
  description: 'Designed in Somerset and refined at Babington House. Minimalist padel equipment crafted for creatives.',
  keywords: ['padel rackets', 'Somerset design', 'Babington House', 'luxury sports'],
  author: 'Padel Ready Studio'
};
```

React `<Helmet>` data maps to Liquid `{% seo %}` at export.

---

## 9. Build Configuration

Add to `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "build:shopify": "vite build && node scripts/export-to-shopify.js"
}
```

**export-to-shopify.js:**

```js
import fs from 'fs-extra';
fs.copySync('dist', 'shopify-theme');
fs.copySync('src/assets', 'shopify-theme/assets');
```

---

## 10. Exported Shopify Structure

```
/shopify-theme/
├── assets/
│   ├── hero.webp
│   ├── product.webp
│   ├── theme.css
│   └── fonts/
├── config/settings_schema.json
├── layout/theme.liquid
├── sections/
│   ├── pr-hero.liquid
│   ├── pr-product-grid.liquid
│   ├── pr-about.liquid
│   ├── pr-footer.liquid
│   └── pr-events.liquid
└── templates/
    ├── index.json
    ├── product.json
    ├── about.json
    └── events.json
```

---

## 11. Launch Process

1. Sync GitHub → Cursor.
2. Run `npm run build:shopify`.
3. Zip `/shopify-theme/`.
4. Upload to Shopify → Online Store → Themes → Upload → Publish.
5. Validate layout parity with Lovable preview.

---

## 12. QA Checklist

* [ ] All local assets load correctly.
* [ ] Product links route to static product detail pages.
* [ ] Responsive grid and hero spacing verified.
* [ ] All metadata tags output correctly.
* [ ] Lighthouse score ≥ 95.
* [ ] Font weights render consistently.
* [ ] No remote asset dependencies.

---

## 13. Post-Launch Enhancements (Optional)

* Product filtering (client-side only).
* Theme settings for color accents and typography.
* Add newsletter signup (Mailchimp embed).
* Integrate animations.json for Lottie hero.

---

**This PRD ensures that Cursor can produce a static, exportable Shopify theme mirroring the Lovable build, complete with metadata, accessibility, and Babington House branding.**

---

**Section: 3.1 Global Navigation System (Dynamic Contrast Adaptation)**

**Purpose**
Ensure the navigation bar remains visually legible and luxurious across all cinematic sections, adapting to dark and light backgrounds in real time.

**Core Behaviors**

* Header automatically detects background brightness using intersection logic.
* On dark sections (hero, collaborations, footer): text and icons switch to **champagne gold (#D6C2A8)**.
* On light sections (product grids, off-white pages): text and icons use **black (#000000)**.
* Transitions fade smoothly in **0.3 seconds** with easing `(cubic-bezier(0.4, 0, 0.2, 1))`.
* Full mobile and desktop responsiveness.
* WCAG AA contrast compliance for all color modes.

**Color States**

| Context          | Text/Icon Color | Hover           | Active           | Transition |
| ---------------- | --------------- | --------------- | ---------------- | ---------- |
| Light background | `#000000`       | `#D6C2A8`       | `#000000` (bold) | 0.3s fade  |
| Dark background  | `#D6C2A8`       | `#FFFFFF (90%)` | `#D6C2A8` (bold) | 0.3s fade  |

**Implementation Notes**

* Use scroll-based observer or Intersection API to toggle classes `nav-light` and `nav-dark`.
* Apply semantic utility tokens in Tailwind or CSS:

  ```
  .nav-light { color: #000; transition: all 0.3s ease-in-out; }
  .nav-light:hover { color: #D6C2A8; }
  .nav-dark { color: #D6C2A8; transition: all 0.3s ease-in-out; }
  .nav-dark:hover { color: rgba(255,255,255,0.9); }
  ```
* Icons and hamburger menu sync with the current theme.
* Scroll detection throttled for performance (60 fps target).
* No layout shift or flicker allowed during transitions.
* Keyboard and screen reader states preserved.

**Accessibility**

* Maintain minimum contrast ratio 4.5:1.
* Maintain visible focus outlines using gold (`outline-color: #D6C2A8`).

**Testing Requirements**

1. Scroll through hero → product → footer transitions on desktop and mobile.
2. Verify color mode toggling is instant and non-disruptive.
3. Confirm hover and focus colors meet contrast guidelines.
4. Validate zero lag on devices under 60 fps rendering.

---

**3.1.4 Initial Theme Detection (Instant Load Adaptation)**

**Purpose**
Ensure the global navigation bar immediately reflects the correct color mode (light or dark) on page load, without requiring user scroll.

**Behavior**
• Detect the hero section’s brightness state on initial render.
• Apply the corresponding navigation class (nav-light or nav-dark) instantly.
• Maintain the champagne gold logo (#D6C2A8) across all themes.
• Default to light mode if no theme marker is found.
• Preserve smooth 0.3s color transition consistency across section changes.

**Implementation**

Update the IntersectionObserver threshold to 0.

Add an initial useEffect() that checks the first visible section for its data-nav-theme attribute.

Apply the detected theme class to the header before rendering completes.

Keep runtime sync with scroll-based updates for seamless transitions.

**Testing Criteria**

On page load, verify nav colors match hero background without scrolling.

Scroll between light and dark sections—transition remains smooth and flicker-free.

Test across desktop and mobile breakpoints.

Validate WCAG AA contrast ratios and hover color transitions.

---

**3.1.5 Logo Visibility Logic (Dynamic Champagne Adaptation)**

**Purpose**
Ensure the Padel Ready logo remains legible and visually consistent across all background contexts while preserving the luxury aesthetic.

**Behavior**
• The logo defaults to champagne gold (#D6C2A8) at all times for brand consistency.
• When over light or white backgrounds, the logo remains solid champagne gold, ensuring full visibility without blending into the background.
• When over dark or high-contrast backgrounds, the logo adapts in real time to a lightened gold (≈ #E9DCC5) for improved contrast.
• Adaptation logic uses background brightness detection from the intersection observer.
• Transitions occur smoothly within 0.3 s using easing (ease-in-out).
• The logo color never inverts to black or non-brand tones.
• The system preserves WCAG AA contrast levels at all times.

**Fallback**
If brightness detection fails or data attribute markers are missing, default to champagne gold (#D6C2A8).

---

### 5.2 Visual Verification – Logo Adaptation

**Purpose**
Verify that the logo color logic behaves as intended across all navigation states and backgrounds.

**Test Steps**

1. Load any light-background page (for example `/about` or `/shop`).
   • Confirm the logo renders **champagne gold #D6C2A8** instantly.
   • Ensure no flash or delay before color appears.
2. Scroll into a dark-background section (hero, collaborations, or footer).
   • Confirm smooth **0.3 s fade** to **white #FFFFFF**.
   • Check that navigation text/icons also match the dark-mode style.
3. Scroll back into a light section.
   • Logo should return to champagne gold with the same transition timing.
4. Reload each route (`/`, `/about`, `/events`) and confirm correct color from first render.
5. Capture screenshots before and after transitions for documentation.

**Acceptance Criteria**
• Logo color never appears black or grey.
• Champagne gold on light surfaces, white on dark.
• Transitions are smooth (0.3 s ease-in-out).
• Color change syncs with navigation contrast mode.

---

### 3.4 Events Page (Cinematic Series)

**Purpose**
Showcase upcoming and past Padel Ready × Babington House events with cinematic presentation, dynamic filtering, and full Shopify export compatibility.

**Design System Alignment**
• Fonts: Mollen (display), Inter (body)
• Colors: champagne gold (#D6C2A8), off-white (#fefaf3), black (#000000)
• Aesthetic: minimal, cinematic, responsive
• Transitions: 0.3s cubic-bezier(0.4,0,0.2,1)

**Core Sections**

1. **Hero**

   * Full-width parallax background of Babington House padel courts.
   * Headline: “Where Champions Gather.”
   * Subhead: “Design. Sport. Community.”
   * Overlay gradient: black → transparent → off-white.

2. **Event Filter**

   * Toggle buttons: “Upcoming Events” / “Past Events.”
   * Active state: champagne gold underline, text.
   * Inactive: muted black text.

3. **Events Grid**

   * Responsive grid: 1 col mobile, 2 tablet, 3 desktop.
   * Card includes:
     • Image (16:9)
     • Title
     • Date
     • Location
     • Type (Tournament, Training, Social)
     • Description (max 2 lines)
     • CTA: “Register” or “View Recap.”
   * Hover: lift with shadow and gold accent line.
   * Staggered fade-in animation.

4. **Featured Event Block** (optional)

   * Full-width video or image with gold CTA “Join the Experience.”

5. **Footer**

   * Matches existing champagne-accent design.
   * Adds newsletter form: “Never miss an event.”

**Mock Data**
Include `events` array from Lovable prompt for layout validation.

**Files to Create**

* `src/pages/Events.tsx`
* `src/components/sections/EventsHero.tsx`
* `src/components/sections/EventsGrid.tsx`
* `src/components/ui/EventCard.tsx`
* `src/components/ui/EventFilter.tsx`

**Shopify Export**

* `shopify-sections/sections/pr-events-hero.liquid`
* `shopify-sections/sections/pr-events-grid.liquid`
* `shopify-sections/snippets/pr-event-card.liquid`

**Acceptance Criteria**
• Fully responsive.
• Cinematic transitions.
• Matches design tokens.
• Ready for Shopify deployment.
• All mock data visible in preview.

---

**3.4.2 Events Data Model + Shopify Integration**

**Purpose**
Enable long-term scalability and simple content management for the Events Page using Shopify metafields instead of hardcoded data. Ensure the front end remains fully cinematic, responsive, and consistent with the Padel Ready brand system.

**Behavior Overview**
• The Events Grid dynamically fetches event data from Shopify metafields (shop.metaobjects.events).
• Events are categorized automatically into “Upcoming” and “Past” using the status field.
• Each event card maintains equal visual height and bottom-aligned CTA buttons.
• Clicking a card opens a dedicated /events/[handle] detail page showing the full event description, images, and a “Register” button.
• Default mock data renders if no metafields are found (offline fallback).

**Metafield Definition**
Namespace: padel_ready
Key: events
Type: Metaobject (Event)

Each Event Metaobject includes:

| Field        | Type             | Example                                                                          |
| ------------ | ---------------- | -------------------------------------------------------------------------------- |
| title        | Single line text | “Members’ Summer Social”                                                         |
| date         | Date             | 2025-06-08                                                                       |
| location     | Single line text | “Babington House Lawn”                                                           |
| description  | Rich text        | “Drinks, music, and padel under the evening sun.”                                |
| image        | Image file       | /images/babington-social.jpg                                                     |
| type         | Single select    | Tournament / Training / Social                                                   |
| status       | Single select    | Upcoming / Past                                                                  |
| register_url | URL              | [https://shop.padelready.store/register](https://shop.padelready.store/register) |
| featured     | Boolean          | True                                                                             |

**Frontend Implementation**
• Replace local JSON data in EventsGrid.tsx with a fetch call for metafield data.
• Filter by status and render in the grid.
• Cards:

* Fixed min-height (e.g. min-h-[420px]).
* Flex layout with justify-between to align “Register” buttons.
* Fade-in staggered animations (animate-fade-in).
* CTA button triggers either external link or internal modal form.
  • Create event detail page template (src/pages/EventDetail.tsx) using route params.

**Shopify Liquid Implementation**
Liquid Sections:

shopify-sections/sections/pr-events-grid.liquid
shopify-sections/snippets/pr-event-card.liquid

Liquid Loop Example:

```
{% for event in shop.metaobjects.events.values %}
  {% if event.status == 'upcoming' %}
    {% render 'pr-event-card', event: event %}
  {% endif %}
{% endfor %}
```

**Event Detail Template (pr-event-detail.liquid)**

Hero banner using event image.

Event title, date, and location.

Description (rich text).

Register button or embedded form.

Related events carousel (optional future expansion).

**Acceptance Criteria**
• All event cards align visually with consistent button height.
• Data syncs dynamically from Shopify metafields.
• Clicking an event navigates to its detail page.
• Fully responsive grid (1–3 columns).
• No hardcoded JSON.
• Seamless fallback to static mock data if metafields unavailable.
• Ready for deployment to Shopify Online Store 2.0.

---

**3.4.3 Event Detail Page + Shopify Integration**

**Purpose**
Provide a dedicated cinematic page for each event, ensuring consistency between the Shopify metafields data model and the front-end presentation. Each event should have its own immersive storytelling experience with clear registration flow.

**Behavior Overview**
• Each event card links to a unique route /events/[handle].
• The page dynamically loads event content from the corresponding Shopify metaobject (by handle or ID).
• All typography, color, and animation patterns follow the existing Padel Ready design system.
• Smooth transitions between Events Grid and Event Detail views.

**Page Structure**

**Hero Section**

Full-width banner using the image metafield.

Gradient overlay for legibility.

Title, type badge (Tournament / Training / Social).

Date and location under the title.

**Event Content Section**

Full description metafield (rich text, styled with prose).

Optional secondary images or gallery.

Divider line for structure.

**Registration Section**

Prominent “Register Now” CTA button.

Button links directly to register_url (if provided).

Fallback: inline form or contact link.

**Related Events Section (optional)**

Carousel of upcoming events excluding the current one.

Uses same EventCard component for design consistency.

**Shopify Liquid Implementation**

Add shopify-sections/templates/event.json (or .liquid if static).

Use dynamic handle lookup:

```
{% assign current_event = shop.metaobjects.events[request.handle] %}
{% if current_event %}
  {% render 'pr-event-detail', event: current_event %}
{% else %}
  <p>Event not found.</p>
{% endif %}
```

Create snippet: shopify-sections/snippets/pr-event-detail.liquid.

Structure matches React layout with semantic HTML and brand colors.

**Frontend Implementation (React / Vite)**

New file: src/pages/EventDetail.tsx.

Fetch event data via handle prop (useParams() from React Router).

Layout uses the following structure:

EventHero (banner + metadata)

EventBody (description + optional gallery)

EventCTA (register link)

Implement fade and slide transitions (framer-motion or Tailwind animate utilities).

Reuse design tokens from index.css (brand-accent, shadow-elegant, etc.).

**Metafields Used**
title, date, location, description, image, type, status, register_url.

**Acceptance Criteria**
• Each event links to a dedicated detail page.
• Data populates dynamically via metafields.
• Page layout adapts elegantly for mobile and desktop.
• “Register Now” button works as expected.
• Style and tone align with Padel Ready cinematic branding.
• Fully compatible with Shopify Online Store 2.0.

---

**3.4.5 Event Detail Page Implementation**

**Purpose**
Enable fully dynamic event detail pages that render content from Shopify metafields (or fallback mock data) for each event handle. Ensure seamless visual continuity with the cinematic Padel Ready brand design language.

**Behavior**
• Route pattern: /events/:handle
• On initial render, fetch event data from Shopify metafields using the handle parameter.
• Fallback to local mock data if metafields are unavailable.
• Display a cinematic “Event Not Found” state when no match is found, including a “Back to Events” CTA.

**Layout Structure**

**Hero Section**

Full-width banner image (event.image) with soft dark overlay.

Event title (Playfair Display, text-display-lg) centered.

Date and location stacked below title.

Event type badge (Tournament, Training, or Social) in champagne gold (#D6C2A8).

**Body Section**

Rich text description (event.description) using Inter font.

Optional gallery or schedule section (fade-in animation).

Cinematic spacing with responsive padding (py-20 sm:py-28).

**CTA Section**

“Register Now” button styled in champagne gold.

“Back to Events” ghost button below.

**Shopify Export Requirements**
• Templates:

shopify-sections/templates/event.liquid

shopify-sections/snippets/pr-event-detail.liquid

• Metafields to query: title, date, location, type, image, description, register_url
• Include fallback image if metafield image is missing.

**Design Specifications**
• Fonts: Playfair Display (headings), Inter (body).
• Colors: Champagne gold (#D6C2A8), Off-white (#fefaf3), Black (#000000).
• Animations: Soft fade-in, staggered entry for sections, 0.3s transitions.
• Accessibility: Semantic HTML (article, time, address), WCAG AA contrast, keyboard navigable.

**Acceptance Criteria**

Each event card opens its correct detail page via /events/:handle.

Shopify metafield data loads dynamically.

Fallbacks render correctly when data missing.

Hero and CTA match Padel Ready brand style.

“Event Not Found” gracefully handles invalid handles.

Fully responsive on all devices.

---

**3.4.6 Event Registration Flow Integration**

**Purpose**
Enable users to register for Padel Ready events directly from event detail pages using either Shopify’s built-in product metafields (Option 2 model) or an external form integration (Tally/Typeform), while maintaining cinematic presentation and brand consistency.

**Behavior**
• The “Register Now” button on each event detail page dynamically links to the corresponding registration URL (event.register_url).
• For Shopify-hosted events:
 – Button opens the event’s product detail or checkout page.
 – The event title, date, and type automatically populate as product metafields.
 – Optional quantity selection if event capacity allows.
• For external registration (Tally/Typeform):
 – Button opens form in a cinematic modal overlay.
 – Form pre-fills the event name and date.
 – Upon submission, a confirmation message displays inline.
• Fallback behavior:
 – If no registration URL or form link is defined, button displays disabled state (“Registration Closed”).

**Design Specifications**
• Primary button: champagne gold background (#D6C2A8), black text (#000000).
• Hover: invert to black background, gold text.
• Modal overlay: 85% black transparency (rgba(0,0,0,0.85)), fade-in animation (0.4s ease-in-out).
• Typography and spacing match the Event Detail page.
• Fully responsive on mobile and tablet.

**Shopify Export Requirements**
• Add metafields for each event product:
 – registration_link (URL)
 – registration_type (internal/external)
 – capacity (integer)
 – is_featured (boolean)
• Create optional shopify-sections/snippets/pr-event-register.liquid for embedding registration modals or forms.
• Support both direct-to-checkout and form modal display modes via schema settings.

**Accessibility**
• All buttons use semantic <button> elements or <a> links with aria-label attributes.
• Modals use ARIA role dialog with focus trapping.
• WCAG AA compliant contrast maintained.

**Acceptance Criteria**
• Each event detail page displays a working registration CTA.
• Shopify metafields correctly populate and trigger appropriate registration behavior.
• Modal form overlay displays correctly on all devices.
• Disabled state appears when registration is closed.
• Transition animations maintain the cinematic aesthetic.

---

**3.4.8 Navigation Theme Consistency (Events Page Alignment)**

**Purpose**
Ensure the global navigation system maintains consistent color transitions across all pages, including the /events route, matching the cinematic Padel Ready visual behavior defined in Section 3.1 (Global Navigation System).

**Background**
The /events page introduced a new hero structure without the data-nav-theme markers used on other pages. As a result, navigation color detection failed to adapt automatically when transitioning between light and dark sections.

**Behavior**
• Navigation should switch between nav-light and nav-dark modes based on section background brightness.
• Default state: nav-light on page load.
• When the hero (dark overlay) is visible, navigation switches to nav-dark.
• When scrolling to light sections (off-white backgrounds), revert to nav-light.
• Maintain the champagne gold (#D6C2A8) logo visibility logic:
 – Champagne gold on light backgrounds.
 – White on dark backgrounds.
• Detect and apply mode changes instantly on page load (no scroll required).
• Smooth transition (0.3s ease) between states for cinematic continuity.

**Implementation Details**
• Add data-nav-theme="dark" to hero section wrappers.
• Add data-nav-theme="light" to event grid and content sections.
• Update Header.tsx to include IntersectionObserver logic with threshold = 0.1 for immediate section detection.
• Maintain consistency with color tokens from index.css:
 – --brand-gold: #D6C2A8
 – --brand-bg-light: #fefaf3
 – --brand-bg-dark: #000000
• Include event detail pages (/events/:handle) in the detection logic.

**Acceptance Criteria**

Navigation color and logo adapt instantly on /events and /events/:handle pages.

Matches the behavior and timing of homepage hero and footer transitions.

No delay or flicker during load or scroll.

Works seamlessly across all screen sizes and Shopify export versions.

Maintains WCAG AA contrast standards.

---

**3.4.9 Event System Performance Optimisation (Lazy Loading + Caching)**

**Purpose**
Improve Events page and Event Detail performance by reducing initial load times and ensuring smooth transitions across devices while maintaining cinematic visual fidelity.

**Objectives**
• Decrease page load time by deferring non-critical content.
• Improve perceived performance on mobile through progressive loading.
• Cache event data to reduce redundant fetch requests from Shopify metafields.
• Maintain smooth fade and parallax animations during lazy loads.

**Behavior**
• Implement lazy loading for all event images using native loading="lazy" or IntersectionObserver.
• Prioritize above-the-fold content (hero + first 2 event cards).
• Cache event data in local storage or session cache keyed by event handle.
• On revisits, pre-populate grid instantly with cached data, then refresh asynchronously in background.
• Add loading skeletons (brand-aligned light beige #fefaf3 base, subtle pulse animation).
• Defer background parallax and scroll animations until images are ready.
• Maintain fade-in sequencing on load for cinematic continuity.
• Optimize IntersectionObserver thresholds for low-motion environments (respect prefers-reduced-motion).

**Technical Implementation**
• Update EventsGrid.tsx and EventDetail.tsx to include lazy image and caching logic.
• Use useEffect to fetch metafield data only when not cached.
• Add fallback to mock JSON if Shopify API unavailable.
• Optimize animations using requestAnimationFrame rather than scroll listeners.
• Reduce bundle size by code-splitting detail page components via React.lazy and Suspense.
• Use optimized image sources via Shopify’s CDN (srcset, sizes, and format=auto).

**Performance Targets**

Largest Contentful Paint (LCP): under 2.8s on 4G.

Cumulative Layout Shift (CLS): under 0.05.

Lighthouse Performance Score: ≥ 90.

Frame rate: 60 fps sustained during scroll and animation.

**Acceptance Criteria**

Events page loads instantly with visible skeletons before data render.

Cached data populates instantly on repeat visits.

Lazy loading triggers correctly as elements enter viewport.

No layout shift or flicker during transitions.

Event Detail pages transition smoothly with minimal delay.

Measured Lighthouse score ≥ 90 on both mobile and desktop.

---

**3.4.10 Event Analytics & Engagement Tracking (Shopify + GA4)**

**Purpose**
Enable real-time insights into event performance, user engagement, and conversion behavior while maintaining visual integrity and privacy compliance.

**Objectives**
• Track how users interact with Events grid and detail pages.
• Record conversions for “Register Now” and “View Recap” CTAs.
• Support marketing attribution and performance analysis via GA4 and Shopify analytics.
• Ensure compliance with GDPR and cookie-consent preferences.

**Behavior**
• Log impressions for each event card when it enters the viewport.
• Track click events for:
 – Card clicks (navigate to detail).
 – CTA buttons (register or recap).
• Use data-analytics-event attributes for each tracked element.
• Dispatch GA4 events via gtag('event', 'event_click', {...}).
• Mirror tracking in Shopify Analytics using the native Shopify.analytics.publish API for unified reporting.
• Anonymize user IDs if cookie consent is denied.
• Add session tracking for returning users (localStorage key: pr_event_session).
• Aggregate interaction data for dynamic sections (carousel, hero CTA).

**Technical Implementation**
• Add useAnalytics hook in /src/hooks/useAnalytics.ts.
• Hook initializes GA4 config using environment variable VITE_GA_MEASUREMENT_ID.
• Extend EventCard, EventGrid, and EventDetail components with analytics events.
• On Shopify side, include inline <script> in Liquid templates for GA4 dispatch fallback.
• Validate tracking pixel firing via Google Tag Assistant and Shopify dashboard.
• All events prefixed with padel_ready_ for clear namespace separation.

**Data Model**
Each tracked event includes:

{
event_name: "padel_ready_event_click",
event_category: "Events",
event_label: "<event_title>",
event_id: "<event_handle>",
event_type: "<upcoming | past | featured>",
user_session: "<UUID>",
timestamp: ISO8601
}

**Performance & Privacy Requirements**
• Tracking scripts lazy-loaded after first user interaction.
• No blocking network requests on initial page load.
• Cookie consent integrated with site banner.
• Zero personally identifiable data stored locally.

**Acceptance Criteria**
• All events (impressions, clicks, CTAs) visible in GA4 Realtime within 5s.
• Shopify dashboard shows corresponding interactions.
• Disabled tracking when consent is off.
• No visual regressions or layout shifts.
• GA4 and Shopify events share consistent naming and timestamps.
• Page performance score ≥ 90 maintained post-integration.

---

### 3.4.11 Event Detail Cinematic Layout (Hero Parallax + Modular Sections)

**Purpose**
Deliver a high-end, cinematic event detail experience that mirrors luxury campaign pages. Each event should feel like a showcase, not just an information page.

**Objectives**
• Create visually immersive event pages for Padel Ready × Babington House and future events.
• Use modular, reusable sections for description, schedule, gallery, and registration CTA.
• Maintain brand consistency with Padel Ready’s luxury minimalist system (Mollen + Inter fonts, champagne gold #D6C2A8, off-white #fefaf3, black #000000).
• Ensure fully responsive behavior with smooth transitions between sections.

**Behavior**
• Dynamic route: `/events/:handle`.
• Hero section features parallax background image from Shopify metafield (`event.image_hero`).
• Hero includes event title, subtitle, location, and date overlayed in cinematic style.
• Scroll-triggered fade and parallax effect on hero image (0.4–0.6 speed ratio).
• Modular content sections appear with staggered fade-in as user scrolls:
 – **About the Event** (description, text-body-lg)
 – **Schedule** (timeline layout using cards or rows)
 – **Gallery** (auto-playing image grid with lightbox modal)
 – **Registration CTA** (full-width champagne gold block, button “Register Now”)
• Dynamic navigation behavior: header adapts between light/dark mode based on section background brightness.
• Breadcrumb navigation above hero for clarity and SEO.

**Technical Implementation**
• File: `/src/pages/EventDetail.tsx`
• Retrieve event data from Shopify metafields or mock JSON (`event.handle`).
• Components:
 – `EventHero.tsx` (parallax header)
 – `EventSection.tsx` (modular section container)
 – `EventGallery.tsx` (lightbox grid)
 – `EventCTA.tsx` (registration button and links)
• Add `data-nav-theme` attributes to each section for automatic header color adaptation.
• Implement parallax using `framer-motion` or `useScroll` + `useTransform`.
• Add `IntersectionObserver` for staggered content entrance.
• Fallback to placeholder imagery if metafields missing.
• Create Shopify template `/templates/page.event.liquid` and snippet `/snippets/pr-event-section.liquid` with metafield bindings (`title`, `image_hero`, `description`, `schedule`, `gallery`, `cta_link`).

**Design Specifications**
• Hero height: `min-h-[80vh]` (mobile) / `min-h-[100vh]` (desktop).
• Text overlay: centered on mobile, bottom-left aligned on desktop.
• Overlay gradient: `from-black/40 to-black/10` for legibility.
• Transition timing: `ease-[cubic-bezier(0.4,0,0.2,1)]`, 0.4s average.
• Gallery uses champagne gold border highlights on hover.
• CTA button uses brand-red accent (#E3271C) hover state for contrast.

**Accessibility**
• All media includes `alt` text from metafields.
• Ensure sufficient contrast ratios for overlays and text.
• Parallax effects disabled if `prefers-reduced-motion` enabled.
• Maintain keyboard navigation for lightbox gallery.

**Acceptance Criteria**

* Hero displays parallax image and transitions correctly on scroll.
* Modular content sections load dynamically with smooth fade-ins.
* CTA button links to event registration URL.
* Lightbox gallery functional with swipe and keyboard navigation.
* Works on mobile, tablet, and desktop.
* Navigation adapts automatically between light and dark sections.
* No layout shift or flicker on load.

---

### 3.4.12 Event Gallery Lightbox and Media Optimisation

**Purpose**
Enhance the Event Detail experience with an elegant, high-performance gallery that highlights imagery while maintaining site speed and accessibility.

**Objectives**
• Deliver immersive, cinematic image display consistent with Padel Ready’s visual identity.
• Ensure quick load times on mobile and desktop.
• Provide touch and keyboard navigation support for accessibility.

**Behavior**
• Gallery section appears as a 3-column grid on desktop, 2-column on tablet, 1-column on mobile.
• Clicking an image opens a fullscreen lightbox overlay.
• Lightbox supports:
 – Swipe (mobile)
 – Keyboard arrows (desktop)
 – Close via ESC or on-screen “×” icon
• Images preloaded as low-resolution blurred placeholders (`.webp` or `.avif`).
• Lazy-load offscreen images using `loading="lazy"` and IntersectionObserver.
• Each image includes caption text from metafields (`event.gallery[n].caption`).
• Implement fade and scale animation on open/close using Framer Motion.
• Fallback static grid for browsers with disabled JavaScript.

**Technical Implementation**
• File: `/src/components/sections/EventGallery.tsx`
• Props: `{ images: EventImage[] }`
• Define `EventImage` interface:

```
{
  src: string
  alt: string
  caption?: string
}
```

• Use `framer-motion` for transitions (fadeIn + scaleUp).
• Implement `useGalleryLightbox` hook for state management (current index, open/close, navigation).
• Optimise images via Vite Image Plugin or Shopify CDN (srcset + sizes).
• Add `prefetch` hint for first 3 images in `<head>`.
• Shopify Liquid version: `/snippets/pr-event-gallery.liquid` with lazy loading and lightbox markup placeholders.

**Design Specifications**
• Hover state: slight zoom-in (`scale-105`) and gold border (`#D6C2A8`).
• Lightbox overlay: `rgba(0,0,0,0.85)` background.
• Caption: white text, Playfair Display italic, positioned bottom-center.
• Next/Prev arrows: minimal white icons, 50% opacity, fade on idle.
• Mobile margin: 16px sides, tap-to-close zone outside image.

**Accessibility**
• Trap focus within lightbox.
• Screen reader announcements for open/close actions.
• Keyboard shortcuts: Left/Right = navigate, ESC = close.
• Captions read via `aria-describedby`.

**Performance Requirements**
• Largest Contentful Paint ≤ 2.5s on mobile.
• Deferred loading of gallery JS until user scrolls into view.
• Preload hero and first gallery image only.
• Serve images in next-gen formats.
• Maintain total CLS < 0.1.

**Acceptance Criteria**

* Clicking an image opens a smooth lightbox overlay.
* Swipe and keyboard navigation work across devices.
* Gallery images load progressively with placeholders.
* No blocking JS during initial load.
* Alt text and captions appear correctly.
* Performance metrics within defined thresholds.

---

**3.4.13 Event Metadata & SEO Schema**

**Purpose**
Enhance discoverability and analytics for all Event Detail pages by embedding SEO schema, Open Graph metadata, and Google Analytics tracking hooks.

**Objectives**
• Generate dynamic <head> metadata for each event using its title, date, and location.
• Add structured data (JSON-LD) compliant with Event schema for search visibility.
• Populate Open Graph (OG) and Twitter Card tags for social sharing.
• Add Google Analytics custom event tracking for “Register” CTA clicks.
• Ensure data consistency between React and Shopify Liquid versions.

**Behavior**
• On each Event Detail page, inject metadata dynamically based on metafields or mock event data.
• If meta_image exists, set it as OG and Twitter image.
• Automatically include fallback metadata from global site config if missing.
• For the Shopify Liquid export, create a {% schema %} block exposing:
 – title
 – description
 – event_date
 – location
 – image
 – register_url

**SEO Schema Example**

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "{{ event.title }}",
  "startDate": "{{ event.date }}",
  "location": {
    "@type": "Place",
    "name": "{{ event.location }}",
    "address": "{{ event.location }}"
  },
  "image": "{{ event.image }}",
  "description": "{{ event.description }}",
  "url": "{{ event.url }}"
}
</script>

**Implementation Details**
React:
• Create src/utils/seo.ts for reusable meta helpers.
• Inject <Helmet> or <Head> (depending on setup) in EventDetail.tsx.
• Add window.dataLayer.push() when “Register” is clicked for GA tracking.

Shopify:
• Create shopify-sections/snippets/pr-event-seo.liquid.
• Include the JSON-LD block dynamically within pr-event-detail.liquid.

**Accessibility & Validation**
• Use semantic <meta> tags only.
• Validate JSON-LD with Google’s Rich Results Test.
• Ensure OG image alt text is present for screen readers.

**Acceptance Criteria**
• Every Event Detail page outputs valid SEO schema and OG metadata.
• Register button triggers custom analytics event.
• Fallback metadata appears for missing values.
• Shopify Liquid export validates without errors.
• All schema values match metafield or mock event data exactly.
