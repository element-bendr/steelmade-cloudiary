/**
 * Route configuration for the application
 * This file defines standard parameter names and helper functions for routes
 */

// Standard route parameter names
export const ROUTE_PARAMS = {
  CATEGORY: 'categoryId',
  SERIES: 'seriesId',
  PRODUCT: 'productId',
  VARIANT: 'variantId'
};

// Parameter interfaces
export interface CategoryParams {
  [ROUTE_PARAMS.CATEGORY]: string;
}

export interface SeriesParams extends CategoryParams {
  [ROUTE_PARAMS.SERIES]: string;
}

export interface ProductParams extends SeriesParams {
  [ROUTE_PARAMS.PRODUCT]: string;
}

export interface VariantParams extends ProductParams {
  [ROUTE_PARAMS.VARIANT]: string;
}

// Parameter extraction functions
export function extractCategoryParams(params: any): CategoryParams {
  return {
    [ROUTE_PARAMS.CATEGORY]: params[ROUTE_PARAMS.CATEGORY]
  };
}

export function extractSeriesParams(params: any): SeriesParams {
  return {
    [ROUTE_PARAMS.CATEGORY]: params[ROUTE_PARAMS.CATEGORY],
    [ROUTE_PARAMS.SERIES]: params[ROUTE_PARAMS.SERIES]
  };
}

export function extractProductParams(params: any): ProductParams {
  return {
    [ROUTE_PARAMS.CATEGORY]: params[ROUTE_PARAMS.CATEGORY],
    [ROUTE_PARAMS.SERIES]: params[ROUTE_PARAMS.SERIES],
    [ROUTE_PARAMS.PRODUCT]: params[ROUTE_PARAMS.PRODUCT]
  };
}

export function extractVariantParams(params: any): VariantParams {
  return {
    [ROUTE_PARAMS.CATEGORY]: params[ROUTE_PARAMS.CATEGORY],
    [ROUTE_PARAMS.SERIES]: params[ROUTE_PARAMS.SERIES],
    [ROUTE_PARAMS.PRODUCT]: params[ROUTE_PARAMS.PRODUCT],
    [ROUTE_PARAMS.VARIANT]: params[ROUTE_PARAMS.VARIANT]
  };
}

// Path building functions
export function buildCategoryPath(categoryId: string): string {
  return `/${categoryId}`;
}

export function buildSeriesPath(categoryId: string, seriesId: string): string {
  return `/${categoryId}/${seriesId}`;
}

export function buildProductPath(categoryId: string, seriesId: string, productId: string): string {
  return `/${categoryId}/${seriesId}/${productId}`;
}

export function buildVariantPath(
  categoryId: string, 
  seriesId: string, 
  productId: string, 
  variantId: string
): string {
  return `/${categoryId}/${seriesId}/${productId}/${variantId}`;
}