import { ExtendedProductData } from '@/lib/templates/product-template';

const kotakDirectorChair: ExtendedProductData = {
  id: 'kotak-director-chair',
  name: 'Kotak Director Chair',
  description: 'The Kotak Director Chair blends modern lines with classic comfort, perfect for boardrooms and creative spaces.',
  category: 'chairs',
  seriesId: 'director-series',
  variants: [
    {
      variantId: 'high-back',
      variantName: 'High Back',
      name: 'High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458919/steelmade/chairs/director-series/kotak/ic-06-hb.jpg'
    },
    {
      variantId: 'mid-back',
      variantName: 'Mid Back',
      name: 'Mid Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458914/steelmade/chairs/director-series/kotak/ic-07-mb.jpg'
    }
  ],
  features: [
    'Architectural aluminum frame with bold lines',
    'Weather-resistant, plush upholstery',
    'Ergonomic support for long hours of creativity',
    'Foldable for seamless mobility',
    'Available in high-back and mid-back variants',
    'A chair for innovators and dreamers'
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749460525/steelmade/chairs/director-series/kotak/ic-13-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749460525/steelmade/chairs/director-series/kotak/ic-13-hb.jpg',
      alt: 'Kotak Director Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749460537/steelmade/chairs/director-series/kotak/ic-12-mb.jpg',
      alt: 'Kotak Director Chair Mid Back',
    }
  ]
};

export default kotakDirectorChair;
