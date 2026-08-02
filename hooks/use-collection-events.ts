import { useEffect } from 'react';
import { CollectionEventType, type CollectionEvent, collectionEvents } from '@/lib/utils/collection-events';

/**
 * Hook for subscribing to collection events
 * 
 * @param eventType - Type of event to subscribe to
 * @param handler - Event handler callback
 * @example
 * ```tsx
 * // Subscribe to collection updates
 * useCollectionEvents(CollectionEventType.COLLECTION_UPDATED, (event) => {
 *   // Handle collection update
 *   console.log('Collection updated:', event.collection);
 * });
 * ```
 */
export function useCollectionEvents(
  eventType: CollectionEventType,
  handler: (event: CollectionEvent) => void
): void {
  useEffect(() => {
    // Subscribe to events when component mounts
    const unsubscribe = collectionEvents.on(eventType, handler);

    // Cleanup subscription when component unmounts
    return () => {
      unsubscribe();
    };
  }, [eventType, handler]);
}

/**
 * Hook for subscribing to multiple collection events
 * 
 * @param handlers - Map of event types to handlers
 * @example
 * ```tsx
 * // Subscribe to multiple events
 * useMultipleCollectionEvents({
 *   [CollectionEventType.COLLECTION_UPDATED]: (event) => {
 *     console.log('Collection updated:', event.collection);
 *   },
 *   [CollectionEventType.CACHE_CLEARED]: (event) => {
 *     console.log('Cache cleared for:', event.productType);
 *   }
 * });
 * ```
 */
export function useMultipleCollectionEvents(
  handlers: Partial<Record<CollectionEventType, (event: CollectionEvent) => void>>
): void {
  useEffect(() => {
    // Store unsubscribe functions
    const unsubscribers: (() => void)[] = [];

    // Subscribe to each event type
    Object.entries(handlers).forEach(([eventType, handler]) => {
      if (handler) {
        const unsubscribe = collectionEvents.on(eventType as CollectionEventType, handler);
        unsubscribers.push(unsubscribe);
      }
    });

    // Cleanup all subscriptions
    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe());
    };
  }, [handlers]);
}
