import { ExtendedProductData } from '@/lib/data/product-types';

const roboErgonomicChair: ExtendedProductData = {
  id: 'robo-ergonomic-chair',
  name: 'Robo Ergonomic Chair',
  description: 'The Robo Ergonomic Chair series delivers futuristic comfort, bold design, and versatile color options for the modern workspace.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  variants: [
    {
      variantId: 'ic-263c-hb-black',
      variantName: 'High Back Black',
      name: 'Robo Ergonomic Chair High Back Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189736/steelmade/chairs/ergonomic-series/robo/ic-263c-hb-black.png',
    },
    {
      variantId: 'ic-263-black',
      variantName: 'Black',
      name: 'Robo Ergonomic Chair Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189735/steelmade/chairs/ergonomic-series/robo/ic-263-black.png',
    },
    {
      variantId: 'ic-263b-grey',
      variantName: 'Grey',
      name: 'Robo Ergonomic Chair Grey',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189734/steelmade/chairs/ergonomic-series/robo/ic-263b-grey.png',
    }
  ],
  features: [
    'Futuristic ergonomic support',
    'Multiple color and back options',
    'Premium materials for durability',
    'Bold, modern design',
    'Perfect for tech-forward offices'
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189736/steelmade/chairs/ergonomic-series/robo/ic-263c-hb-black.png',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189736/steelmade/chairs/ergonomic-series/robo/ic-263c-hb-black.png', alt: 'Robo Ergonomic Chair High Back Black' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189735/steelmade/chairs/ergonomic-series/robo/ic-263-black.png', alt: 'Robo Ergonomic Chair Black' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189734/steelmade/chairs/ergonomic-series/robo/ic-263b-grey.png', alt: 'Robo Ergonomic Chair Grey' }
  ]
};

export default roboErgonomicChair;
