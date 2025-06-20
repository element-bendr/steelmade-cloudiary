// File: lib/data/products/chairs/director-series/auto-loader.ts

/**
 * This file provides a mechanism to automatically load all chair files
 * from the director-series directory without manual imports
 */

import fs from 'fs';
import path from 'path';
import { ExtendedProductData } from '@/lib/data/product-types';

/**
 * Dynamically loads all chair files from the director-series directory
 * @returns An array of all chair objects
 */
export async function loadAllDirectorSeriesChairs(): Promise<ExtendedProductData[]> {
  try {
    // Get the directory path
    const dirPath = path.join(process.cwd(), 'lib/data/products/chairs/director-series');
    
    // Read all files in the directory
    const files = fs.readdirSync(dirPath);
    
    // Filter for TypeScript files and exclude index.ts and this file
    const chairFiles = files.filter(file => 
      file.endsWith('.ts') && 
      file !== 'index.ts' && 
      file !== 'auto-loader.ts'
    );
    
    // Load each chair file dynamically
    const chairPromises = chairFiles.map(async (file) => {
      try {
        // Import the file
        const module = await import(`./${file}`);
        
        // Find the exported chair object (usually the default export or named export)
        const chairObject = Object.values(module)[0] as ExtendedProductData;
        
        // Verify it's a valid chair object
        if (chairObject && chairObject.id && chairObject.name) {
          return chairObject;
        }
        
        console.warn(`Warning: File ${file} does not export a valid chair object`);
        return null;
      } catch (error) {
        console.error(`Error loading chair file ${file}:`, error);
        return null;
      }
    });
    
    // Wait for all chair files to load
    const chairs = await Promise.all(chairPromises);
    
    // Filter out any null values
    return chairs.filter(Boolean) as ExtendedProductData[];
  } catch (error) {
    console.error('Error loading director series chairs:', error);
    return [];
  }
}

/**
 * Creates a product map with ID keys
 * @param chairs Array of chair objects
 * @returns Map of chairs by ID
 */
export function createChairMap(chairs: ExtendedProductData[]): Record<string, ExtendedProductData> {
  return chairs.reduce((map, chair) => {
    if (chair && chair.id) {
      map[chair.id] = chair;
    }
    return map;
  }, {} as Record<string, ExtendedProductData>);
}