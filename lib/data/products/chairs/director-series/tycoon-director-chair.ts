import { ExtendedProductData } from "@/lib/data/product-types";

// Export the chair data
export const tycoondirectorchair: ExtendedProductData = {
  id: 'tycoon-director-chair',
  name: 'Tycoon Director Chair',
  description: 'The ultimate in luxury and comfort for executives.',
  category: 'chairs',
  seriesId: 'director-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/tycoon/ic-01-hb.jpg',  inStock: true,
  price: '1299.99',
  images: [
    { 
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/tycoon/ic-01-hb.jpg',
      alt: 'Tycoon High-Back Director Chair',
      width: 800,
      height: 600 
    },
    { 
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/tycoon/ic-02-mb.jpg',
      alt: 'Tycoon Medium-Back Director Chair',
      width: 800,
      height: 600
    }
  ],
  features: [
    'Premium leather upholstery',
    'Adjustable height and tilt',
    'Lumbar support',
    'Polished aluminum base',
    'Swivel functionality'
  ],
  specifications: {
    'Material': 'Genuine leather, aluminum',
    'Weight Capacity': '300 lbs',
    'Dimensions': '28"W x 30"D x 48"H',
    'Warranty': '10 years'
  },
  variants: [
    {
      variantId: 'ic-01-hb',
      variantName: 'High Back',
      name: 'Tycoon High-Back Director Chair IC-01-HB',
      description: 'Extra tall back for maximum support',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/tycoon/ic-01-hb.jpg',
      specifications: {
        'Back Height': 'High Back',
        'Model': 'IC-01-HB',
        'Weight': '16 lbs',
        'Dimensions': '28"W x 30"D x 48"H'
      }
    },
    {
      variantId: 'ic-02-mb',
      variantName: 'Medium Back',
      name: 'Tycoon Medium-Back Director Chair IC-02-MB',
      description: 'Standard back height for versatile use',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/tycoon/ic-02-mb.jpg',
      specifications: {
        'Back Height': 'Medium Back',
        'Model': 'IC-02-MB',
        'Weight': '14 lbs',
        'Dimensions': '28"W x 30"D x 42"H'
      }
    }
  ]
};