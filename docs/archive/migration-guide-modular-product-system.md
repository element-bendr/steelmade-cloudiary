# Migration Guide: From Legacy to Modular Product System

This guide outlines the process for migrating from the legacy product data system to our new modular system.

## Current Status

- A new Product Module has been created in `lib/modules/product/`
- The Director Series products have been migrated to the modular system
- Dynamic routes for the chairs category now use the new Product Module
- Compatibility layer is in place to assist with the transition

## Migration Tools

We've created two scripts to help with the migration process:

1. **migrate-products.js** - Automatically migrates products from the legacy system to the modular system
   ```
   node scripts/migrate-products.js chairs director-series
   ```

2. **remove-legacy-system.js** - Removes all traces of the legacy system after migration is complete
   ```
   node scripts/remove-legacy-system.js --confirm
   ```

## Migration Steps

### 1. Identify Legacy Code Dependencies

Files that still depend on the legacy product-utils.ts system:

- [ ] Components that directly import from lib/utils/product-utils.ts
- [ ] Pages that use the legacy product data structure
- [ ] API routes that fetch product data from the legacy system

### 2. Migrate Products by Category

For each product category:

1. Run the migration script:
   ```
   node scripts/migrate-products.js [category] [series]
   ```

2. Verify the generated files:
   - Check the product data files in lib/data/products/[category]/[series]/
   - Ensure all variants are properly defined
   - Update any incorrect or missing information

3. Update the category's routes to use the new Product Module:
   - Update pages to use `getProduct`, `getSeries`, etc. from `@/lib/modules/product`
   - Update components to handle the modular data structure
   - Test all pages to ensure proper rendering

### 3. Update Cloudinary Integration

- [ ] Ensure all product images are properly mapped
- [ ] Update image transformation utilities to work with the modular system
- [ ] Implement responsive image loading for improved performance

### 4. Test Migration Thoroughly

Before removing the legacy system:

- [ ] Test all product pages
- [ ] Verify all images load correctly
- [ ] Check that all variants display properly
- [ ] Test search and filtering functionality
- [ ] Test any components that display product data

### 5. Remove Legacy System

Once all products have been migrated and tested:

1. Run the removal script:
   ```
   node scripts/remove-legacy-system.js --confirm
   ```

2. Verify the application still works correctly:
   - Check for any runtime errors
   - Verify all product pages load properly
   - Ensure all functionality works as expected

### 6. Benefits of the Modular System

- Separation of concerns between data, business logic, and UI
- Improved type safety with consistent TypeScript definitions
- Better organization of product data by category and series
- Clearer error handling with specific error types
- More maintainable and extensible product management

## Progress Tracking

| Category | Products Migrated | Routes Updated | Fully Tested | Legacy Removed |
|----------|------------------|---------------|-------------|----------------|
| Chairs   | ✅               | ✅            | ⬜          | ⬜             |
| Hospital Furniture | ⬜      | ⬜           | ⬜          | ⬜             |
| Racking Systems    | ⬜      | ⬜           | ⬜          | ⬜             |
| School Furniture   | ⬜      | ⬜           | ⬜          | ⬜             |
| Storage Solutions  | ⬜      | ⬜           | ⬜          | ⬜             |
| Modular Furniture  | ⬜      | ⬜           | ⬜          | ⬜             |
| Office Accessories | ⬜      | ⬜           | ⬜          | ⬜             |