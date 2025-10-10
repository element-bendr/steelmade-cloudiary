import { ExtendedProductData } from '@/lib/data/product-types';

const ashleyDirectorChair: ExtendedProductData = {
  id: 'ashley-director-chair',
  name: 'Ashley Director Chair',
  description: 'Elegant and functional director chair with premium materials and modern design.',
  category: 'chairs',
  seriesId: 'director-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg',
  inStock: true,
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg',
      alt: 'Ashley High-Back Director Chair',
      width: 800,
      height: 600
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-362-mb.jpg',
      alt: 'Ashley Medium-Back Director Chair',
      width: 800,
      height: 600
    }
  ],
  features: [
    'Premium leather and fabric combination',
    'Ergonomic back support',
    'Lightweight aluminum frame',
    'Adjustable height',
    'Foldable design for easy storage'
  ],
  specifications: {
    'Material': 'Leather, fabric, aluminum',
    'Weight Capacity': '275 lbs',
    'Dimensions': '25"W x 22"D x 40"H',
    'Warranty': '5 years'
  },
  variants: [
    {
      variantId: 'ic-361-hb',
      variantName: 'High Back',
      name: 'Ashley High-Back Director Chair IC-361-HB',
      description: 'Extended high back design for superior comfort',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg',
      specifications: {
        'Back Height': 'High Back',
        'Model': 'IC-361-HB',
        'Weight': '12 lbs',
        'Dimensions': '25"W x 22"D x 44"H'
      }
    },
    {
      variantId: 'ic-362-mb',
      variantName: 'Medium Back',
      name: 'Ashley Medium-Back Director Chair IC-362-MB',
      description: 'Versatile medium back design for everyday use',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-362-mb.jpg',
      specifications: {
        'Back Height': 'Medium Back',
        'Model': 'IC-362-MB',
        'Weight': '11 lbs',
        'Dimensions': '25"W x 22"D x 40"H'
      }
    }
  ]
};

export default ashleyDirectorChair;
