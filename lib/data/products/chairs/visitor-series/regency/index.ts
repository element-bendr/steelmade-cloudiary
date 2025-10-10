import { ExtendedProductData } from '../../../../product-types';

const visitorRegencyChair: ExtendedProductData = {
  id: 'visitor-regency',
  name: 'Regency Visitor Chair',
  description: 'A poetic seat for distinguished guests, blending regal comfort and timeless elegance.',
  category: 'chairs',
  seriesId: 'visitor-series',
  inStock: true,
  price: '',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752131212/steelmade/chairs/visitor-series/regency/ic-152.png',
      alt: 'Regency Visitor Chair - IC-152',
      width: 1200,
      height: 800
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752131165/steelmade/chairs/visitor-series/regency/ic-176-pad.png',
      alt: 'Regency Visitor Chair - IC-176 Pad',
      width: 1200,
      height: 800
    }
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752131212/steelmade/chairs/visitor-series/regency/ic-152.png',
  features: [
    'Regal comfort',
    'Timeless elegance',
    'Distinguished design',
    'Perfect for guest and reception areas'
  ],
  variants: [
    {
      variantId: 'ic-152',
      variantName: 'IC-152',
      name: 'Regency Visitor Chair IC-152',
      description: 'Classic Regency visitor chair variant.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752131212/steelmade/chairs/visitor-series/regency/ic-152.png',
      specifications: {
        'Style': 'Regency',
        'Model': 'IC-152'
      }
    },
    {
      variantId: 'ic-176-pad',
      variantName: 'IC-176 Pad',
      name: 'Regency Visitor Chair IC-176 Pad',
      description: 'Regency visitor chair with padded comfort.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752131165/steelmade/chairs/visitor-series/regency/ic-176-pad.png',
      specifications: {
        'Style': 'Regency',
        'Model': 'IC-176 Pad',
        'Feature': 'Padded seat'
      }
    }
  ],
  specifications: {
    'Material': 'Steel, premium upholstery',
    'Weight Capacity': '120kg',
    'Dimensions': '22"W x 20"D x 36"H',
    'Warranty': '2 years'
  }
};

export default visitorRegencyChair;
