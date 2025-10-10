import { ExtendedProductData } from '@/lib/data/product-types';

const zaraErgonomicChair: ExtendedProductData = {
  id: 'zara-ergonomic-chair',
  name: 'Zara Ergonomic Chair',
  description: 'The Zara Ergonomic Chair series blends modern elegance, comfort, and versatile options for refined workspaces.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  variants: [
    {
      variantId: 'ic-143-visi',
      variantName: 'Visitor',
      name: 'Zara Ergonomic Chair Visitor',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/ergonomic-series/zara/ic-143-visi.png',
    },
    {
      variantId: 'ic-142-black',
      variantName: 'Black',
      name: 'Zara Ergonomic Chair Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/ergonomic-series/zara/ic-142-black.png',
    }
  ],
  features: [
    'Elegant ergonomic support',
    'Multiple color and visitor options',
    'Premium materials for durability',
    'Modern, refined design',
    'Perfect for stylish offices'
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/ergonomic-series/zara/ic-143-visi.png',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/ergonomic-series/zara/ic-143-visi.png', alt: 'Zara Ergonomic Chair Visitor' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/ergonomic-series/zara/ic-142-black.png', alt: 'Zara Ergonomic Chair Black' }
  ]
};

export default zaraErgonomicChair;
