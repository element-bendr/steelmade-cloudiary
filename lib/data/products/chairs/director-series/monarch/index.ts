import { ExtendedProductData } from '@/lib/templates/product-template';

const monarchDirectorChair: ExtendedProductData = {
  id: 'monarch-director-chair',
  name: 'Monarch Director Chair',
  description: 'The Monarch Director Chair is a statement of regal comfort and modern design, ideal for executive spaces.',
  category: 'chairs',
  seriesId: 'director-series',
  variants: [
    {
      variantId: 'high-back',
      variantName: 'High Back',
      name: 'High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458919/steelmade/chairs/director-series/monarch/ic-06-hb.jpg'
    },
    {
      variantId: 'mid-back',
      variantName: 'Mid Back',
      name: 'Mid Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458914/steelmade/chairs/director-series/monarch/ic-07-mb.jpg'
    }
  ],
  features: [
    'Royal aluminum frame with elegant lines',
    'Weather-resistant, plush upholstery',
    'Ergonomic support for enduring leadership',
    'Foldable for effortless movement',
    'Available in high-back and mid-back variants',
    'A chair for those who inspire'
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459625/steelmade/chairs/director-series/monarch/ic-08-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459625/steelmade/chairs/director-series/monarch/ic-08-hb.jpg',
      alt: 'Monarch Director Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459633/steelmade/chairs/director-series/monarch/ic-09-mb.jpg',
      alt: 'Monarch Director Chair Mid Back',
    }
  ]
};

export default monarchDirectorChair;
