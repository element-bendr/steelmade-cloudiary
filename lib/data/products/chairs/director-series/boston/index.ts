import { ExtendedProductData } from '@/lib/templates/product-template';

const bostonDirectorChair: ExtendedProductData = {
  id: 'boston-director-chair',
  name: 'Boston Director Chair',
  description: 'The Boston Director Chair combines elegant design with premium comfort, perfect for professional settings.',
  category: 'chairs',
  seriesId: 'director-series',
  variants: [
    {
      variantId: 'high-back',
      variantName: 'High Back',
      name: 'High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458919/steelmade/chairs/director-series/boston/ic-06-hb.jpg'
    },
    {
      variantId: 'mid-back',
      variantName: 'Mid Back',
      name: 'Mid Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458914/steelmade/chairs/director-series/boston/ic-07-mb.jpg'
    }
  ],
  features: [
    'Premium quality aluminum frame',
    'Ergonomic design for extended comfort',
    'Weather-resistant materials',
    'Foldable for easy storage and transport',
    'Available in high-back and mid-back variants',
    'Durable construction for long-lasting use'
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458919/steelmade/chairs/director-series/boston/ic-06-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458919/steelmade/chairs/director-series/boston/ic-06-hb.jpg',
      alt: 'Boston Director Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458914/steelmade/chairs/director-series/boston/ic-07-mb.jpg',
      alt: 'Boston Director Chair Mid Back',
    }
  ]
};

export default bostonDirectorChair;
