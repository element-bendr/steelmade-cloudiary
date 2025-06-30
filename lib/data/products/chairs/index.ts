import { executiveSeries } from './executive-series/index';
import { ergonomicSeries } from './ergonomic-series';
import { ProductCategoryData } from '@/lib/data/product-types';
import { directorSeries } from './director-series';
import { visitorSeries } from './visitor-series';
import { multipurposeSeries } from './multipurpose-series';

// Export the chairs category with all its series
export const chairs: ProductCategoryData = {
  'director-series': directorSeries,
  'executive-series': executiveSeries,
  'ergonomic-series': ergonomicSeries,
  'visitor-series': visitorSeries,
  'multipurpose-series': multipurposeSeries
  // Add more series as they are created
};

// Re-export individual series for direct access
export { directorSeries, executiveSeries, ergonomicSeries, visitorSeries, multipurposeSeries };