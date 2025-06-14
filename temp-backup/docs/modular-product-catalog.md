# Modular Product Catalog Structure

This document outlines how to organize the Steelmade product catalog using a modular file structure approach.

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Implementation Steps](#implementation-steps)
4. [Example Files](#example-files)
5. [Adding New Products](#adding-new-products)
6. [Best Practices](#best-practices)
7. [Example Migration](#example-migration)

## Overview

The modular file structure approach organizes product data by splitting it into multiple files based on product categories and series, rather than keeping everything in a single large file. This improves maintainability and makes it easier to find and update specific products.

## Directory Structure

```
lib/
└── data/
    ├── product-catalog.ts            # Main entry point that exports all products
    ├── product-types.ts              # Shared type definitions
    ├── product-helpers.ts            # Helper functions
    └── products/
        ├── index.ts                  # Re-exports all product categories
        ├── chairs/
        │   ├── index.ts              # Re-exports all chair series
        │   ├── director-series.ts    # Director Series data
        │   ├── executive-series.ts   # Executive Series data
        │   └── ergonomic-series.ts   # Ergonomic Series data
        ├── desks/
        │   ├── index.ts              # Re-exports all desk series
        │   └── designer-desk.ts      # Designer Desk Collection data
        ├── storage/
        │   ├── index.ts              # Re-exports all storage series
        │   └── modular-storage.ts    # Storage Solutions data
        └── other-categories/...      # Other product categories
```

## Implementation Steps

### 1. Create Type Definitions File

1. Extract all type definitions into a separate `product-types.ts` file
2. Include types for products, series, variants, and any shared interfaces

### 2. Create Helper Functions File

1. Move all helper functions (getPortfolioSeries, getMockData, etc.) to `product-helpers.ts`
2. Update function signatures to accept product data as parameters

### 3. Create Category and Series Files

1. Create subdirectories for each product category
2. Create individual files for each product series
3. Implement index.ts files to re-export content

### 4. Update Main Product Catalog File

1. Import all product categories
2. Combine them into the complete product catalog
3. Export the consolidated catalog and helper functions

## Example Files

### product-types.ts
```typescript
import type { ProductCategory } from "@/types/collections";

// Extended product data with variants
export interface ProductVariant {
  variantId: string;
  variantName: string;
  name: string;
  description: string;
  imageUrl: string;
  specifications: Record<string, string>;
}

export interface ExtendedProductData {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  seriesId: string;
  inStock: boolean;
  imageUrl: string;
  images: Array<{
    url: string;
    alt: string;
    width: number;
    height: number;
  }>;
  features: string[];
  specifications: Record<string, string>;
  variants?: ProductVariant[];
}

export interface ProductSeries {
  id: string;
  title: string;
  description: string;
  seoDescription: string;
  category: ProductCategory;
  imageUrl: string;
  coverImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  images: Array<{
    url: string;
    alt: string;
    width: number;
    height: number;
  }>;
  features: string[];
  lastModified: string;
  products: Record<string, ExtendedProductData>;
}

export type ProductCatalog = Record<ProductCategory, Record<string, ProductSeries>>;
```

### chairs/director-series.ts
```typescript
import { ProductSeries } from "../product-types";

export const directorSeries: ProductSeries = {
  id: "director-series",
  title: "Director Series",
  description: "Professional director chairs offering versatile and durable seating solutions.",
  seoDescription: "Discover our Director Series - premium, durable, and stylish seating for professional film sets and productions.",
  category: "chairs",
  imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/collection-cover.webp",
  coverImage: { 
    url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/collection-cover.webp", 
    alt: "Director Series Collection", 
    width: 800, 
    height: 600 
  },
  images: [
    { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/collection-detail.webp", alt: "Director Series Detail", width: 800, height: 600 }
  ],
  features: ["Professional Design", "Durable Construction", "Multiple Configurations"],
  lastModified: new Date("2025-06-04T00:00:00.000Z").toISOString(),
  products: {
    "ashley-director-chair": {
      id: "ashley-director-chair",
      name: "Ashley Director Chair",
      description: "The Ashley Director Chair offers versatile and durable seating solutions.",
      category: "chairs",
      seriesId: "director-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/ashley/ic-361-hb.webp",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/ashley/ic-361-hb.webp", alt: "Ashley High-Back Director Chair", width: 800, height: 600 }
      ],
      features: ["Reinforced aluminum frame", "Extra-wide seating", "Premium leather armrests"],
      specifications: {
        "Material": "Aircraft-grade aluminum and canvas",
        "Warranty": "5-year limited warranty"
      },
      variants: [
        {
          variantId: "ic-361-hb",
          variantName: "High-Back",
          name: "Ashley High-Back Director Chair IC-361-HB",
          description: "Premium high-back version of the Ashley Director Chair.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/ashley/ic-361-hb.webp",
          specifications: {
            "Height": "45 inches",
            "Weight Capacity": "300 lbs",
            "Frame": "Aircraft-grade aluminum"
          }
        }
        // Additional variants...
      ]
    }
    // Additional products...
  }
};
```

### chairs/index.ts
```typescript
import { directorSeries } from "./director-series";
import { executiveSeries } from "./executive-series";
import { ergonomicSeries } from "./ergonomic-series";
import { ProductCategory } from "../product-types";

export const chairs: Record<string, any> = {
  "director-series": directorSeries,
  "executive-series": executiveSeries,
  "ergonomic-series": ergonomicSeries
};
```

### product-catalog.ts
```typescript
import { ProductCatalog } from "./product-types";
import { chairs } from "./products/chairs";
import { desks } from "./products/desks";
import { storage } from "./products/storage";
// Import other categories...

// Assemble the complete product catalog
export const productCatalog: ProductCatalog = {
  chairs,
  desks,
  "storage-solutions": storage,
  "school-furniture": {},
  "hospital-furniture": {},
  "racking-systems": {},
  "modular-furniture": {}
};

// Re-export helper functions
export { getPortfolioSeries, getMockData, getMockProductsData } from "./product-helpers";
```

## Adding New Products

### To add a new product series:

1. Create a new file in the appropriate category folder (e.g., `chairs/task-series.ts`)
2. Define the series data following the `ProductSeries` interface
3. Add the series to the category's index.ts file
4. The changes will automatically be included in the main product catalog

### To add a new product to an existing series:

1. Open the series file (e.g., `chairs/director-series.ts`)
2. Add a new entry to the `products` object
3. Follow the `ExtendedProductData` interface for the product structure

### To add a new variant to an existing product:

1. Open the series file containing the product
2. Find the product in the `products` object
3. Add a new entry to the `variants` array
4. Follow the `ProductVariant` interface for the variant structure

## Best Practices

1. **Consistent Naming**: Use consistent file and variable naming conventions
2. **Type Safety**: Always adhere to the defined interfaces
3. **Image Paths**: Maintain consistent Cloudinary URL patterns
4. **Documentation**: Add comments for complex products or special cases
5. **Incremental Changes**: Make small, focused updates to minimize errors
6. **Version Control**: Commit changes to each product series separately
7. **Testing**: Verify that helper functions work correctly with new products

This modular approach scales well as your catalog grows, keeping files manageable and making it easier to find and update specific products.

## Migration Plan

Since we're just starting to add production data, this is an ideal time to implement the modular structure. Here's how to migrate from the current system:

### Step 1: Extract Types and Helpers

1. Create `product-types.ts` and move all type definitions from existing files
2. Create `product-helpers.ts` and move helper functions

### Step 2: Setup Directory Structure

1. Create the folder structure:
   ```
   lib/data/products/{chairs,desks,storage,etc.}
   ```
2. Add index.ts files to each directory

### Step 3: Split Product Data

1. Extract each product series into its own file
2. Start with chairs category (director, executive, ergonomic series)
3. Continue with other categories

### Step 4: Update Main Catalog File

1. Modify product-catalog.ts to import and assemble data from modular files
2. Maintain same exports to preserve backward compatibility

### Step 5: Update Imports

1. Update the imports in portfolio-data.ts, mock-data.ts, and collections-data.ts
2. No changes needed to the exports from these files

## Example Migration

Here's a practical example of how to migrate the Director Series from the current monolithic structure to the modular approach.

### 1. Create product-types.ts

```typescript
// lib/data/product-types.ts
import type { ProductCategory } from "@/types/collections";
import type { Series } from "@/components/portfolio/types";

// Extended product data with variants
export interface ProductVariant {
  variantId: string;
  variantName: string;
  name: string;
  description: string;
  imageUrl: string;
  specifications: Record<string, string>;
}

export interface ExtendedProductData {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  seriesId: string;
  inStock: boolean;
  imageUrl: string;
  images: Array<{
    url: string;
    alt: string;
    width: number;
    height: number;
  }>;
  features: string[];
  specifications: Record<string, string>;
  variants?: ProductVariant[];
}

export interface ProductSeries {
  id: string;
  title: string;
  description: string;
  seoDescription: string;
  category: ProductCategory;
  imageUrl: string;
  coverImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  images: Array<{
    url: string;
    alt: string;
    width: number;
    height: number;
  }>;
  features: string[];
  lastModified: string;
  products: Record<string, ExtendedProductData>;
}

export type ProductCatalog = Record<ProductCategory, Record<string, ProductSeries>>;
```

### 2. Create product-helpers.ts

```typescript
// lib/data/product-helpers.ts
import { Series } from "@/components/portfolio/types";
import type { ProductCategory } from "@/types/collections";
import type { ProductData } from "@/types/products";
import { ProductCatalog } from "./product-types";

// Helper functions to extract simplified data for portfolio view
export function getPortfolioSeries(catalog: ProductCatalog): Series[] {
  return Object.values(catalog).flatMap(categoryData => 
    Object.values(categoryData).map((series, index) => ({
      id: index + 1, // Generate sequential IDs for backward compatibility
      title: series.title,
      description: series.description,
      imageUrl: series.imageUrl || '', // Ensure imageUrl is never undefined
      products: Object.values(series.products).map((product, prodIndex) => ({
        id: ((index + 1) * 100) + (prodIndex + 1), // Generate compatible IDs (101, 102, 201, 202, etc.)
        title: product.name,
        description: product.description,
        imageUrl: product.imageUrl || ''
      }))
    }))
  ).filter(series => series.products.length > 0); // Only include series with products
}

// For development/testing
export function getMockData(catalog: ProductCatalog) {
  return catalog;
}

// Helper to get product data in the format expected by the mock data
export function getMockProductsData(catalog: ProductCatalog): Record<ProductCategory, Record<string, ProductData[]>> {
  return Object.entries(catalog).reduce((acc, [category, seriesMap]) => {
    acc[category as ProductCategory] = {};
    
    Object.entries(seriesMap).forEach(([seriesId, series]) => {
      acc[category as ProductCategory][seriesId] = Object.values(series.products);
    });
    
    return acc;
  }, {} as Record<ProductCategory, Record<string, ProductData[]>>);
}
```

### 3. Create products folder structure

```
lib/
└── data/
    └── products/
        ├── index.ts
        └── chairs/
            ├── index.ts
            └── director-series.ts
```

### 4. Create director-series.ts

```typescript
// lib/data/products/chairs/director-series.ts
import { ProductSeries } from "../../product-types";

export const directorSeries: ProductSeries = {
  id: "director-series",
  title: "Director Series",
  description: "Professional director chairs offering versatile and durable seating solutions for film sets and productions.",
  seoDescription: "Discover our Director Series - premium, durable, and stylish seating for professional film sets and productions.",
  category: "chairs",
  imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/collection-cover.webp",
  coverImage: { 
    url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/collection-cover.webp", 
    alt: "Director Series Collection", 
    width: 800, 
    height: 600 
  },
  images: [
    { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/collection-detail.webp", alt: "Director Series Detail", width: 800, height: 600 }
  ],
  features: ["Professional Design", "Durable Construction", "Multiple Configurations"],
  lastModified: new Date("2025-06-04T00:00:00.000Z").toISOString(),
  products: {
    "ashley-director-chair": {
      id: "ashley-director-chair",
      name: "Ashley Director Chair",
      description: "The Ashley Director Chair offers versatile and durable seating solutions for professional environments, available in high-back and mid-back configurations.",
      category: "chairs",
      seriesId: "director-series",
      inStock: true,
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/ashley/ic-361-hb.webp",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/ashley/ic-361-hb.webp", alt: "Ashley High-Back Director Chair", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/ashley/ic-362-mb.webp", alt: "Ashley Mid-Back Director Chair", width: 800, height: 600 }
      ],
      features: ["Reinforced aluminum frame", "Extra-wide seating", "Premium leather armrests", "Multiple back heights"],
      specifications: {
        "Material": "Aircraft-grade aluminum and canvas",
        "Warranty": "5-year limited warranty"
      },
      variants: [
        {
          variantId: "ic-361-hb",
          variantName: "High-Back",
          name: "Ashley High-Back Director Chair IC-361-HB",
          description: "Premium high-back version of the Ashley Director Chair for maximum comfort and support.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/ashley/ic-361-hb.webp",
          specifications: {
            "Height": "45 inches",
            "Weight Capacity": "300 lbs",
            "Frame": "Aircraft-grade aluminum"
          }
        },
        {
          variantId: "ic-362-mb",
          variantName: "Mid-Back",
          name: "Ashley Mid-Back Director Chair IC-362-MB",
          description: "Versatile mid-back version of the Ashley Director Chair offering excellent mobility and comfort.",
          imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/ashley/ic-362-mb.webp",
          specifications: {
            "Height": "38 inches",
            "Weight Capacity": "300 lbs",
            "Frame": "Aircraft-grade aluminum"
          }
        }
      ]
    }
    // ... other products
  }
};
```

### 5. Create chairs/index.ts

```typescript
// lib/data/products/chairs/index.ts
import { directorSeries } from "./director-series";
// Later you'll import executiveSeries, ergonomicSeries, etc.

export const chairs = {
  "director-series": directorSeries,
  // Later add other series
};
```

### 6. Create products/index.ts

```typescript
// lib/data/products/index.ts
import { chairs } from "./chairs";
// Later import other categories

export { chairs };
// Later export other categories
```

### 7. Update product-catalog.ts

```typescript
// lib/data/product-catalog.ts
import { ProductCatalog } from "./product-types";
import { chairs } from "./products/chairs";
// Later import other categories

// Assemble the complete product catalog
export const productCatalog: ProductCatalog = {
  chairs,
  desks: {}, // Empty until we add desks
  "storage-solutions": {}, // Empty until we add storage solutions
  "school-furniture": {},
  "hospital-furniture": {},
  "racking-systems": {},
  "modular-furniture": {}
};

// Re-export helper functions
export { getPortfolioSeries, getMockData, getMockProductsData } from "./product-helpers";

// These exports ensure backward compatibility
export function getPortfolioSeries(): Series[] {
  return getPortfolioSeries(productCatalog);
}

export function getMockData() {
  return getMockData(productCatalog);
}

export function getMockProductsData() {
  return getMockProductsData(productCatalog);
}
```

### 8. Migration Process

To migrate incrementally:

1. First set up the structure and migrate one series (Director Series)
2. Test that everything works as expected
3. Gradually migrate other series and categories
4. Once all data is migrated, you can remove the original data from product-catalog.ts