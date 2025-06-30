import { ExtendedProductData } from '../../../../product-types';

export const feedoErgonomicChair: ExtendedProductData = {
  id: 'feedo',
  name: 'Feedo Ergonomic Chair',
  description: 'The Feedo Ergonomic Chair: a poetic union of high-back and mid-back comfort, available in black and grey, designed for modern productivity.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751015058/steelmade/chairs/ergonomic-series/feedo/ic-259-hb-black.png',
  features: [
    'High back and mid back ergonomic support',
    'Premium black and grey finishes',
    'Contoured for comfort and productivity',
    'Sturdy, poetic construction',
    'Designed for modern workspaces'
  ],
  variants: [
    {
      variantId: 'ic-259-hb-black',
      variantName: 'High Back Black',
      name: 'IC-259 HB Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751015058/steelmade/chairs/ergonomic-series/feedo/ic-259-hb-black.png',
      description: 'High-back ergonomic chair, black finish, crafted for poetic productivity.'
    },
    {
      variantId: 'ic-260-mb-grey',
      variantName: 'Mid Back Grey',
      name: 'IC-260 MB Grey',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751015058/steelmade/chairs/ergonomic-series/feedo/ic-260-mb-grey.png',
      description: 'Mid-back ergonomic chair, grey finish, designed for enduring comfort.'
    }
  ]
};

export default feedoErgonomicChair;
