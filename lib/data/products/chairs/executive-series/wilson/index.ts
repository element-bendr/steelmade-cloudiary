import { ExtendedProductData } from '../../../../product-types';

export const wilsonExecutiveChair: ExtendedProductData = {
  id: 'wilson-executive-chair',
  name: 'Wilson Executive Chair',
  description: 'Wilson Executive Chair collection: High Back, Mid Back, and Visitor models, crafted for modern executive comfort and style.',
  category: 'chairs',
  seriesId: 'executive-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414060/steelmade/chairs/executive-series/wilson/ic-73-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414060/steelmade/chairs/executive-series/wilson/ic-73-hb.jpg',
      alt: 'Wilson Executive Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414051/steelmade/chairs/executive-series/wilson/ic-74-mb.jpg',
      alt: 'Wilson Executive Chair Mid Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414041/steelmade/chairs/executive-series/wilson/ic-75-visitor.jpg',
      alt: 'Wilson Executive Chair Visitor',
    }
  ],
  variants: [
    {
      variantId: 'wilson-hb',
      variantName: 'High Back',
      name: 'Wilson Executive Chair - High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414060/steelmade/chairs/executive-series/wilson/ic-73-hb.jpg',
    },
    {
      variantId: 'wilson-mb',
      variantName: 'Mid Back',
      name: 'Wilson Executive Chair - Mid Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414051/steelmade/chairs/executive-series/wilson/ic-74-mb.jpg',
    },
    {
      variantId: 'wilson-visitor',
      variantName: 'Visitor',
      name: 'Wilson Executive Chair - Visitor',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414041/steelmade/chairs/executive-series/wilson/ic-75-visitor.jpg',
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

export default wilsonExecutiveChair;
