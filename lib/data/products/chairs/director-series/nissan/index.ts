import { ExtendedProductData } from '@/lib/templates/product-template';

const nissanDirectorChair: ExtendedProductData = {
  id: 'nissan-director-chair',
  name: 'Nissan Director Chair',
  description: 'The Nissan Director Chair offers a blend of ergonomic support and contemporary style for discerning professionals.',
  category: 'chairs',
  seriesId: 'director-series',
  variants: [
    {
      variantId: 'high-back',
      variantName: 'High Back',
      name: 'High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458919/steelmade/chairs/director-series/nissan/ic-06-hb.jpg'
    },
    {
      variantId: 'mid-back',
      variantName: 'Mid Back',
      name: 'Mid Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458914/steelmade/chairs/director-series/nissan/ic-07-mb.jpg'
    }
  ],
  features: [
    'Contemporary aluminum frame with bold accents',
    'Weather-resistant, supportive upholstery',
    'Ergonomic design for creative journeys',
    'Foldable for agile movement',
    'Available in high-back and mid-back variants',
    'A chair for pioneers and visionaries'
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749460685/steelmade/chairs/director-series/nissan/ic-253-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749460685/steelmade/chairs/director-series/nissan/ic-253-hb.jpg',
      alt: 'Nissan Director Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749460695/steelmade/chairs/director-series/nissan/ic-252-mb.jpg',
      alt: 'Nissan Director Chair Mid Back',
    }
  ]
};

export default nissanDirectorChair;
