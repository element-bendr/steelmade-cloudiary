import { ExtendedProductData } from '@/lib/data/product-types';

const matrixErgonomicChair: ExtendedProductData = {
  id: 'matrix-ergonomic-chair',
  name: 'Matrix Ergonomic Chair',
  description: 'The Matrix Ergonomic Chair series offers geometric comfort, bold lines, and versatile options for innovative workspaces.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  variants: [
    {
      variantId: 'ic-135-hb',
      variantName: 'High Back',
      name: 'Matrix Ergonomic Chair High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189727/steelmade/chairs/ergonomic-series/matrix/ic-135-hb.png',
    },
    {
      variantId: 'ic-136-mb',
      variantName: 'Medium Back',
      name: 'Matrix Ergonomic Chair Medium Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189726/steelmade/chairs/ergonomic-series/matrix/ic-136-mb.png',
    },
    {
      variantId: 'ic-137-visitor',
      variantName: 'Visitor',
      name: 'Matrix Ergonomic Chair Visitor',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189725/steelmade/chairs/ergonomic-series/matrix/ic-137-visitor.png',
    }
  ],
  features: [
    'Geometric ergonomic support',
    'Multiple back and visitor options',
    'Premium materials for durability',
    'Bold, innovative design',
    'Perfect for tech and creative offices'
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189727/steelmade/chairs/ergonomic-series/matrix/ic-135-hb.png',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189727/steelmade/chairs/ergonomic-series/matrix/ic-135-hb.png', alt: 'Matrix Ergonomic Chair High Back' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189726/steelmade/chairs/ergonomic-series/matrix/ic-136-mb.png', alt: 'Matrix Ergonomic Chair Medium Back' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751189725/steelmade/chairs/ergonomic-series/matrix/ic-137-visitor.png', alt: 'Matrix Ergonomic Chair Visitor' }
  ]
};

export default matrixErgonomicChair;
