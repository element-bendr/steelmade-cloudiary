import { ExtendedProductData } from '@/lib/data/product-types';

const operaDirectorChair: ExtendedProductData = {
  id: 'opera-director-chair',
  name: 'Opera Director Chair',
  description: 'Professional director chair combining elegance and functionality, available in high-back and medium-back configurations.',
  category: 'chairs',
  seriesId: 'director-series',
  inStock: true,
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/opera/ic-340-hb.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/opera/ic-340-hb.jpg',
      alt: 'Opera High-Back Director Chair',
      width: 800,
      height: 600
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/opera/ic-341-mb.jpg',
      alt: 'Opera Medium-Back Director Chair',
      width: 800,
      height: 600
    }
  ],
  features: [
    'Premium build quality',
    'Multiple back height options',
    'Enhanced comfort padding',
    'Durable construction',
    'Professional styling'
  ],
  specifications: {
    'Material': 'Premium grade aluminum and high-quality upholstery',
    'Weight Capacity': '300 lbs',
    'Warranty': '5-year limited warranty'
  },
  variants: [
    {
      variantId: 'ic-340-hb',
      variantName: 'High Back',
      name: 'Opera High-Back Director Chair IC-340-HB',
      description: 'Premium high-back version of the Opera Director Chair for superior comfort and support.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/opera/ic-340-hb.jpg',
      specifications: {
        'Height': '46 inches',
        'Weight Capacity': '300 lbs',
        'Frame': 'Premium grade aluminum'
      }
    },
    {
      variantId: 'ic-341-mb',
      variantName: 'Medium Back',
      name: 'Opera Medium-Back Director Chair IC-341-MB',
      description: 'Medium-back version of the Opera Director Chair offering excellent mobility and comfort.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/opera/ic-341-mb.jpg',
      specifications: {
        'Height': '42 inches',
        'Weight Capacity': '300 lbs',
        'Frame': 'Premium grade aluminum'
      }
    }
  ]
};

export default operaDirectorChair;
