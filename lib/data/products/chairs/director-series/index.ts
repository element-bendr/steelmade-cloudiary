// Director Series Chair Registry
// This file provides a functional, declarative registry for all director series chairs.
// It ensures all chairs are registered before any access, following modular and type-safe patterns.

import { Chair } from '../../../../types/chair';

// Internal registry array, initially empty. All chairs are registered via registerDirectorChair.
const directorSeriesChairs: Chair[] = [];

/**
 * Registers a director series chair in the registry.
 * Prevents duplicate registration by chair id.
 */
export function registerDirectorChair(chair: Chair): boolean {
  if (directorSeriesChairs.some(c => c.id === chair.id)) {
    // Chair already registered, skip
    return false;
  }
  directorSeriesChairs.push(chair);
  return true;
}

/**
 * Returns all registered director series chairs.
 */
export function getAllDirectorSeriesChairs(): readonly Chair[] {
  return directorSeriesChairs;
}

/**
 * Returns a director series chair by id, or undefined if not found.
 */
export function getDirectorChair(chairId: string): Chair | undefined {
  return directorSeriesChairs.find(chair => chair.id === chairId);
}

// Export the registry array for direct access (read-only)
export { directorSeriesChairs };

// Explicitly import each chair to ensure they are registered
// NOTE: These imports MUST come AFTER all function definitions to prevent
// circular dependency and ReferenceError issues.
import './ashley';
import './opera';
import './tycoon';
import './bigboss-gold';
import './woodland';
import './boston';
import './grandezza';
import './kotak';
import './milano';
import './monarch';
import './nissan';
import './parker';
import './trident';