import { ExtendedProductData } from '../../../../product-types';

export const nanoExecutiveChair: ExtendedProductData = {
  id: 'nano-executive-chair',
  name: 'Nano Executive Chair',
  description: 'Nano Executive Chair collection: High Back, Mid Back, and Low Back models, designed for compact comfort and modern executive spaces.',
  category: 'chairs',
  seriesId: 'executive-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414107/steelmade/chairs/executive-series/nano/ic-91-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414107/steelmade/chairs/executive-series/nano/ic-91-hb.jpg',
      alt: 'Nano Executive Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414116/steelmade/chairs/executive-series/nano/ic-92-mb.jpg',
      alt: 'Nano Executive Chair Mid Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414129/steelmade/chairs/executive-series/nano/ic-93-lb.jpg',
      alt: 'Nano Executive Chair Low Back',
    }
  ],
  variants: [
    {
      variantId: 'nano-hb',
      variantName: 'High Back',
      name: 'Nano Executive Chair - High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414107/steelmade/chairs/executive-series/nano/ic-91-hb.jpg',
    },
    {
      variantId: 'nano-mb',
      variantName: 'Mid Back',
      name: 'Nano Executive Chair - Mid Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414116/steelmade/chairs/executive-series/nano/ic-92-mb.jpg',
    },
    {
      variantId: 'nano-lb',
      variantName: 'Low Back',
      name: 'Nano Executive Chair - Low Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414129/steelmade/chairs/executive-series/nano/ic-93-lb.jpg',
    }
  ],
  features: [
    'Compact ergonomic design',
    'Premium upholstery and finish',
    'Multiple back options for every need',
    'Durable construction and smooth-rolling casters',
    'Modern styling for executive offices'
  ],
  specifications: {
    material: 'Premium synthetic leather, steel base',
    colorOptions: 'Black, Brown, Grey',
    weightCapacity: '110kg',
    warranty: '1 year',
  },
};

export default nanoExecutiveChair;
