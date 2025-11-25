import { ProductSeries } from '../../../product-types';

const wireManagement: ProductSeries = {
  id: 'wire-management',
  title: 'Wire Management',
  description: 'Cable trays, raceways and smart wire routing solutions for neat and safe installations.',
  seoDescription: 'Wire management systems including cable trays, raceways and accessories for office installations.',
  coverImage: {
    url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404253/steelmade/modular/wire%20management/aluminium-raceway.png',
    alt: 'Wire Management Solutions',
    width: 1200,
    height: 800
  },
  products: {
    // aluminium raceway product
    'aluminium-raceway': {
      id: 'aluminium-raceway',
      name: 'Aluminium Raceway',
      description: 'Aluminium raceway for clean cable management in office environments.',
      category: 'modular-furniture',
      seriesId: 'wire-management',
      inStock: true,
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404253/steelmade/modular/wire%20management/aluminium-raceway.png',
      features: ['Aluminium construction', 'Easy snap-on covers', 'Multiple mounting options'],
      specifications: { 'Material': 'Aluminium', 'Length': '2m' },
      images: [
  { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404253/steelmade/modular/wire%20management/aluminium-raceway.png', alt: 'Aluminium Raceway', width: 1200, height: 800 }
      ],
      variants: [
  { variantId: 'aluminium-raceway-2m', variantName: '2m', name: 'Aluminium Raceway 2m', description: '2 meter aluminium raceway', imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404253/steelmade/modular/wire%20management/aluminium-raceway.png', specifications: { 'Length': '2m' } }
      ]
    }
    ,
    
    // C-Access Raleway Below (alternate mounting)
    'c-access-raleway-below': {
      id: 'c-access-raleway-below',
      name: 'C-Access Raleway Below',
      description: 'C-Access variant for below-rail mounting (Raleway below configuration).',
      category: 'modular-furniture',
      seriesId: 'wire-management',
      inStock: true,
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404254/steelmade/modular/wire%20management/c-access-raleway-below.png',
      features: ['Below-rail mounting', 'Integrated clip system', 'Durable finish'],
      specifications: { 'Material': 'Steel', 'Length': '2m' },
      images: [
        { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404254/steelmade/modular/wire%20management/c-access-raleway-below.png', alt: 'C-Access Raleway Below', width: 1200, height: 800 }
      ],
      variants: [
        { variantId: 'c-access-raleway-below-2m', variantName: '2m', name: 'C-Access Raleway Below 2m', description: '2 meter below-rail C-Access raceway', imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404254/steelmade/modular/wire%20management/c-access-raleway-below.png', specifications: { 'Length': '2m' } }
      ]
    }
    ,
    // C-Access Raleway Above (alternate mounting)
    'c-access-raleway-above': {
      id: 'c-access-raleway-above',
      name: 'C-Access Raleway Above',
      description: 'C-Access variant for above-rail mounting (Raleway above configuration).',
      category: 'modular-furniture',
      seriesId: 'wire-management',
      inStock: true,
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404254/steelmade/moduiar/wire%20management/c-access-raleway-above.png',
      features: ['Above-rail mounting', 'Integrated clip system', 'Durable finish'],
      specifications: { 'Material': 'Steel', 'Length': '2m' },
      images: [
        { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404254/steelmade/moduiar/wire%20management/c-access-raleway-above.png', alt: 'C-Access Raleway Above', width: 1200, height: 800 }
      ],
      variants: [
        { variantId: 'c-access-raleway-above-2m', variantName: '2m', name: 'C-Access Raleway Above 2m', description: '2 meter above-rail C-Access raceway', imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404254/steelmade/moduiar/wire%20management/c-access-raleway-above.png', specifications: { 'Length': '2m' } }
      ]
    },
    // Flexi Raceway
    'flexi-raceway': {
      id: 'flexi-raceway',
      name: 'Flexi Raceway',
      description: 'Flexible raceway solution for versatile cable routing and tight spaces.',
      category: 'modular-furniture',
      seriesId: 'wire-management',
      inStock: true,
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404260/steelmade/modular/wire%20management/flexi-raceway.png',
      features: ['Flexible construction', 'Easy bend and cut-to-length', 'UV-stable material'],
      specifications: { 'Material': 'PVC', 'Length': '2m' },
      images: [
        { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404260/steelmade/modular/wire%20management/flexi-raceway.png', alt: 'Flexi Raceway', width: 1200, height: 800 }
      ],
      variants: [
        { variantId: 'flexi-raceway-2m', variantName: '2m', name: 'Flexi Raceway 2m', description: '2 meter flexi raceway', imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404260/steelmade/modular/wire%20management/flexi-raceway.png', specifications: { 'Length': '2m' } }
      ]
    },
    // Dual Raceway
    'dual-raceway': {
      id: 'dual-raceway',
      name: 'Dual Raceway',
      description: 'Dual-channel raceway for separating power and data cables.',
      category: 'modular-furniture',
      seriesId: 'wire-management',
      inStock: true,
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404254/steelmade/modular/wire%20management/dual-raceway.png',
      features: ['Separate channels', 'Integrated divider', 'Secure snap-on cover'],
      specifications: { 'Material': 'Aluminium', 'Length': '2m' },
      images: [
        { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404254/steelmade/modular/wire%20management/dual-raceway.png', alt: 'Dual Raceway', width: 1200, height: 800 }
      ],
      variants: [
        { variantId: 'dual-raceway-2m', variantName: '2m', name: 'Dual Raceway 2m', description: '2 meter dual raceway', imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404254/steelmade/modular/wire%20management/dual-raceway.png', specifications: { 'Length': '2m' } }
      ]
    }
    ,
    // Riser
    'riser': {
      id: 'riser',
      name: 'Riser',
      description: 'Riser accessory for vertical cable routing and desk-to-ceiling installations.',
      category: 'modular-furniture',
      seriesId: 'wire-management',
      inStock: true,
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404262/steelmade/moduiar/wire%20management/riser.png',
      features: ['Vertical routing', 'Secure mounting', 'Concealed cable pass-through'],
      specifications: { 'Material': 'Steel', 'Height': 'Custom' },
      images: [
        { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404262/steelmade/moduiar/wire%20management/riser.png', alt: 'Riser', width: 1200, height: 800 }
      ],
      variants: [
        { variantId: 'riser-standard', variantName: 'Standard', name: 'Riser Standard', description: 'Standard riser height', imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404262/steelmade/moduiar/wire%20management/riser.png', specifications: { 'Height': 'Standard' } }
      ]
    }
  }
};

export default wireManagement;
