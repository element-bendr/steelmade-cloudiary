import type { ProductSeries, ExtendedProductData, ProductImage } from '../../../product-types';

const lowPartition: ProductSeries = {
  id: 'low-partition',
  title: 'Low Partition',
  description: 'Low-height partition options for open-plan workspaces — blends privacy with collaboration.',
  seoDescription: 'Low Partition systems: slim and acoustic partitions for open-plan offices.',
  coverImage: { url: '/images/modular/low-partition/cover.jpg', alt: 'Low Partition cover' },
  products: {
    '30mm-panel-based-partition': {
      id: '30mm-panel-based-partition',
      name: '30mm Panel Based Partition',
      description: '30mm panel-based low partition — slim profile for flexible layouts',
      category: 'modular-furniture',
      seriesId: 'low-partition',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1761054744/steelmade/modular-furniture/partition-systems/30MM_PANEL_BASED_PARTITION.png',
      images: [
        { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1761054744/steelmade/modular-furniture/partition-systems/30MM_PANEL_BASED_PARTITION.png', alt: '30mm Panel Based Partition' }
      ],
      variants: [],
      features: ['30mm panel thickness', 'Slim aluminum frame', 'Quick-mount brackets'],
      specifications: { width: '1200mm', depth: '40mm', thickness: '30mm' },
    },
    '30mm-panel-based-partition-2': {
      id: '30mm-panel-based-partition-2',
      name: '30mm Panel Based Partition (Variant)',
      description: 'Alternate finish for the 30mm panel-based low partition',
      category: 'modular-furniture',
      seriesId: 'low-partition',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1761062832/steelmade/modular-furniture/partition-systems/30MM_PANEL_BASED_PARTITION_2.png',
      images: [
        { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1761062832/steelmade/modular-furniture/partition-systems/30MM_PANEL_BASED_PARTITION_2.png', alt: '30mm Panel Based Partition Variant' }
      ],
      variants: [],
      features: ['30mm panel thickness', 'Alternative fabric finish', 'Tool-less assembly'],
      specifications: { width: '1200mm', depth: '40mm', thickness: '30mm' },
    }
    ,
    '50mm-panel-based-partition': {
      id: '50mm-panel-based-partition',
      name: '50mm Panel Based Partition',
      description: '50mm panel-based low partition — enhanced acoustic performance and rigidity',
      category: 'modular-furniture',
      seriesId: 'low-partition',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1761063493/steelmade/modular-furniture/partition-systems/50MM_PANEL_BASED_PARTITION.png',
      images: [
        { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1761063493/steelmade/modular-furniture/partition-systems/50MM_PANEL_BASED_PARTITION.png', alt: '50mm Panel Based Partition' }
      ],
      variants: [],
      features: ['50mm panel thickness', 'Improved acoustics', 'Reinforced frame'],
      specifications: { width: '1200mm', depth: '60mm', thickness: '50mm' },
    },
    '50mm-panel-based-partition-2': {
      id: '50mm-panel-based-partition-2',
      name: '50mm Panel Based Partition (Variant)',
      description: '50mm panel partition with alternate finish option',
      category: 'modular-furniture',
      seriesId: 'low-partition',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1761063496/steelmade/modular-furniture/partition-systems/50MM_PANEL_BASED_PARTITION_2.png',
      images: [
        { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1761063496/steelmade/modular-furniture/partition-systems/50MM_PANEL_BASED_PARTITION_2.png', alt: '50mm Panel Based Partition Variant' }
      ],
      variants: [],
      features: ['50mm panel thickness', 'Acoustic laminate finish', 'Robust mountings'],
      specifications: { width: '1200mm', depth: '60mm', thickness: '50mm' },
    }
    ,
    '60mm-panel-based-partition': {
      id: '60mm-panel-based-partition',
      name: '60mm Panel Based Partition',
      description: '60mm panel-based low partition — multiple finishes and high acoustic performance',
      category: 'modular-furniture',
      seriesId: 'low-partition',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1761131628/60MM_PANEL_BASED_PARTITION_tay6br.png',
      images: [
        { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1761131628/60MM_PANEL_BASED_PARTITION_tay6br.png', alt: '60mm Panel Based Partition' },
        { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1761316990/60MM_PANEL_BASED_PARTITION_2_ejywuf.png', alt: '60mm Panel Based Partition variant 1' },
        { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1761316990/60MM_PANEL_BASED_PARTITION_3_bwjnvd.png', alt: '60mm Panel Based Partition variant 2' }
      ],
      variants: [],
      features: ['60mm panel thickness', 'High acoustic attenuation', 'Multiple finish options'],
      specifications: { width: '1200mm', depth: '70mm', thickness: '60mm' },
    }
  }
};

export default lowPartition;
