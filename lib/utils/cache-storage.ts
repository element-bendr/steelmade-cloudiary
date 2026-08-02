/**
 * Cache storage utilities for collections
 */

import { CollectionFilters } from "@/types/collections";
import { ProductType } from "@/types/products";
import { CollectionErrorType, createCollectionError } from "./collection-errors";

const CACHE_PREFIX = "mcp_collections_";
const CACHE_EXPIRY = 1000 * 60 * 60; // 1 hour

// Available product types for cache management
const PRODUCT_TYPES: ProductType[] = ["chairs", "desks", "storage-solutions"];

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export const cacheStorage = {
  /**
   * Store data in cache with expiration
   */
  set: <T>(key: string, data: T): void => {
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(entry));
    } catch (error) {
      console.error("Cache storage error:", error);
      throw createCollectionError(
        CollectionErrorType.CACHE_ERROR,
        key,
        error
      );
    }
  },

  /**
   * Retrieve data from cache, checking expiration
   */
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(`${CACHE_PREFIX}${key}`);
      if (!item) return null;

      const entry: CacheEntry<T> = JSON.parse(item);
      
      // Check if cache has expired
      if (Date.now() - entry.timestamp > CACHE_EXPIRY) {
        localStorage.removeItem(`${CACHE_PREFIX}${key}`);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.error("Cache retrieval error:", error);
      return null;
    }
  },

  /**
   * Clear specific cache entry or all cache entries
   */
  clear: (key?: string): void => {
    try {
      if (key) {
        localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      } else {
        // Clear all collection caches
        Object.keys(localStorage)
          .filter(k => k.startsWith(CACHE_PREFIX))
          .forEach(k => localStorage.removeItem(k));
      }
    } catch (error) {
      console.error("Cache clear error:", error);
      throw createCollectionError(
        CollectionErrorType.CACHE_ERROR,
        key || "all",
        error
      );
    }
  },

  /**
   * Store collection filters with type-specific key
   */
  setFilters: (type: ProductType, filters: CollectionFilters): void => {
    cacheStorage.set(`filters_${type}`, filters);
  },

  /**
   * Retrieve collection filters for specific type
   */
  getFilters: (type: ProductType): CollectionFilters | null => {
    return cacheStorage.get(`filters_${type}`);
  },

  /**
   * Clear filters cache for specific type or all types
   */
  clearFilters: (type?: ProductType): void => {
    if (type) {
      cacheStorage.clear(`filters_${type}`);
    } else {
      // Clear all filter caches
      PRODUCT_TYPES.forEach(t => {
        cacheStorage.clear(`filters_${t}`);
      });
    }
  }
};
