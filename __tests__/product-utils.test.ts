
import { describe, it, expect } from 'vitest';
import { isValidCategorySlug } from '../types/product-categories';

describe('[unit][utils] product category utilities', () => {
  it('[slug] accepts valid standard product category slugs', () => {
    expect(isValidCategorySlug('chairs')).toBe(true);
    expect(isValidCategorySlug('desks')).toBe(true);
    expect(isValidCategorySlug('tables')).toBe(true);
  });

  it('[slug] rejects invalid or empty category slugs', () => {
    expect(isValidCategorySlug('invalid-category')).toBe(false);
    expect(isValidCategorySlug('')).toBe(false);
  });
});
