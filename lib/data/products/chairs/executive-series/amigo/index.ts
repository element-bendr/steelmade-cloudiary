import { ExtendedProductData } from '../../../../product-types';

export const amigoExecutiveChair: ExtendedProductData = {
  id: 'amigo',
  name: 'Amigo Executive Chair',
  description: 'The Amigo Executive Chair is a companion in comfort and style, designed for those who value both support and elegance in their workspace.',
  category: 'chairs',
  seriesId: 'executive-series',
  inStock: true,
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749805770/steelmade/chairs/executive-series/amigo/ic-331-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749805770/steelmade/chairs/executive-series/amigo/ic-331-hb.jpg',
      alt: 'Amigo Executive Chair High Back',
      width: 800,
      height: 600,
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749805780/steelmade/chairs/executive-series/amigo/ic-332-mb.jpg',
      alt: 'Amigo Executive Chair Mid Back',
      width: 800,
      height: 600,
    }
  ],
  features: [
    'Sculpted ergonomic back for all-day support',
    'Premium upholstery with a soft, inviting touch',
    'Sleek, modern armrests',
    'Available in high-back and mid-back variants',
    'A chair that brings comfort and camaraderie to the executive suite',
  ],
  specifications: {},
  variants: [
    {
      variantId: 'high-back',
      variantName: 'High Back',
      name: 'Amigo Executive Chair - High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749805770/steelmade/chairs/executive-series/amigo/ic-331-hb.jpg',
      description: 'High back variant of the Amigo Executive Chair.',
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    },
    {
      variantId: 'mid-back',
      variantName: 'Mid Back',
      name: 'Amigo Executive Chair - Mid Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749805780/steelmade/chairs/executive-series/amigo/ic-332-mb.jpg',
      description: 'Mid back variant of the Amigo Executive Chair.',
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    }
  ]
};

export default amigoExecutiveChair;
