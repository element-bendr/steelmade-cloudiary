import { ProductSeries } from '../../../product-types';

const accessories: ProductSeries = {
  id: 'accessories',
  title: 'Accessories',
  description: 'Desk accessories and fittings including monitor arms, CPU holders and cable management solutions.',
  seoDescription: 'Office accessories to improve ergonomics and desk organization.',
  coverImage: {
    url: '/images/placeholder/accessories-cover.jpg',
    alt: 'Accessories',
    width: 1200,
    height: 800
  },
  products: {
    'metal-divider': {
      id: 'metal-divider',
      name: 'Metal Divider',
      description: 'Durable metal divider for desk edges and partitions.',
      category: 'modular-furniture',
      seriesId: 'accessories',
      inStock: true,
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404423/steelmade/modular-furniture/accessories/metaldivider.png',
      features: ['Powder-coated finish', 'Easy mount brackets', 'Robust build'],
      specifications: { 'Material': 'Steel', 'Height': '100mm' },
      images: [ { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404423/steelmade/modular-furniture/accessories/metaldivider.png', alt: 'Metal Divider', width: 1200, height: 800 } ],
      variants: [ { variantId: 'metal-divider-standard', variantName: 'Standard', name: 'Metal Divider - Standard', description: 'Standard metal divider', imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404423/steelmade/modular-furniture/accessories/metaldivider.png', specifications: { 'Height': '100mm' } } ]
    },
    'glass-clamp': {
      id: 'glass-clamp',
      name: 'Glass Clamp',
      description: 'Stainless steel clamp for securing glass panels to worktops.',
      category: 'modular-furniture',
      seriesId: 'accessories',
      inStock: true,
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404420/steelmade/modular-furniture/accessories/glassclamp.png',
      features: ['Stainless steel', 'Secure fastening', 'Concealed screws'],
      specifications: { 'Material': 'Stainless Steel' },
      images: [ { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404420/steelmade/modular-furniture/accessories/glassclamp.png', alt: 'Glass Clamp', width: 1200, height: 800 } ],
      variants: [ { variantId: 'glass-clamp-standard', variantName: 'Standard', name: 'Glass Clamp - Standard', description: 'Standard glass clamp', imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404420/steelmade/modular-furniture/accessories/glassclamp.png', specifications: {} } ]
    },
    'edge-profiler': {
      id: 'edge-profiler',
      name: 'Edge Profiler',
      description: 'Profile tool for creating neat edges and trims on desk panels.',
      category: 'modular-furniture',
      seriesId: 'accessories',
      inStock: true,
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404418/steelmade/modular-furniture/accessories/edgeprofiler.png',
      features: ['Precision profiling', 'Ergonomic handle', 'Durable blade'],
      specifications: { 'Material': 'Aluminium/Steel' },
      images: [ { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404418/steelmade/modular-furniture/accessories/edgeprofiler.png', alt: 'Edge Profiler', width: 1200, height: 800 } ],
      variants: [ { variantId: 'edge-profiler-standard', variantName: 'Standard', name: 'Edge Profiler - Standard', description: 'Standard edge profiler', imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404418/steelmade/modular-furniture/accessories/edgeprofiler.png', specifications: {} } ]
    },
    'access-flapbox': {
      id: 'access-flapbox',
      name: 'Access Flapbox',
      description: 'In-desk flap box for power and data access with clean cable exit.',
      category: 'modular-furniture',
      seriesId: 'accessories',
      inStock: true,
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404415/steelmade/modular-furniture/accessories/access-flapbox.png',
      features: ['Multiple grommet options', 'Flush mount', 'Durable lid'],
      specifications: { 'Material': 'Steel/Plastic' },
      images: [ { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404415/steelmade/modular-furniture/accessories/access-flapbox.png', alt: 'Access Flapbox', width: 1200, height: 800 } ],
      variants: [ { variantId: 'access-flapbox-standard', variantName: 'Standard', name: 'Access Flapbox - Standard', description: 'Standard in-desk flap box', imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404415/steelmade/modular-furniture/accessories/access-flapbox.png', specifications: {} } ]
    },
    'accessflap': {
      id: 'accessflap',
      name: 'Access Flap',
      description: 'Top-mounted access flap for quick power and connectivity access.',
      category: 'modular-furniture',
      seriesId: 'accessories',
      inStock: true,
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404413/steelmade/modular-furniture/accessories/accessflap.png',
      features: ['Quick access lid', 'Optional power modules', 'Flush finish'],
      specifications: { 'Material': 'Plastic/Metal' },
      images: [ { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404413/steelmade/modular-furniture/accessories/accessflap.png', alt: 'Access Flap', width: 1200, height: 800 } ],
      variants: [ { variantId: 'accessflap-standard', variantName: 'Standard', name: 'Access Flap - Standard', description: 'Standard access flap', imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404413/steelmade/modular-furniture/accessories/accessflap.png', specifications: {} } ]
    },
    '8mm-accessory-rail': {
      id: '8mm-accessory-rail',
      name: '8mm Accessory Rail',
      description: 'Slim 8mm accessory rail for mounting desk accessories and screens.',
      category: 'modular-furniture',
      seriesId: 'accessories',
      inStock: true,
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404411/steelmade/modular-furniture/accessories/8mm-accessoryrail.png',
      features: ['Slim profile', 'Modular mounts', 'Durable finish'],
      specifications: { 'Material': 'Aluminium', 'Thickness': '8mm' },
      images: [ { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404411/steelmade/modular-furniture/accessories/8mm-accessoryrail.png', alt: '8mm Accessory Rail', width: 1200, height: 800 } ],
      variants: [ { variantId: '8mm-accessory-rail-standard', variantName: 'Standard', name: '8mm Accessory Rail - Standard', description: 'Standard 8mm accessory rail', imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404411/steelmade/modular-furniture/accessories/8mm-accessoryrail.png', specifications: { 'Thickness': '8mm' } } ]
    },
    '18mm-accessory-rail': {
      id: '18mm-accessory-rail',
      name: '18mm Accessory Rail',
      description: 'Robust 18mm accessory rail for heavy-duty accessory mounting.',
      category: 'modular-furniture',
      seriesId: 'accessories',
      inStock: true,
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404408/steelmade/modular-furniture/accessories/18mm-accessoryrail.png',
      features: ['Heavy-duty profile', 'Secure mounting', 'Powder-coated finish'],
      specifications: { 'Material': 'Steel', 'Thickness': '18mm' },
      images: [ { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404408/steelmade/modular-furniture/accessories/18mm-accessoryrail.png', alt: '18mm Accessory Rail', width: 1200, height: 800 } ],
      variants: [ { variantId: '18mm-accessory-rail-standard', variantName: 'Standard', name: '18mm Accessory Rail - Standard', description: 'Standard 18mm accessory rail', imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1757404408/steelmade/modular-furniture/accessories/18mm-accessoryrail.png', specifications: { 'Thickness': '18mm' } } ]
    }
  }
};

export default accessories;
