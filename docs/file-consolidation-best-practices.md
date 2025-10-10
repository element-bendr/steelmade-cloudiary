# File Consolidation Best Practices

## Overview

This document outlines best practices for maintaining a clean, consolidated codebase by avoiding multiple versions of the same files. Following these guidelines will help prevent import issues, reduce confusion, and improve maintainability.

## Key Principles

### 1. One Source of Truth

- **Single File Principle**: Maintain only one version of each file in the codebase
- **Avoid Temporary Files**: Don't keep temporary or alternate versions like `index-new.ts` or `page-backup.tsx`
- **Use Version Control**: Let git track changes rather than creating multiple versions

### 2. In-Place Enhancements

- **Enhance Existing Files**: When improving a file, modify it directly rather than creating a new version
- **Incremental Changes**: Make small, targeted changes to existing files
- **Test After Each Change**: Verify functionality after each modification

### 3. Proper File Organization

- **Consistent Naming**: Use clear, consistent naming conventions for all files
- **Logical Structure**: Organize files in a logical folder structure
- **Import Paths**: Use absolute imports with '@/' prefix for consistency

## File Naming Standards

### General Principles

- **Consistency**: Use the same naming pattern across the entire codebase
- **Readability**: Names should clearly indicate the file's purpose
- **Specificity**: Names should be specific enough to avoid confusion
- **Brevity**: Names should be concise while still being descriptive

### Component Files

- **React Components**: Use PascalCase for component files (e.g., `ProductCard.tsx`, `ChairDetail.tsx`)
- **Component Directories**: Match component file name (e.g., `ProductCard/ProductCard.tsx`, `ProductCard/index.tsx`)
- **Component Tests**: Append `.test` or `.spec` (e.g., `ProductCard.test.tsx`, `ProductCard.spec.tsx`)
- **Component Stories**: Append `.stories` (e.g., `ProductCard.stories.tsx`)

### Utility and Helper Files

- **Utility Functions**: Use kebab-case for utility files (e.g., `string-utils.ts`, `date-helpers.ts`)
- **Hooks**: Prefix with `use` and use camelCase (e.g., `useProductData.ts`, `useCart.ts`)
- **Context Files**: Suffix with `Context` (e.g., `ProductContext.tsx`, `CartContext.tsx`)
- **Type Definitions**: Suffix with `Types` (e.g., `productTypes.ts`, `chairTypes.ts`)

### API and Data Files

- **API Services**: Suffix with `Service` or `API` (e.g., `productService.ts`, `chairAPI.ts`)
- **Data Models**: Use singular nouns (e.g., `chair.ts`, `product.ts`) 
- **Data Collections**: Use plural nouns (e.g., `chairs.ts`, `products.ts`)
- **Constants**: Use ALL_CAPS with underscores (e.g., `COLOR_CONSTANTS.ts`, `SIZE_OPTIONS.ts`)

### Page Files

- **Next.js Pages**: Use lowercase for route-based pages (e.g., `page.tsx`, `layout.tsx`, `loading.tsx`)
- **Route Parameters**: Use square brackets for dynamic segments (e.g., `[productId].tsx`, `[category]/page.tsx`)
- **API Routes**: Match corresponding entity (e.g., `api/products/route.ts`, `api/chairs/[id]/route.ts`)

### Special Files

- **Index Files**: Use `index.ts` or `index.tsx` for directory exports
- **Configuration Files**: Use kebab-case (e.g., `tailwind.config.js`, `jest.config.js`)
- **Environment Files**: Use dot prefix (e.g., `.env.local`, `.env.production`)
- **Documentation**: Use kebab-case (e.g., `api-documentation.md`, `style-guide.md`)

### File Naming Don'ts

- **Don't** include version numbers in file names (e.g., `product-v2.ts`)
- **Don't** use temporary markers in file names (e.g., `product-new.ts`, `product-fixed.ts`)
- **Don't** use generic names without context (e.g., `utils.ts`, `helpers.ts`)
- **Don't** mix naming conventions within the same category of files

## Import Path Guidelines

### Preferred Import Patterns

#### Absolute Imports (Preferred)

Use absolute imports with the `@/` prefix for most imports:

```typescript
// Good - Absolute import with alias
import { Button } from '@/components/ui/Button';
import { getProduct } from '@/lib/api/products';
import { Chair } from '@/lib/types/chairTypes';
```

Benefits:
- Works regardless of file location
- Resilient to file moves and refactoring
- Clear indication of file location in the project
- Avoids deep path traversal complexity

#### Same-Directory Imports

For files in the same directory, use simple relative imports:

```typescript
// Good - Same directory import
import { sortProducts } from './utils';
import { ProductProps } from './types';
```

#### Parent Directory Imports

For imports from a direct parent or nearby ancestor:

```typescript
// Acceptable - Parent directory import
import { theme } from '../theme';
import { formatCurrency } from '../../utils/currency';
```

Note: Try to limit to 1-2 levels of traversal. If you need more, consider absolute imports.

### Import Patterns to Avoid

#### Deep Relative Paths

Avoid deep relative paths with multiple levels of traversal:

```typescript
// Bad - Deep relative path
import { Chair } from '../../../../../lib/types/chairTypes';
```

#### Inconsistent Import Styles

Don't mix different import styles within the same file:

```typescript
// Bad - Mixing styles
import { Button } from '@/components/ui/Button';
import { formatPrice } from '../../utils/pricing';
```

#### Importing from Index Files

Prefer direct imports over index file imports for better performance and clarity:

```typescript
// Good - Direct import
import { Button } from '@/components/ui/Button';

// Less ideal - Index import
import { Button } from '@/components/ui';
```

### Import Organization

Organize imports in the following order, with a blank line between each group:

1. External dependencies (React, Next.js, etc.)
2. Internal absolute imports (using `@/` prefix)
3. Relative imports (local components and utilities)
4. Type imports (if separate)
5. CSS/SCSS imports

Example:

```typescript
// External dependencies
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Internal absolute imports
import { Button } from '@/components/ui/Button';
import { getProduct } from '@/lib/api/products';

// Relative imports
import { ProductProps } from './types';
import { formatProductName } from './utils';

// Type imports
import type { Variant } from '@/lib/types/productTypes';

// CSS imports
import styles from './Product.module.css';
```

### Type Imports

Use the `import type` syntax for type-only imports:

```typescript
// Good - Type imports
import type { Product } from '@/lib/types/productTypes';
import type { ChairVariant } from '@/lib/types/chairTypes';
```

## Common Issues and Solutions

### Import Path Issues

**Problem**: Multiple versions of files lead to confusing import paths and potential circular dependencies.

**Solution**:
- Maintain a single version of each file
- Use consistent import paths with '@/' prefix
- Avoid relative imports that can break when files are moved

### Code Duplication

**Problem**: Multiple file versions lead to duplicated code that's difficult to maintain.

**Solution**:
- Extract reusable code into shared utilities and components
- Follow DRY (Don't Repeat Yourself) principles
- Use composition to share functionality between components

### Inconsistent Implementations

**Problem**: Multiple file versions often lead to inconsistent implementations.

**Solution**:
- Maintain a single, canonical implementation
- Document the expected behavior and patterns
- Create shared interfaces and types

## Implementation Guidelines

### When Enhancing Files

1. **Backup Strategy**:
   - Commit current state to version control before making changes
   - Create a branch for significant changes
   - Avoid creating backup files in the codebase

2. **Enhancement Process**:
   - Make incremental changes to the existing file
   - Add appropriate comments to explain complex logic
   - Update or add JSDoc comments for functions and interfaces

3. **Testing Strategy**:
   - Test after each significant change
   - Ensure all functionality still works
   - Verify no regressions in related components

### When Refactoring

1. **Planning**:
   - Document the current behavior and expected outcome
   - Identify all files that will be affected
   - Create a sequence of small, manageable changes

2. **Implementation**:
   - Refactor one file at a time
   - Maintain backward compatibility when possible
   - Update imports in all affected files

3. **Verification**:
   - Test thoroughly after each step
   - Verify all paths through the code
   - Check for edge cases

## Director Series Example

The Director Series implementation demonstrated these principles by:

1. **Enhancing Existing Files**:
   - We enhanced the existing `index.ts` file directly with improved type safety and validation
   - We updated the `page.tsx` file in place rather than maintaining multiple versions
   - All enhancements maintained the same file structure and export patterns

2. **Removing Temporary Files**:
   - We removed temporary files like `index-fixed.ts` and `index-clean.ts`
   - We documented all changes in a separate markdown file rather than in code comments
   - We maintained a clean project structure without redundant files

3. **Maintaining Import Compatibility**:
   - We kept the same export structure to maintain compatibility with imports
   - We enhanced functionality without breaking existing code
   - We added proper typing to improve type safety without changing patterns

## Conclusion

Following these file consolidation best practices leads to:

- **Cleaner Codebase**: Fewer files with clear purposes
- **Easier Maintenance**: Single source of truth for each component
- **Fewer Bugs**: Reduced risk of importing incorrect versions
- **Better Collaboration**: Clear understanding of where code lives
- **Improved Performance**: No redundant code loading

Always strive to enhance existing files rather than creating new versions, and use version control to track changes rather than keeping multiple file copies.