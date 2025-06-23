import { ExtendedProductData, ProductSeries } from '../../../product-types';
import { berlinErgonomicChair } from './berlin';
import { rogerErgonomicChair } from './roger';
import { udErgonomicChair } from './ud';

export const ergonomicSeriesProducts: Record<string, ExtendedProductData> = {
  [berlinErgonomicChair.id]: berlinErgonomicChair,
  [rogerErgonomicChair.id]: rogerErgonomicChair,
  [udErgonomicChair.id]: udErgonomicChair
};

export const ergonomicSeries: ProductSeries = {
  id: 'ergonomic-series',
  title: 'Ergonomic Series',
  description: 'Chairs engineered for comfort, health, and productivity in every workspace.',
  seoDescription:
    'The Ergonomic Series is a celebration of well-being—each chair designed to support, adapt, and inspire. Experience the poetry of posture and the harmony of health in every detail.',
  coverImage: {
    url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750425884/steelmade/chairs/ergonomic-series/ud/ic-329-hb-grey.png',
    alt: 'A poetic view of the Ergonomic Series chair, embracing comfort and support.',
    width: 1200,
    height: 800
  },
  products: ergonomicSeriesProducts
};
