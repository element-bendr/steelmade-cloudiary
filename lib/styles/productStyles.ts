/**
 * This file contains styling constants for the centralized product detail layout system.
 * It provides consistent styling patterns extracted from EnhancedProductDetailLayout
 * for use across all product components.
 */

export const productStyles = {
  // Layout and spacing
  layout: {
    container: 'container mx-auto px-4 py-12 max-w-7xl',
    grid: 'grid grid-cols-1 md:grid-cols-2 gap-8',
    section: 'space-y-6',
    subsection: 'space-y-3',
  },
  
  // Typography
  typography: {
    title: 'text-4xl md:text-5xl font-serif text-gray-900 tracking-tight',
    subtitle: 'text-2xl font-serif text-gray-900',
    description: 'text-gray-600 font-light leading-relaxed text-lg',
    sectionHeading: 'font-medium font-serif text-xl text-gray-900 border-b border-gray-100 pb-2',
    featureText: 'text-gray-500 font-light',
    price: 'text-xl font-medium text-gray-900 font-serif',
  },
  
  // Colors
  colors: {
    primary: 'text-red-700',
    primaryHover: 'hover:text-red-800',
    primaryBg: 'bg-red-700',
    primaryBgHover: 'hover:bg-red-800',
    primaryBorder: 'border-red-700',
    accent: 'text-red-600',
    accentHover: 'hover:text-red-700',
    accentBg: 'bg-red-50',
    accentBgHover: 'hover:bg-red-100',
  },
  
  // Components
  components: {
    // Image container
    image: {
      container: 'relative aspect-square overflow-hidden rounded-[2px] bg-neutral-50 shadow-minimal',
      img: 'object-cover object-center transition-opacity duration-300',
      decorator: 'hidden',
    },
    
    // Variant selector
    variantSelector: {
      container: 'space-y-4 py-8',
      buttonsContainer: 'grid grid-cols-2 sm:flex sm:flex-wrap gap-2',
      button: {
        base: 'px-6 py-3 border border-border text-sm font-medium tracking-wide uppercase transition-all duration-300 rounded-[2px]',
        selected: 'border-red-700 bg-red-700 text-white',
        unselected: 'text-gray-500 hover:border-gray-400 hover:text-gray-900 bg-transparent',
      },
    },
    
    // Feature list
    featureList: {
      container: 'space-y-3',
      grid: 'grid grid-cols-1 sm:grid-cols-2 gap-3',
      item: 'flex items-start space-x-2.5',
      icon: 'h-5 w-5 text-red-700 mt-0.5 flex-shrink-0',
    },
    
    // Contact button
    contactButton: {
      container: 'space-y-2 pt-2',
      button: 'w-full sm:w-auto bg-red-700 hover:bg-red-800 text-white transition-colors rounded-[2px]',
      variantText: 'text-red-700 font-medium text-sm mt-2',
    },
    
    // Form elements
    form: {
      input: 'w-full p-2 border border-gray-300 rounded-md',
      label: 'block text-sm font-medium mb-1',
      textarea: 'w-full p-2 border border-gray-300 rounded-md',
      buttonGroup: 'flex gap-2 mt-4',
    },
  },
};

export default productStyles;