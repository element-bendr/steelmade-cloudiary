import { ExtendedProductData } from '../../../../product-types';

const visitorLibertyChair: ExtendedProductData = {
  id: 'visitor-liberty',
  name: 'Liberty Visitor Chair',
  description: 'A poetic seat for guests, celebrating freedom and comfort in every detail.',
  category: 'chairs',
  seriesId: 'visitor-series',
  inStock: true,
  price: '',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752594076/steelmade/chairs/visitor-series/liberty/ic-151.png',
  features: [
    'Freedom-inspired comfort',
    'Elegant design',
    'Durable build',
    'Perfect for guest and reception areas'
  ],
  specifications: {
    'Material': 'Steel, premium upholstery',
    'Weight Capacity': '120kg',
    'Dimensions': '22"W x 20"D x 36"H',
    'Warranty': '2 years'
  },
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752594076/steelmade/chairs/visitor-series/liberty/ic-151.png',
      alt: 'Liberty Visitor Chair - IC-151',
      width: 1200,
      height: 800
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752131168/steelmade/chairs/visitor-series/liberty/ic-175-pad.png',
      alt: 'Liberty Visitor Chair - IC-175 Pad',
      width: 1200,
      height: 800
    }
  ],
  variants: [
    {
      variantId: 'ic-151',
      variantName: 'IC-151',
      name: 'Liberty Visitor Chair IC-151',
      description: 'Classic Liberty visitor chair variant.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752594076/steelmade/chairs/visitor-series/liberty/ic-151.png',
      specifications: {
        'Style': 'Liberty',
        'Model': 'IC-151'
      }
    },
    {
      variantId: 'ic-175-pad',
      variantName: 'IC-175 Pad',
      name: 'Liberty Visitor Chair IC-175 Pad',
      description: 'Liberty visitor chair with padded comfort.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752131168/steelmade/chairs/visitor-series/liberty/ic-175-pad.png',
      specifications: {
        'Style': 'Liberty',
        'Model': 'IC-175 Pad',
        'Feature': 'Padded seat'
      }
    }
  ]
};

export default visitorLibertyChair;
