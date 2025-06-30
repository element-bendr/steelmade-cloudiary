import { ExtendedProductData } from '../../../../product-types';

export const olaRomanErgonomicChair: ExtendedProductData = {
  id: 'ola-roman',
  name: 'Ola & Roman Ergonomic Chairs',
  description: 'A poetic duo: Ola and Roman ergonomic chairs, each crafted for comfort and modern workspaces, united under one harmonious collection.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751020488/steelmade/chairs/ergonomic-series/ola/ic-144.png',
  features: [
    'Distinct ergonomic designs for every need',
    'Premium finishes and poetic construction',
    'Contoured for comfort and productivity',
    'Modern styling for contemporary offices',
    'A duo of unique personalities in one collection'
  ],
  variants: [
    {
      variantId: 'ic-144-ola',
      variantName: 'Ola',
      name: 'IC-144 Ola',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751020488/steelmade/chairs/ergonomic-series/ola/ic-144.png',
      description: 'Ola ergonomic chair, a poetic seat for modern productivity.'
    },
    {
      variantId: 'ic-127-roman',
      variantName: 'Roman',
      name: 'IC-127 Roman',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751020481/steelmade/chairs/ergonomic-series/roman/ic-127.png',
      description: 'Roman ergonomic chair, crafted for comfort and creative work.'
    },
    {
      variantId: 'ic-128-roman-visitor',
      variantName: 'Roman Visitor',
      name: 'IC-128 Roman Visitor',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751020473/steelmade/chairs/ergonomic-series/roman/ic-128-visitor.png',
      description: 'Roman visitor ergonomic chair, designed for poetic elegance and support.'
    }
  ]
};

export default olaRomanErgonomicChair;
