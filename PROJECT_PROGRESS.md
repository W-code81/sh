# SHIFT Camp — project progress

Last updated: 12 October 2026

## Project overview

SHIFT Camp is a church camp information and registration site for campers and their families. The planned gathering is **17–20 December 2026** at **Royal Girls Academy, Ozuoba, Obio-Akpor, Port Harcourt, Rivers State, Nigeria**. The expected audience is approximately 50–90 people; that range is a planning estimate, not a confirmed capacity claim.

This repository is a pnpm monorepo. The public-facing Next.js application lives in `client/`; `admin/` is a separate workspace area. The client currently uses Next.js 16.4, React 19, Tailwind CSS 4, Lucide React, GSAP, and Lenis.

## Design system and theme

The site keeps its original SHIFT identity: a dark violet foundation, lavender primary accents, muted mauve surfaces, and a warm gold accent. A light theme is also available for visitors who prefer it. The two themes share the same semantic tokens so pages do not need separate per-theme styling.

Theme colors are CSS custom properties in `client/app/globals.css`, with Tailwind aliases under `@theme inline`. Components use semantic utility classes such as `bg-background`, `bg-surface-container-low`, `text-foreground`, `text-on-surface-variant`, `text-primary`, and `border-outline-variant` instead of hard-coded colors. `data-theme="light"` on the root element swaps the tokens and `color-scheme`.

`client/app/layout.tsx` initializes the theme before the page becomes interactive. The selected mode is persisted in `localStorage` under `shift-theme`; if no saved mode exists, the initial theme follows the visitor’s system preference. The toggle is in the site navigation and exposes its next action to assistive technology.

Visual foundations include Geist sans and mono font stacks, large editorial hero type, rounded card surfaces, restrained borders, visible keyboard focus, and reduced-motion support. Shared semantic tokens are intended to keep future pages consistent in both themes.

## Public site

### Navigation and footer

- `client/app/components/Navbar.tsx` provides the sticky responsive navigation, brand link, mobile menu, registration link, and theme toggle.
- `client/app/components/Footer.tsx` provides camp navigation, a location link, and a short community sign-off.
- Current navigation points to camp guide and check-registration routes that are planned areas of the site; finish those pages before treating those links as complete product flows.

### Home page

The landing page is composed in `client/app/page.tsx` from reusable sections:

1. **Hero** (`client/app/section/landing/Hero.tsx`): “Grow in faith. Find your people. Make camp count.” with introductory copy, the event countdown, registration action, and a link to camp details.
2. **Hero slideshow** (`client/app/section/landing/HeroSlideshow.tsx`): uses the photographs in `client/public/images/slideshow/`. It has previous/next controls, a glass-style pill control bar, a play/pause control, image preloading, and a short GSAP transition. Autoplay pauses while hovered or focused, and respects the reduced-motion preference unless the visitor explicitly starts it.
3. **Venue** (`client/app/components/Venue.tsx`): introduces the camp venue and links to its location.
4. **Overview** (`client/app/section/landing/Overview.tsx`): summarizes schedule, stay, cost, and registration information. Unconfirmed facts are explicitly left for organizers to provide.
5. **Expectations** (`client/app/section/landing/Expectation.tsx`): visual cards for worship, teaching, community, and outdoor recreation using the images in `client/public/images/expectation/`.
6. **Essential information** (`client/app/section/landing/EssentialInfo.tsx`): expandable guidance about accommodation, meals, travel, packing, and health/safety.
7. **Final CTA** (`client/app/section/landing/FinalCTA.tsx`): invites visitors to register and links to registration lookup.

The countdown is in `client/app/section/landing/Countdown.tsx`. It targets the beginning of camp on 17 December 2026 (West Africa Time) and displays days, hours, minutes, and seconds. Its initial server-rendered state uses placeholders to avoid a server/client clock mismatch.

## Motion and scrolling

`client/app/hooks/useLenis.ts` connects Lenis smooth wheel scrolling to GSAP’s ticker and ScrollTrigger. It tears down cleanly and turns smooth scrolling off when reduced motion is requested. `client/app/components/LenisScroll.tsx` mounts the hook once from the root layout.

`client/app/components/ScrollMotion.tsx` applies GSAP reveals and staggered entrances to elements marked with `data-scroll-reveal` and `data-scroll-stagger`. These effects also respect reduced-motion preferences and revert when preferences change or the component unmounts. Hero slide transitions and the countdown seconds tick use small, local GSAP effects.

## Registration page

`client/app/register/page.tsx` wraps the interactive flow in Suspense so the client-side URL step can be read without blocking prerendering. `client/app/register/RegisterFlow.tsx` coordinates the three steps and keeps the URL query (`?step=2`, `?step=3`) as the source of truth for the active step.

The steps are:

1. Attendee information, including contact fields, church/fellowship, and age group.
2. Emergency contact and optional roommate, dietary, and accessibility requests.
3. Camp fee and payment information, currently marked as pending confirmation.

Required fields are validated before moving forward. Step panels remain mounted while hidden so entered values remain available as the visitor moves between steps. The venue image and confirmed event facts appear alongside the form.

**This registration is still a frontend preview.** It does not submit, store, or securely process attendee information. Do not collect real medical or emergency-contact information until a registration service and appropriate handling are implemented. The camp fee and payment methods also remain unconfirmed; the interface does not claim a price, payment processor, payment deadline, capacity, refund policy, or completed registration.

## Browser and rendering cleanup

Recent cleanup addressed the following issues:

- Moved the theme initialization script into the root layout body where Next.js supports the `beforeInteractive` strategy, avoiding script placement and hydration diagnostics.
- Added a Suspense boundary around the registration flow’s `useSearchParams` consumer to resolve the Next.js blocking-prerender route error.
- Added stable keys to mapped registration steps and removed nested `<main>` landmarks.
- Replaced Material Symbols ligature text with Lucide icons so icons render without a missing font dependency.
- Corrected the venue image paths to `/images/expectation/venue.png`.
- Replaced template content that implied unconfirmed prices, payment vendors, camp capacity, lodging, transport, and policies with confirmed facts or clear “to be confirmed” copy.
- Kept the registration preview notice visible so visitors know their form values are not submitted or saved.

The registration route was opened in the browser and steps 1, 2, and 3 were checked after the cleanup; the broken image was fixed and the Next.js issue overlay cleared.

## Lint follow-up

The registration step, theme toggle, countdown, and hero slideshow were updated to avoid copying external state into React state synchronously from an effect:

- The registration step is derived directly from `useSearchParams` instead of mirrored into local state.
- The theme toggle subscribes to the root theme attribute through `useSyncExternalStore`.
- The countdown subscribes to a stable one-second countdown snapshot through `useSyncExternalStore`; its server snapshot remains a placeholder to avoid hydration differences.
- The slideshow subscribes to the browser reduced-motion preference through `useSyncExternalStore`.

## Next work

- Connect registration to a real backend, including data validation, safe handling for sensitive attendee details, and a real confirmation state.
- Confirm the camp fee, payment instructions, age eligibility, transport, accommodation, capacity, and policies with organizers before publishing those details.
- Build and verify the camp guide and registration lookup routes.
- Run the client lint command and address any remaining findings. In this environment, the pnpm executable was blocked by Windows Application Control during the previous attempt, so lint verification still needs to be run from an allowed shell.
- Check the landing page and registration page at mobile and desktop widths in both light and dark themes.
