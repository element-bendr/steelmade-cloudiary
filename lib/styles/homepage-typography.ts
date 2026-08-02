// Professional typography system for homepage
export const HOMEPAGE_TYPOGRAPHY = {
  // Font Sizes (rem values)
  fontSize: {
    hero: '3.5rem',    // 56px - Hero headlines
    h1: '2.25rem',     // 36px - Section titles
    h2: '1.875rem',    // 30px - Subsection titles
    h3: '1.5rem',      // 24px - Subsections
    body: '1rem',      // 16px - Regular content
    small: '0.875rem', // 14px - Supporting text
    xs: '0.75rem'      // 12px - Labels, captions
  } as const,
  
  // Line Heights
  lineHeight: {
    hero: '1.1',
    heading: '1.25',
    body: '1.6',
    tight: '1.4'
  } as const,
  
  // Font Weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800'
  } as const,
  
  // Letter Spacing
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em'
  } as const
} as const;

// Typography utility classes
export const typographyClasses = {
  hero: {
    fontSize: HOMEPAGE_TYPOGRAPHY.fontSize.hero,
    lineHeight: HOMEPAGE_TYPOGRAPHY.lineHeight.hero,
    fontWeight: HOMEPAGE_TYPOGRAPHY.fontWeight.bold,
    letterSpacing: HOMEPAGE_TYPOGRAPHY.letterSpacing.tight
  },
  h1: {
    fontSize: HOMEPAGE_TYPOGRAPHY.fontSize.h1,
    lineHeight: HOMEPAGE_TYPOGRAPHY.lineHeight.heading,
    fontWeight: HOMEPAGE_TYPOGRAPHY.fontWeight.bold,
    letterSpacing: HOMEPAGE_TYPOGRAPHY.letterSpacing.tight
  },
  h2: {
    fontSize: HOMEPAGE_TYPOGRAPHY.fontSize.h2,
    lineHeight: HOMEPAGE_TYPOGRAPHY.lineHeight.heading,
    fontWeight: HOMEPAGE_TYPOGRAPHY.fontWeight.semibold,
    letterSpacing: HOMEPAGE_TYPOGRAPHY.letterSpacing.normal
  },
  h3: {
    fontSize: HOMEPAGE_TYPOGRAPHY.fontSize.h3,
    lineHeight: HOMEPAGE_TYPOGRAPHY.lineHeight.heading,
    fontWeight: HOMEPAGE_TYPOGRAPHY.fontWeight.semibold,
    letterSpacing: HOMEPAGE_TYPOGRAPHY.letterSpacing.normal
  },
  body: {
    fontSize: HOMEPAGE_TYPOGRAPHY.fontSize.body,
    lineHeight: HOMEPAGE_TYPOGRAPHY.lineHeight.body,
    fontWeight: HOMEPAGE_TYPOGRAPHY.fontWeight.normal,
    letterSpacing: HOMEPAGE_TYPOGRAPHY.letterSpacing.normal
  },
  small: {
    fontSize: HOMEPAGE_TYPOGRAPHY.fontSize.small,
    lineHeight: HOMEPAGE_TYPOGRAPHY.lineHeight.body,
    fontWeight: HOMEPAGE_TYPOGRAPHY.fontWeight.normal,
    letterSpacing: HOMEPAGE_TYPOGRAPHY.letterSpacing.normal
  }
} as const;

// CSS Custom Properties for typography
export const typographyVars = `
  --font-size-hero: ${HOMEPAGE_TYPOGRAPHY.fontSize.hero};
  --font-size-h1: ${HOMEPAGE_TYPOGRAPHY.fontSize.h1};
  --font-size-h2: ${HOMEPAGE_TYPOGRAPHY.fontSize.h2};
  --font-size-h3: ${HOMEPAGE_TYPOGRAPHY.fontSize.h3};
  --font-size-body: ${HOMEPAGE_TYPOGRAPHY.fontSize.body};
  --font-size-small: ${HOMEPAGE_TYPOGRAPHY.fontSize.small};
  --line-height-hero: ${HOMEPAGE_TYPOGRAPHY.lineHeight.hero};
  --line-height-heading: ${HOMEPAGE_TYPOGRAPHY.lineHeight.heading};
  --line-height-body: ${HOMEPAGE_TYPOGRAPHY.lineHeight.body};
  --font-weight-normal: ${HOMEPAGE_TYPOGRAPHY.fontWeight.normal};
  --font-weight-medium: ${HOMEPAGE_TYPOGRAPHY.fontWeight.medium};
  --font-weight-semibold: ${HOMEPAGE_TYPOGRAPHY.fontWeight.semibold};
  --font-weight-bold: ${HOMEPAGE_TYPOGRAPHY.fontWeight.bold};
`;

export type HomepageTypography = typeof HOMEPAGE_TYPOGRAPHY;