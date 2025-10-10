import { ExtendedProductData } from '../../../../product-types';

export const mercedesErgonomicChair: ExtendedProductData = {
  id: 'mercedes',
  name: 'Mercedes Ergonomic Chair',
  description: 'Mercedes Ergonomic Chair, available in visitor and high back, black and grey variants. Designed for elegance, comfort, and poetic productivity.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750741597/steelmade/chairs/ergonomic-series/mercedes/ic-348-visi-black.png',
  features: [
    'Visitor and high back ergonomic support',
    'Premium black and grey finishes',
    'Elegant, poetic design',
    'Comfort for every workspace',
    'Sturdy, enduring construction'
  ],
  variants: [
    {
      variantId: 'ic-348-visi-black',
      variantName: 'Visitor Black',
      name: 'IC-348 Visi Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750741597/steelmade/chairs/ergonomic-series/mercedes/ic-348-visi-black.png',
      description: 'Visitor ergonomic chair, black finish, for elegant office spaces.'
    },
    {
      variantId: 'ic-351-visi-grey',
      variantName: 'Visitor Grey',
      name: 'IC-351 Visi Grey',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750741597/steelmade/chairs/ergonomic-series/mercedes/ic-351-visi-grey.png',
      description: 'Visitor ergonomic chair, grey finish, for modern workspaces.'
    },
    {
      variantId: 'ic-349-hb-grey',
      variantName: 'High Back Grey',
      name: 'IC-349 HB Grey',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750741596/steelmade/chairs/ergonomic-series/mercedes/ic-349-hb-grey.png',
      description: 'High-back ergonomic chair in grey, engineered for all-day comfort.'
    }
  ]
};
