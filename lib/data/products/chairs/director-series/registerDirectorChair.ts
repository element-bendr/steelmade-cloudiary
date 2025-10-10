// Deprecated: Legacy runtime registry for director series chairs. Safe to delete.
// All lookups now use the canonical directorSeries.products object.
// Functional, declarative registration for director series chairs
// This file exists to break circular dependencies between the registry and individual chair modules.
import type { Chair } from '@/lib/types/chair';

// Internal registry array, not exported
const directorSeriesChairs: Chair[] = [];

/**
 * Registers a director series chair in the registry.
 * Prevents duplicate registration by chair id.
 */
export function registerDirectorChair(chair: Chair): boolean {
  if (directorSeriesChairs.some(c => c.id === chair.id)) {
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
