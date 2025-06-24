import { ExtendedProductData } from '@/lib/data/product-types';

export const miniGingerDolphinExecutiveChair: ExtendedProductData = {
  id: 'mini-ginger-dolphin-executive-chair',
  name: 'Mini / Ginger / Dolphin Executive Chair',
  description: 'A trio of executive chairs: Mini Activa, Ginger, and Dolphin, each designed for compact comfort and modern executive spaces.',
  category: 'chairs',
  seriesId: 'executive-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414078/steelmade/chairs/executive-series/mini-activa/ic-64.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414078/steelmade/chairs/executive-series/mini-activa/ic-64.jpg',
      alt: 'Mini Activa Executive Chair',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414088/steelmade/chairs/executive-series/ginger/ic-65.jpg',
      alt: 'Ginger Executive Chair',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414097/steelmade/chairs/executive-series/dolphn/ic-66-lb.jpg',
      alt: 'Dolphin Executive Chair',
    }
  ],
  variants: [
    {
      variantId: 'mini-activa',
      variantName: 'Mini Activa',
      name: 'Mini Activa Executive Chair',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414078/steelmade/chairs/executive-series/mini-activa/ic-64.jpg',
    },
    {
      variantId: 'ginger',
      variantName: 'Ginger',
      name: 'Ginger Executive Chair',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414088/steelmade/chairs/executive-series/ginger/ic-65.jpg',
    },
    {
      variantId: 'dolphin',
      variantName: 'Dolphin',
      name: 'Dolphin Executive Chair',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750414097/steelmade/chairs/executive-series/dolphn/ic-66-lb.jpg',
    }
  ],
  features: [
    'Compact ergonomic design',
    'Premium upholstery and finish',
    'Multiple style options for every need',
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
