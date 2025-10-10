/**
 * ProductService class providing access to product data
 * This is a client-side service for managing product data
 */

import { Product, ProductVariant } from '../types';
import bigBossGoldDirectorChair from '../../../lib/data/products/chairs/director-series/bigboss-gold-director-chair/index';

// Director Series Data - hardcoded to avoid import errors
const directorSeriesData: Record<string, Product> = {
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
        ],
        specifications: {
          height: '44 inches',
          width: '24 inches',
          depth: '22 inches',
          weight: '12 lbs',
          material: 'Premium leather and aluminum'
        }
      },
      {
        id: 'ashley-mb',
        variantId: 'mb',
        variantName: 'Medium Back',
        images: [
          'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-362-mb.jpg'
        ],
        specifications: {
          height: '36 inches',
          width: '24 inches',
          depth: '22 inches',
          weight: '10 lbs',
          material: 'Premium leather and aluminum'
        }
      }
    ],
    specifications: {
      adjustableHeight: true,
      foldable: true,
      maximumWeight: '300 lbs',
      warranty: '5 years'
    },
    featured: true
  },
  'opera-director-chair': {
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
        ],
        specifications: {
          height: '48 inches',
          width: '26 inches',
          depth: '24 inches',
          weight: '14 lbs',
          material: 'Premium Italian leather and chrome'
        }
      },
      {
        id: 'opera-mb',
        variantId: 'mb',
        variantName: 'Medium Back',
        images: [
          'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/opera/ic-341-mb.jpg'
        ],
        specifications: {
          height: '40 inches',
          width: '26 inches',
          depth: '24 inches',
          weight: '12 lbs',
          material: 'Premium Italian leather and chrome'
        }
      }
    ],
    specifications: {
      adjustableHeight: true,
      foldable: true,
      maximumWeight: '320 lbs',
      warranty: '5 years'
    },
    featured: true
  },
  'tycoon-director-chair': {
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
        ],
        specifications: {
          height: '50 inches',
          width: '28 inches',
          depth: '26 inches',
          weight: '16 lbs',
          material: 'Premium full-grain leather and stainless steel'
        }
      },
      {
        id: 'tycoon-mb',
        variantId: 'mb',
        variantName: 'Medium Back',
        images: [
          'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/tycoon/ic-02-mb.jpg'
        ],
        specifications: {
          height: '42 inches',
          width: '28 inches',
          depth: '26 inches',
          weight: '14 lbs',
          material: 'Premium full-grain leather and stainless steel'
        }
      }
    ],
    specifications: {
      adjustableHeight: true,
      foldable: true,
      maximumWeight: '350 lbs',
      warranty: '10 years'
    },
    featured: true
  },
  'bigboss-gold-director-chair': {
    id: bigBossGoldDirectorChair.id,
    slug: 'bigboss-gold-director-chair',
    name: bigBossGoldDirectorChair.name,
    description: bigBossGoldDirectorChair.description,
    categorySlug: bigBossGoldDirectorChair.category,
    seriesSlug: bigBossGoldDirectorChair.seriesId,
    images: (bigBossGoldDirectorChair.images ?? []).map((img: { url: string } | string) => typeof img === 'string' ? img : img.url),
    variants: bigBossGoldDirectorChair.variants?.map((variant: typeof bigBossGoldDirectorChair.variants[number]) => ({
      id: variant.variantId,
      variantId: variant.variantId,
      variantName: variant.variantName,
      images: [variant.imageUrl],
      specifications: variant.specifications
    })) ?? [],
    specifications: bigBossGoldDirectorChair.specifications,
    features: bigBossGoldDirectorChair.features,
    featured: true
  }
};

class ProductServiceImpl {
  /**
   * Get a product by its ID
   */
  async getProductById(productId: string): Promise<Product | null> {
    try {
      console.log(`ProductService.getProductById called with ID: ${productId}`);
      
      // Check if product exists in director series data
      if (directorSeriesData[productId]) {
        console.log(`Product found in director series data: ${productId}`);
        return directorSeriesData[productId] as unknown as Product;
      }
      
      // If we reach here, product wasn't found
      console.log(`Product not found: ${productId}`);
      console.log(`Available products: ${Object.keys(directorSeriesData).join(', ')}`);
      return null;
    } catch (error) {
      console.error('Error in getProductById:', error);
      throw error;
    }
  }

  /**
   * Get a product by its slug
   */
  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      console.log(`ProductService.getProductBySlug called with slug: ${slug}`);
      
      // Check if product exists in director series data
      if (directorSeriesData[slug]) {
        console.log(`Product found in director series data: ${slug}`);
        return directorSeriesData[slug] as unknown as Product;
      }
      
      // If we reach here, product wasn't found
      console.log(`Product not found with slug: ${slug}`);
      console.log(`Available product slugs: ${Object.keys(directorSeriesData).join(', ')}`);
      return null;
    } catch (error) {
      console.error('Error in getProductBySlug:', error);
      throw error;
    }
  }

  /**
   * Get all products in a series
   */
  async getProductsBySeriesSlug(categorySlug: string, seriesSlug: string): Promise<Product[]> {
    try {
      console.log(`ProductService.getProductsBySeriesSlug called with category: ${categorySlug}, series: ${seriesSlug}`);
      
      // Filter products by category and series
      if (categorySlug === 'chairs' && seriesSlug === 'director-series') {
        const products = Object.values(directorSeriesData) as unknown as Product[];
        console.log(`Found ${products.length} products in series ${seriesSlug}`);
        return products;
      }
      
      // If we reach here, no products were found for the category/series
      console.log(`No products found for category: ${categorySlug}, series: ${seriesSlug}`);
      return [];
    } catch (error) {
      console.error('Error in getProductsBySeriesSlug:', error);
      throw error;
    }
  }
}

// Export a singleton instance of the ProductService
export const ProductService = new ProductServiceImpl();
