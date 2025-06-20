// Functional, declarative registration for executive series chairs
// This file exists to break circular dependencies between the registry and individual chair modules.
import type { Chair } from '@/lib/types/chair';

// Internal registry array, not exported
const executiveSeriesChairs: Chair[] = [];

/**
 * Registers an executive series chair in the registry.
 * Prevents duplicate registration by chair id.
 */
export function registerExecutiveChair(chair: Chair): boolean {
  if (executiveSeriesChairs.some(c => c.id === chair.id)) {
    return false;
  }
  executiveSeriesChairs.push(chair);
  return true;
}

/**
 * Returns all registered executive series chairs.
 */
export function getAllExecutiveSeriesChairs(): readonly Chair[] {
  return executiveSeriesChairs;
}

/**
 * Returns an executive series chair by id, or undefined if not found.
 */
export function getExecutiveChair(chairId: string): Chair | undefined {
  return executiveSeriesChairs.find(chair => chair.id === chairId);
}
