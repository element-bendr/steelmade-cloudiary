import { expect, test, describe } from 'vitest';
import { validateProduct, ProductSchema } from '../src/validation';

describe('Product Validation', () => {
  test('validates a valid product', () => {
    const validProduct = {
      id: 'test-product',
      title: 'Test Product',
      description: 'A test product',
      images: [
        {
          id: 'img1',
          url: 'https://example.com/image.jpg',
          alt: 'Test Image'
        }
      ]
    };

    expect(() => validateProduct(validProduct)).not.toThrow();
  });

  test('throws on invalid product', () => {
    const invalidProduct = {
      id: 'test-product',
      // missing required title
      description: 'A test product'
    };

    expect(() => validateProduct(invalidProduct)).toThrow();
  });
});