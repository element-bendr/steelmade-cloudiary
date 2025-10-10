# Front-End Red & White Experience Playbook

**Audience:** Design, Front-End Engineering, Content

**Goal:** Deliver a cohesive, premium SteelMade experience where every page leans into the red (`#B91C1C` / `#991B1B`) and white palette while remaining accessible, performant, and easy to maintain.

---

## 1. Vision & Success Criteria

1. **Brand Cohesion:** All digital touchpoints reinforce SteelMades redwhite identity using shared tokens, typography, and motion principles.
2. **Homepage Wow-Factor:** A cinematic hero, structured storytelling, and prioritized CTAs turn the homepage into a flagship experience.
3. **Scalable System:** Theme tokens, utility classes, and component variants simplify adoption across new and existing pages.
4. **Accessibility & Performance:** WCAG 2.1 AA compliance, graceful motion, and fast rendering (Core Web Vitals green) remain non-negotiable.

---

## 2. Current Snapshot (Key Findings)

| Area | Observation | Impact |
| --- | --- | --- |
| Global tokens | `app/globals.css` + Tailwind tokens mix blue primaries with red accent variables | Inconsistent brand signal, harder scaling |
| Homepage hero | Grey gradient hero and limited motion contrast with documented Elegance in Motion concept | First impression underwhelming |
| Components | Buttons, badges, and icon pills default to blue (`bg-blue-600`) in `FeaturedProducts` and `NewTycoonChairSection` | CTA hierarchy drifts from brand palette |
| Imagery | Mixed-quality Cloudinary assets; some sections lack red/white framing | Visual story feels inconsistent |
| Docs | Prior plans (`ui-design-system.md`, `homepage-revamp-plan.md`, `centralized-product-styling-plan.md`) exist but lack consolidated execution checklist | Teams reinvent patterns per page |

---

## 3. Brand Palette & Tokens (Step-by-Step)

1. **Define Core Tokens**
   - Primary: `--primary-500: #B91C1C`, `--primary-600: #991B1B`
   - Neutrals: white base with slate gray (`#1F2937`) typography
   - Accent neutrals for depth: `--neutral-100: #F9FAFB`, `--neutral-200: #E5E7EB`
2. **Tailwind Alignment**
   - Update `tailwind.config.js` to map `primary`, `danger`, and CTA utilities to the red palette.
   - Introduce semantic color tokens (`brand.background`, `brand.surface`, `brand.highlight`).
3. **CSS Variables**
   - Consolidate `globals.css` to mirror token definitions and remove stray blues.
   - Provide dark-mode alternates (slightly lighter reds, reinforced contrast).
4. **Theme Helper Utilities**
   - Extend `modules/ui/utils/brand-theme.ts` to export `BRAND_CLASSES` aligned with updated tokens.
   - Add `brand-surface`, `brand-border`, and `brand-cta` utility classes for declarative styling.

---

## 4. Component Refresh Roadmap

1. **Buttons & Links**
   - Migrate all CTA variants to shared `Button` component.
   - Enforce hover/focus states using red spectrum, include `focus:ring-brand` helper.
2. **Navigation & Header**
   - Revisit `components/ui/header.tsx` for red accent underlines, active link indicators, and white/glass backdrop.
   - Provide mobile sheet styling with red highlight for primary actions.
3. **Cards & Feature Blocks**
   - Use white surfaces with red micro-accents (badges, icon rings).
   - Offer `Card` variants: `default`, `highlighted` (red border), `glass` (for hero overlays).
4. **Badges, Pills, Icons**
   - Replace blue icon backgrounds with white/red combinations.
   - Add `status` palette (success, info) that complements base red theme.
5. **Forms & Inputs**
   - Standardize focus rings to `ring-brand`.
   - Provide optional red accent toggles for radio/checkbox states.

---

## 5. Homepage Overhaul Blueprint

1. **Hero (Week 1)**
   - Full-bleed media (video or high-res loop) with red light overlays.
   - Headline + subheadline using white text on glass panel; CTA button in solid red.
   - Include motion cues (scroll chevron, subtle parallax) via Framer Motion.
2. **Featured Collections (Week 11)**
   - Three-card grid; each card uses white surface, red hover border, gentle elevation.
   - CTA buttons adopt red primary style.
3. **Craftsmanship Story (Week 2)**
   - Split layout with imagery treated in red-tinted duotone or white backgrounds.
   - Add iconography using red outline style.
4. **Legacy Strip (Week 2)**
   - White background with thin red divider lines, typographic focus.
5. **Consultation CTA (Week 3)**
   - Red gradient background, white text, multi-step CTA (button + supporting phone/email).
6. **Motion & Polish (Week 3)**
   - Apply entry animations to each section using `whileInView` triggers.
   - Stress-test for reduced-motion preference.

---

## 6. Page Family Theming Checklist

| Page Family | Required Treatment |
| --- | --- |
| Product Listing (`/chairs`, `/desks`, etc.) | Use white canvases with red badges for NEW items, red-filtered hero banner, consistent filters panel.
| Product Detail | Red CTA buttons (Add to Cart/Enquire), red accent divider under section titles, gallery overlays using red iconography.
| Marketing Landing (`/services`, `/portfolio`) | Hero with red accent, alternating white/off-white sections, red icon rings for key stats.
| Informational (`/about`, `/faq`) | Typography-first layout with red pull quotes, timeline markers.
| Support/Forms (`/contact`) | Red progress indicators, success states using softer green but anchored with red buttons.

Add a page-specific QA checklist to each folder in `docs/` (e.g., `docs/pages/about-theming.md`).

---

## 7. Content & Asset Alignment

1. **Photography**: Curate Cloudinary presets for red/white balance; introduce light desaturation to avoid clashing tones.
2. **Iconography**: Switch to line icons with red fills for emphasis; maintain stroke weight consistency.
3. **Copy Review**: Align tone with premium brand voice; highlight craftsmanship, service, and innovation.
4. **Interactive Elements**: Ensure animations echo red glow (aurora effect) found in `globals.css` while staying subtle.

---

## 8. Accessibility & QA Gateways

1. **Contrast Checks**: Verify all red-on-white and white-on-red combinations (use axe or Stark); adjust shades if ratio < 4.5:1.
2. **Keyboard Navigation**: Focus ring must be visible on red surfaces; consider white outline fallback.
3. **Reduced Motion**: Respect `prefers-reduced-motion`, provide static fallback for hero video (poster image).
4. **Performance**: LCP under 2.5s; optimize hero media (adaptive streaming, poster). Run Lighthouse per release.

---

## 9. Delivery Phases & Ownership

| Phase | Timeline | Leads | Deliverables |
| --- | --- | --- | --- |
| 0. Alignment | Week 0 | Design Lead + Front-End Lead | Approve tokens, finalize hero concept, confirm asset sources |
| 1. System Layer | Week 1 | Front-End | Updated tokens, Button/Card variants, documentation in Storybook (if available) |
| 2. Homepage | Weeks 12 | Feature Squad | Hero, Featured Collections, Craftsmanship, Legacy, Consultation sections |
| 3. Rollout | Weeks 34 | Feature Squads | Apply theming checklist to top-traffic pages (`/chairs`, `/services`, `/portfolio`) |
| 4. QA & Launch | Week 4 | QA + PM | Accessibility audit, performance run, sign-off memo |

---

## 10. Governance & Documentation

1. **Design Source of Truth**: Update Figma library to match tokens and components; link in `docs/ui-design-system.md`.
2. **Developer Handbook**: Append `Implementation Notes` to `docs/ui-implementation-guide.md` referencing this playbook.
3. **Release Checklist**: Maintain a `docs/release-theming-checklist.md` capturing regression checks, asset reviews, and analytics tags.
4. **Monitoring**: Track hero engagement (scroll depth, CTA clicks) via `lib/analytics.ts`, refine copy and layout quarterly.

---

## 11. Next Steps

1. Schedule design/dev sync to approve palette and hero concept.
2. Kick off Phase 1 token work in a dedicated branch (`feature/theme-refresh`).
3. Prepare homepage wireframes + motion prototypes for leadership review.
4. Line up content and photography refresh to match red/white aesthetic.
5. Create reusable QA checklist and bake into CI (visual regression, Lighthouse).

This playbook complements existing documents (`ui-design-system.md`, `homepage-revamp-plan.md`, `centralized-product-styling-plan.md`) and provides the execution path required to ship a fully branded SteelMade front end without altering code immediately.