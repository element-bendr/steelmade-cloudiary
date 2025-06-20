/**
 * Brand theme constants and utilities
 */

// Brand colors
export const BRAND_COLORS = {
  primary: '#B91C1C', // SteelMade red
  primaryLight: '#DC2626',
  primaryDark: '#991B1B',
  secondary: '#1E293B', // Slate dark
  secondaryLight: '#334155',
  accent: '#F59E0B', // Amber for accents
  neutral: '#E5E7EB',
  neutralDark: '#9CA3AF',
  background: '#F9FAFB',
  backgroundDark: '#111827',
  text: '#1F2937',
  textLight: '#6B7280',
  white: '#FFFFFF',
  black: '#000000',
};

// Typography scale
export const TYPOGRAPHY = {
  fontFamily: {
    sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeight: {
    thin: '100',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
};

// Spacing scale
export const SPACING = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
};

// Border radius
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

// Shadows
export const SHADOWS = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

// Transitions
export const TRANSITIONS = {
  DEFAULT: 'all 0.3s ease',
  fast: 'all 0.15s ease',
  slow: 'all 0.5s ease',
};

// Glassmorphism effects
export const GLASSMORPHISM = {
  light: 'bg-white/10 backdrop-blur-md border border-white/20',
  medium: 'bg-white/20 backdrop-blur-md border border-white/30',
  dark: 'bg-black/10 backdrop-blur-md border border-white/10',
  card: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300',
};

/**
 * Get a CSS variable compatible version of the brand theme
 */
export function getBrandThemeCssVariables() {
  return {
    '--color-primary': BRAND_COLORS.primary,
    '--color-primary-light': BRAND_COLORS.primaryLight,
    '--color-primary-dark': BRAND_COLORS.primaryDark,
    '--color-secondary': BRAND_COLORS.secondary,
    '--color-secondary-light': BRAND_COLORS.secondaryLight,
    '--color-accent': BRAND_COLORS.accent,
    '--color-neutral': BRAND_COLORS.neutral,
    '--color-neutral-dark': BRAND_COLORS.neutralDark,
    '--color-background': BRAND_COLORS.background,
    '--color-background-dark': BRAND_COLORS.backgroundDark,
    '--color-text': BRAND_COLORS.text,
    '--color-text-light': BRAND_COLORS.textLight,
    '--transition-default': TRANSITIONS.DEFAULT,
    '--transition-fast': TRANSITIONS.fast,
    '--transition-slow': TRANSITIONS.slow,
  };
}

/**
 * Apply brand theme CSS variables to an element
 */
export function applyBrandTheme(element: HTMLElement) {
  const variables = getBrandThemeCssVariables();
  Object.entries(variables).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });
}

/**
 * Get brand theme class names for common UI elements
 */
export const BRAND_CLASSES = {
  button: {
    primary: 'bg-[#B91C1C] hover:bg-[#991B1B] text-white font-medium py-2 px-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg',
    secondary: 'bg-[#1E293B] hover:bg-[#334155] text-white font-medium py-2 px-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg',
    outline: 'border border-[#B91C1C] text-[#B91C1C] hover:bg-[#B91C1C] hover:text-white font-medium py-2 px-4 rounded-md transition-all duration-300',
    ghost: 'text-[#B91C1C] hover:bg-[#B91C1C]/10 font-medium py-2 px-4 rounded-md transition-all duration-300',
  },
  card: {
    default: 'bg-white dark:bg-[#1E293B] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 dark:bg-[#1E293B]/20 dark:border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden',
  },
  input: {
    default: 'border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B91C1C] transition-all duration-300',
  },
  text: {
    heading: 'text-[#1F2937] dark:text-white font-bold',
    subheading: 'text-[#4B5563] dark:text-gray-300 font-medium',
    body: 'text-[#6B7280] dark:text-gray-400',
    accent: 'text-[#B91C1C]',
  },
};