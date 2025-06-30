import { ExtendedProductData } from '@/lib/data/product-types';

const classicDirectorChair: ExtendedProductData = {
  id: 'classic-director-chair',
  name: 'Classic Director Chair',
  description: 'A timeless classic director chair with durable construction and comfortable seating.',
  category: 'chairs',
  seriesId: 'director-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/classic/ic-100-hb.jpg',
  inStock: true,
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/classic/ic-100-hb.jpg',
      alt: 'Classic High-Back Director Chair',
      width: 800,
      height: 600
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/classic/ic-101-mb.jpg',
      alt: 'Classic Medium-Back Director Chair',
      width: 800,
      height: 600
    }
  ],
  features: [
    'Solid wood frame',
    'Heavy-duty canvas seat and back',
    'Foldable for easy storage',
    'Traditional design',
    'Available in multiple finishes'
  ],
  specifications: {
    'Material': 'Wood, Canvas',
    'Weight Capacity': '250 lbs',
    'Dimensions': '24"W x 20"D x 38"H',
    'Warranty': '2 years'
  },
  variants: [
    {
      variantId: 'ic-100-hb',
      variantName: 'High Back',
      name: 'Classic High-Back Director Chair IC-100-HB',
      description: 'Extended high back design for classic comfort.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/classic/ic-100-hb.jpg',
      specifications: {
        'Back Height': 'High Back',
        'Model': 'IC-100-HB',
        'Weight': '10 lbs',
        'Dimensions': '24"W x 20"D x 38"H'
      }
    },
    {
      variantId: 'ic-101-mb',
      variantName: 'Medium Back',
      name: 'Classic Medium-Back Director Chair IC-101-MB',
      description: 'Versatile medium back design for everyday use.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/classic/ic-101-mb.jpg',
      specifications: {
        'Back Height': 'Medium Back',
        'Model': 'IC-101-MB',
        'Weight': '9 lbs',
        'Dimensions': '24"W x 20"D x 36"H'
      }
    }
  ]
};

export default classicDirectorChair;
