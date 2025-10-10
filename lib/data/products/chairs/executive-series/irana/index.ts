import { ExtendedProductData } from '../../../../product-types';

export const iranaExecutiveChair: ExtendedProductData = {
  id: 'irana',
  name: 'Irana Executive Chair',
  description: 'The Irana Executive Chair is a statement of elegance and support, crafted for discerning executives.',
  category: 'chairs',
  seriesId: 'executive-series',
  inStock: true,
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/steelmade/chairs/executive-series/irana/ic-62.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/steelmade/chairs/executive-series/irana/ic-62.jpg',
      alt: 'Irana Executive Chair',
      width: 800,
      height: 600,
    }
  ],
  features: [
    'Elegant executive design',
    'Supportive ergonomic build',
    'Premium upholstery and finish',
  ],
  specifications: {},
  variants: [
    {
      variantId: 'irana',
      variantName: 'Irana',
      name: 'Irana Executive Chair',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/steelmade/chairs/executive-series/irana/ic-62.jpg',
      description: 'Irana variant of the Executive Chair.',
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    }
  ]
};

export default iranaExecutiveChair;
