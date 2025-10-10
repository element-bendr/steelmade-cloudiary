/**
 * Director Series product data
 */
const directorSeriesData = {
  'ashley-director-chair': {
    name: 'Ashley Director Chair',
    slug: 'ashley-director-chair',
    description: 'Premium director chair with high-quality materials and ergonomic design.',
    images: [
      'steelmade/chairs/director-series/ashley/main',
      'steelmade/chairs/director-series/ashley/angle',
      'steelmade/chairs/director-series/ashley/side'
    ],
    variants: {
      'hb': {
        id: 'ashley-hb',
        variantId: 'hb',
        name: 'High Back',
        images: [
          'steelmade/chairs/director-series/ashley/ic-330-hb'
        ],
        specifications: {
          height: '44 inches',
          width: '24 inches',
          depth: '22 inches',
          weight: '12 lbs',
          material: 'Premium leather and aluminum'
        }
      },
      'mb': {
        id: 'ashley-mb',
        variantId: 'mb',
        name: 'Medium Back',
        images: [
          'steelmade/chairs/director-series/ashley/ic-331-mb'
        ],
        specifications: {
          height: '36 inches',
          width: '24 inches',
          depth: '22 inches',
          weight: '10 lbs',
          material: 'Premium leather and aluminum'
        }
      }
    },
    specifications: {
      adjustableHeight: true,
      foldable: true,
      maximumWeight: '300 lbs',
      warranty: '5 years'
    },
    featured: true
  },
  'woodland-director-chair': {
    name: 'Woodland Director Chair',
    slug: 'woodland-director-chair',
    description: 'Elegant director chair with woodland-inspired design and premium comfort.',
    images: [
      'steelmade/chairs/director-series/woodland/main',
      'steelmade/chairs/director-series/woodland/angle',
      'steelmade/chairs/director-series/woodland/side'
    ],
    variants: {
      'hb': {
        id: 'woodland-hb',
        variantId: 'hb',
        name: 'High Back',
        images: [
          'steelmade/chairs/director-series/woodland/ic-338-hb'
        ],
        specifications: {
          height: '46 inches',
          width: '25 inches',
          depth: '23 inches',
          weight: '13 lbs',
          material: 'Genuine leather and hardwood'
        }
      },
      'mb': {
        id: 'woodland-mb',
        variantId: 'mb',
        name: 'Medium Back',
        images: [
          'steelmade/chairs/director-series/woodland/ic-339-mb'
        ],
        specifications: {
          height: '38 inches',
          width: '25 inches',
          depth: '23 inches',
          weight: '11 lbs',
          material: 'Genuine leather and hardwood'
        }
      }
    },
    specifications: {
      adjustableHeight: true,
      foldable: true,
      maximumWeight: '280 lbs',
      warranty: '5 years'
    }
  },
  'opera-director-chair': {
    name: 'Opera Director Chair',
    slug: 'opera-director-chair',
    description: 'Luxurious director chair with sophisticated design for elite settings.',
    images: [
      'steelmade/chairs/director-series/opera/main',
      'steelmade/chairs/director-series/opera/angle',
      'steelmade/chairs/director-series/opera/side'
    ],
    variants: {
      'hb': {
        id: 'opera-hb',
        variantId: 'hb',
        name: 'High Back',
        images: [
          'steelmade/chairs/director-series/opera/ic-340-hb'
        ],
        specifications: {
          height: '48 inches',
          width: '26 inches',
          depth: '24 inches',
          weight: '14 lbs',
          material: 'Premium Italian leather and chrome'
        }
      },
      'mb': {
        id: 'opera-mb',
        variantId: 'mb',
        name: 'Medium Back',
        images: [
          'steelmade/chairs/director-series/opera/ic-341-mb'
        ],
        specifications: {
          height: '40 inches',
          width: '26 inches',
          depth: '24 inches',
          weight: '12 lbs',
          material: 'Premium Italian leather and chrome'
        }
      }
    },
    specifications: {
      adjustableHeight: true,
      foldable: true,
      maximumWeight: '320 lbs',
      warranty: '5 years'
    },
    featured: true
  },
  'tycoon-director-chair': {
    name: 'Tycoon Director Chair',
    slug: 'tycoon-director-chair',
    description: 'Executive director chair with premium materials and commanding presence.',
    images: [
      'steelmade/chairs/director-series/tycoon/main',
      'steelmade/chairs/director-series/tycoon/angle',
      'steelmade/chairs/director-series/tycoon/side'
    ],
    variants: {
      'hb': {
        id: 'tycoon-hb',
        variantId: 'hb',
        name: 'High Back',
        images: [
          'steelmade/chairs/director-series/tycoon/ic-01-hb'
        ],
        specifications: {
          height: '50 inches',
          width: '28 inches',
          depth: '26 inches',
          weight: '16 lbs',
          material: 'Premium full-grain leather and stainless steel'
        }
      },
      'mb': {
        id: 'tycoon-mb',
        variantId: 'mb',
        name: 'Medium Back',
        images: [
          'steelmade/chairs/director-series/tycoon/ic-02-mb'
        ],
        specifications: {
          height: '42 inches',
          width: '28 inches',
          depth: '26 inches',
          weight: '14 lbs',
          material: 'Premium full-grain leather and stainless steel'
        }
      }
    },
    specifications: {
      adjustableHeight: true,
      foldable: true,
      maximumWeight: '350 lbs',
      warranty: '10 years'
    },
    featured: true
  }
};

export default directorSeriesData;