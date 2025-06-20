import { Product } from '../types';

export const productData: Product[] = [
  {
    id: '1',
    slug: 'ashley-director-chair',
    name: 'Ashley Director Chair',
    description: 'Premium director chair with ergonomic design and premium materials. Designed for comfort during long meetings and work sessions.',
    categorySlug: 'chairs',
    seriesSlug: 'director-series',
    images: ['/api/cloudinary/image/chairs/director-series/ashley/main'],
    features: [
      'Ergonomic design for all-day comfort',
      'Premium leatherette upholstery',
      'Height adjustment mechanism',
      'Durable steel frame with chrome finish',
      'Synchronized tilt mechanism'
    ],
    specifications: {
      'Dimensions': '76 x 66 x 118-128 cm',
      'Weight Capacity': '120 kg',
      'Material': 'Steel frame, premium leatherette',
      'Color Options': 'Black, Brown, Tan',
      'Warranty': '2 years'
    },
    variants: [
      {
        id: '1-hb',
        variantId: 'hb',
        variantName: 'High Back',
        description: 'High back version with enhanced neck support',
        images: ['/api/cloudinary/image/chairs/director-series/ashley/hb'],
      },
      {
        id: '1-mb',
        variantId: 'mb',
        variantName: 'Medium Back',
        description: 'Medium back version for standard comfort',
        images: ['/api/cloudinary/image/chairs/director-series/ashley/mb'],
      }
    ],
    isActive: true
  },
  {
    id: '2',
    slug: 'woodland-director-chair',
    name: 'Woodland Director Chair',
    description: 'Classic design with modern comfort features and durable construction. Perfect for office environments.',
    categorySlug: 'chairs',
    seriesSlug: 'director-series',
    images: ['/api/cloudinary/image/chairs/director-series/woodland/main'],
    features: [
      'Classic design with modern aesthetics',
      'Durable construction for long-term use',
      'Adjustable height and tilt',
      'Premium cushioning for comfort',
      'Available in multiple colors'
    ],
    specifications: {
      'Dimensions': '74 x 64 x 115-125 cm',
      'Weight Capacity': '110 kg',
      'Material': 'Steel frame, mesh and fabric',
      'Color Options': 'Black, Grey, Blue',
      'Warranty': '1 year'
    },
    variants: [
      {
        id: '2-hb',
        variantId: 'hb',
        variantName: 'High Back',
        description: 'High back version with enhanced neck support',
        images: ['/api/cloudinary/image/chairs/director-series/woodland/hb'],
      },
      {
        id: '2-mb',
        variantId: 'mb',
        variantName: 'Medium Back',
        description: 'Medium back version for standard comfort',
        images: ['/api/cloudinary/image/chairs/director-series/woodland/mb'],
      }
    ],
    isActive: true
  },
  {
    id: '3',
    slug: 'opera-director-chair',
    name: 'Opera Director Chair',
    description: 'Elegant design with premium upholstery and advanced ergonomics. A statement piece for executive offices.',
    categorySlug: 'chairs',
    seriesSlug: 'director-series',
    images: ['/api/cloudinary/image/chairs/director-series/opera/main'],
    features: [
      'Premium design with elegant aesthetics',
      'Genuine leather upholstery',
      'Advanced ergonomic features',
      'Polished metal accents',
      'Executive-level comfort'
    ],
    specifications: {
      'Dimensions': '78 x 68 x 120-130 cm',
      'Weight Capacity': '130 kg',
      'Material': 'Steel frame, genuine leather',
      'Color Options': 'Black, Brown, Burgundy',
      'Warranty': '3 years'
    },
    variants: [
      {
        id: '3-hb',
        variantId: 'hb',
        variantName: 'High Back',
        description: 'High back version with enhanced neck support',
        images: ['/api/cloudinary/image/chairs/director-series/opera/hb'],
      },
      {
        id: '3-mb',
        variantId: 'mb',
        variantName: 'Medium Back',
        description: 'Medium back version for standard comfort',
        images: ['/api/cloudinary/image/chairs/director-series/opera/mb'],
      }
    ],
    isActive: true
  },
  {
    id: '4',
    slug: 'tycoon-director-chair',
    name: 'Tycoon Director Chair',
    description: 'Executive-level comfort with premium materials and adjustable features. Perfect for the modern office environment.',
    categorySlug: 'chairs',
    seriesSlug: 'director-series',
    images: ['/api/cloudinary/image/chairs/director-series/tycoon/main'],
    features: [
      'Executive design with premium aesthetics',
      'Genuine leather upholstery',
      'Multi-function adjustment mechanisms',
      'Polished aluminum base',
      'Advanced lumbar support system'
    ],
    specifications: {
      'Dimensions': '80 x 70 x 120-130 cm',
      'Weight Capacity': '150 kg',
      'Material': 'Aluminum frame, genuine leather',
      'Color Options': 'Black, Burgundy',
      'Warranty': '5 years'
    },
    variants: [
      {
        id: '4-hb',
        variantId: 'hb',
        variantName: 'High Back',
        description: 'High back version with enhanced neck support',
        images: ['/api/cloudinary/image/chairs/director-series/tycoon/hb'],
      },
      {
        id: '4-mb',
        variantId: 'mb',
        variantName: 'Medium Back',
        description: 'Medium back version for standard comfort',
        images: ['/api/cloudinary/image/chairs/director-series/tycoon/mb'],
      }
    ],
    isActive: true
  }
];