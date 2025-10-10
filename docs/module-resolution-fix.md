# Module Resolution Error Fix

## Issue Description

When trying to access director series chair pages, we encountered the following errors:

```
⨯ ./modules/image/src/services/ImageService.ts:5:0
Module not found: Can't resolve '@modules/shared'
```

Additionally, the product detail pages were showing loading screens indefinitely or error messages like:
```
Failed to load product. Error: ProductService is not defined
```

## Root Cause Analysis

1. **Missing Module**: The ImageService was trying to import from a module that doesn't exist (`@modules/shared`).
2. **Path Alias Misconfiguration**: The `@modules` path alias was not properly configured in tsconfig.json.
3. **Import Path Issues**: The dynamic import in the product detail page wasn't correctly resolving ProductService.
4. **Module Structure Inconsistency**: The module structure wasn't consistent across the application.
5. **Inconsistent Import Paths**: Different chair pages were using different import paths:
   - Ashley and Opera pages: `import('@/modules/product/services/product-service')`
   - Tycoon page: `import('@/modules/product/services/ProductService')`
6. **Case Sensitivity Issues**: Some imports were using camelCase (`product-service.ts`) while others used PascalCase (`ProductService.ts`).

## Solution Approach

1. **Create Missing Module**: Implement the missing `@modules/shared` module with required utilities
2. **Fix Path Aliases**: Update tsconfig.json to properly resolve module paths
3. **Standardize Module Structure**: Ensure consistent directory structure across modules
4. **Update Import Paths**: Correct all import paths to use the proper module resolution
5. **Standardize Case Sensitivity**: Use consistent file naming (either camelCase or PascalCase) throughout the project
6. **Consolidate Service Implementations**: Create a single, definitive implementation of ProductService

## Implementation Steps

1. **Create shared module with common utilities**:
   ```typescript
   // In modules/shared/utils/errors.ts
   export interface ServiceError {
     code: string;
     message: string;
     details?: unknown;
   }

   export function createServiceError(
     code: string,
     message: string,
     details?: unknown
   ): ServiceError {
     return { code, message, details };
   }

   export function logError(error: unknown, context?: string): void {
     const serviceError = toServiceError(error);
     console.error(
       `[ERROR]${context ? ` [${context}]` : ''} ${serviceError.code}: ${serviceError.message}`,
       serviceError.details || ''
     );
   }
   ```

2. **Standardize ProductService implementation**:
   ```typescript
   // In modules/product/services/ProductService.ts
   export class ProductService {
     static async getProductBySlug(slug: string): Promise<Product | null> {
       try {
         console.log(`Fetching product by slug: ${slug}`);
         // Implementation details...
       } catch (error) {
         logError(error, 'ProductService.getProductBySlug');
         throw toServiceError(error);
       }
     }
   }
   
   export default ProductService;
   ```

3. **Update dynamic imports in all chair pages**:
   ```typescript
   // Standardized import path in all chair pages
   const ProductServiceModule = await import('@/modules/product/services/ProductService');
   
   // Check for undefined service
   if (!ProductServiceModule.ProductService) {
     throw new Error('ProductService not found in imported module');
   }
   
   const productData = await ProductServiceModule.ProductService.getProductBySlug('chair-slug');
   ```

4. **Update tsconfig.json path aliases**:
   ```json
   "paths": {
     "@/*": ["./*"],
     "@modules/*": ["./modules/*"],
     "@app/*": ["./app/*"],
     "@components/*": ["./components/*"],
     "@lib/*": ["./lib/*"],
     "@utils/*": ["./utils/*"],
     "@public/*": ["./public/*"],
     "@styles/*": ["./styles/*"]
   }
   ```

5. **Create consistent barrel files for exports**:
   ```typescript
   // In modules/product/services/index.ts
   export * from './ProductService';
   
   // In modules/product/index.ts
   export * from './types';
   export * from './services';
   ```

6. **Standardize import paths across components**:
   ```typescript
   // Update all chair pages to use the same import pattern
   // Before: inconsistent imports
   import ProductService from './product-service'; // Some files
   import { ProductService } from '../services/ProductService'; // Other files
   
   // After: standardized pattern
   import { ProductService } from '@/modules/product/services/ProductService';
   ```

7. **Create proper index.html files for module structure**:
   ```typescript
   // In modules/shared/index.ts
   export * from './utils';
   
   // In modules/shared/utils/index.ts
   export * from './errors';
   ```

## Impact and Benefits

- **Consistent Module Structure**: All modules now follow the same directory structure
- **Improved Error Handling**: Better error messages and fallback UI
- **Reliable Path Resolution**: Consistent path aliases prevent import errors
- **Shared Utilities**: Common functions are now centralized in the shared module
- **Standardized Service Access**: All components now access ProductService the same way
- **Case Consistency**: File naming follows consistent patterns
- **Better Developer Experience**: Fewer confusion points in the codebase

## Lessons Learned

1. **Path Alias Configuration**:
   - Always ensure path aliases are properly configured in tsconfig.json
   - Test path resolution after configuration changes
   - Use consistent import patterns throughout the codebase

2. **Module Structure**:
   - Create a standard module structure and document it
   - Use index.ts files for clean exports
   - Follow consistent naming conventions for files and directories

3. **Error Handling**:
   - Add defensive checks for dynamic imports
   - Create helpful error messages
   - Implement fallback UI for various error states

4. **File Naming Conventions**:
   - Choose either camelCase or PascalCase for service files and stick to it
   - Document naming conventions for the team
   - Consider using lint rules to enforce naming consistency

This fix ensures that all director-series chair pages load correctly and follow our modular architecture approach.