import { ExtendedProductData } from '@/lib/templates/product-template';

const amazon: ExtendedProductData = {
  id: 'amazon',
  name: 'Amazon Executive Chair',
  description: 'The Amazon Executive Chair is a river of comfort and authority, crafted for those who lead with depth and vision.',
  category: 'chairs',
  seriesId: 'executive-series',
  variants: [
    {
      variantId: 'high-back',
      variantName: 'High Back',
      name: 'High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749802514/steelmade/chairs/executive-series/amazon/ic-53-hb.jpg',
      imageClass: 'object-contain p-8 max-h-[420px]'
    },
    {
      variantId: 'mid-back',
      variantName: 'Mid Back',
      name: 'Mid Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749802784/steelmade/chairs/executive-series/amazon/ic-54-mb.png'
    }
  ],
  features: [
    'Commanding aluminum frame with flowing lines',
    'Weather-resistant, plush upholstery',
    'Ergonomic design for executive comfort',
    'Foldable for seamless movement',
    'Available in high-back and mid-back variants',
    'A chair for leaders of vision and resolve'
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749802514/steelmade/chairs/executive-series/amazon/ic-53-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749802514/steelmade/chairs/executive-series/amazon/ic-53-hb.jpg',
      alt: 'Amazon Executive Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749802784/steelmade/chairs/executive-series/amazon/ic-54-mb.png',
      alt: 'Amazon Executive Chair Mid Back',
    }
  ]
};

export default amazon;
