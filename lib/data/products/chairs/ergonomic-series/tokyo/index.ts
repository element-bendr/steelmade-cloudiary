import { ExtendedProductData } from '../../../../product-types';

export const tokyoErgonomicSeries: ExtendedProductData = {
  id: 'tokyo',
  name: 'Tokyo Ergonomic Series',
  description: 'The Tokyo Ergonomic Series: a poetic collection of high-back and mid-back chairs in elegant black and white finishes, designed for comfort and modernity.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750935594/steelmade/chairs/ergonomic-series/tokyo/ic-116-hb-white.png',
  features: [
    'High back and mid back ergonomic support',
    'Available in black and white finishes',
    'Contoured for comfort and productivity',
    'Sturdy, poetic construction',
    'Designed for contemporary workspaces'
  ],
  variants: [
    {
      variantId: 'ic-116-hb-white',
      variantName: 'High Back White',
      name: 'IC-116 HB White',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750935594/steelmade/chairs/ergonomic-series/tokyo/ic-116-hb-white.png',
      description: 'High-back ergonomic chair, white finish, crafted for poetic comfort.'
    },
    {
      variantId: 'ic-117-mb-white',
      variantName: 'Mid Back White',
      name: 'IC-117 MB White',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750935589/steelmade/chairs/ergonomic-series/tokyo/ic-117-mb-white.png',
      description: 'Mid-back ergonomic chair, white finish, designed for modern workspaces.'
    },
    {
      variantId: 'ic-118-hb-black',
      variantName: 'High Back Black',
      name: 'IC-118 HB Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750935585/steelmade/chairs/ergonomic-series/tokyo/ic-118-hb-black.png',
      description: 'High-back ergonomic chair, black finish, engineered for all-day comfort.'
    },
    {
      variantId: 'ic-119-mb-black',
      variantName: 'Mid Back Black',
      name: 'IC-119 MB Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750935582/steelmade/chairs/ergonomic-series/tokyo/ic-119-mb-black.png',
      description: 'Mid-back ergonomic chair, black finish, crafted for poetic productivity.'
    }
  ]
};

export default tokyoErgonomicSeries;
