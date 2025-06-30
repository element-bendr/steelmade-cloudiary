import { ExtendedProductData, ProductSeries } from '../../../product-types';

// Placeholder for multipurpose series products
export const multipurposeSeriesProducts: Record<string, ExtendedProductData> = {};

export const multipurposeSeries: ProductSeries = {
  id: 'multipurpose-series',
  title: 'Multipurpose Series',
  description: 'A poetic collection of multipurpose chairs, designed for versatility, comfort, and modern spaces that demand more.',
  seoDescription: 'The Multipurpose Series: a celebration of adaptability and design, offering poetic comfort for every use case and every environment.',
  coverImage: {
    url: '',
    alt: 'Multipurpose Series Chair Collection',
    width: 1200,
    height: 800
  },
  products: multipurposeSeriesProducts
};

export default multipurposeSeries;
