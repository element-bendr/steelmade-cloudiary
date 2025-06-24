import type { ExtendedProductData } from '@/lib/data/product-types';
export type { ExtendedProductData } from '@/lib/data/product-types';

/**
 * Template for creating a new product in any category.
 * Copy this file and fill in the details for your product.
 * All variants should be included in the `variants` array.
 */
export const newProductTemplate: ExtendedProductData = {
  id: 'product-id', // Unique product id (kebab-case)
  name: 'Product Name',
  description: 'Detailed description of the product.',
  category: 'category-name', // e.g., 'desks', 'storage', etc.
  seriesId: 'series-id', // e.g., 'modular-desks', 'office-storage', etc.
  imageUrl: 'https://your-cloudinary-url/main-image.jpg',
  features: [
    'Feature 1',
    'Feature 2',
    'Feature 3',
    'Feature 4',
    'Feature 5'
  ],
  specifications: {
    // e.g., 'Material': 'Steel and wood',
    // 'Dimensions': '120x60x75cm',
    // 'Warranty': '5 years'
  },
  variants: [
    {
      variantId: 'variant-1',
      variantName: 'Variant 1',
      name: 'Product Name - Variant 1',
      imageUrl: 'https://your-cloudinary-url/variant-1.jpg',
      description: 'Description for variant 1.'
      // specifications: { ... }
    },
    {
      variantId: 'variant-2',
      variantName: 'Variant 2',
      name: 'Product Name - Variant 2',
      imageUrl: 'https://your-cloudinary-url/variant-2.jpg',
      description: 'Description for variant 2.'
      // specifications: { ... }
    }
  ]
};
