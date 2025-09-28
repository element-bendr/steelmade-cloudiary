import { useEffect } from 'react';
import { getCategoryTheme, applyCssVars, generateCssVarsString } from '../lib/styles/category-themes';

export function useCategoryTheme(categoryId?: string) {
  const theme = getCategoryTheme(categoryId);

  useEffect(() => {
    // Apply CSS vars for client-side runtime
    applyCssVars(theme);
    return () => {
      // cleanup: not removing variables to avoid flicker; override on next call instead
    };
  }, [categoryId]);

  // For SSR usage, generateCssVarsString(theme) can be used when rendering head.
  return { theme, cssVarsString: generateCssVarsString(theme) } as const;
}
