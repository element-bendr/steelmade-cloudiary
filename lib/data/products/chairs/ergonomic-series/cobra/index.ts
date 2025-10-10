import { ExtendedProductData } from '@/lib/data/product-types';

const cobraErgonomicChair: ExtendedProductData = {
  id: 'cobra-ergonomic-chair',
  name: 'Cobra Ergonomic Chair',
  description: 'The Cobra Ergonomic Chair series delivers striking comfort, bold lines, and versatile options for dynamic workspaces.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  variants: [
    {
      variantId: 'ic-138-hb',
      variantName: 'High Back',
      name: 'Cobra Ergonomic Chair High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/ergonomic-series/cobra/ic-138-hb.png',
    },
    {
      variantId: 'ic-266a-grey',
      variantName: 'Grey',
      name: 'Cobra Ergonomic Chair Grey',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/ergonomic-series/cobra/ic-266a-grey.png',
    },
    {
      variantId: 'ic-139-lb',
      variantName: 'Low Back',
      name: 'Cobra Ergonomic Chair Low Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/ergonomic-series/cobra/ic-139-lb.png',
    }
  ],
  features: [
    'Striking ergonomic support',
    'Multiple back and color options',
    'Premium materials for durability',
    'Bold, dynamic design',
    'Perfect for energetic and modern offices'
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/ergonomic-series/cobra/ic-138-hb.png',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/ergonomic-series/cobra/ic-138-hb.png', alt: 'Cobra Ergonomic Chair High Back' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/ergonomic-series/cobra/ic-266a-grey.png', alt: 'Cobra Ergonomic Chair Grey' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/ergonomic-series/cobra/ic-139-lb.png', alt: 'Cobra Ergonomic Chair Low Back' }
  ]
};

export default cobraErgonomicChair;
