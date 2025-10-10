/**
 * Utility module exports
 * This module provides utility functions and helpers used throughout the application.
 * It depends only on the Core module.
 */

// Export data processing utilities
export * from './data/safe-data-processing';

// Export state management utilities
export * from './state/state-store';

// Only export the hook in client environments
export { useStateStore, useStateSelector } from './state/use-state-store';

// Module info for debugging and introspection
export const UtilityModule = {
  name: 'Utility',
  version: '1.0.0',
  description: 'Utility functions and helpers',
  dependencies: ['Core']
};