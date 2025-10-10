import { ExtendedProductData } from '../../../../product-types';

export const miniMarksonExecutiveChair: ExtendedProductData = {
  id: 'mini-markson',
  name: 'Mini Markson Executive Chair',
  description: 'The Mini Markson Executive Chair offers refined comfort in a compact form, with distinct variants for every executive need.',
  category: 'chairs',
  seriesId: 'executive-series',
  inStock: true,
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/steelmade/chairs/executive-series/mini-markson/ic-67-rev.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/steelmade/chairs/executive-series/mini-markson/ic-67-rev.jpg',
      alt: 'Mini Markson Executive Chair Rev',
      width: 800,
      height: 600,
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/steelmade/chairs/executive-series/mini-markson/ic-68-visitor.jpg',
      alt: 'Mini Markson Executive Chair Visitor',
      width: 800,
      height: 600,
    }
  ],
  features: [
    'Compact executive design',
    'Ergonomic support for long hours',
    'Premium materials and finish',
    'Distinct variants for revolving and visitor needs',
  ],
  specifications: {},
  variants: [
    {
      variantId: 'rev',
      variantName: 'Rev',
      name: 'Mini Markson Executive Chair - Rev',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/steelmade/chairs/executive-series/mini-markson/ic-67-rev.jpg',
      description: 'Revolving variant of the Mini Markson Executive Chair.',
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    },
    {
      variantId: 'visitor',
      variantName: 'Visitor',
      name: 'Mini Markson Executive Chair - Visitor',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/steelmade/chairs/executive-series/mini-markson/ic-68-visitor.jpg',
      description: 'Visitor variant of the Mini Markson Executive Chair.',
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    }
  ]
};

export default miniMarksonExecutiveChair;
