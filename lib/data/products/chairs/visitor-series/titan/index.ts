import { ExtendedProductData } from '../../../../product-types';

const visitorTitanChair: ExtendedProductData = {
  id: 'visitor-titan',
  name: 'Titan Visitor Chair',
  description: 'A poetic seat of strength, welcoming guests with titanic comfort and bold design.',
  category: 'chairs',
  seriesId: 'visitor-series',
  inStock: true,
  price: '',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752131205/steelmade/chairs/visitor-series/titan/ic-154.png',
  features: [
    'Titanic comfort',
    'Bold design',
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
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752131205/steelmade/chairs/visitor-series/titan/ic-154.png',
      alt: 'Titan Visitor Chair - IC-154',
      width: 1200,
      height: 800
    }
  ],
  variants: [
    {
      variantId: 'ic-154',
      variantName: 'IC-154',
      name: 'Titan Visitor Chair IC-154',
      description: 'Classic Titan visitor chair variant.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752131205/steelmade/chairs/visitor-series/titan/ic-154.png',
      specifications: {
        'Style': 'Titan',
        'Model': 'IC-154'
      }
    }
  ]
};

export default visitorTitanChair;
