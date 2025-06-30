import { ExtendedProductData } from '../../../../product-types';

export const fleaErgonomicSeries: ExtendedProductData = {
  id: 'flea',
  name: 'Flea Ergonomic Series',
  description: 'The Flea Ergonomic Series: a poetic blend of form and function, offering high-back, mid-back, and visitor seating in a timeless black finish.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750934235/steelmade/chairs/ergonomic-series/flea/ic-352-hb-black.png',
  features: [
    'High back, mid back, and visitor ergonomic support',
    'Classic black finish',
    'Contoured for comfort and productivity',
    'Sturdy, poetic construction',
    'Designed for modern workspaces'
  ],
  variants: [
    {
      variantId: 'ic-352-hb-black',
      variantName: 'High Back Black',
      name: 'IC-352 HB Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750934235/steelmade/chairs/ergonomic-series/flea/ic-352-hb-black.png',
      description: 'High-back ergonomic chair, black finish, crafted for executive comfort.'
    },
    {
      variantId: 'ic-353-mb-black',
      variantName: 'Mid Back Black',
      name: 'IC-353 MB Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750934232/steelmade/chairs/ergonomic-series/flea/ic-353-mb-black.png',
      description: 'Mid-back ergonomic chair, black finish, designed for enduring support.'
    },
    {
      variantId: 'ic-354-visi-black',
      variantName: 'Visitor Black',
      name: 'IC-354 VISI Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750934231/steelmade/chairs/ergonomic-series/flea/ic-354-visi-black.png',
      description: 'Visitor ergonomic chair, black finish, welcoming and poetic.'
    }
  ]
};

export default fleaErgonomicSeries;
