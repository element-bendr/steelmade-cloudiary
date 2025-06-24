import { ExtendedProductData } from '../../../../product-types';

export const phantomExecutiveChair: ExtendedProductData = {
  id: 'phantom-executive-chair',
  name: 'Phantom Executive Chair',
  description: 'Phantom Executive Chair collection: High Back, Mid Back, and Visitor models, designed for modern executive comfort and style.',
  category: 'chairs',
  seriesId: 'executive-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414014/steelmade/chairs/executive-series/phantom/ic-70-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414014/steelmade/chairs/executive-series/phantom/ic-70-hb.jpg',
      alt: 'Phantom Executive Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414023/steelmade/chairs/executive-series/phantom/ic-71-mb.jpg',
      alt: 'Phantom Executive Chair Mid Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414069/steelmade/chairs/executive-series/phantom/ic-72-visitor.jpg',
      alt: 'Phantom Executive Chair Visitor',
    }
  ],
  variants: [
    {
      variantId: 'phantom-hb',
      variantName: 'High Back',
      name: 'Phantom Executive Chair - High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414014/steelmade/chairs/executive-series/phantom/ic-70-hb.jpg',
    },
    {
      variantId: 'phantom-mb',
      variantName: 'Mid Back',
      name: 'Phantom Executive Chair - Mid Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414023/steelmade/chairs/executive-series/phantom/ic-71-mb.jpg',
    },
    {
      variantId: 'phantom-visitor',
      variantName: 'Visitor',
      name: 'Phantom Executive Chair - Visitor',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414069/steelmade/chairs/executive-series/phantom/ic-72-visitor.jpg',
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

export default phantomExecutiveChair;
