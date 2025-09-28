import type { SlideData } from '../../components/common/Slideshow';
import type { ProductSeries } from '../data/product-types';
import { getCategory, type ProductCategory } from '../data/products/categories';

// Template configurations for categories with sparse data
const CATEGORY_SLIDE_TEMPLATES = {
  chairs: {
    fallbackImages: [
      'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg',
      'https://res.cloudinary.com/dqde19mfs/image/upload/v1749805770/steelmade/chairs/executive-series/amigo/ic-331-hb.jpg',
      'https://res.cloudinary.com/dqde19mfs/image/upload/v1750425884/steelmade/chairs/ergonomic-series/ud/ic-329-hb-grey.png',
      'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/visitor-series/classic.png'
    ],
    fallbackTitles: ['Executive Excellence', 'Professional Authority', 'Comfort & Wellness', 'Welcoming Spaces'],
    fallbackDescriptions: [
      'Premium director chairs that embody leadership and refined taste',
      'Sophisticated executive seating for professional environments',  
      'Science-backed ergonomic designs for all-day comfort and wellness',
      'Elegant visitor chairs that create memorable first impressions'
    ]
  },
  tables: {
    fallbackImages: [
      '/images/categories/conference-table-hero.jpg',
      '/images/categories/executive-desk-hero.jpg', 
      '/images/categories/modern-workstation.jpg',
      '/images/categories/reception-table.jpg'
    ],
    fallbackTitles: ['Meeting Excellence', 'Leadership Workspace', 'Productivity Focus', 'First Impressions'],
    fallbackDescriptions: [
      'Professional conference tables that inspire productive collaborations',
      'Commanding executive desks that reflect leadership and success',
      'Efficient workstation tables designed for maximum productivity',
      'Sophisticated reception tables that create welcoming first impressions'
    ]
  },
  storage: {
    fallbackImages: [
      '/images/categories/filing-systems.jpg',
      '/images/categories/office-lockers.jpg',
      '/images/categories/modern-shelving.jpg', 
      '/images/categories/mobile-storage.jpg'
    ],
    fallbackTitles: ['Organized Excellence', 'Secure Storage', 'Display & Store', 'Flexible Solutions'],
    fallbackDescriptions: [
      'Professional filing systems for efficient document management',
      'Secure locker solutions for personal storage in any environment',
      'Versatile shelving units that organize and display with style',
      'Mobile storage solutions that adapt to your changing needs'
    ]
  },
  'modular-furniture': {
    fallbackImages: [
      '/images/categories/modular-workstation.jpg',
      '/images/categories/office-partitions.jpg',
      '/images/categories/collaboration-zone.jpg',
      '/images/categories/modular-reception.jpg'
    ],
    fallbackTitles: ['Modular Efficiency', 'Space Definition', 'Team Synergy', 'Professional Welcome'],
    fallbackDescriptions: [
      'Flexible workstation systems that grow and adapt with your team',
      'Smart partition solutions that define productive workspace zones',
      'Modular furniture designed for dynamic collaboration and teamwork',
      'Professional reception solutions that create lasting first impressions'
    ]
  },
  'hospital-furniture': {
    fallbackImages: [
      '/images/categories/patient-seating.jpg',
      '/images/categories/medical-storage.jpg',
      '/images/categories/hospital-waiting.jpg',
      '/images/categories/medical-workstation.jpg'
    ],
    fallbackTitles: ['Patient Comfort', 'Organized Care', 'Healing Spaces', 'Efficient Workflow'],
    fallbackDescriptions: [
      'Ergonomic patient seating designed specifically for healthcare environments',
      'Secure medical storage solutions for organized and efficient care',
      'Comfortable seating solutions for patient and family waiting areas',
      'Professional workstations that support efficient healthcare workflows'
    ]
  },
  'school-furniture': {
    fallbackImages: [
      '/images/categories/student-desks.jpg',
      '/images/categories/library-furniture.jpg',
      '/images/categories/auditorium-seating.jpg',
      '/images/categories/admin-office.jpg'
    ],
    fallbackTitles: ['Learning Excellence', 'Knowledge Centers', 'Gathering Spaces', 'Educational Leadership'],
    fallbackDescriptions: [
      'Ergonomic student desks and furniture designed for academic success',
      'Inspiring library furniture that creates optimal learning environments',
      'Comfortable auditorium seating for educational assemblies and events',
      'Professional furniture solutions for school administrative offices'
    ]
  },
  'racking-systems': {
    fallbackImages: [
      '/images/categories/warehouse-racking.jpg',
      '/images/categories/office-racking.jpg',
      '/images/categories/retail-display.jpg',
      '/images/categories/archive-systems.jpg'
    ],
    fallbackTitles: ['Storage Efficiency', 'Organized Workspace', 'Product Showcase', 'Document Management'],
    fallbackDescriptions: [
      'Heavy-duty industrial racking systems for maximum warehouse efficiency',
      'Professional office racking solutions for organized workspace storage',
      'Attractive retail display racking that showcases products beautifully',
      'Secure archive racking systems for long-term document management'
    ]
  }
};

/**
 * Generate slides dynamically from product series data
 */
function generateSeriesSlides(category: ProductCategory): SlideData[] {
  const seriesArray = Object.values(category.series);
  
  // Filter and sort series by quality of data
  const qualitySeries = seriesArray
    .filter(series => series && series.coverImage?.url && series.title)
    .sort((a, b) => {
      // Prioritize series with more complete data
      const scoreA = (a.seoDescription ? 2 : 0) + (a.products && Object.keys(a.products).length > 5 ? 1 : 0);
      const scoreB = (b.seoDescription ? 2 : 0) + (b.products && Object.keys(b.products).length > 5 ? 1 : 0);
      return scoreB - scoreA;
    })
    .slice(0, 4); // Take top 4 series

  return qualitySeries.map((series, index) => ({
    id: `${category.id}-${series.id}`,
    title: series.title || 'Premium Collection',
    subtitle: category.name,
    description: series.seoDescription || series.description || `Discover our premium ${(series.title || 'furniture').toLowerCase()} collection`,
    backgroundImage: series.coverImage?.url || '/images/placeholder/series-hero.jpg',
    ctaText: `Explore ${series.title || 'Collection'}`,
    ctaLink: `/${category.id}/${series.id}`,
    overlay: 'gradient' as const
  }));
}

/**
 * Generate slides from template when insufficient series data
 */
function generateTemplateSlides(categoryId: string, category: ProductCategory): SlideData[] {
  const template = CATEGORY_SLIDE_TEMPLATES[categoryId as keyof typeof CATEGORY_SLIDE_TEMPLATES];
  
  if (!template) {
    // Ultimate fallback - generic slides
    return [{
      id: `${categoryId}-generic`,
      title: category.name,
      subtitle: 'Premium Collection',
      description: category.description,
      backgroundImage: category.imageUrl || '/images/placeholder/category-hero.jpg',
      ctaText: `Explore ${category.name}`,
      ctaLink: `/${categoryId}`,
      overlay: 'gradient' as const
    }];
  }

  return template.fallbackImages.map((image, index) => ({
    id: `${categoryId}-template-${index}`,
    title: template.fallbackTitles[index],
    subtitle: category.name,
    description: template.fallbackDescriptions[index],
    backgroundImage: image,
    ctaText: `Explore ${category.name}`,
    ctaLink: `/${categoryId}`,
    overlay: 'gradient' as const
  }));
}

/**
 * Smart slide generator - uses real data when available, templates as fallback
 */
export function generateCategorySlides(categoryId: string): SlideData[] {
  // Extract base category from compound paths like "modular-furniture/workstations"
  const baseCategoryId = categoryId.split('/')[0];
  const category = getCategory(baseCategoryId);
  
  if (!category) {
    console.warn(`Category '${baseCategoryId}' not found for categoryId '${categoryId}'`);
    return [];
  }

  const seriesCount = Object.keys(category.series || {}).length;
  const hasRichData = seriesCount >= 3;

  if (hasRichData) {
    // Use real product data when available
    const seriesSlides = generateSeriesSlides(category);
    
    // If we got enough quality slides from series data, use them
    if (seriesSlides.length >= 3) {
      return seriesSlides;
    }
  }

  // Fall back to template slides for sparse categories
  return generateTemplateSlides(baseCategoryId, category);
}

/**
 * Generate homepage slides (special case)
 */
export function generateHomepageSlides(): SlideData[] {
  return [
    {
      id: 'homepage-welcome',
      title: 'Crafted for Excellence',
      subtitle: 'steelmade',
      description: 'Where innovative design meets uncompromising quality. Discover furniture that transforms spaces and elevates experiences.',
      backgroundImage: '/images/fresh-vegetables-flat-lay-healthy-lifestyle.jpg',
      ctaText: 'Discover Our Collections',
      ctaLink: '/chairs',
      overlay: 'gradient' as const
    },
    {
      id: 'homepage-director',
      title: 'Executive Excellence',
      subtitle: 'Director Series',
      description: 'Premium chairs designed for leadership presence. Each piece embodies authority, comfort, and refined taste.',
      backgroundImage: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg',
      ctaText: 'Explore Director Series',
      ctaLink: '/chairs/director-series',
      overlay: 'gradient' as const
    },
    {
      id: 'homepage-ergonomic',
      title: 'Comfort & Wellness',
      subtitle: 'Ergonomic Series',
      description: 'Science-backed designs that support your posture and productivity with poetic precision.',
      backgroundImage: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750425884/steelmade/chairs/ergonomic-series/ud/ic-329-hb-grey.png',
      ctaText: 'Discover Ergonomic Comfort',
      ctaLink: '/chairs/ergonomic-series',
      overlay: 'gradient' as const
    },
    {
      id: 'homepage-visitor',
      title: 'Welcoming Spaces',
      subtitle: 'Visitor Series',
      description: 'Elegant seating that creates memorable first impressions and embraces every guest with comfort.',
      backgroundImage: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1752129755/steelmade/chairs/visitor-series/classic.png',
      ctaText: 'View Visitor Collection',
      ctaLink: '/chairs/visitor-series',
      overlay: 'gradient' as const
    }
  ];
}

/**
 * Get slides for any context - homepage, category, or series
 */
export function getSlides(context: 'homepage' | string): SlideData[] {
  if (context === 'homepage') {
    return generateHomepageSlides();
  }
  
  return generateCategorySlides(context);
}

export default {
  generateCategorySlides,
  generateHomepageSlides,
  getSlides
};