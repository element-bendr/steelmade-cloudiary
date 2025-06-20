"use server";

import { cache } from 'react';
import { ExtendedProductData } from '@/lib/data/product-types';
import { loadAllDirectorSeriesChairs, createChairMap } from '@/lib/data/products/chairs/director-series/auto-loader';

/**
 * Loads all director series chairs using the auto-loader
 * This is a server action that can be called from client components
 */
export const getAllDirectorSeriesChairs = cache(async (): Promise<ExtendedProductData[]> => {
  try {
    return await loadAllDirectorSeriesChairs();
  } catch (error) {
    console.error('Error loading chairs in server action:', error);
    return [];
  }
});

/**
 * Gets a specific chair by ID
 * This is a server action that can be called from client components
 */
export const getDirectorChairById = cache(async (chairId: string): Promise<ExtendedProductData | null> => {
  try {
    const chairs = await loadAllDirectorSeriesChairs();
    const chairMap = createChairMap(chairs);
    return chairMap[chairId] || null;
  } catch (error) {
    console.error(`Error loading chair ${chairId} in server action:`, error);
    return null;
  }
});

/**
 * Gets all chairs as a map by ID
 * This is a server action that can be called from client components
 */
export const getDirectorChairsMap = cache(async (): Promise<Record<string, ExtendedProductData>> => {
  try {
    const chairs = await loadAllDirectorSeriesChairs();
    return createChairMap(chairs);
  } catch (error) {
    console.error('Error creating chair map in server action:', error);
    return {};
  }
});