import { ExtendedProductData } from '@/lib/data/product-types';

const marvelErgonomicChair: ExtendedProductData = {
  id: 'marvel-ergonomic-chair',
  name: 'Marvel Ergonomic Chair',
  description: 'The Marvel Ergonomic Chair series brings heroic comfort, bold design, and versatile options for inspiring workspaces.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  variants: [
    {
      variantId: 'ic-114-hb',
      variantName: 'High Back',
      name: 'Marvel Ergonomic Chair High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189724/steelmade/chairs/ergonomic-series/marvel/ic-114-hb.png',
    },
    {
      variantId: 'ic-115-mb',
      variantName: 'Medium Back',
      name: 'Marvel Ergonomic Chair Medium Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189725/steelmade/chairs/ergonomic-series/marvel/ic-115-mb.png',
    }
  ],
  features: [
    'Heroic ergonomic support',
    'Multiple back options',
    'Premium materials for durability',
    'Bold, inspiring design',
    'Perfect for creative and modern offices'
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189724/steelmade/chairs/ergonomic-series/marvel/ic-114-hb.png',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189724/steelmade/chairs/ergonomic-series/marvel/ic-114-hb.png', alt: 'Marvel Ergonomic Chair High Back' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189725/steelmade/chairs/ergonomic-series/marvel/ic-115-mb.png', alt: 'Marvel Ergonomic Chair Medium Back' }
  ]
};

export default marvelErgonomicChair;
