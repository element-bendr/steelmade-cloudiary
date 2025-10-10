import { ExtendedProductData } from '@/lib/templates/product-template';

const verna: ExtendedProductData = {
  id: 'verna',
  name: 'Verna Executive Chair',
  description: 'The Verna Executive Chair brings Italian-inspired style and comfort to the executive office, with both high-back and mid-back options.',
  category: 'chairs',
  seriesId: 'executive-series',
  variants: [
    {
      variantId: 'high-back',
      variantName: 'High Back',
      name: 'High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749797677/steelmade/chairs/executive-series/verna/ic-44-hb.jpg',
      imageClass: 'object-contain p-8 max-h-[420px]'
    },
    {
      variantId: 'mid-back',
      variantName: 'Mid Back',
      name: 'Mid Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749797678/steelmade/chairs/executive-series/verna/ic-43-mb.jpg',
      imageClass: 'object-contain p-8 max-h-[420px]'
    }
  ],
  features: [
    'Italian-inspired design',
    'Premium comfort',
    'Ergonomic support',
    'Available in high-back and mid-back variants',
  ],
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749797677/steelmade/chairs/executive-series/verna/ic-44-hb.jpg',
      alt: 'Verna Executive Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749797678/steelmade/chairs/executive-series/verna/ic-43-mb.jpg',
      alt: 'Verna Executive Chair Mid Back',
    }
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749797677/steelmade/chairs/executive-series/verna/ic-44-hb.jpg'
};

export default verna;
