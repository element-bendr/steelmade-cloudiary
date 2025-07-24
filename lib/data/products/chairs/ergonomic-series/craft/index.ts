import { ExtendedProductData } from '@/lib/data/product-types';

const craftErgonomicChair: ExtendedProductData = {
  id: 'craft-ergonomic-chair',
  name: 'Craft Ergonomic Chair',
  description: 'The Craft Ergonomic Chair series blends artisan comfort, modern lines, and versatile options for creative workspaces.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  variants: [
    {
      variantId: 'ic-129-hb',
      variantName: 'High Back',
      name: 'Craft Ergonomic Chair High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189733/steelmade/chairs/ergonomic-series/craft/ic-129-hb.png',
    },
    {
      variantId: 'ic-130-mb',
      variantName: 'Medium Back',
      name: 'Craft Ergonomic Chair Medium Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189732/steelmade/chairs/ergonomic-series/craft/ic-130-mb.png',
    },
    {
      variantId: 'ic-131-visitor',
      variantName: 'Visitor',
      name: 'Craft Ergonomic Chair Visitor',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189731/steelmade/chairs/ergonomic-series/craft/ic-131-visitor.png',
    }
  ],
  features: [
    'Artisan ergonomic support',
    'Multiple back and visitor options',
    'Premium materials for durability',
    'Modern, creative design',
    'Perfect for studios and offices'
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189733/steelmade/chairs/ergonomic-series/craft/ic-129-hb.png',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189733/steelmade/chairs/ergonomic-series/craft/ic-129-hb.png', alt: 'Craft Ergonomic Chair High Back' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189732/steelmade/chairs/ergonomic-series/craft/ic-130-mb.png', alt: 'Craft Ergonomic Chair Medium Back' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189731/steelmade/chairs/ergonomic-series/craft/ic-131-visitor.png', alt: 'Craft Ergonomic Chair Visitor' }
  ]
};

export default craftErgonomicChair;
