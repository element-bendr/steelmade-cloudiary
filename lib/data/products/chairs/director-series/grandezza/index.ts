import { ExtendedProductData } from '@/lib/templates/product-template';

const grandezzaDirectorChair: ExtendedProductData = {
  id: 'grandezza',
  name: 'Grandezza Director Chair',
  description: 'The Grandezza Director Chair embodies grandeur and comfort, crafted for those who command presence and poise.',
  category: 'chairs',
  seriesId: 'director-series',
  variants: [
    {
      variantId: 'high-back',
      variantName: 'High Back',
      name: 'High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458322/steelmade/chairs/director-series/grandezza/ic-04-hb.jpg'
    },
    {
      variantId: 'mid-back',
      variantName: 'Mid Back',
      name: 'Mid Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458326/steelmade/chairs/director-series/grandezza/ic-05-mb.jpg'
    }
  ],
  features: [
    'Majestic aluminum frame with a poetic silhouette',
    'Sumptuous, weather-resistant upholstery',
    'Ergonomic design for enduring comfort',
    'Foldable for effortless transport',
    'Available in high-back and mid-back variants',
    'A chair for visionaries and leaders'
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458322/steelmade/chairs/director-series/grandezza/ic-04-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458322/steelmade/chairs/director-series/grandezza/ic-04-hb.jpg',
      alt: 'Grandezza Director Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749458326/steelmade/chairs/director-series/grandezza/ic-05-mb.jpg',
      alt: 'Grandezza Director Chair Mid Back',
    }
  ]
};

export default grandezzaDirectorChair;
