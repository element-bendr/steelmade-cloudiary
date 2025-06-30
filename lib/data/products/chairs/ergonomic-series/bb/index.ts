import { ExtendedProductData } from '../../../../product-types';

export const bbErgonomicChair: ExtendedProductData = {
  id: 'bb',
  name: 'BB Ergonomic Chair',
  description: 'The BB Ergonomic Chair: a poetic collection offering mid-back, low-back, and visitor variants, crafted for comfort and modern workspaces.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751019524/steelmade/chairs/ergonomic-series/bb/ic-264-mb.png',
  features: [
    'Mid back, low back, and visitor ergonomic support',
    'Premium finishes and poetic construction',
    'Contoured for comfort and productivity',
    'Modern styling for contemporary offices',
    'A trio of variants for every need'
  ],
  variants: [
    {
      variantId: 'ic-264-mb',
      variantName: 'Mid Back',
      name: 'IC-264 MB',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751019524/steelmade/chairs/ergonomic-series/bb/ic-264-mb.png',
      description: 'Mid-back ergonomic chair, crafted for poetic productivity.'
    },
    {
      variantId: 'ic-124-lb',
      variantName: 'Low Back',
      name: 'IC-124 LB',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751019518/steelmade/chairs/ergonomic-series/bb/ic-124-lb.png',
      description: 'Low-back ergonomic chair, designed for enduring comfort.'
    },
    {
      variantId: 'ic-125-visitor',
      variantName: 'Visitor',
      name: 'IC-125 Visitor',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751019513/steelmade/chairs/ergonomic-series/bb/ic-125-visitor.png',
      description: 'Visitor ergonomic chair, welcoming and poetic.'
    }
  ]
};

export default bbErgonomicChair;
