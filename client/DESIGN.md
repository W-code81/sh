# SHIFT Camp Design System

## Direction

Restore the original energetic violet SHIFT Camp identity for campers and families. The default presentation is dark, with a user-selectable light mode for comfort and preference. Use confident sans-serif display typography, candid camp photography, a clear countdown, and direct registration actions.

## Color

- Dark canvas: `#151119`; dark surfaces: `#17121b` through `#403746`.
- Light canvas: `#f8f5fb`; light surfaces: `#ffffff` through `#dcd2e5`.
- Main violet action: `#8b2cf5` (dark), `#7e2bd7` (light).
- Dark text: `#eee8f2`; light text: `#261a31`.
- Lavender accent in dark mode: `#d8b4ff`; accessible deep violet accent in light mode: `#64289a`.
- Gold is a small supporting highlight. Keep text and controls legible in either theme.

## Typography and layout

- Use the existing Geist/system sans-serif stack with bold, tight hero typography.
- Hero headline: “Grow in faith. Find your people. Make camp count.”
- Keep the desktop hero asymmetrical: headline, description, countdown, and actions at left; edge-to-edge camp slideshow at right. Stack cleanly on mobile.
- Keep registration prominent and practical camp information easy to scan.

## Theme behavior

- Follow the visitor’s system color preference on first visit; default to dark if unavailable.
- Let visitors switch themes from the navigation. Persist their choice in local storage.
- Use design tokens for shared backgrounds, text, borders, and actions so all public pages change together.

## Motion and performance

- Never hide the primary hero message while its entrance animation waits for JavaScript.
- Prioritize the first slideshow photo and preload only nearby slides. Animate only subsequent photo changes.
- Keep scroll reveals and slideshow transitions brief; disable them when reduced motion is requested.
- Avoid adding a loader for the hero. Its content should be useful and visible on the first paint.
