import { ExtendedProductData, ProductSeries } from '../../../product-types';

// Placeholder for visitor series products
export const visitorSeriesProducts: Record<string, ExtendedProductData> = {};

export const visitorSeries: ProductSeries = {
  id: 'visitor-series',
  title: 'Visitor Series',
  description: 'A poetic collection of visitor chairs, designed for comfort, elegance, and welcoming every guest with grace.',
  seoDescription: 'The Visitor Series: a celebration of hospitality and design, offering poetic comfort for every guest and every space.',
  coverImage: {
    url: '',
    alt: 'Visitor Series Chair Collection',
    width: 1200,
    height: 800
  },
  products: visitorSeriesProducts
};

export default visitorSeries;
