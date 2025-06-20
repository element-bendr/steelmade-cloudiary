/**
 * Safe implementation of Object.entries that handles null/undefined objects
 */
export function safeObjectEntries<T>(obj: Record<string, T> | null | undefined): [string, T][] {
  if (!obj) return [];
  return Object.entries(obj) as [string, T][];
}

/**
 * Process series data safely
 * @param seriesMap The series map to process
 */
export const processSeriesData = (seriesMap: Record<string, any> | null | undefined) => {
  if (!seriesMap) {
    console.warn('Invalid series map provided:', seriesMap);
    return [];
  }
  
  const result = [];
  
  // Process each series in the category using safe function
  try {
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