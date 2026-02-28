# Minimalist UI Overhaul: Master Plan

## Core Design Decisions

- **Typography**: **Inter** for clean, readable body text and functional UI elements; **Playfair Display** for elegant, premium brand headings.
- **Interactions**: Leveraging native CSS `scroll-snap` for smooth, performant scrolling experiences (galleries, carousels) without heavy JavaScript libraries.
- **Visuals**: Complete removal of "morphism" (glassmorphism, neumorphism) in favor of flat, high-contrast, strictly minimalist aesthetics.

## 10-Phase Master Tasklist

- [ ] **Phase 1: Global CSS & Tailwind Configuration**
  - Strip legacy shadcn-blue/bold-red and morphism utilities from `globals.css` and `tailwind.config.js`.
  - Implement pure minimalist color palette (monochromes, stark contrasts).
- [ ] **Phase 2: Typography System Overhaul**
  - Integrate `Inter` and `Playfair Display`.
  - Update global font assignments, headings, and responsive typographic scales.
- [ ] **Phase 3: Component De-Morphism**
  - Systematically remove `backdrop-blur`, complex shadows, and translucent backgrounds from shared UI components (buttons, cards, modals).
- [ ] **Phase 4: Layout & Grid Modernization**
  - Refine spacing variables to introduce premium, consistent whitespace.
  - Implement CSS Grid layouts for product showcases.
- [ ] **Phase 5: Native Scroll-Snap Integration**
  - Replace JS-heavy carousels with native CSS `scroll-snap` for product galleries and hero sections.
- [ ] **Phase 6: Product Card Redesign**
  - Simplify product cards to focus purely on high-quality imagery and minimal typography.
- [ ] **Phase 7: Product Detail Page (PDP) Refactor**
  - Apply minimalist layout to detail pages, reorganizing information hierarchy for a premium feel.
- [ ] **Phase 8: Cart & Checkout UI Streamlining**
  - Clean up cart slide-overs and checkout flows for a frictionless, distraction-free experience.
- [ ] **Phase 9: Performance Tuning for Netlify**
  - Audit CSS bundle sizes and drop unused legacy styles.
  - Ensure strict adherence to static generation and edge-friendly rendering patterns.
- [ ] **Phase 10: Final Polish & QA**
  - Comprehensive cross-browser testing, accessibility passes, and responsive validation.
