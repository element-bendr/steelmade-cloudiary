
import { describe, it, expect } from 'vitest';
import { isValidCategorySlug } from '../types/product-categories';

describe('Product Utils', () => {
  it('should validate standard product categories correctly', () => {
    expect(isValidCategorySlug('chairs')).toBe(true);
    expect(isValidCategorySlug('desks')).toBe(true);
    expect(isValidCategorySlug('tables')).toBe(true);
  });

  it('should reject invalid categories', () => {
    expect(isValidCategorySlug('invalid-category')).toBe(false);
    expect(isValidCategorySlug('')).toBe(false);
  });
});
