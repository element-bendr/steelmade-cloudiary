/**
 * Image module exports
 * This module provides utilities for working with images, particularly Cloudinary images.
 * It depends on the Core and Utility modules.
 */

// Export components
export * from './components';

// Export utilities
export * from './utils';

// Export services
export * from './services';

/**
 * Export all image utility functions
 */
export * from './utils';

// Export services
export { CloudinaryService } from './services/cloudinary-service';

// Module info for debugging and introspection
export const ImageModule = {
  name: 'Image',
  version: '1.0.0',
  description: 'Image handling utilities and components',
  dependencies: ['Core', 'Utility']
};