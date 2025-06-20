# Import Path Guidelines

## Overview

This document provides guidelines for using consistent import paths across the project to prevent issues with file resolution and ensure maintainability.

## Import Path Styles

### Preferred: Absolute Imports with Alias

Use absolute imports with the `@/` alias for all internal project imports:

```typescript
// Good - Absolute import with alias
import { Chair } from '@/lib/factories/chairFactory';
import { ChairCard } from '@/components/products/ChairCard';
```

This style:
- Works regardless of file location
- Is resilient to file moves
- Provides clear indication of file location
- Avoids path traversal complexity

### Acceptable: Same-Directory Imports

For files in the same directory, simple relative imports are acceptable:

```typescript
// Acceptable - Same directory import
import { sortChairs } from './utils';
```

### Avoid: Deep Relative Paths

Avoid using relative paths with multiple levels of traversal:

```typescript
// Bad - Deep relative path
import { Chair } from '../../../lib/factories/chairFactory';
```

These paths:
- Break when files are moved
- Are difficult to read and understand
- Create hidden dependencies
- Make refactoring harder

## Import Order

Organize imports in the following order:

1. External dependencies (React, Next.js, etc.)
2. Internal absolute imports (using `@/` prefix)
3. Relative imports (local components and utilities)
4. Type imports (if separate)
5. CSS/SCSS imports

Add a blank line between each group:

```typescript
// External dependencies
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Internal absolute imports
import { Chair } from '@/lib/factories/chairFactory';
import { ChairCard } from '@/components/products/ChairCard';

// Relative imports
import { sortChairs } from './utils';
import ChairDetails from './ChairDetails';

// CSS imports
import styles from './styles.module.css';
```

## Side-Effect Imports

Place side-effect imports (imports without a variable name) at the end of the import section:

```typescript
// Regular imports
import React from 'react';
import { Chair } from '@/lib/factories/chairFactory';

// Side-effect imports
import './styles.css';
```

## Type Imports

Use the `import type` syntax for type-only imports to improve build optimization:

```typescript
// Good - Type imports
import type { Chair } from '@/lib/factories/chairFactory';
import type { ChairProps } from '@/components/products/ChairCard';
```

## Barrel Exports

Use barrel exports (index.ts files that re-export from multiple files) to simplify imports:

```typescript
// lib/components/index.ts
export * from './ChairCard';
export * from './ChairDetails';
export * from './ChairList';

// Usage in other files
import { ChairCard, ChairDetails, ChairList } from '@/lib/components';
```

## Common Issues and Solutions

### Circular Dependencies

If you encounter circular dependency errors:

1. Identify the dependency cycle
2. Extract shared code to a separate file
3. Consider using dependency injection
4. Restructure components to break the cycle

### Module Not Found Errors

If you get "module not found" errors:

1. Check the import path for typos
2. Verify the file exists at the specified path
3. Check the tsconfig.json for proper path aliases
4. Ensure the file is being properly exported

### Import Consistency

To maintain import consistency:

1. Use an ESLint plugin to enforce import patterns
2. Set up automatic import sorting in your IDE
3. Review imports during code reviews
4. Use the prettier plugin for import sorting

## Implementation in the Project

All files in the project should follow these import guidelines. We've applied these principles in:

1. **Director Series Implementation**:
   - Consolidated all imports to use the `@/` prefix
   - Removed deep relative imports
   - Organized imports in the recommended order

2. **Component Library**:
   - Created barrel exports for component groups
   - Used type imports for props and interfaces
   - Maintained consistent import patterns

## Automated Tools

We recommend using the following tools to maintain import consistency:

1. **ESLint Rules**:
   - `eslint-plugin-import` for import ordering
   - `@typescript-eslint/consistent-type-imports` for type imports

2. **IDE Extensions**:
   - VSCode: "Import Cost" to see the size of imports
   - VSCode: "Import Sorter" to automatically sort imports

3. **Git Hooks**:
   - Add pre-commit hooks to check import consistency
   - Use lint-staged to check only changed files

## Conclusion

Following these import guidelines will help maintain a clean, consistent codebase that's easier to understand and refactor. Consistent import patterns reduce bugs related to file resolution and make the codebase more maintainable in the long term.