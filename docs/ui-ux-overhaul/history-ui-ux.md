# UI/UX Historical Context & Pivot Strategy

## Legacy State

Previously, the application utilized a mix of legacy `shadcn-blue`, `bold-red` themes, and an `enhanced-morphism` design pattern (glassmorphism/neumorphism). While visually distinct, these styles introduced performance overhead and lacked the premium, understated feel required for a high-end furniture brand.

## The Pivot: Pure Minimalist Standard

To align with our identity as a premium furniture brand, we are transitioning to a pure minimalist design standard. This approach focuses on:

- Clean lines, precise geometry, and generous negative space.
- Stark, high-contrast typography emphasizing content over heavy backgrounds or shadows.
- Complete removal of expensive CSS properties (like heavy backdrop-filters, multiple box-shadows, and complex gradients in glassmorphism) to ensure maximum rendering performance.

## Performance Focus: Netlify Free Tier

A primary driver for this pivot is deployment optimization. By stripping away heavy styling and relying on highly optimized CSS and native browser features, we ensure that the application remains extremely fast, lightweight, and responsive, operating comfortably within the constraints of the Netlify free tier.
