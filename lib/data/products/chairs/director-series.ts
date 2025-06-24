import { ProductSeries } from '../../product-types';
import tycoonDirectorChair from './director-series/tycoon-director-chair/index';
import classicDirectorChair from './director-series/classic-director-chair/index';
import ashleyDirectorChair from './director-series/ashley-director-chair/index';

// Export the series data
export const directorSeries: ProductSeries = {
  id: 'director-series',
  title: 'Director Series',
  description: 'Premium chairs for executives and directors.',
  seoDescription: 'The Director Series: a poetic union of authority and comfort, designed for those who lead with vision. Each chair is a statement of presence and refined taste.',
  coverImage: {
    url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg',
    alt: 'Director Series Chair Collection',
    width: 1200,
    height: 800
  },
  products: {
    'tycoon-director-chair': tycoonDirectorChair,
    'classic-director-chair': classicDirectorChair,
    'ashley-director-chair': ashleyDirectorChair
  }
};

// Re-export individual chairs for direct access
export { tycoonDirectorChair, classicDirectorChair, ashleyDirectorChair };