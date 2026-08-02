/**
 * ProductService for fetching and managing product data
 */

import { logError, createServiceError, toServiceError } from '@modules/shared/utils/errors';
import { Product, ProductVariant } from './types';

/**
 * Director series data
 */
const directorSeriesData = {
  'ashley-director-chair': {
    id: 'ashley-director-chair',
    slug: 'ashley-director-chair',
    name: 'Ashley Director Chair',
    description: 'Premium director chair with high-quality materials and ergonomic design.',
    categorySlug: 'chairs',
    seriesSlug: 'director-series',
    images: [
      'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/main.jpg'
    ],
    variants: [
      {
        id: 'ashley-hb',
        variantId: 'hb',
        variantName: 'High Back',
        images: [
          'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg'
        ]
      },
      {
        id: 'ashley-mb',
        variantId: 'mb',
        variantName: 'Medium Back',
        images: [
          'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-362-mb.jpg'
        ]
      }
    ],
    featured: true,
    features: [
      'Premium quality materials',
      'Ergonomic design for comfort',
      'Adjustable height',
      'Foldable for easy storage',
      'Durable construction'
    ]
  },  'opera-director-chair': {
    id: 'opera-director-chair',
    slug: 'opera-director-chair',
    name: 'Opera Director Chair',
    description: 'Luxurious director chair with sophisticated design for elite settings.',
    categorySlug: 'chairs',
    seriesSlug: 'director-series',
    images: [
      'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/opera/main.jpg'
    ],
    variants: [
      {
        id: 'opera-hb',
        variantId: 'hb',
        variantName: 'High Back',
        images: [
          'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/opera/ic-340-hb.jpg'
        ]
      },
      {
        id: 'opera-mb',
        variantId: 'mb',
        variantName: 'Medium Back',
        images: [
          'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/opera/ic-341-mb.jpg'
        ]
      }
    ],
    featured: true,
    features: [
      'Premium Italian leather',
      'Chrome frame for durability',
      'Elegant design for high-end settings',
      'Superior comfort for extended use',
      'Includes carrying case'
    ]
  },  'tycoon-director-chair': {
    id: 'tycoon-director-chair',
    slug: 'tycoon-director-chair',
    name: 'Tycoon Director Chair',
    description: 'Executive director chair with premium materials and commanding presence.',
    categorySlug: 'chairs',
    seriesSlug: 'director-series',
    images: [
      'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/tycoon/main.jpg'
    ],
    variants: [
      {
        id: 'tycoon-hb',
        variantId: 'hb',
        variantName: 'High Back',
        images: [
          'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/tycoon/ic-01-hb.jpg'
        ]
      },
      {
        id: 'tycoon-mb',
        variantId: 'mb',
        variantName: 'Medium Back',
        images: [
          'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/tycoon/ic-02-mb.jpg'
        ]
      }
    ],
    featured: true,
    features: [
      'Premium full-grain leather',
      'Stainless steel frame for maximum stability',
      'Executive style for professional settings',
      'Extra wide seat for comfort',
      'Reinforced stitching for durability',
      'Includes premium carrying case'
    ]
  }
};

/**
 * ProductService class for managing product data
 */
export class ProductService {
  /**
   * Get all products
   */
  static async getAllProducts(): Promise<Product[]> {
    try {
      console.log('Fetching all products');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return all products
      return Object.values(directorSeriesData);
    } catch (error) {
      logError(error, 'ProductService.getAllProducts');
      throw toServiceError(error);
    }
  }

  /**
   * Get a product by its slug
   */
  static async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      console.log(`Fetching product by slug: ${slug}`);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find the product
      const product = directorSeriesData[slug];
      
      if (!product) {
        console.error(`Product not found with slug: ${slug}`);
        console.log('Available products:', Object.keys(directorSeriesData));
        return null;
      }
      
      return product;
    } catch (error) {
      logError(error, 'ProductService.getProductBySlug');
      throw toServiceError(error);
    }
  }

  /**
   * Get products by series
   */
  static async getProductsBySeries(seriesSlug: string): Promise<Product[]> {
    try {
      console.log(`Fetching products by series: ${seriesSlug}`);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter products by series
      return Object.values(directorSeriesData).filter(
        product => product.seriesSlug === seriesSlug
      );
    } catch (error) {
      logError(error, 'ProductService.getProductsBySeries');
      throw toServiceError(error);
    }
  }

  /**
   * Get a variant by ID
   */
  static async getVariantById(productSlug: string, variantId: string): Promise<ProductVariant | null> {
    try {
      console.log(`Fetching variant ${variantId} for product ${productSlug}`);
      const product = await this.getProductBySlug(productSlug);
      
      if (!product) {
        return null;
      }
      
      return product.variants.find(v => v.variantId === variantId) || null;
    } catch (error) {
      logError(error, 'ProductService.getVariantById');
      throw toServiceError(error);
    }
  }
}

/**
 * Default export
 */
export default ProductService;