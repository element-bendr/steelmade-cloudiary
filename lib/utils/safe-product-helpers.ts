/**
 * This file replaces the problematic product-helpers.ts file
 * with a safer implementation that doesn't throw errors when
 * processing data.
 */

/**
 * Process series data with extra safety checks
 * This function avoids using Object.entries() which was causing errors
 */
export const processSeriesData = (seriesMap: any): any[] => {
  // Early return for invalid input
  if (!seriesMap || typeof seriesMap !== 'object') {
    console.warn('Invalid or missing seriesMap data', { seriesMap });
    return [];
  }

  const result: any[] = [];
  
  try {
    // Safer alternative to Object.entries().forEach()
    const seriesIds = Object.keys(seriesMap);
    
    for (let i = 0; i < seriesIds.length; i++) {
      const seriesId = seriesIds[i];
      const series = seriesMap[seriesId];
      
      // Skip if series is invalid
      if (!series || typeof series !== 'object') {
        console.warn(`Invalid series data for seriesId: ${seriesId}`, { series });
        continue;
      }
      
      // Process products if they exist
      let productsArray: any[] = [];
      
      if (series.products && typeof series.products === 'object') {
        try {
          const productIds = Object.keys(series.products);
          
          for (let j = 0; j < productIds.length; j++) {
            const productId = productIds[j];
            const product = series.products[productId];
            
            if (product && typeof product === 'object') {
              productsArray.push({
                ...product,
                seriesId
              });
            }
          }
        } catch (productError) {
          console.error('Error processing products:', productError);
        }
      }
      
      // Add to result
      result.push({
        id: seriesId,
        products: productsArray,
        ...series
      });
    }
  } catch (error) {
    console.error('Error in processSeriesData:', error);
  }
  
  return result;
};

/**
 * Get all series IDs from the data
 */
export const getAllSeriesIds = (data: any): string[] => {
  if (!data || typeof data !== 'object') {
    return [];
  }
  
  try {
    return Object.keys(data);
  } catch (error) {
    console.error('Error getting series IDs:', error);
    return [];
  }
};

/**
 * Safely get products by series ID
 */
export const getProductsBySeries = (data: any, seriesId: string): any[] => {
  if (!data || typeof data !== 'object' || !seriesId) {
    return [];
  }
  
  try {
    const series = data[seriesId];
    if (!series || typeof series !== 'object' || !series.products) {
      return [];
    }
    
    const products = series.products;
    const result: any[] = [];
    
    for (const productId in products) {
      if (Object.prototype.hasOwnProperty.call(products, productId)) {
        const product = products[productId];
        if (product && typeof product === 'object') {
          result.push({
            id: productId,
            ...product
          });
        }
      }
    }
    
    return result;
  } catch (error) {
    console.error(`Error getting products for series ${seriesId}:`, error);
    return [];
  }
};