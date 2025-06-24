import { ExtendedProductData } from '@/lib/templates/product-template';

const operaDirectorChair: ExtendedProductData = {
  id: 'opera',
  name: 'Opera Director Chair',
  description: 'The Opera Director Chair is a blend of elegance and function, perfect for creative and executive spaces.',
  category: 'chairs',
  seriesId: 'director-series',
  variants: [
    {
      variantId: 'high-back',
      variantName: 'High Back',
      name: 'High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458919/steelmade/chairs/director-series/opera/ic-06-hb.jpg'
    },
    {
      variantId: 'mid-back',
      variantName: 'Mid Back',
      name: 'Mid Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458914/steelmade/chairs/director-series/opera/ic-07-mb.jpg'
    }
  ],
  features: [
    'Premium aluminum construction',
    'Superior comfort and support',
    'Weather-resistant fabric',
    'Elegant and professional design',
    'Foldable for convenient storage',
    'Available in high-back and mid-back options'
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749454969/steelmade/chairs/director-series/opera/ic-340-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749454969/steelmade/chairs/director-series/opera/ic-340-hb.jpg',
      alt: 'Opera Director Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749454891/steelmade/chairs/director-series/opera/ic-341-mb.jpg',
      alt: 'Opera Director Chair Mid Back',
    }
  ]
};

export default operaDirectorChair;
