import { ProductSeries } from '../../../product-types';

const privacyScreens: ProductSeries = {
  id: 'privacy-screens',
  title: 'Privacy Screens',
  description: 'Desk-mounted and freestanding privacy screens to create focused workspaces in open-plan offices.',
  seoDescription: 'Privacy screens and desk dividers to improve focus and acoustic comfort in offices.',
  coverImage: {
    url: '/images/placeholder/privacy-screens-cover.jpg',
    alt: 'Privacy Screens',
    width: 1200,
    height: 800
  },
  products: {
    '8mm-laminated-glass': {
      id: '8mm-laminated-glass',
      name: '8mm Laminated Glass Screen',
      description: 'Clear laminated glass privacy screen providing durable and transparent partitioning.',
      category: 'modular-furniture',
      seriesId: 'privacy-screens',
      inStock: true,
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404533/steelmade/modular/privacyscreens/8mm-laminated-glass.png',
      features: ['Clear laminated glass', 'Scratch resistant', 'Modern aesthetic'],
      specifications: { 'Material': 'Laminated Glass', 'Thickness': '8mm' },
      images: [
        { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404533/steelmade/modular/privacyscreens/8mm-laminated-glass.png', alt: '8mm Laminated Glass Screen', width: 1200, height: 800 }
      ],
      variants: [
        { variantId: '8mm-laminated-glass-standard', variantName: 'Standard', name: '8mm Laminated Glass - Standard', description: 'Standard 8mm laminated glass screen', imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404533/steelmade/modular/privacyscreens/8mm-laminated-glass.png', specifications: { 'Thickness': '8mm' } }
      ]
    }
    ,
    '30mm-screen': {
      id: '30mm-screen',
      name: '30mm Acoustic Screen',
      description: '30mm thick acoustic privacy screen for superior sound dampening and privacy.',
      category: 'modular-furniture',
      seriesId: 'privacy-screens',
      inStock: true,
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404530/steelmade/modular/privacyscreens/30mm-screen.png',
      features: ['High-density acoustic core', 'Pinable fabric surface', 'Freestanding or desk-mounted options'],
      specifications: { 'Material': 'Acoustic Core', 'Thickness': '30mm' },
      images: [
        { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404530/steelmade/modular/privacyscreens/30mm-screen.png', alt: '30mm Acoustic Screen', width: 1200, height: 800 }
      ],
      variants: [
        { variantId: '30mm-screen-standard', variantName: 'Standard', name: '30mm Acoustic Screen - Standard', description: 'Standard 30mm acoustic screen', imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404530/steelmade/modular/privacyscreens/30mm-screen.png', specifications: { 'Thickness': '30mm' } }
      ]
    }
    ,
    '18mm-screen': {
      id: '18mm-screen',
      name: '18mm Privacy Screen',
      description: 'Slim 18mm privacy screen suitable for desk dividers with good acoustic performance.',
      category: 'modular-furniture',
      seriesId: 'privacy-screens',
      inStock: true,
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404526/steelmade/modular/privacyscreens/18mm-screen.png',
      features: ['Slim profile', 'Acoustic backing', 'Multiple finishes available'],
      specifications: { 'Material': 'Composite', 'Thickness': '18mm' },
      images: [
        { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404526/steelmade/modular/privacyscreens/18mm-screen.png', alt: '18mm Privacy Screen', width: 1200, height: 800 }
      ],
      variants: [
        { variantId: '18mm-screen-standard', variantName: 'Standard', name: '18mm Privacy Screen - Standard', description: 'Standard 18mm privacy screen', imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404526/steelmade/modular/privacyscreens/18mm-screen.png', specifications: { 'Thickness': '18mm' } }
      ]
    }
  }
};

export default privacyScreens;
