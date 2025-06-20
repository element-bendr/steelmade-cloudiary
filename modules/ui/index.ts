/**
 * UI Components module exports
 * This module provides reusable UI components for the application.
 * It depends on the Core, Utility, and Image modules.
 */

// Export types
export * from './types';

// Export components
export * from './components';

// Module info for debugging and introspection
export const UIModule = {
  name: 'UI',
  version: '1.0.0',
  description: 'UI components and utilities',
  dependencies: ['Core', 'Utility', 'Image']
};