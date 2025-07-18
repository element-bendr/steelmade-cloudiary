import { ExtendedProductData, ProductSeries } from '../../../product-types';
import { berlinErgonomicChair } from './berlin/index';
import { rogerErgonomicChair } from './roger/index';
import { udErgonomicChair } from './ud/index';
import { flamingoErgonomicChair } from './flamingo/index';
import { dcErgonomicChair } from './dc';
import { mercedesErgonomicChair } from './mercedes';
import { fleaErgonomicSeries } from './flea/index';
import { evErgonomicChair } from './ev/index';
import { tokyoErgonomicSeries } from './tokyo/index';
import { feedoErgonomicChair } from './feedo/index';
import { moscowErgonomicChair } from './moscow/index';
import { pinePonyWindyErgonomicChair } from './pine-pony-windy/index';
import { bbErgonomicChair } from './bb/index';
import { olaRomanErgonomicChair } from './ola-roman/index';

export const ergonomicSeriesProducts: Record<string, ExtendedProductData> = {
  [berlinErgonomicChair.id]: berlinErgonomicChair,
  [rogerErgonomicChair.id]: rogerErgonomicChair,
  [udErgonomicChair.id]: udErgonomicChair,
  [flamingoErgonomicChair.id]: flamingoErgonomicChair,
  [dcErgonomicChair.id]: dcErgonomicChair,
  [mercedesErgonomicChair.id]: mercedesErgonomicChair,
  [fleaErgonomicSeries.id]: fleaErgonomicSeries,
  [evErgonomicChair.id]: evErgonomicChair,
  [tokyoErgonomicSeries.id]: tokyoErgonomicSeries,
  [feedoErgonomicChair.id]: feedoErgonomicChair,
  [moscowErgonomicChair.id]: moscowErgonomicChair,
  [pinePonyWindyErgonomicChair.id]: pinePonyWindyErgonomicChair,
  [bbErgonomicChair.id]: bbErgonomicChair,
  [olaRomanErgonomicChair.id]: olaRomanErgonomicChair
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
