# Product Module Implementation Plan

This document outlines the steps to implement a fully modular product system, eliminating the legacy code in `product-utils.ts`.

## Current State Analysis

The application currently has two parallel systems:

1. **Legacy System** in `lib/utils/product-utils.ts`:
   - Uses mock data objects directly in the file
   - Contains all product data in a single file
   - Provides simple getter functions
   - Currently used by the frontend components

2. **Modular System** in `lib/data/products/*`:
   - Organizes data by category and series
   - More maintainable and scalable structure
   - Not fully integrated with frontend components

## Modularization Goals

1. Create a clean, maintainable product data architecture
2. Centralize product data access through a service layer
3. Implement proper type safety and validation
4. Support data fetching from external sources in the future
5. Enable easy product and variant additions
6. 

## Implementation Steps

### 1. Define Module Structure

```
/modules/product/
├── types/                  # Type definitions
│   ├── product.ts          # Product interfaces
│   ├── variant.ts          # Variant interfaces
│   └── index.ts            # Type exports
├── data/                   # Product data
│   ├── categories/
│   │   ├── chairs/
│   │   │   ├── director-series.ts
│   │   │   └── ...
│   │   └── ...
│   └── index.ts            # Data exports
├── services/               # Business logic
│   ├── product-service.ts  # Product operations
│   ├── variant-service.ts  # Variant operations
│   └── index.ts            # Service exports
├── utils/                  # Helper functions
│   ├── product-utils.ts    # Product utilities
│   └── variant-utils.ts    # Variant utilities
├── validation/             # Data validation
│   ├── product-schema.ts   # Zod schemas for products
│   └── variant-schema.ts   # Zod schemas for variants
└── index.ts                # Module entry point
```

### 2. Create Core Types

Create strong TypeScript interfaces for all product-related entities:

- `Product` - Base product interface
- `ProductVariant` - Product variant interface
- `ProductCategory` - Product category enum
- `ProductSeries` - Product series interface

### 3. Implement Product Service

Create a `ProductService` that provides:

- Retrieval of products by ID, category, or series
- Filtering and searching products
- Variant selection and management
- Future integration with APIs

### 4. Migrate Data to Module

Move all product data from `product-utils.ts` to the modular structure:

- Create category-specific directories
- Split data by series
- Ensure proper typing

### 5. Create Module Entry Point

Design a clean public API for the Product module:

```typescript
// Example module entry point
export { ProductService } from './services/product-service';
export { VariantService } from './services/variant-service';
export * from './types';
```

### 6. Update Components and Pages

Update all components and pages to use the new Product module:

- Replace imports from `lib/utils/product-utils`
- Use the `ProductService` for data access
- Update type references

### 7. Add Data Validation

Implement Zod schemas to validate product data:

- Create schemas for products and variants
- Add validation at module boundaries
- Provide helpful error messages

### 8. Remove Legacy Code

Once all components are updated:

- Remove `lib/utils/product-utils.ts`
- Clean up any remaining references
- Verify all functionality works correctly

## Testing Strategy

1. Unit tests for the ProductService
2. Integration tests for module boundaries
3. UI tests for product pages
4. Comprehensive testing of product data access