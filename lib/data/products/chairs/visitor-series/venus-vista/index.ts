import { ExtendedProductData } from '../../../../product-types';

const visitorVenusVistaChair: ExtendedProductData = {
  id: 'visitor-venus-vista-chair',
  name: 'Visitor Venus & Vista Chair',
  description: 'Venus & Vista: radiant, poetic visitor chairs, welcoming every guest with grace and comfort.',
  category: 'chairs',
  seriesId: 'visitor-series',
  inStock: true,
  price: '',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752131388/steelmade/chairs/visitor-series/venus/ic-148.png',
  features: [
    'Radiant comfort',
    'Elegant Venus & Vista design',
    'Available with or without arms',
    'Vista variant for modern spaces',
    'Perfect for reception, lounge, and meeting areas'
  ],
  specifications: {
    'Material': 'Steel, premium upholstery',
    'Weight Capacity': '120kg',
    'Dimensions': '22"W x 20"D x 36"H',
    'Warranty': '2 years'
  },
  variants: [
    {
      variantId: 'venus-standard',
      variantName: 'Venus Standard',
      name: 'Visitor Venus Chair',
      description: 'Venus chair in standard configuration.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752131388/steelmade/chairs/visitor-series/venus/ic-148.png',
      specifications: {
        'Type': 'Standard',
        'Material': 'Steel, premium upholstery',
        'Weight': '8kg',
        'Dimensions': '22"W x 20"D x 36"H'
      }
    },
    {
      variantId: 'venus-arms',
      variantName: 'Venus With Arms',
      name: 'Visitor Venus Chair With Arms',
      description: 'Venus chair with arms for added comfort.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752131215/steelmade/chairs/visitor-series/venus/ic-149-arms.png',
      specifications: {
        'Type': 'With Arms',
        'Material': 'Steel, premium upholstery',
        'Weight': '8.5kg',
        'Dimensions': '22"W x 20"D x 36"H'
      }
    },
    {
      variantId: 'vista',
      variantName: 'Vista',
      name: 'Visitor Vista Chair',
      description: 'Vista chair for modern spaces.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752131386/steelmade/chairs/visitor-series/vista/ic-169.png',
      specifications: {
        'Type': 'Vista',
        'Material': 'Steel, premium upholstery',
        'Weight': '8kg',
        'Dimensions': '22"W x 20"D x 36"H'
      }
    }
  ],
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752131388/steelmade/chairs/visitor-series/venus/ic-148.png', alt: 'Visitor Venus Chair', width: 800, height: 600 },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752131215/steelmade/chairs/visitor-series/venus/ic-149-arms.png', alt: 'Visitor Venus Chair With Arms', width: 800, height: 600 },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752131386/steelmade/chairs/visitor-series/vista/ic-169.png', alt: 'Visitor Vista Chair', width: 800, height: 600 }
  ]
};

export default visitorVenusVistaChair;
