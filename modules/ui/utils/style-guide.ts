/**
 * SteelMade UI Style Guide
 * 
 * This module provides consistent styling variables and utility functions
 * for implementing the SteelMade brand design across the application.
 */

/**
 * Brand Colors
 */
export const BRAND_COLORS = {
  // Primary brand colors
  primary: {
    DEFAULT: '#B91C1C', // Main brand red
    light: '#E05252',
    dark: '#8A1515',
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C', // Main brand red
    800: '#991B1B',
    900: '#7F1D1D',
    950: '#450A0A',
  },
  
  // Neutral colors for text, backgrounds, and UI elements
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },
  
  // Accent colors for secondary elements
  accent: {
    blue: '#3B82F6',
    green: '#10B981',
    yellow: '#F59E0B',
    purple: '#8B5CF6',
  },
  
  // Semantic colors for statuses and messaging
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // Surface colors for cards, panels, and backgrounds
  surface: {
    light: '#FFFFFF',
    dark: '#1F2937',
    card: {
      light: 'rgba(255, 255, 255, 0.8)',
      dark: 'rgba(31, 41, 55, 0.8)',
    },
    glassmorphic: {
      light: 'rgba(255, 255, 255, 0.1)',
      dark: 'rgba(0, 0, 0, 0.2)',
    },
  },
};

/**
 * Typography
 */
export const TYPOGRAPHY = {
  fontFamily: {
    sans: 'var(--font-sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif)',
    heading: 'var(--font-heading, var(--font-sans))',
    mono: 'var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace)',
  },
  
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

/**
 * Spacing
 */
export const SPACING = {
  px: '1px',
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  28: '7rem',      // 112px
  32: '8rem',      // 128px
  36: '9rem',      // 144px
  40: '10rem',     // 160px
  44: '11rem',     // 176px
  48: '12rem',     // 192px
  52: '13rem',     // 208px
  56: '14rem',     // 224px
  60: '15rem',     // 240px
  64: '16rem',     // 256px
  72: '18rem',     // 288px
  80: '20rem',     // 320px
  96: '24rem',     // 384px
};

/**
 * Border Radius
 */
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem',     // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',     // 6px
  lg: '0.5rem',       // 8px
  xl: '0.75rem',      // 12px
  '2xl': '1rem',      // 16px
  '3xl': '1.5rem',    // 24px
  full: '9999px',
};

/**
 * Shadows
 */
export const SHADOWS = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
  
  // Custom brand shadows
  card: '0 4px 20px rgba(0, 0, 0, 0.08)',
  'card-hover': '0 10px 30px rgba(0, 0, 0, 0.12)',
  'brand-sm': '0 4px 10px rgba(185, 28, 28, 0.2)',
  'brand-md': '0 6px 20px rgba(185, 28, 28, 0.25)',
  'brand-lg': '0 8px 30px rgba(185, 28, 28, 0.3)',
};

/**
 * Transitions
 */
export const TRANSITIONS = {
  default: {
    duration: '300ms',
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    property: 'all',
  },
  fast: {
    duration: '150ms',
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    property: 'all',
  },
  slow: {
    duration: '500ms',
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    property: 'all',
  },
  spring: {
    duration: '500ms',
    timing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    property: 'all',
  },
  
  // Full transition strings ready to use
  standard: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  quick: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

/**
 * Z-Index
 */
export const Z_INDEX = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  75: 75,
  100: 100,
  
  // Semantic z-indexes
  base: 0,
  elevated: 10,
  dropdown: 50,
  sticky: 100,
  drawer: 200,
  modal: 300,
  popover: 400,
  toast: 500,
  tooltip: 600,
};

/**
 * Glassmorphism
 */
export const GLASSMORPHISM = {
  light: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.2)',
    shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
    blur: 'backdrop-filter: blur(8px)',
  },
  dark: {
    background: 'rgba(0, 0, 0, 0.2)',
    border: 'rgba(255, 255, 255, 0.1)',
    shadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
    blur: 'backdrop-filter: blur(8px)',
  },
  red: {
    background: 'rgba(185, 28, 28, 0.05)',
    border: 'rgba(185, 28, 28, 0.2)',
    shadow: '0 8px 32px 0 rgba(185, 28, 28, 0.15)',
    blur: 'backdrop-filter: blur(8px)',
  },
};

/**
 * Utility function to generate gradient text
 */
export const gradientText = (from = BRAND_COLORS.primary[600], to = BRAND_COLORS.primary[800]) => {
  return {
    backgroundImage: `linear-gradient(to right, ${from}, ${to})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  };
};

/**
 * Utility function to generate glassmorphism styles
 */
export const glassmorphism = (
  options = {
    variant: 'light',
    opacity: 0.1,
    blurAmount: '8px',
    borderOpacity: 0.2,
  }
) => {
  const { variant, opacity, blurAmount, borderOpacity } = options;
  
  const baseColor = variant === 'dark' 
    ? 'rgba(0, 0, 0, ' 
    : variant === 'red' 
      ? 'rgba(185, 28, 28, ' 
      : 'rgba(255, 255, 255, ';
  
  const borderColor = variant === 'dark' 
    ? 'rgba(255, 255, 255, ' 
    : variant === 'red' 
      ? 'rgba(185, 28, 28, ' 
      : 'rgba(255, 255, 255, ';
  
  return {
    backgroundColor: `${baseColor}${opacity})`,
    backdropFilter: `blur(${blurAmount})`,
    WebkitBackdropFilter: `blur(${blurAmount})`,
    borderColor: `${borderColor}${borderOpacity})`,
    borderWidth: '1px',
    borderStyle: 'solid',
  };
};

/**
 * Utility function to generate a consistent brand button style
 */
export const brandButton = (
  options = {
    variant: 'primary', // 'primary', 'outline', 'ghost'
    size: 'md', // 'sm', 'md', 'lg'
    rounded: 'md', // 'sm', 'md', 'lg', 'full'
  }
) => {
  const { variant, size, rounded } = options;
  
  // Base styles
  const baseStyles = {
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    transition: TRANSITIONS.standard,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  // Size variations
  const sizeStyles: Record<SizeKey, { fontSize: string; padding: string }> = {
    sm: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      padding: `${SPACING[1.5]} ${SPACING[3]}`,
    },
    md: {
      fontSize: TYPOGRAPHY.fontSize.base,
      padding: `${SPACING[2]} ${SPACING[4]}`,
    },
    lg: {
      fontSize: TYPOGRAPHY.fontSize.lg,
      padding: `${SPACING[2.5]} ${SPACING[5]}`,
    },
  };
  // Border radius variations
  const roundedStyles: Record<RoundedKey, string> = {
    sm: BORDER_RADIUS.sm,
    md: BORDER_RADIUS.DEFAULT,
    lg: BORDER_RADIUS.lg,
    full: BORDER_RADIUS.full,
  };
  // Variant styles
  const variantStyles: Record<VariantKey, any> = {
    primary: {
      backgroundColor: BRAND_COLORS.primary.DEFAULT,
      color: 'white',
      ':hover': {
        backgroundColor: BRAND_COLORS.primary.dark,
      },
      ':focus': {
        boxShadow: `0 0 0 2px ${BRAND_COLORS.primary[100]}`,
      },
    },
    outline: {
      backgroundColor: 'transparent',
      color: BRAND_COLORS.primary.DEFAULT,
      borderWidth: '1px',
      borderColor: BRAND_COLORS.primary.DEFAULT,
      ':hover': {
        backgroundColor: BRAND_COLORS.primary[50],
      },
      ':focus': {
        boxShadow: `0 0 0 2px ${BRAND_COLORS.primary[100]}`,
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: BRAND_COLORS.primary.DEFAULT,
      ':hover': {
        backgroundColor: BRAND_COLORS.primary[50],
      },
      ':focus': {
        boxShadow: `0 0 0 2px ${BRAND_COLORS.primary[100]}`,
      },
    },
  };
  
  // Type guards for safe object indexing
  const sizeKeys = ['sm', 'md', 'lg'] as const;
  type SizeKey = typeof sizeKeys[number];
  function isSizeKey(key: string | undefined): key is SizeKey {
    return sizeKeys.includes((key ?? 'md') as SizeKey);
  }

  const roundedKeys = ['sm', 'md', 'lg', 'full'] as const;
  type RoundedKey = typeof roundedKeys[number];
  function isRoundedKey(key: string | undefined): key is RoundedKey {
    return roundedKeys.includes((key ?? 'md') as RoundedKey);
  }

  const variantKeys = ['primary', 'outline', 'ghost'] as const;
  type VariantKey = typeof variantKeys[number];
  function isVariantKey(key: string | undefined): key is VariantKey {
    return variantKeys.includes((key ?? 'primary') as VariantKey);
  }
  
  const safeSize: SizeKey = isSizeKey(size) ? size! : 'md';
  const safeRounded: RoundedKey = isRoundedKey(rounded) ? rounded! : 'md';
  const safeVariant: VariantKey = isVariantKey(variant) ? variant! : 'primary';
  return {
    ...baseStyles,
    ...sizeStyles[safeSize],
    borderRadius: roundedStyles[safeRounded],
    ...variantStyles[safeVariant],
  };
};