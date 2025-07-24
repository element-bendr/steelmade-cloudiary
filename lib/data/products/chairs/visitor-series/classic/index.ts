import { ExtendedProductData } from '../../../../product-types';

const visitorClassicChair: ExtendedProductData = {
  id: 'visitor-classic-chair',
  name: 'Visitor Classic Chair',
  description: 'A timeless visitor chair, blending comfort and simplicity for every guest.',
  category: 'chairs',
  seriesId: 'visitor-series',
  inStock: true,
  price: '',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/visitor-series/classic.png',
  features: [
    'Classic comfort',
    'Durable build',
    'Elegant design',
    'Perfect for reception and meeting areas'
  ],
  specifications: {
    'Material': 'Steel, premium upholstery',
    'Weight Capacity': '120kg',
    'Dimensions': '22"W x 20"D x 36"H',
    'Warranty': '2 years'
  },
  variants: [
    {
      variantId: 'classic-black',
      variantName: 'Black',
      name: 'Visitor Classic Chair Black',
      description: 'Classic black finish for timeless elegance.',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/visitor-series/classic.png',
      specifications: {
        'Color': 'Black',
        'Material': 'Steel, premium upholstery',
        'Weight': '8kg',
        'Dimensions': '22"W x 20"D x 36"H'
      }
    }
  ],
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/visitor-series/classic.png', alt: 'Visitor Classic Chair Black', width: 800, height: 600 }
  ]
};

export default visitorClassicChair;
