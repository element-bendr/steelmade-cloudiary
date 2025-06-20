import { ExtendedProductData } from '../../product-types';

export const safariExecutiveChair: ExtendedProductData = {
  id: 'safari-executive-chair',
  name: 'Safari Executive Chair',
  description: 'Safari Executive Chair collection: High Back, Low Back, and Visitor models, crafted for adventurous comfort and modern executive style.',
  category: 'chairs',
  seriesId: 'executive-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750413969/steelmade/chairs/executive-series/safari/ic-88-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750413969/steelmade/chairs/executive-series/safari/ic-88-hb.jpg',
      alt: 'Safari Executive Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750413977/steelmade/chairs/executive-series/safari/ic-89-lb.jpg',
      alt: 'Safari Executive Chair Low Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750413986/steelmade/chairs/executive-series/safari/ic-90-visitor.jpg',
      alt: 'Safari Executive Chair Visitor',
    }
  ],
  variants: [
    {
      variantId: 'safari-hb',
      variantName: 'High Back',
      name: 'Safari Executive Chair - High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750413969/steelmade/chairs/executive-series/safari/ic-88-hb.jpg',
    },
    {
      variantId: 'safari-lb',
      variantName: 'Low Back',
      name: 'Safari Executive Chair - Low Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750413977/steelmade/chairs/executive-series/safari/ic-89-lb.jpg',
    },
    {
      variantId: 'safari-visitor',
      variantName: 'Visitor',
      name: 'Safari Executive Chair - Visitor',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750413986/steelmade/chairs/executive-series/safari/ic-90-visitor.jpg',
    }
  ],
  features: [
    'Adventurous ergonomic design',
    'Premium upholstery and finish',
    'Multiple back options for every need',
    'Durable construction and smooth-rolling casters',
    'Distinctive styling for executive offices'
  ],
  specifications: {
    material: 'Premium synthetic leather, steel base',
    colorOptions: 'Black, Brown, Tan',
    weightCapacity: '120kg',
    warranty: '1 year',
  },
  tags: ['executive', 'safari', 'office', 'ergonomic']
};
