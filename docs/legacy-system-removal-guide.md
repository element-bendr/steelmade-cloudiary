# Complete Legacy System Removal Guide

This guide outlines the final steps to completely remove the legacy product data system after all products have been migrated to the new modular system and thoroughly tested.

## Prerequisites

Before proceeding with the removal of the legacy system, ensure that:

1. All products have been migrated to the modular system using:
   ```
   node scripts/migrate-all-products.js
   ```

2. The application has been thoroughly tested with the modular system:
   - All product pages load correctly
   - All product variants display properly
   - All images load correctly
   - Search and filtering functionality works as expected

3. You have a backup or your changes are committed to version control

## Steps to Remove the Legacy System

### 1. Update Configuration

First, update the Product Module configuration to enable full modular mode and disable the legacy system:

```javascript
// lib/modules/product/config.ts
export const productModuleConfig = {
  // ...other config options
  features: {
    fullModularMode: true,
    disableLegacySystem: true,
    // ...other feature flags
  }
};
```

### 2. Run the Legacy System Removal Script

Execute the removal script to automatically:
- Remove legacy files
- Update imports across the codebase
- Remove compatibility layer

```bash
node scripts/remove-legacy-system.js --confirm
```

### 3. Manual Cleanup (if needed)

If the script doesn't handle all cases, manually:

1. Remove any remaining legacy files:
   - `lib/utils/product-utils.ts`
   - `lib/utils/mock-data.ts`
   - Any other legacy product data files

2. Update any remaining imports:
   - Replace `import ... from '@/lib/utils/product-utils'` with imports from the modular system
   - Remove imports from `mock-data.ts`

3. Remove adapter functions:
   - Remove any code that adapts between the legacy and modular data structures

### 4. Update Types

Ensure all type definitions are consistent:

1. Update interfaces to match the modular system data structure
2. Remove any legacy type definitions
3. Update components to use the new types

### 5. Test After Removal

After removing the legacy system:

1. Run the application in development mode:
   ```bash
   npm run dev
   ```

2. Verify all product pages load correctly
3. Check for any errors in the console
4. Test all product-related functionality

## Troubleshooting

If you encounter issues after removing the legacy system:

### Missing Products

If products are missing:
- Check that all categories and series were properly migrated
- Verify the imports in `lib/data/products/index.ts`
- Ensure the Product Module configuration has all categories marked as migrated

### Type Errors

If you encounter TypeScript errors:
- Update component props to match the modular data structure
- Check for any remaining references to legacy type definitions
- Ensure all imports are from the new modular system

### Runtime Errors

If you see runtime errors:
- Look for any remaining references to the legacy system
- Check for code that assumes the old data structure
- Update any hardcoded paths that might have changed

## Benefits of the Modular System

With the legacy system removed, you now have:

- A modular, maintainable product data structure
- Clear separation of concerns between data, business logic, and UI
- Improved type safety with consistent TypeScript definitions
- Better organization of product data by category and series
- Clearer error handling with specific error types
- A more extensible system for adding new products