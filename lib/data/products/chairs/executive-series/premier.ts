import { ExtendedProductData } from "@/lib/data/product-types";

export const premierExecutiveChair: ExtendedProductData = {
  id: 'premier-executive-chair',
  name: 'Premier Executive Chair',
  description: 'The Premier Executive Chair collection: High Back, Mid Back, and Visitor models, crafted for comfort and prestige in executive spaces.',
  category: 'chairs',
  seriesId: 'executive-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750413281/steelmade/chairs/executive-series/premier/ic-79-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750413281/steelmade/chairs/executive-series/premier/ic-79-hb.jpg',
      alt: 'Premier Executive Chair High Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750413290/steelmade/chairs/executive-series/premier/ic-80-mb.jpg',
      alt: 'Premier Executive Chair Mid Back',
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750413274/steelmade/chairs/executive-series/premier/ic-81-visitor.jpg',
      alt: 'Premier Executive Chair Visitor',
    }
  ],
  variants: [
    {
      variantId: 'premier-hb',
      variantName: 'High Back',
      name: 'Premier Executive Chair - High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750413281/steelmade/chairs/executive-series/premier/ic-79-hb.jpg',
    },
    {
      variantId: 'premier-mb',
      variantName: 'Mid Back',
      name: 'Premier Executive Chair - Mid Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750413290/steelmade/chairs/executive-series/premier/ic-80-mb.jpg',
    },
    {
      variantId: 'premier-visitor',
      variantName: 'Visitor',
      name: 'Premier Executive Chair - Visitor',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750413274/steelmade/chairs/executive-series/premier/ic-81-visitor.jpg',
    }
  ],
  features: [
    'Ergonomic support for executive comfort',
    'Premium upholstery and finish',
    'Multiple back options for every need',
    'Durable construction and smooth-rolling casters',
    'Elegant design for modern offices'
  ],
  specifications: {
    material: 'Premium synthetic leather, steel base',
    colorOptions: 'Black, Brown, Tan',
    weightCapacity: '120kg',
    warranty: '1 year',
  },
};
