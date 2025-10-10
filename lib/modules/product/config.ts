// Product Module Configuration

export const productModuleConfig = {
  // Feature flags for controlling behavior
  features: {
    // When true, all product data comes from the modular system
    fullModularMode: true,
    
    // When true, legacy system is completely disabled
    disableLegacySystem: true,
    
    // Tracks which categories have been migrated to the modular system
    migratedCategories: {
      'chairs': true,
      'hospital-furniture': true,
      'racking-systems': true,
      'school-furniture': true,
      'storage-solutions': true,
      'modular-furniture': true,
      'office-accessories': true
    }
  }
};