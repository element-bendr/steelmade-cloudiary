import { ExtendedProductData } from '@/lib/templates/product-template';

const woodlandDirectorChair: ExtendedProductData = {
  id: 'woodland',
  name: 'Woodland Director Chair',
  description: 'The Woodland Director Chair combines rustic charm with premium comfort, perfect for outdoor productions.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-338-hb',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749454239/steelmade/chairs/director-series/woodland/ic-338-hb.jpg',
      images: ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749454239/steelmade/chairs/director-series/woodland/ic-338-hb.jpg']
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-339-mb',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749454239/steelmade/chairs/director-series/woodland/ic-339-mb.jpg',
      images: ['https://res.cloudinary.com/dqde19mfs/image/upload/v1749454239/steelmade/chairs/director-series/woodland/ic-339-mb.jpg']
    }
  ],
  features: [
    'Nature-inspired design elements',
    'Premium weather-resistant materials',
    'Ergonomic design for extended comfort',
    'Foldable for easy transport and storage',
    'Unique appearance for outdoor settings',
    'Available in high-back and mid-back variants'
  ],
  defaultVariant: 'high-back',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749454239/steelmade/chairs/director-series/woodland/ic-338-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749454239/steelmade/chairs/director-series/woodland/ic-338-hb.jpg',
      alt: 'Woodland Director Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749454239/steelmade/chairs/director-series/woodland/ic-339-mb.jpg',
      alt: 'Woodland Director Chair Mid Back',
    }
  ]
};

export default woodlandDirectorChair;
