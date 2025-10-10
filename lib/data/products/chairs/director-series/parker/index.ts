import { ExtendedProductData } from '@/lib/templates/product-template';

const parkerDirectorChair: ExtendedProductData = {
  id: 'parker-director-chair',
  name: 'Parker Director Chair',
  description: 'The Parker Director Chair is designed for those who value both aesthetics and comfort in their workspace.',
  category: 'chairs',
  seriesId: 'director-series',
  variants: [
    {
      variantId: 'high-back',
      variantName: 'High Back',
      name: 'High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458919/steelmade/chairs/director-series/parker/ic-06-hb.jpg'
    },
    {
      variantId: 'mid-back',
      variantName: 'Mid Back',
      name: 'Mid Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458914/steelmade/chairs/director-series/parker/ic-07-mb.jpg'
    }
  ],
  features: [
    'Minimalist aluminum frame with clean lines',
    'Weather-resistant, supportive upholstery',
    'Ergonomic design for creative focus',
    'Foldable for seamless movement',
    'Available in high-back and mid-back variants',
    'A chair for conductors of vision'
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459331/steelmade/chairs/director-series/parker/ic-315-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459331/steelmade/chairs/director-series/parker/ic-315-hb.jpg',
      alt: 'Parker Director Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459324/steelmade/chairs/director-series/parker/ic-316-mb.jpg',
      alt: 'Parker Director Chair Mid Back',
    }
  ]
};

export default parkerDirectorChair;
