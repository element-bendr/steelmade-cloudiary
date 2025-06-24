import { ExtendedProductData } from '@/lib/templates/product-template';

const siemens: ExtendedProductData = {
  id: 'siemens',
  name: 'Siemens Executive Chair',
  description: 'The Siemens Executive Chair delivers German-inspired precision and comfort, with both high-back and mid-back options.',
  category: 'chairs',
  seriesId: 'executive-series',
  variants: [
    {
      variantId: 'high-back',
      variantName: 'High Back',
      name: 'High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749797285/steelmade/chairs/executive-series/siemens/ic-41-hb.jpg',
      imageClass: 'object-contain p-8 max-h-[420px]'
    },
    {
      variantId: 'mid-back',
      variantName: 'Mid Back',
      name: 'Mid Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749797285/steelmade/chairs/executive-series/siemens/ic-42-mb.jpg',
      imageClass: 'object-contain p-8 max-h-[420px]'
    }
  ],
  features: [
    'German-inspired design',
    'Precision engineering',
    'Ergonomic comfort',
    'Available in high-back and mid-back variants',
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749797285/steelmade/chairs/executive-series/siemens/ic-41-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749797285/steelmade/chairs/executive-series/siemens/ic-41-hb.jpg',
      alt: 'Siemens Executive Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749797285/steelmade/chairs/executive-series/siemens/ic-42-mb.jpg',
      alt: 'Siemens Executive Chair Mid Back',
    }
  ]
};

export default siemens;
