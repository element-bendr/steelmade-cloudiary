import { ExtendedProductData } from '../../../../product-types';

export const dcErgonomicChair: ExtendedProductData = {
  id: 'dc',
  name: 'DC Ergonomic Chair',
  description: 'DC Ergonomic Chair, available in high back and mid back, black and grey variants. Designed for comfort, support, and poetic productivity.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750684601/steelmade/chairs/ergonomic-series/dc/ic-342-hb-black.jpg',
  features: [
    'High back and mid back ergonomic support',
    'Premium black and grey finishes',
    'Adjustable height, tilt, and armrests',
    'Lumbar support and contoured seat',
    'Sturdy, poetic construction'
  ],
  variants: [
    {
      variantId: 'ic-342-hb-black',
      variantName: 'High Back Black',
      name: 'IC-342 HB Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750684601/steelmade/chairs/ergonomic-series/dc/ic-342-hb-black.jpg',
      description: 'Ergonomic high-back chair, black finish, designed for comfort and support.'
    },
    {
      variantId: 'ic-345-mb-grey',
      variantName: 'Mid Back Grey',
      name: 'IC-345 MB Grey',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750684598/steelmade/chairs/ergonomic-series/dc/ic-345-mb-grey.jpg',
      description: 'Ergonomic mid-back chair, grey finish, crafted for modern workspaces.'
    },
    {
      variantId: 'ic-344-hb-grey',
      variantName: 'High Back Grey',
      name: 'IC-344 HB Grey',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750684597/steelmade/chairs/ergonomic-series/dc/ic-344-hb-grey.jpg',
      description: 'High-back ergonomic chair in grey, engineered for all-day comfort.'
    },
    {
      variantId: 'ic-343-mb-black',
      variantName: 'Mid Back Black',
      name: 'IC-343 MB Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750684600/steelmade/chairs/ergonomic-series/dc/ic-343-mb-black.jpg',
      description: 'Ergonomic mid-back chair, black finish, crafted for enduring comfort and poetic productivity.'
    }
  ]
};
