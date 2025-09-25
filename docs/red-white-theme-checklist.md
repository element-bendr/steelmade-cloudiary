# Red & White Theme Implementation Checklist

Use this list to confirm every aspect of the branding refresh is covered. Mark each item as you complete it.

## 1. Foundation
- [ ] Brand palette tokens updated in `app/globals.css`
- [ ] Tailwind `primary`, `accent`, and utility colors aligned to red (`#B91C1C`, `#991B1B`)
- [ ] `modules/ui/utils/brand-theme.ts` exports reviewed and synced with new tokens

## 2. Core Components
- [ ] Shared `Button` variants audited and migrated to red-focused styling
- [ ] Card/Banner components use red accents for hover and focus states
- [ ] Form inputs and focus rings standardized to `ring-brand`

## 3. Homepage Revamp
- [ ] Hero section rebuilt with red-forward media, CTA, and motion
- [ ] Featured collections grid updated with red badges/hover states
- [ ] Craftsmanship, legacy, and final CTA sections styled per playbook

## 4. Page Families
- [ ] Product listing pages apply red badges, hero bands, and CTA buttons
- [ ] Product detail pages adopt red dividers, inquiry CTAs, and gallery overlays
- [ ] Marketing pages (`/services`, `/portfolio`) alternate red-accent sections
- [ ] Informational pages (`/about`, `/faq`) include red typographic highlights
- [ ] Forms/support pages use red progress cues and confirmations

## 5. Assets & Content
- [ ] Cloudinary presets adjusted for red/white balance
- [ ] Iconography set to red line/duotone style
- [ ] Copy reviewed for premium tone consistent with brand

## 6. Quality Gates
- [ ] Contrast and accessibility checks (WCAG 2.1 AA) completed
- [ ] `prefers-reduced-motion` fallbacks verified
- [ ] Lighthouse/analytics baseline captured post-refresh

## 7. Governance
- [ ] Figma library and design docs updated with latest tokens/components
- [ ] Dev handbook references this checklist and the playbook
- [ ] Release checklist (`docs/release-theming-checklist.md`) appended with red/white QA steps
