import { tycoondirectorchair } from './director-series/tycoon-director-chair';
import { classicdirectorchair } from './director-series/classic-director-chair';
import { ashleydirectorchair } from './director-series/ashley-director-chair';

// Export the series data
export const directorSeries = {
  id: 'director-series',
  name: 'Director Series',
  description: 'Premium chairs for executives and directors.',
  products: {
    'tycoon-director-chair': tycoondirectorchair,
    'classic-director-chair': classicdirectorchair,
    'ashley-director-chair': ashleydirectorchair
  }
};

// Re-export individual chairs for direct access
export { tycoondirectorchair, classicdirectorchair, ashleydirectorchair };