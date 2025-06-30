import { ExtendedProductData } from '../../../../product-types';

export const evErgonomicChair: ExtendedProductData = {
  id: 'ev',
  name: 'EV Ergonomic Chair',
  description: 'The EV Ergonomic Chair: a poetic, high-back masterpiece in the ergonomic series, designed for comfort, support, and modern elegance.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750935192/steelmade/chairs/ergonomic-series/ev/ic-358-hb.png',
  features: [
    'High back ergonomic support',
    'Sleek, modern black finish',
    'Contoured for all-day comfort',
    'Sturdy, poetic construction',
    'Designed for executive workspaces'
  ],
  variants: [
    {
      variantId: 'ic-358-hb',
      variantName: 'High Back',
      name: 'IC-358 HB',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750935192/steelmade/chairs/ergonomic-series/ev/ic-358-hb.png',
      description: 'High-back ergonomic chair, black finish, crafted for poetic productivity.'
    }
  ]
};

export default evErgonomicChair;
