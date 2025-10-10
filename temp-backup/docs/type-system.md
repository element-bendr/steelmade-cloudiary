# Standardized Type System Documentation

## Overview

This document outlines the standardized type system implemented in the SteelMade application. The type system provides a consistent way to handle product categories, variants, and other domain-specific types throughout the application.

## Product Categories

### Core Types

The product category type system is defined in `types/product-categories-unified.ts` and includes:

- `ProductCategorySlug`: URL-friendly identifiers (e.g., "chairs", "tables")
- `ProductCategoryName`: User-friendly display names (e.g., "Chairs", "Tables")

### Type Definitions

```typescript
export type ProductCategorySlug = 
  | "chairs"
  | "desks"
  | "tables"
  | "storage-solutions"
  | "school-furniture"
  | "hospital-furniture"
  | "racking-systems"
  | "modular-furniture"
  | "office-accessories";

export type ProductCategoryName =
  | "Chairs"
  | "Desks"
  | "Tables"
  | "Storage Solutions"
  | "School Furniture"
  | "Hospital Furniture"
  | "Racking Systems"
  | "Modular Furniture"
  | "Office Accessories";
```

### Helper Functions

The type system includes several helper functions to work with these types:

| Function | Description |
|----------|-------------|
| `isValidCategorySlug(slug)` | Type guard to validate if a string is a valid ProductCategorySlug |
| `isValidCategoryName(name)` | Type guard to validate if a string is a valid ProductCategoryName |
| `getCategoryNameFromSlug(slug)` | Converts a ProductCategorySlug to a ProductCategoryName |
| `getCategorySlugFromName(name)` | Converts a ProductCategoryName to a ProductCategorySlug |
| `getAllCategorySlugs()` | Returns all valid category slugs |
| `getAllCategoryNames()` | Returns all valid category names |
| `formatCategorySlug(slug)` | Formats a slug for display without converting to a name |

### Usage Examples

#### Type Guards for Runtime Validation

```typescript
function getProductsByCategory(category: string): Product[] {
  if (!isValidCategorySlug(category)) {
    throw new Error(`Invalid category: ${category}`);
  }
  
  // Now category is typed as ProductCategorySlug
  return fetchProductsForCategory(category);
}
```

#### Converting Between Formats

```typescript
// Convert slug to display name
const slug: ProductCategorySlug = "storage-solutions";
const displayName = getCategoryNameFromSlug(slug); // "Storage Solutions"

// Convert display name to slug
const name: ProductCategoryName = "Storage Solutions";
const categorySlug = getCategorySlugFromName(name); // "storage-solutions"
```

## Product Variants

### Core Types

The product variant type system is defined in `types/product-variants-unified.ts`:

- `ProductVariant`: Standard format for product variants

### Type Definition

```typescript
export interface ProductVariant {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  specifications?: Record<string, string>;
}
```

### Usage with Legacy Systems

For backward compatibility with legacy systems that use different property names:

```typescript
// Legacy format
interface LegacyVariant {
  variantId: string;
  variantName: string;
  description: string;
  imageUrl: string;
  specifications?: Record<string, string>;
}

// Adapter function
function adaptLegacyVariant(legacy: LegacyVariant): ProductVariant {
  return {
    id: legacy.variantId,
    name: legacy.variantName,
    description: legacy.description,
    imageUrl: legacy.imageUrl,
    specifications: legacy.specifications
  };
}
```

## Series Metadata

The `SeriesMetadata` interface has been updated to use our standardized types:

```typescript
export interface SeriesMetadata {
  id: string;
  title: string;
  description: string;
  seoDescription?: string;
  imageUrl?: string;
  coverImage?: ImageAsset;
  images?: ImageAsset[];
  features?: string[];
  specifications?: Record<string, string>;
  lastModified?: string | Date;
  metadata?: {
    description?: string;
    coverImage?: ImageAsset;
    [key: string]: any;
  };
  category: ProductCategorySlug;
}
```

## Best Practices

1. **Use Type Guards**: Always use the provided type guards (`isValidCategorySlug`, etc.) to validate inputs before performing operations.

2. **Consistent Type Usage**: Use `ProductCategorySlug` for all URL-related operations and database keys, and `ProductCategoryName` for display purposes.

3. **API Functions**: All API functions should accept and return the standardized types, not string literals or custom types.

4. **Error Handling**: Provide informative error messages when invalid values are encountered.

5. **Component Props**: Component props should use the standardized types directly:

   ```typescript
   interface ProductGridProps {
     category: ProductCategorySlug;
     title?: string;
     // ...
   }
   ```

6. **Type Assertions**: Avoid direct type assertions (`as ProductCategorySlug`) where possible. Use type guards instead.

7. **Documentation**: Add JSDoc comments to clarify type usage in your code.

## Migration Guide

When updating existing code to use the standardized type system:

1. Replace imports from old type files with imports from `types/product-categories-unified.ts`

2. Update function parameters and return types to use the standardized types

3. Add appropriate type guards for input validation

4. Replace direct type assertions with proper type checking

5. Update component props to use the standardized types

## Troubleshooting

### Common Issues

1. **Type Compatibility**: If you encounter type compatibility issues, check if you're mixing old and new type definitions.

2. **Runtime Errors**: If you get runtime errors about invalid categories, ensure you're using the type guards to validate inputs.

3. **Property Access Errors**: Ensure you're using the correct property names (e.g., `id` instead of `variantId` for `ProductVariant`).

### Solutions

1. Use type guards to validate inputs and narrow types

2. Use the conversion functions to transform between slug and display name formats

3. Update your component props to use the standardized types

4. Add appropriate null checks and fallbacks for optional properties

## Future Considerations

1. Consider adding more domain-specific types (e.g., `ProductSize`, `ProductColor`) following the same pattern

2. Extend the type system to handle new product categories as they are added

3. Create a UI component library that leverages these types for consistent rendering