// This file serves as a convention guide and template for implementing
// dynamic routes in a consistent way across the application

// Import the route configuration to ensure consistent parameter naming
import { routeConfig } from '@/lib/routes/route-config';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Example dynamic route handler that follows the conventions:
 * 
 * File Location: app/[categoryId]/[seriesId]/[productId]/route.ts
 * URL Pattern: /chairs/director-series/tycoon-director-chair
 * 
 * This ensures consistent parameter naming across the application.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { 
    [key: string]: string; 
    categoryId: string; 
    seriesId: string; 
    productId: string 
  }}
) {
  const { categoryId, seriesId, productId } = params;
  
  // Use these parameters with your data access functions
  // getProduct(categoryId, seriesId, productId);
  
  return NextResponse.json({ 
    message: 'Example of consistent parameter naming',
    params: { categoryId, seriesId, productId },
    dynamicPath: routeConfig.buildPaths.productPath(categoryId, seriesId, productId)
  });
}

/**
 * IMPORTANT: Remember to follow these conventions when creating new dynamic routes:
 * 
 * 1. Always use the parameter names from routeConfig.params:
 *    - categoryId (not category, categorySlug, etc.)
 *    - seriesId (not series, seriesSlug, etc.)
 *    - productId (not product, productSlug, etc.)
 * 
 * 2. Always place your route files in folders named:
 *    - [categoryId]
 *    - [seriesId]
 *    - [productId]
 * 
 * This prevents the "Error: You cannot use different slug names for 
 * the same dynamic path" error when routes have inconsistent naming.
 */