// Typed category theme system
export type CategoryTheme = {
  readonly primary: string;
  readonly accent: string;
  readonly background: string;
  readonly surface: string;
  readonly text: string;
  readonly muted: string;
  readonly gradients: Record<string, string>;
  readonly card: {
    readonly bg: string;
    readonly border: string;
    readonly shadow: string;
  };
  readonly spacing: {
    readonly gutter: string;
    readonly cardPadding: string;
  };
};

export const DEFAULT_THEME: CategoryTheme = {
  primary: '#1f2937', // slate-800
  accent: '#06b6d4', // cyan-400
  background: '#ffffff',
  surface: '#f8fafc',
  text: '#111827',
  muted: '#6b7280',
  gradients: {
    subtle: 'linear-gradient(90deg,#06b6d4 0%, #3b82f6 100%)',
  },
  card: {
    bg: '#ffffff',
    border: '#e6eaf0',
    shadow: '0 4px 14px rgba(16,24,40,0.08)'
  },
  spacing: {
    gutter: '1rem',
    cardPadding: '1rem'
  }
};

// Lightweight set of category themes. Values chosen to be visually compatible with the
// existing site; exact color tokens can be adjusted later to match pixel-perfect values.
export const THEMES: Record<string, CategoryTheme> = {
  chairs: DEFAULT_THEME,
  desks: {
    ...DEFAULT_THEME,
    primary: '#0f766e', // teal-700
    accent: '#7c3aed'
  },
  'storage-solutions': {
    ...DEFAULT_THEME,
    primary: '#b45309', // amber-700
    accent: '#f97316'
  },
  'hospital-furniture': {
    ...DEFAULT_THEME,
    primary: '#065f46', // emerald-800
    accent: '#14b8a6'
  },
  'school-furniture': {
    ...DEFAULT_THEME,
    primary: '#1e3a8a', // indigo-800
    accent: '#f59e0b'
  },
  'racking-systems': {
    ...DEFAULT_THEME,
    primary: '#0ea5a4',
    accent: '#0284c7'
  },
  'modular-furniture': {
    ...DEFAULT_THEME,
    primary: '#7c3aed',
    accent: '#db2777'
  },
  'office-accessories': {
    ...DEFAULT_THEME,
    primary: '#374151',
    accent: '#10b981'
  },
  'workstations': {
    ...DEFAULT_THEME,
    primary: '#7c3aed', // purple-700 - innovation theme
    accent: '#06b6d4'   // cyan-500 - modern workspace
  }
};

export function getCategoryTheme(categoryId?: string): CategoryTheme {
  if (!categoryId) return DEFAULT_THEME;
  return THEMES[categoryId] ?? DEFAULT_THEME;
}

// Convert theme to CSS custom properties map. Keys are full property names (e.g. --sm-primary).
export function themeToCssVars(theme: CategoryTheme, prefix = '--sm'): Record<string, string> {
  return {
    [`${prefix}-primary`]: theme.primary,
    [`${prefix}-accent`]: theme.accent,
    [`${prefix}-bg`]: theme.background,
    [`${prefix}-surface`]: theme.surface,
    [`${prefix}-text`]: theme.text,
    [`${prefix}-muted`]: theme.muted,
    [`${prefix}-card-bg`]: theme.card.bg,
    [`${prefix}-card-border`]: theme.card.border,
    [`${prefix}-card-shadow`]: theme.card.shadow,
    [`${prefix}-gutter`]: theme.spacing.gutter,
    [`${prefix}-card-padding`]: theme.spacing.cardPadding
  };
}

// Generate a CSS string for server-side injection: "--sm-primary: #fff; --sm-accent: #...;"
export function generateCssVarsString(theme: CategoryTheme, prefix = '--sm'): string {
  const vars = themeToCssVars(theme, prefix);
  return Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join(' ');
}

// Apply CSS variables to document.documentElement (client-side). No-op during SSR.
export function applyCssVars(theme: CategoryTheme, prefix = '--sm'): void {
  if (typeof document === 'undefined') return;
  const vars = themeToCssVars(theme, prefix);
  Object.entries(vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
}
