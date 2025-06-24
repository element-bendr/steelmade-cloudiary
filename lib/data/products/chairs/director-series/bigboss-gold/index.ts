import { ExtendedProductData } from '@/lib/data/product-types';

const bigbossGoldDirectorChair: ExtendedProductData = {
  id: 'bigboss-gold',
  name: 'Bigboss Gold Director Chair',
  description: 'A luxurious director chair with gold accents for executive presence.',
  category: 'chairs',
  seriesId: 'director-series',
  features: [
    'Gold-plated frame',
    'Premium leather upholstery',
    'Ergonomic design',
    'Adjustable height and recline',
    'Swivel base',
    'Executive style'
  ],
  variants: [
    {
      variantId: 'gold-black',
      variantName: 'Gold & Black',
      name: 'Bigboss Gold Director Chair - Gold & Black',
      imageUrl: '/images/products/chairs/bigboss-gold/gold-black.jpg'
    },
    {
      variantId: 'gold-brown',
      variantName: 'Gold & Brown',
      name: 'Bigboss Gold Director Chair - Gold & Brown',
      imageUrl: '/images/products/chairs/bigboss-gold/gold-brown.jpg'
    }
  ],
  imageUrl: '/images/products/chairs/bigboss-gold/gold-black.jpg',
  images: [
    '/images/products/chairs/bigboss-gold/gold-black.jpg',
    '/images/products/chairs/bigboss-gold/gold-brown.jpg'
  ]
};

export default bigbossGoldDirectorChair;
