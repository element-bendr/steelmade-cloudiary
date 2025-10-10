import { ExtendedProductData } from '@/lib/data/product-types';

const vivoErgonomicChair: ExtendedProductData = {
  id: 'vivo-ergonomic-chair',
  name: 'Vivo Ergonomic Chair',
  description: 'The Vivo Ergonomic Chair series brings vibrant comfort, contemporary lines, and versatile options for dynamic workspaces.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  variants: [
    {
      variantId: 'ic-132-hb',
      variantName: 'High Back',
      name: 'Vivo Ergonomic Chair High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189730/steelmade/chairs/ergonomic-series/vivo/ic-132-hb.png',
    },
    {
      variantId: 'ic-133-mb',
      variantName: 'Medium Back',
      name: 'Vivo Ergonomic Chair Medium Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189729/steelmade/chairs/ergonomic-series/vivo/ic-133-mb.png',
    },
    {
      variantId: 'ic-134-visitor',
      variantName: 'Visitor',
      name: 'Vivo Ergonomic Chair Visitor',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189728/steelmade/chairs/ergonomic-series/vivo/ic-134-visitor.png',
    }
  ],
  features: [
    'Vibrant ergonomic support',
    'Multiple back and visitor options',
    'Premium materials for durability',
    'Contemporary, dynamic design',
    'Perfect for creative and modern offices'
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189730/steelmade/chairs/ergonomic-series/vivo/ic-132-hb.png',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189730/steelmade/chairs/ergonomic-series/vivo/ic-132-hb.png', alt: 'Vivo Ergonomic Chair High Back' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189729/steelmade/chairs/ergonomic-series/vivo/ic-133-mb.png', alt: 'Vivo Ergonomic Chair Medium Back' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189728/steelmade/chairs/ergonomic-series/vivo/ic-134-visitor.png', alt: 'Vivo Ergonomic Chair Visitor' }
  ]
};

export default vivoErgonomicChair;
