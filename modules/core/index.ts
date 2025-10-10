/**
 * Core module exports
 * This module serves as the foundation for type safety and validation throughout the application.
 * It has no external dependencies and can be used by all other modules.
 */

// Export all types and validators
export * from './types';

// Module info for debugging and introspection
export const CoreModule = {
  name: 'Core',
  version: '1.0.0',
  description: 'Core types and validation utilities',
  dependencies: []
};