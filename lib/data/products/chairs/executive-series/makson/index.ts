import { ExtendedProductData } from '../../../../product-types';

export const maksonExecutiveChair: ExtendedProductData = {
  id: 'makson-executive-chair',
  name: 'Makson Executive Chair',
  description: 'Makson Executive Chair collection: High Back, Mid Back, and Visitor models, crafted for modern executive comfort and style.',
  category: 'chairs',
  seriesId: 'executive-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414032/steelmade/chairs/executive-series/makson/ic-76-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414032/steelmade/chairs/executive-series/makson/ic-76-hb.jpg',
      alt: 'Makson Executive Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414005/steelmade/chairs/executive-series/makson/ic-77-mb.jpg',
      alt: 'Makson Executive Chair Mid Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750413995/steelmade/chairs/executive-series/makson/ic-78-visitor.jpg',
      alt: 'Makson Executive Chair Visitor',
    }
  ],
  variants: [
    {
      variantId: 'makson-hb',
      variantName: 'High Back',
      name: 'Makson Executive Chair - High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414032/steelmade/chairs/executive-series/makson/ic-76-hb.jpg',
    },
    {
      variantId: 'makson-mb',
      variantName: 'Mid Back',
      name: 'Makson Executive Chair - Mid Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414005/steelmade/chairs/executive-series/makson/ic-77-mb.jpg',
    },
    {
      variantId: 'makson-visitor',
      variantName: 'Visitor',
      name: 'Makson Executive Chair - Visitor',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750413995/steelmade/chairs/executive-series/makson/ic-78-visitor.jpg',
    }
  ],
  features: [
    'Modern ergonomic design',
    'Premium upholstery and finish',
    'Multiple back options for every need',
    'Durable construction and smooth-rolling casters',
    'Elegant styling for executive offices'
  ],
  specifications: {
    material: 'Premium synthetic leather, steel base',
    colorOptions: 'Black, Brown, Grey',
    weightCapacity: '120kg',
    warranty: '1 year',
  },
};

export default maksonExecutiveChair;
