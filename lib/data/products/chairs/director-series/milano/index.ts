import { ExtendedProductData } from '@/lib/templates/product-template';

const milanoDirectorChair: ExtendedProductData = {
  id: 'milano-director-chair',
  name: 'Milano Director Chair',
  description: 'The Milano Director Chair is a fusion of Italian design and executive comfort, perfect for modern offices.',
  category: 'chairs',
  seriesId: 'director-series',
  variants: [
    {
      variantId: 'high-back',
      variantName: 'High Back',
      name: 'High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458919/steelmade/chairs/director-series/milano/ic-06-hb.jpg'
    },
    {
      variantId: 'mid-back',
      variantName: 'Mid Back',
      name: 'Mid Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458914/steelmade/chairs/director-series/milano/ic-07-mb.jpg'
    }
  ],
  features: [
    'Refined aluminum frame with Italian flair',
    'Weather-resistant, luxurious upholstery',
    'Ergonomic design for creative endurance',
    'Foldable for effortless movement',
    'Available in high-back variant',
    'A chair for maestros and visionaries'
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748773743/steelmade/chairs/director-series/milano/ic-251-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748773743/steelmade/chairs/director-series/milano/ic-251-hb.jpg',
      alt: 'Milano Director Chair High Back',
    }
  ]
};

export default milanoDirectorChair;
