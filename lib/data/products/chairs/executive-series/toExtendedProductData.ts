import type { Chair } from '../../../../types/chair';
import type { ExtendedProductData } from '../../../product-types';

/**
 * Type guard to check if an object is ExtendedProductData.
 */
export function isExtendedProductData(obj: any): obj is ExtendedProductData {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.category === 'string' &&
    typeof obj.seriesId === 'string'
  );
}

/**
 * Maps a Chair object to ExtendedProductData, filling required fields for ProductSeries.products.
 * Assumes all executive chairs are in the 'chairs' category and 'executive-series' seriesId.
 */
export function toExtendedProductData(chair: Chair): ExtendedProductData {
  return {
    id: chair.id,
    name: chair.name,
    description: chair.description,
    category: 'chairs',
    seriesId: 'executive-series',
    imageUrl: chair.imageUrl || (Array.isArray(chair.images) ? chair.images[0] : ''),
    images: Array.isArray(chair.images)
      ? chair.images.map(url => ({ url, alt: chair.name, width: 800, height: 600 }))
      : undefined,
    features: chair.features,
    variants: chair.variants as any, // Assume compatible, or add mapping if needed
    specifications: (chair as any).specifications,
    price: (chair as any).price,
    sku: (chair as any).sku,
    inStock: (chair as any).inStock,
  };
}
