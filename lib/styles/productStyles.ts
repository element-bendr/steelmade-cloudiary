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
    title: 'text-3xl font-bold text-gray-900',
    subtitle: 'text-xl font-semibold text-gray-900',
    description: 'text-gray-600',
    sectionHeading: 'font-medium text-lg text-gray-900',
    featureText: 'text-gray-700',
    price: 'text-xl font-semibold text-gray-900',
  },
  
  // Colors
  colors: {
    primary: 'text-red-700',
    primaryHover: 'hover:text-red-800',
    primaryBg: 'bg-red-700',
    primaryBgHover: 'hover:bg-red-800',
    primaryBorder: 'border-red-700',
    accent: 'text-blue-600',
    accentHover: 'hover:text-blue-700',
    accentBg: 'bg-blue-600',
    accentBgHover: 'hover:bg-blue-700',
  },
  
  // Components
  components: {
    // Image container
    image: {
      container: 'relative aspect-square overflow-hidden rounded-xl border border-gray-100 shadow-sm',
      img: 'object-cover object-center transition-opacity duration-300',
      decorator: 'absolute top-0 right-0 w-16 h-16 bg-red-700 opacity-20 z-10',
    },
    
    // Variant selector
    variantSelector: {
      container: 'space-y-2',
      buttonsContainer: 'flex flex-wrap gap-3',
      button: {
        base: 'px-4 py-2 rounded-md border transition-colors duration-200',
        selected: 'border-red-700 text-red-700 font-medium',
        unselected: 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50',
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
      button: 'w-full sm:w-auto bg-red-700 hover:bg-red-800 text-white transition-colors',
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