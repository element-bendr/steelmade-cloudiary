import { describe, test, expect } from 'vitest';
import { findDefaultVariant, findProductImages } from '../../src/utils';
import type { Product } from '../../src/types';

describe('Product Utils', () => {
  const mockProduct: Product = {
    id: 'test',
    title: 'Test Product',
    description: 'A test product',
    variants: [
      { variantId: 'v1', variantName: 'Variant 1' },
      { variantId: 'v2', variantName: 'Variant 2', isDefault: true }
    ],
    images: [
      { id: 'img1-v1', url: 'url1', alt: 'Image 1' },
      { id: 'img2-v2', url: 'url2', alt: 'Image 2', isDefault: true }
    ]
  };

  test('findDefaultVariant returns default variant', () => {
    const variant = findDefaultVariant(mockProduct);
    expect(variant?.variantId).toBe('v2');
  });

  test('findProductImages filters by variant', () => {
    const images = findProductImages(mockProduct, 'v1');
    expect(images).toHaveLength(1);
    expect(images[0].id).toBe('img1-v1');
  });
});