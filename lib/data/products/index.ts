// This file serves as the main entry point for all product data in the modular system
// It's updated automatically by the migration scripts

// Import categories
import { chairs } from './chairs';

// Export combined products object
export const products = {
  chairs,
  // Additional categories will be added here as they're migrated
};

// Export individual categories for direct access
export { chairs };