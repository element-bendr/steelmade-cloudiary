import { Product, ProductVariant } from '../types';

export function findDefaultVariant(product: Product): ProductVariant | undefined {
  return product.variants?.find(v => v.isDefault) || product.variants?.[0];
}

export function findProductImages(product: Product, variantId?: string) {
  if (!product.images) return [];
  
  // If no variant specified, return default or all images
  if (!variantId) {
    const defaultImage = product.images.find(img => img.isDefault);
    return defaultImage ? [defaultImage] : product.images;
  }
  
  // Filter images for specific variant (assuming images have variant tags)
  return product.images.filter(img => img.id.includes(variantId));
}