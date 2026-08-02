import { safeObjectEntries } from '@/lib/utils/safe-data-processing';

export const processSeriesData = (seriesMap: Record<string, any> | null | undefined) => {
  if (!seriesMap) {
    console.warn('Invalid series map provided:', seriesMap);
    return [];
  }
  
  const result = [];
  
  // Process each series in the category using safe function
  try {
    for (const [seriesId, series] of safeObjectEntries(seriesMap)) {
      if (series && typeof series === 'object') {
        result.push({
          id: seriesId,
          ...series
        });
      }
    }
  } catch (error) {
    console.error('Error processing series data:', error);
  }
  
  return result;
};