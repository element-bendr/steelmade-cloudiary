import type { SlideData } from '../../components/common/Slideshow';
import type { ProductSeries, ProductCategory } from '../data/product-types';

// Reusable Cloudinary assets for fallback imagery
const CLOUDINARY_FALLBACKS = [
  'https://res.cloudinary.com/dqde19mfs/image/upload/q_auto,f_auto/v1749805770/steelmade/chairs/executive-series/amigo/ic-331-hb.jpg',
  'https://res.cloudinary.com/dqde19mfs/image/upload/q_auto,f_auto/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg',
  'https://res.cloudinary.com/dqde19mfs/image/upload/q_auto,f_auto/v1750425884/steelmade/chairs/ergonomic-series/ud/ic-329-hb-grey.png',
  'https://res.cloudinary.com/dqde19mfs/image/upload/q_auto,f_auto/v1752131212/steelmade/chairs/visitor-series/regency/ic-152.png'
];

export const CATEGORY_SLIDE_TEMPLATES = {
  chairs: {
    fallbackImages: CLOUDINARY_FALLBACKS,
    fallbackTitles: ['Executive Excellence', 'Professional Authority', 'Comfort & Wellness', 'Welcoming Spaces'],
    fallbackDescriptions: [
      'Premium director chairs that embody leadership and refined taste',
      'Sophisticated executive seating for professional environments',  
      'Science-backed ergonomic designs for all-day comfort and wellness',
      'Elegant visitor chairs that create memorable first impressions'
    ]
  },
  tables: {
    fallbackImages: CLOUDINARY_FALLBACKS,
    fallbackTitles: ['Meeting Excellence', 'Leadership Workspace', 'Productivity Focus', 'First Impressions'],
    fallbackDescriptions: [
      'Professional conference tables that inspire productive collaborations',
      'Commanding executive desks that reflect leadership and success',
      'Efficient workstation tables designed for maximum productivity',
      'Sophisticated reception tables that create welcoming first impressions'
    ]
  },
  storage: {
    fallbackImages: CLOUDINARY_FALLBACKS,
    fallbackTitles: ['Organized Excellence', 'Secure Storage', 'Display & Store', 'Flexible Solutions'],
    fallbackDescriptions: [
      'Professional filing systems for efficient document management',
      'Secure locker solutions for personal storage in any environment',
      'Versatile shelving units that organize and display with style',
      'Mobile storage solutions that adapt to your changing needs'
    ]
  },
  'modular-furniture': {
    fallbackImages: CLOUDINARY_FALLBACKS,
    fallbackTitles: ['Modular Efficiency', 'Space Definition', 'Team Synergy', 'Professional Welcome'],
    fallbackDescriptions: [
      'Flexible workstation systems that grow and adapt with your team',
      'Smart partition solutions that define productive workspace zones',
      'Modular furniture designed for dynamic collaboration and teamwork',
      'Professional reception solutions that create lasting first impressions'
    ]
  },
  'hospital-furniture': {
    fallbackImages: CLOUDINARY_FALLBACKS,
    fallbackTitles: ['Patient Comfort', 'Organized Care', 'Healing Spaces', 'Efficient Workflow'],
    fallbackDescriptions: [
      'Ergonomic patient seating designed specifically for healthcare environments',
      'Secure medical storage solutions for organized and efficient care',
      'Comfortable seating solutions for patient and family waiting areas',
      'Professional workstations that support efficient healthcare workflows'
    ]
  },
  'school-furniture': {
    fallbackImages: CLOUDINARY_FALLBACKS,
    fallbackTitles: ['Learning Excellence', 'Knowledge Centers', 'Gathering Spaces', 'Educational Leadership'],
    fallbackDescriptions: [
      'Ergonomic student desks and furniture designed for academic success',
      'Inspiring library furniture that creates optimal learning environments',
      'Comfortable auditorium seating for educational assemblies and events',
      'Professional furniture solutions for school administrative offices'
    ]
  },
  'racking-systems': {
    fallbackImages: CLOUDINARY_FALLBACKS,
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
export function generateSeriesSlides(category: any): SlideData[] {
  const seriesArray = Array.isArray(category.series) ? category.series : Object.values(category.series || {});
  
  // Filter and sort series by quality of data
  const qualitySeries = seriesArray
    .filter((series: any) => series && series.coverImage?.url && series.title)
    .sort((a: any, b: any) => {
      // Prioritize series with more complete data
      const scoreA = (a.seoDescription ? 2 : 0) + (a.products && Object.keys(a.products).length > 5 ? 1 : 0);
      const scoreB = (b.seoDescription ? 2 : 0) + (b.products && Object.keys(b.products).length > 5 ? 1 : 0);
      return scoreB - scoreA;
    })
    .slice(0, 4); // Take top 4 series

  return qualitySeries.map((series: any, index: number) => ({
    id: `${category.id || category._id}-${series.id || series._key || index}`,
    title: series.title || 'Premium Collection',
    subtitle: category.name || '',
    description: series.seoDescription || series.description || `Discover our premium ${(series.title || 'furniture').toLowerCase()} collection`,
    backgroundImage: series.coverImage?.url || CLOUDINARY_FALLBACKS[index % CLOUDINARY_FALLBACKS.length],
    ctaText: `Explore ${series.title || 'Collection'}`,
    ctaLink: `/${category.id || category.categoryId}/${series.id || series.slug?.current || series.title?.replace(/\s+/g, '-').toLowerCase()}`,
    overlay: 'gradient' as const
  }));
}

/**
 * Generate slides from template when insufficient series data
 */
export function generateTemplateSlides(categoryId: string, category: any): SlideData[] {
  const template = CATEGORY_SLIDE_TEMPLATES[categoryId as keyof typeof CATEGORY_SLIDE_TEMPLATES];
  
  if (!template) {
    // Ultimate fallback - generic slides
    return [{
      id: `${categoryId}-generic`,
      title: category?.name || 'Collection',
      subtitle: 'Premium Collection',
      description: category?.description || 'Explore our premium furniture collection.',
      backgroundImage: category?.imageUrl || CLOUDINARY_FALLBACKS[0],
      ctaText: `Explore Collection`,
      ctaLink: `/${categoryId}`,
      overlay: 'gradient' as const
    }];
  }

  return template.fallbackImages.map((image, index) => ({
    id: `${categoryId}-template-${index}`,
    title: template.fallbackTitles[index],
    subtitle: category?.name || categoryId,
    description: template.fallbackDescriptions[index],
    backgroundImage: image,
    ctaText: `Explore ${category?.name || 'Collection'}`,
    ctaLink: `/${categoryId}`,
    overlay: 'gradient' as const
  }));
}

/**
 * Smart slide generator - uses real data when available, templates as fallback
 */
export function generateCategorySlides(categoryId: string, category?: any): SlideData[] {
  const baseCategoryId = categoryId.split('/')[0];
  
  if (!category) {
    // For backwards compatibility and server-side fetching fallback
    return generateTemplateSlides(baseCategoryId, { name: baseCategoryId });
  }

  const seriesCount = category.series ? (Array.isArray(category.series) ? category.series.length : Object.keys(category.series).length) : 0;
  const hasRichData = seriesCount >= 3;

  if (hasRichData) {
    const seriesSlides = generateSeriesSlides(category);
    if (seriesSlides.length >= 3) {
      return seriesSlides;
    }
  }

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
      backgroundImage: 'https://res.cloudinary.com/dqde19mfs/image/upload/q_auto,f_auto/v1749805770/steelmade/chairs/executive-series/amigo/ic-331-hb.jpg',
      ctaText: 'Discover Our Collections',
      ctaLink: '/chairs',
      overlay: 'gradient' as const
    },
    {
      id: 'homepage-director',
      title: 'Executive Excellence',
      subtitle: 'Director Series',
      description: 'Premium chairs designed for leadership presence. Each piece embodies authority, comfort, and refined taste.',
      backgroundImage: 'https://res.cloudinary.com/dqde19mfs/image/upload/q_auto,f_auto/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg',
      ctaText: 'Explore Director Series',
      ctaLink: '/chairs/director-series',
      overlay: 'gradient' as const
    },
    {
      id: 'homepage-ergonomic',
      title: 'Comfort & Wellness',
      subtitle: 'Ergonomic Series',
      description: 'Science-backed designs that support your posture and productivity with poetic precision.',
      backgroundImage: 'https://res.cloudinary.com/dqde19mfs/image/upload/q_auto,f_auto/v1750425884/steelmade/chairs/ergonomic-series/ud/ic-329-hb-grey.png',
      ctaText: 'Discover Ergonomic Comfort',
      ctaLink: '/chairs/ergonomic-series',
      overlay: 'gradient' as const
    },
    {
      id: 'homepage-visitor',
      title: 'Welcoming Spaces',
      subtitle: 'Visitor Series',
      description: 'Elegant seating that creates memorable first impressions and embraces every guest with comfort.',
      backgroundImage: 'https://res.cloudinary.com/dqde19mfs/image/upload/q_auto,f_auto/v1752131212/steelmade/chairs/visitor-series/regency/ic-152.png',
      ctaText: 'View Visitor Collection',
      ctaLink: '/chairs/visitor-series',
      overlay: 'gradient' as const
    }
  ];
}

/**
 * Get slides for any context - homepage, category, or series
 */
export function getSlides(context: 'homepage' | string, categoryData?: any): SlideData[] {
  if (context === 'homepage') {
    return generateHomepageSlides();
  }
  
  return generateCategorySlides(context, categoryData);
}

export default {
  generateCategorySlides,
  generateHomepageSlides,
  getSlides
};
