---
name: Luminous Sanctuary
colors:
  surface: '#14121a'
  surface-dim: '#14121a'
  surface-bright: '#3b3840'
  surface-container-lowest: '#0f0d14'
  surface-container-low: '#1d1a22'
  surface-container: '#211e26'
  surface-container-high: '#2b2931'
  surface-container-highest: '#36333c'
  on-surface: '#e7e0eb'
  on-surface-variant: '#cec2d8'
  inverse-surface: '#e7e0eb'
  inverse-on-surface: '#322f37'
  outline: '#978da1'
  outline-variant: '#4c4355'
  surface-tint: '#d8b9ff'
  primary: '#d8b9ff'
  on-primary: '#450086'
  primary-container: '#8b2cf5'
  on-primary-container: '#f2e3ff'
  inverse-primary: '#8018ea'
  secondary: '#d7baff'
  on-secondary: '#430684'
  secondary-container: '#5a2a9c'
  on-secondary-container: '#c9a4ff'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#007751'
  on-tertiary-container: '#83ffc6'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#eddcff'
  primary-fixed-dim: '#d8b9ff'
  on-primary-fixed: '#290055'
  on-primary-fixed-variant: '#6300bb'
  secondary-fixed: '#eddcff'
  secondary-fixed-dim: '#d7baff'
  on-secondary-fixed: '#280056'
  on-secondary-fixed-variant: '#5a2a9c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#14121a'
  on-background: '#e7e0eb'
  surface-variant: '#36333c'
typography:
  headline-xl:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Outfit
    fontSize: 34px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system crafts an intentional, reverent, yet youthfully vibrant atmosphere for church retreats and youth camp administration. The aesthetic balances deep contemplative reverence with the dynamic energy of fellowship, using deep plum-tinted atmospheric dark spaces lit by inner spiritual radiance and kinetic purple blooms.

The design movement combines **Modern Nocturnal Glassmorphism** with **Tactile Luminescence**. Interfaces prioritize clarity for busy youth directors and parents while delivering an inspiring, sacred digital arrival for campers. Layouts eliminate chaotic administrative sprawl in favor of deliberate focal points, rich tonal contrasts, and tactile, pill-softened touch surfaces that feel secure and inviting on handheld devices.

## Colors

The palette relies on deep night skies infused with royal plum undertones, avoiding cold sterile grays in favor of warm nocturnal tones.

- **Background (`#0B0910`)**: Midnight Plum. Used for base canvas views.
- **Primary Surface (`#17121F`)**: Deep Plum. The baseline container for high-level layouts, navigation docks, and form backgrounds.
- **Secondary Surface (`#211A2B`)**: Elevated Plum. Used for cards, interactive sheets, and elevated dialogs.
- **Surface Highlight (`#2D233B`)**: Hover states, active segmented controllers, and nested table rows.
- **Borders & Dividers (`#30263D`)**: Subtle dark plum-gray contour. Delivers structure without breaking the seamless nocturnal continuity.
- **Primary Accent (`#8B2CF5`)**: Electric Violet. The energetic focal anchor reserved for primary CTAs, active registration states, and interactive confirmation buttons.
- **Secondary Accent (`#B98AFF`)**: Soft Radiant Lavender. Used for secondary CTAs, glowing highlights, micro-badges, and visual emphasis.
- **Primary Text (`#F8F6FC`)**: Cloud White. Pristine legibility across all dark surfaces.
- **Secondary Text (`#B7ADCA`)**: Muted Lavender Gray. Used for metadata, descriptive labels, and helper copy.
- **Functional Semantics**:
  - **Success (`#10B981`)**: Emerald Green. Signifies confirmed registrations, medical clearance, and completed check-ins.
  - **Warning (`#F59E0B`)**: Warm Amber. Denotes dietary allergies, pending waivers, and low bunk capacities.

## Typography

Typography establishes an energetic harmony between bold contemporary discovery and calm, crystalline legibility.

- **Headlines (Outfit)**: A crisp, geometric sans-serif featuring generous counters and tight trackings. It injects youthful optimism into retreat milestones, registration headlines, and camp countdowns without sacrificing institutional credibility.
- **Body & Controls (Inter)**: The standard of functional interface typography. Inter handles dense medical waiver releases, dietary restriction logs, multi-camper ticket summaries, and field inputs with neutral balance and high optical legibility.
- **Micro-labels (`label-sm`)**: Form labels and status tokens are displayed with positive tracking (`0.05em`) in uppercase or title-case to maintain readability across darkened panels.

## Layout & Spacing

The layout model is driven by mobile-first single-event registration flows that scale fluidly up to wide screen volunteer dashboards.

- **Grid Strategy**:
  - **Mobile (< 768px)**: 4-column fluid layout with dynamic sticky bottom bars, edge margin of `1.25rem`, and unified `1rem` column gutters. All interactive triggers feature minimum touch hitboxes of 48px.
  - **Tablet (768px - 1024px)**: 8-column layout with `1.5rem` gutters, prioritizing two-column card matrices for cabin selections, ticket bundles, and attendee profiles.
  - **Desktop (> 1024px)**: 12-column layout bounded by a strict `1200px` centered master container, allowing side-by-side progression tracking (e.g., sticky schedule/summary on the right, progressive disclosure forms on the left).
- **Rhythm Rules**:
  - Form field groupings and related metadata use tight rhythm (`space-sm` to `space-md`).
  - Distinct component groups, card divisions, and sub-steps maintain breathing room through `space-lg` and `space-xl`.

## Elevation & Depth

Visual hierarchy does not use stark dropshadows; it relies on **Luminescent Layering and Ambient Violet Halos**.

1. **Surface 0 (Base Canvas - `#0B0910`)**: The deepest canvas plane. Flat, unlit, establishing infinite spatial calm.
2. **Surface 1 (Primary Shelves - `#17121F`)**: 1px perimeter border rendered in `#30263D`. Soft drop shadow: `0 8px 24px -4px rgba(0, 0, 0, 0.45)`.
3. **Surface 2 (Elevated Interactive Cards - `#211A2B`)**: 1px perimeter border rendered in `#30263D`. When active or hovered, border transitions to `rgba(185, 138, 255, 0.35)` with an ambient purple halo: `0 12px 32px -6px rgba(139, 44, 245, 0.18)`.
4. **Surface 3 (Overlays, Bottom Sheets & Modals - `#211A2B`)**: Backdrop blur (`backdrop-filter: blur(16px)` with `rgba(11, 9, 16, 0.8)`). Border: `1px solid rgba(185, 138, 255, 0.2)`. Shadow: `0 24px 48px -12px rgba(0, 0, 0, 0.75), 0 0 40px 0 rgba(139, 44, 245, 0.12)`.
5. **Interactive Glows**: Primary CTAs carry an active outer aura: `box-shadow: 0 4px 20px 0 rgba(139, 44, 245, 0.4)`.

## Shapes

The design system uses a deliberate **Curved Contour Architecture** that softens structural elements to create an approachable, youth-friendly feeling.

- **Primary Cards & Modals**: Standardized at `1.25rem` (20px) radius for wide containers, and `1rem` (16px) for interior child panels and ticket tier blocks.
- **Form Controls & Inputs**: Set to `0.75rem` (12px) to preserve clear rectangular structure while matching soft border aesthetics.
- **Buttons, Badges, & Chips**: Sculpted in fully rounded pill shapes (`9999px`) or softened `0.75rem` radii to maximize touch ergonomics.

## Components

### Buttons
- **Primary Button**: Solid fill `#8B2CF5`, text `#F8F6FC`, font `Outfit SemiBold` (15px), minimum height 48px. Features subtle inner top highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.2)`) and ambient purple drop glow (`0 4px 16px rgba(139, 44, 245, 0.35)`). Active state scales to `0.98`.
- **Secondary Button**: Background `#211A2B`, border `1px solid #30263D`, text `#B98AFF`. On hover, border shifts to `#B98AFF` and background to `#2D233B`.
- **Ghost Button**: Transparent background, text `#B7ADCA`, hovering transitions to text `#F8F6FC` with background `rgba(255, 255, 255, 0.05)`.

### Input Fields & Selectors
- **Container**: Minimum height 50px. Background `#17121F`, border `1px solid #30263D`, border radius 12px, font size 16px (to prevent iOS auto-zoom).
- **Placeholder**: Color `#B7ADCA` at 60% opacity.
- **Focus State**: Border color `#B98AFF`, box-shadow `0 0 0 3px rgba(139, 44, 245, 0.25)`.
- **Validation Errors**: Border color `#EF4444`, with error message rendered below in 12px matching text.

### Selection Controls (Checkboxes & Radios)
- **Checkboxes**: 22x22px square with 6px border radius. Unchecked: border `2px solid #30263D`, background `#17121F`. Checked: background `#8B2CF5`, border color `#8B2CF5`, icon `#F8F6FC`.
- **Radios (Cabin & Group Assignment)**: 22x22px circular frame. Active state displays an interior centered dot in `#B98AFF` surrounded by a solid `#8B2CF5` ring.

### Cards & Ticket Tiers
- Constructed on `#17121F` with a 1px `#30263D` border and 18px rounded corner radius.
- Includes a subtle top border gradient (`linear-gradient(90deg, rgba(139, 44, 245, 0.4) 0%, transparent 100%)`) that delivers a delicate overhead rim light.
- Selected state turns outer border into solid `#B98AFF` with an elevated background of `#211A2B`.

### Status Chips & Badges
- **Pill format**: Padding `4px 12px`, border radius `9999px`, typography `label-sm`.
- **Confirmed/Paid**: Background `rgba(16, 185, 129, 0.12)`, border `1px solid rgba(16, 185, 129, 0.3)`, text `#10B981`.
- **Medical/Pending Attention**: Background `rgba(245, 158, 11, 0.12)`, border `1px solid rgba(245, 158, 11, 0.3)`, text `#F59E0B`.
- **Theme/Cabin Tag**: Background `rgba(139, 44, 245, 0.15)`, border `1px solid rgba(185, 138, 255, 0.25)`, text `#B98AFF`.

### Specialized Domain Components
- **Registration Countdown Banner**: Glassmorphic `#211A2B` container with frosted backdrop, illuminated numerical blocks in Outfit Bold with soft purple ambient edge glows.
- **Camper Roster Tile**: Swipeable card on mobile revealing quick check-in actions, medical badge indicators, and dynamic cabin assignments.