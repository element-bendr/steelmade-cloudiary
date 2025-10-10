import { ExtendedProductData } from '@/lib/data/product-types';

const flameErgonomicChair: ExtendedProductData = {
  id: 'flame-ergonomic-chair',
  name: 'Flame Ergonomic Chair',
  description: 'The Flame Ergonomic Chair series ignites comfort, modern design, and bold color for passionate workspaces.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  variants: [
    {
      variantId: 'ic-265-black',
      variantName: 'Black',
      name: 'Flame Ergonomic Chair Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189724/steelmade/chairs/ergonomic-series/flame/ic-265-black.png',
    }
  ],
  features: [
    'Igniting ergonomic support',
    'Bold color and design',
    'Premium materials for durability',
    'Modern, passionate style',
    'Perfect for energetic offices'
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189724/steelmade/chairs/ergonomic-series/flame/ic-265-black.png',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189724/steelmade/chairs/ergonomic-series/flame/ic-265-black.png', alt: 'Flame Ergonomic Chair Black' }
  ]
};

export default flameErgonomicChair;
