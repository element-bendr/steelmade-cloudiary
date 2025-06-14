import type { ProductType } from "@/types/products";
import type { SubCategoryCollection } from "@/types/collections";

// Event types that can be emitted
export enum CollectionEventType {
  COLLECTION_UPDATED = "collection_updated",
  COLLECTION_DELETED = "collection_deleted",
  FILTERS_UPDATED = "filters_updated",
  CACHE_CLEARED = "cache_cleared"
}

// Event payload types
export interface CollectionUpdatedEvent {
  type: CollectionEventType.COLLECTION_UPDATED;
  productType: ProductType;
  subCategory: string;
  collection: SubCategoryCollection;
}

export interface CollectionDeletedEvent {
  type: CollectionEventType.COLLECTION_DELETED;
  productType: ProductType;
  subCategory: string;
}

export interface FiltersUpdatedEvent {
  type: CollectionEventType.FILTERS_UPDATED;
  productType: ProductType;
}

export interface CacheClearedEvent {
  type: CollectionEventType.CACHE_CLEARED;
  productType?: ProductType;
}

// Union type of all possible events
export type CollectionEvent = 
  | CollectionUpdatedEvent 
  | CollectionDeletedEvent 
  | FiltersUpdatedEvent 
  | CacheClearedEvent;

// Event handler type
type EventHandler = (event: CollectionEvent) => void;

class CollectionEventEmitter {
  private handlers: Map<CollectionEventType, Set<EventHandler>>;

  constructor() {
    this.handlers = new Map();
  }

  /**
   * Subscribe to collection events
   */
  on(eventType: CollectionEventType, handler: EventHandler): () => void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    
    this.handlers.get(eventType)!.add(handler);

    // Return unsubscribe function
    return () => this.off(eventType, handler);
  }

  /**
   * Unsubscribe from collection events
   */
  off(eventType: CollectionEventType, handler: EventHandler): void {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      handlers.delete(handler);
    }
  }

  /**
   * Emit a collection event
   */
  emit(event: CollectionEvent): void {
    const handlers = this.handlers.get(event.type);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(event);
        } catch (error) {
          console.error("Error in collection event handler:", error);
        }
      });
    }
  }
}

// Create singleton instance
export const collectionEvents = new CollectionEventEmitter();
