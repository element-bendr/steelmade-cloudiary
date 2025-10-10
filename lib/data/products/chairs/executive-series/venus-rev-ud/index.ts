import { ExtendedProductData } from '../../../../product-types';

export const venusRevUdExecutiveChair: ExtendedProductData = {
  id: 'venus-rev-ud',
  name: 'Venus Rev UD Executive Chair',
  description: 'The Venus Rev UD Executive Chair blends modern design with ergonomic comfort, perfect for dynamic executive spaces.',
  category: 'chairs',
  seriesId: 'executive-series',
  inStock: true,
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/steelmade/chairs/executive-series/Venus-rev-ud/ic-304.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/steelmade/chairs/executive-series/Venus-rev-ud/ic-304.jpg',
      alt: 'Venus Rev UD Executive Chair',
      width: 800,
      height: 600,
    }
  ],
  features: [
    'Modern executive silhouette',
    'Ergonomic support for all-day comfort',
    'Premium materials and finish',
  ],
  specifications: {},
  variants: [
    {
      variantId: 'rev-ud',
      variantName: 'Rev UD',
      name: 'Venus Rev UD Executive Chair - Rev UD',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/steelmade/chairs/executive-series/Venus-rev-ud/ic-304.jpg',
      description: 'Rev UD variant of the Venus Executive Chair.',
      specifications: {},
      imageClass: 'object-contain p-8 max-h-[420px]'
    }
  ]
};

export default venusRevUdExecutiveChair;
