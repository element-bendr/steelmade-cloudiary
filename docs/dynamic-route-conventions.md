# Dynamic Route Naming Conventions

This document outlines the standard naming conventions for dynamic route parameters in our Next.js application.

## Standard Parameter Names

For consistency across the application, use these parameter names at each level of the URL hierarchy:

| URL Level | Parameter Name | Example Path |
|-----------|---------------|--------------|
| 1st level (Category) | `categoryId` | `/[categoryId]` |
| 2nd level (Series) | `seriesId` | `/[categoryId]/[seriesId]` |
| 3rd level (Product) | `productId` | `/[categoryId]/[seriesId]/[productId]` |
| 4th level (Variant) | `variantId` | `/[categoryId]/[seriesId]/[productId]/[variantId]` |

## Examples

### Correct Usage

```
app/
├── [categoryId]/
│   ├── page.tsx               # Category page
│   ├── [seriesId]/
│   │   ├── page.tsx           # Series page
│   │   ├── [productId]/
│   │   │   ├── page.tsx       # Product page
│   │   │   └── [variantId]/
│   │   │       └── page.tsx   # Variant page
```

### Common Issues to Avoid

❌ **Using different parameter names for the same position:**

```
app/
├── [categoryId]/              # Using 'categoryId' here
├── [category]/                # But 'category' here - THIS CAUSES ERRORS!
```

❌ **Inconsistent naming across file types:**

```
app/[categoryId]/[seriesId]/page.tsx   # Using 'seriesId' here
app/[categoryId]/[series]/api/route.ts # But 'series' here - THIS CAUSES ERRORS!
```

❌ **Duplicate parameter names in the same path:**

```
app/
├── [seriesId]/                # Using 'seriesId' here
│   ├── [seriesId]/            # And again here - THIS CAUSES ERRORS!
```

## Why This Matters

Next.js has two key requirements for dynamic routes:

1. **Consistent Parameter Naming**: Parameters at the same position in different routes must use the same name.
   - Error: `You cannot use different slug names for the same dynamic path ('id' !== 'category')`

2. **Unique Parameter Names**: You cannot use the same parameter name multiple times in a single path.
   - Error: `You cannot have the same slug name "seriesId" repeat within a single dynamic path`

## How to Fix Inconsistencies

If you encounter parameter naming inconsistencies, use our utility scripts:

```bash
# Scan for inconsistencies
node scripts/scan-dynamic-parameters.sh

# Fix inconsistencies automatically
node scripts/fix-parameter-inconsistency.js

# Specifically fix id/category conflicts
node scripts/fix-id-category-conflict.js

# Fix duplicate parameters in the same path
node scripts/fix-duplicate-params.js
```

## Special Cases

### Nested Routes with Similar Parameters

If you need to have multiple dynamic segments of the same type in a single path (e.g., nested series), you should use indexed parameters:

```
app/
├── [categoryId]/
│   ├── [seriesId]/           # First level series
│   │   ├── [seriesId1]/      # Second level series (nested)
```

### Catch-all and Optional Catch-all Routes

For catch-all routes, use a descriptive name followed by ellipsis:

```
app/
├── [...slugs]/               # Catch-all route
├── [[...optionalSlugs]]/     # Optional catch-all route
```

## Testing Routes

After fixing parameter naming, you can test routes with:

```bash
# Test category route
http://localhost:3000/chairs

# Test series route
http://localhost:3000/chairs/director-series

# Test product route
http://localhost:3000/chairs/director-series/tycoon-director-chair
```