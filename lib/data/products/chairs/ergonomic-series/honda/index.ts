import { ExtendedProductData } from '@/lib/data/product-types';

const hondaErgonomicChair: ExtendedProductData = {
  id: 'honda-ergonomic-chair',
  name: 'Honda Ergonomic Chair',
  description: 'The Honda Ergonomic Chair series offers advanced comfort, modern design, and versatile options for every workspace.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  variants: [
    {
      variantId: 'ic-123b-grey',
      variantName: 'Grey',
      name: 'Honda Ergonomic Chair Grey',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751020437/steelmade/chairs/ergonomic-series/honda/ic-123b-grey.png',
    },
    {
      variantId: 'ic-123a-white',
      variantName: 'White',
      name: 'Honda Ergonomic Chair White',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751020443/steelmade/chairs/ergonomic-series/honda/ic-123a-white.png',
    },
    {
      variantId: 'ic-123c-visi-black',
      variantName: 'Visi Black',
      name: 'Honda Ergonomic Chair Visi Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751020451/steelmade/chairs/ergonomic-series/honda/ic-123c-visi-black.png',
    },
    {
      variantId: 'ic-123-mb-black',
      variantName: 'MB Black',
      name: 'Honda Ergonomic Chair MB Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751020458/steelmade/chairs/ergonomic-series/honda/ic-123-mb-black.png',
    },
    {
      variantId: 'ic-123d-hb',
      variantName: 'High Back',
      name: 'Honda Ergonomic Chair High Back',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751020466/steelmade/chairs/ergonomic-series/honda/ic-123d-hb.png',
    }
  ],
  features: [
    'Advanced ergonomic support',
    'Multiple color and back options',
    'Premium materials for durability',
    'Modern, versatile design',
    'Perfect for office and home use'
  ],
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751020437/steelmade/chairs/ergonomic-series/honda/ic-123b-grey.png',
  images: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751020437/steelmade/chairs/ergonomic-series/honda/ic-123b-grey.png', alt: 'Honda Ergonomic Chair Grey' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751020443/steelmade/chairs/ergonomic-series/honda/ic-123a-white.png', alt: 'Honda Ergonomic Chair White' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751020451/steelmade/chairs/ergonomic-series/honda/ic-123c-visi-black.png', alt: 'Honda Ergonomic Chair Visi Black' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751020458/steelmade/chairs/ergonomic-series/honda/ic-123-mb-black.png', alt: 'Honda Ergonomic Chair MB Black' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1751020466/steelmade/chairs/ergonomic-series/honda/ic-123d-hb.png', alt: 'Honda Ergonomic Chair High Back' }
  ]
};

export default hondaErgonomicChair;
