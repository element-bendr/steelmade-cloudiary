// Centralized product category configuration
// Production-ready: typed, validated, no sample product data included.

export type CategoryRoutes = {
  readonly basePath: string
  readonly seriesPath?: string
}

export type CategoryMetadata = {
  readonly seoTitle?: string
  readonly seoDescription?: string
  readonly image?: string
}

export interface CategoryConfig {
  readonly id: string
  readonly title: string
  readonly description?: string
  readonly metadata?: CategoryMetadata
  readonly themeKey?: string
  readonly routes: CategoryRoutes
  readonly customizations?: {
    headerOverride?: string // Component import path (string) if required
    footerAdditions?: string
  }
}

export const PRODUCT_CATEGORIES: Record<string, CategoryConfig> = {
  chairs: {
    id: 'chairs',
    title: 'Chairs',
    description: 'Explore our diverse collection of high-quality chairs for office, school and healthcare environments.',
    metadata: {
      seoTitle: 'Office & Commercial Chairs — SteelMade',
      seoDescription: 'Discover ergonomic and stylish chairs for every workspace and budget.',
    },
    themeKey: 'chairs',
    routes: {
      basePath: '/chairs',
      seriesPath: '/chairs/[seriesId]'
    }
  },
  desks: {
    id: 'desks',
    title: 'Desks',
    description: 'Commercial desks and workstation solutions.',
    metadata: {
      seoTitle: 'Desks — SteelMade',
      seoDescription: 'Durable desks for offices and workstations.'
    },
    themeKey: 'desks',
    routes: { basePath: '/desks', seriesPath: '/desks/[seriesId]' }
  },
  'storage-solutions': {
    id: 'storage-solutions',
    title: 'Storage Solutions',
    description: 'Shelving, cabinets and storage systems.',
    metadata: { seoTitle: 'Storage Solutions — SteelMade' },
    themeKey: 'storage-solutions',
    routes: { basePath: '/storage-solutions', seriesPath: '/storage-solutions/[seriesId]' }
  },
  'hospital-furniture': {
    id: 'hospital-furniture',
    title: 'Hospital Furniture',
    description: 'Specialized furniture for healthcare facilities.',
    metadata: { seoTitle: 'Hospital Furniture — SteelMade' },
    themeKey: 'hospital-furniture',
    routes: { basePath: '/hospital-furniture', seriesPath: '/hospital-furniture/[seriesId]' }
  },
  'school-furniture': {
    id: 'school-furniture',
    title: 'School Furniture',
    description: 'Furniture for classrooms, labs and school facilities.',
    metadata: { seoTitle: 'School Furniture — SteelMade' },
    themeKey: 'school-furniture',
    routes: { basePath: '/school-furniture', seriesPath: '/school-furniture/[seriesId]' }
  },
  'racking-systems': {
    id: 'racking-systems',
    title: 'Racking Systems',
    description: 'Industrial racking and storage systems.',
    metadata: { seoTitle: 'Racking Systems — SteelMade' },
    themeKey: 'racking-systems',
    routes: { basePath: '/racking-systems', seriesPath: '/racking-systems/[seriesId]' }
  },
  'modular-furniture': {
    id: 'modular-furniture',
    title: 'Modular Furniture',
    description: 'Flexible modular furniture systems.',
    metadata: { seoTitle: 'Modular Furniture — SteelMade' },
    themeKey: 'modular-furniture',
    routes: { basePath: '/modular-furniture', seriesPath: '/modular-furniture/[seriesId]' }
  },
  'office-accessories': {
    id: 'office-accessories',
    title: 'Office Accessories',
    description: 'Accessories to complement your workspace.',
    metadata: { seoTitle: 'Office Accessories — SteelMade' },
    themeKey: 'office-accessories',
    routes: { basePath: '/office-accessories', seriesPath: '/office-accessories/[seriesId]' }
  }
}

// Validation helper
export const validateCategoryConfig = (cfg: CategoryConfig): boolean => {
  if (!cfg.id || !cfg.title || !cfg.routes || !cfg.routes.basePath) return false
  return true
}

// Utility: get category config by id with runtime check
export const getCategoryConfig = (id: string): CategoryConfig => {
  const cfg = PRODUCT_CATEGORIES[id]
  if (!cfg) throw new Error(`Unknown category id: ${id}`)
  if (!validateCategoryConfig(cfg)) throw new Error(`Invalid category config for ${id}`)
  return cfg
}
