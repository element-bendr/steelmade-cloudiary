/**
 * Simple product data type for internal use
 */
interface SimpleProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  categorySlug?: string;
  seriesSlug?: string;
  images?: string[];
  variants?: any[];
  [key: string]: any;
}

/**
 * Get products by series slug - stub implementation
 */
export const getProductsBySeriesSlug = async (categorySlug: string, seriesSlug: string): Promise<SimpleProduct[]> => {
  console.log(`Getting products for ${categorySlug}/${seriesSlug}`);
  
  // Return empty array as a fallback
  return [];
};

/**
 * Get product by slug - stub implementation
 */
export const getProductBySlug = async (slug: string): Promise<SimpleProduct | null> => {
  console.log(`Getting product with slug: ${slug}`);
  
  // Return null as a fallback
  return null;
};

/**
 * Process series data safely
 */
export const processSeriesData = (seriesMap: Record<string, any> | null | undefined) => {
  if (!seriesMap) {
    console.warn('Invalid series map provided:', seriesMap);
    return [];
  }
  
  const result = [];
  
  // Process each series in the category using safe approach
  try {
    // Use for...in loop which is safer with potentially null objects
    for (const seriesId in seriesMap) {
      if (Object.prototype.hasOwnProperty.call(seriesMap, seriesId)) {
        const series = seriesMap[seriesId];
        if (series && typeof series === 'object') {
          result.push({
            id: seriesId,
            ...series
          });
        }
      }
    }
  } catch (error) {
    console.error('Error processing series data:', error);
  }
  
  return result;
};