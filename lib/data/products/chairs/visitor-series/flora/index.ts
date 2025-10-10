import { ExtendedProductData } from '../../../../product-types';

const visitorFloraChair: ExtendedProductData = {
  id: 'visitor-flora',
  name: 'Flora Visitor Chair',
  description: 'A poetic seat inspired by nature, welcoming guests with floral elegance and comfort.',
  category: 'chairs',
  seriesId: 'visitor-series',
  inStock: true,
  price: '',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752131208/steelmade/chairs/visitor-series/flora/ic-153.png',
  features: [
    'Nature-inspired comfort',
    'Elegant floral design',
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
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752131208/steelmade/chairs/visitor-series/flora/ic-153.png',
      alt: 'Flora Visitor Chair - IC-153',
      width: 1200,
      height: 800
    }
  ],
  variants: [
    {
      variantId: 'ic-153',
      variantName: 'IC-153',
      name: 'Flora Visitor Chair IC-153',
      description: 'Classic Flora visitor chair variant.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752131208/steelmade/chairs/visitor-series/flora/ic-153.png',
      specifications: {
        'Style': 'Flora',
        'Model': 'IC-153'
      }
    }
  ]
};

export default visitorFloraChair;
