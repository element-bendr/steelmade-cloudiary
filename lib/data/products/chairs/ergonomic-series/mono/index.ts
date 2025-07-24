import { ExtendedProductData } from '@/lib/data/product-types';

const monoErgonomicChair: ExtendedProductData = {
  id: 'mono-ergonomic-chair',
  name: 'Mono Ergonomic Chair',
  description: 'The Mono Ergonomic Chair series offers minimalist comfort, clean lines, and versatile options for contemporary workspaces.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  variants: [
    {
      variantId: 'ic-305',
      variantName: 'Mono',
      name: 'Mono Ergonomic Chair',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/ergonomic-series/mono/ic-305.png',
    }
  ],
  features: [
    'Minimalist ergonomic support',
    'Premium materials for durability',
    'Clean, contemporary design',
    'Perfect for modern offices'
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/ergonomic-series/mono/ic-305.png',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/ergonomic-series/mono/ic-305.png', alt: 'Mono Ergonomic Chair' }
  ]
};

export default monoErgonomicChair;
