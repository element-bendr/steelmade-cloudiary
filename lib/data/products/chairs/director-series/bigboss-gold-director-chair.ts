import { ExtendedProductData } from "@/lib/data/product-types";

export const bigBossGoldDirectorChair: ExtendedProductData = {
  id: 'bigbossgold-director-chair',
  name: 'BigBoss Gold Director Chair',
  description: 'The BigBoss Gold Director Chair combines luxury with ergonomic design for executive comfort and style.',
  category: 'chairs',
  seriesId: 'director-series',
  inStock: true,
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459939/steelmade/chairs/director-series/bigbossgold/ic-255-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459939/steelmade/chairs/director-series/bigbossgold/ic-255-hb.jpg',
      alt: 'BigBoss Gold Director Chair - High Back',
      width: 800,
      height: 600
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459908/steelmade/chairs/director-series/bigbossgold/ic-256-mb.jpg',
      alt: 'BigBoss Gold Director Chair - Medium Back',
      width: 800,
      height: 600
    }
  ],
  features: [
    'Premium leather upholstery',
    'Gold-plated accents',
    'Adjustable height and tilt',
    'Ergonomic design',
    'Executive styling',
    'Swivel mechanism',
    'Durable construction'
  ],
  specifications: {
    'Material': 'Premium leather, gold-plated metal accents',
    'Weight Capacity': '350 lbs',
    'Dimensions': '30"W x 32"D x 48"H',
    'Warranty': '10 years'
  },
  variants: [
    {
      variantId: 'ic-255-hb',
      variantName: 'High Back',
      name: 'BigBoss Gold High-Back Director Chair IC-255-HB',
      description: 'Luxurious high-back design for ultimate executive comfort',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459939/steelmade/chairs/director-series/bigbossgold/ic-255-hb.jpg',
      specifications: {
        'Back Height': 'High Back',
        'Model': 'IC-255-HB',
        'Weight': '18 lbs',
        'Dimensions': '30"W x 32"D x 48"H'
      }
    },
    {
      variantId: 'ic-256-mb',
      variantName: 'Medium Back',
      name: 'BigBoss Gold Medium-Back Director Chair IC-256-MB',
      description: 'Elegant medium-back design offering superior mobility',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459908/steelmade/chairs/director-series/bigbossgold/ic-256-mb.jpg',
      specifications: {
        'Back Height': 'Medium Back',
        'Model': 'IC-256-MB',
        'Weight': '16 lbs',
        'Dimensions': '30"W x 32"D x 44"H'
      }
    }
  ]
};
