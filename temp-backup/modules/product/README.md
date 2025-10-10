# Product Module

This module centralizes all product-related functionality including data management, type definitions, and validation.

## Structure

```
/src
  /types       # Type definitions for product-related entities
  /services    # Data fetching and caching services
  /validation  # Zod schemas and validation functions
  /utils      # Helper functions and utilities
/tests        # Unit and integration tests
```

## Usage

```typescript
import { ProductDataService } from '@modules/product';

const productService = ProductDataService.getInstance();
const product = await productService.getProductById('my-product-id');
```

## Types

The module exports these core types:
- `Product` - Core product interface
- `ProductImage` - Product image data
- `ProductVariant` - Product variant information
- `ProductSeries` - Series/collection of products

## Validation

Data validation is handled using Zod schemas:
- `ProductSchema` - Validates complete product objects
- `ProductImageSchema` - Validates image data
- `ProductVariantSchema` - Validates variant data

## Development

1. Install dependencies:
   ```bash
   npm install zod
   ```

2. Run tests:
   ```bash
   npm test
   ```

## Contributing

When adding new features:
1. Add appropriate types in `/types`
2. Add validation schemas in `/validation`
3. Add tests in `/tests`
4. Update documentation