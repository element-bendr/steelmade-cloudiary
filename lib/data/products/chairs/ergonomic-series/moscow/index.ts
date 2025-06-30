import { ExtendedProductData } from '../../../../product-types';

export const moscowErgonomicChair: ExtendedProductData = {
  id: 'moscow',
  name: 'Moscow Ergonomic Chair',
  description: 'The Moscow Ergonomic Chair: a poetic blend of high-back and mid-back comfort, both in classic black, designed for enduring productivity and modern elegance.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751016877/steelmade/chairs/ergonomic-series/moscow/ic-28-hb-black.png',
  features: [
    'High back and mid back ergonomic support',
    'Classic black finish',
    'Contoured for comfort and productivity',
    'Sturdy, poetic construction',
    'Designed for modern workspaces'
  ],
  variants: [
    {
      variantId: 'ic-28-hb-black',
      variantName: 'High Back Black',
      name: 'IC-28 HB Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751016877/steelmade/chairs/ergonomic-series/moscow/ic-28-hb-black.png',
      description: 'High-back ergonomic chair, black finish, crafted for poetic productivity.'
    },
    {
      variantId: 'ic-29-mb-black',
      variantName: 'Mid Back Black',
      name: 'IC-29 MB Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751016881/steelmade/chairs/ergonomic-series/moscow/ic-29-mb-black.png',
      description: 'Mid-back ergonomic chair, black finish, designed for enduring comfort.'
    }
  ]
};

export default moscowErgonomicChair;
