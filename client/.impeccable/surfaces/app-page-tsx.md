---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/section/landing/Hero.tsx","app/section/landing/HeroSlideshow.tsx","app/section/landing/Countdown.tsx","app/globals.css","app/hooks/useLenis.ts"]
---

# Public home page

Scope: public attendee homepage. Visitor mode: persuade first, then route visitors to camp details and registration.

Audience: prospective campers and their families. Job: understand the camp, see the confirmed date, and decide whether to register or explore practical details. Proof: real photos supplied for the slideshow and verified venue/location information elsewhere on the page. Constraints: do not invent schedule, pricing, capacity, or camp activities; keep registration and navigation clear on small screens.

## Direction contract

**THESIS:** Restore the original vivid SHIFT Camp violet identity with an immediate, expressive family-facing hero and clear paths to camp information and registration.

**OWN-WORLD:** Use a deep violet dark theme by default, with a complementary light theme selected from system preference or by the visitor. Bold sans-serif typography, violet actions, candid camp photos, and clear information establish the brand. Shared CSS tokens keep every public page in sync.

**STORY:** A visitor first understands that SHIFT Camp is a faith and community gathering, then sees the December date, real camp photos, a live countdown, and direct routes to registration and practical information.

**FIRST VIEWPORT:** On desktop, place “Grow in faith. Find your people. Make camp count.” with supporting copy, the date/countdown, and two actions at left; use the camp slideshow at right. On mobile, stack content clearly and keep the navigation compact.

**FORM:** An energetic camp gathering with the original violet identity. Keep initial hero content visible without waiting on client JavaScript. Prioritize the first photo and preload nearby slideshow images; animate later slide changes and scroll reveals briefly, respecting reduced-motion preferences.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Unresolved: venue schedules, registration fee, and other camp logistics must stay clearly unconfirmed until the organizers provide them.

Build path: code-first because no image generation tool is available in this session.
