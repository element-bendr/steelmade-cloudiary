import { expect, test, describe } from 'vitest';
import { validateProduct, ProductSchema } from '../src/validation';

describe('[unit][product][validation] product validation', () => {
  test('[schema] accepts a valid product payload', () => {
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

  test('[schema] rejects an invalid product payload', () => {
    const invalidProduct = {
      id: 'test-product',
      // missing required title
      description: 'A test product'
    };

    expect(() => validateProduct(invalidProduct)).toThrow();
  });
});