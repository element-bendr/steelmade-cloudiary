// Homepage-specific color tokens for professional minimalist design
export const HOMEPAGE_THEME = {
  // Primary Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#FAFAFA', 
    accent: '#F8F9FA'
  } as const,
  
  // Text Colors  
  text: {
    primary: '#1F2937',
    secondary: '#374151',
    muted: '#6B7280'
  } as const,
  
  // Brand Accent
  accent: {
    primary: '#DC2626',
    hover: '#B91C1C',
    light: '#FEE2E2'
  } as const,
  
  // Supporting Colors
  border: '#E5E7EB',
  shadow: 'rgba(0, 0, 0, 0.05)'
} as const;

// Color utilities for consistent usage
export const getThemeColor = (path: string) => {
  const keys = path.split('.');
  let current: any = HOMEPAGE_THEME;
  
  for (const key of keys) {
    current = current[key];
    if (!current) return null;
  }
  
  return current;
};

// CSS Custom Properties for theme colors
export const homepageThemeVars = `
  --homepage-bg-primary: ${HOMEPAGE_THEME.background.primary};
  --homepage-bg-secondary: ${HOMEPAGE_THEME.background.secondary};
  --homepage-bg-accent: ${HOMEPAGE_THEME.background.accent};
  --homepage-text-primary: ${HOMEPAGE_THEME.text.primary};
  --homepage-text-secondary: ${HOMEPAGE_THEME.text.secondary};
  --homepage-text-muted: ${HOMEPAGE_THEME.text.muted};
  --homepage-accent-primary: ${HOMEPAGE_THEME.accent.primary};
  --homepage-accent-hover: ${HOMEPAGE_THEME.accent.hover};
  --homepage-accent-light: ${HOMEPAGE_THEME.accent.light};
  --homepage-border: ${HOMEPAGE_THEME.border};
  --homepage-shadow: ${HOMEPAGE_THEME.shadow};
`;

export type HomepageTheme = typeof HOMEPAGE_THEME;