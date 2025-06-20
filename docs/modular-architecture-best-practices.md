# Modular Architecture Best Practices

This document outlines best practices for working with our modular architecture, based on lessons learned from implementation challenges.

## Module Structure and Organization

### Module Directory Structure

Each module should follow this consistent structure:

```
/modules/[module-name]/
├── components/        # React components specific to this module
├── services/          # Business logic and data access
├── types/             # TypeScript interfaces and type definitions
├── utils/             # Helper functions
├── hooks/             # React hooks
├── constants/         # Constants and configuration
├── index.ts           # Public module API / exports
└── README.md          # Module documentation
```

### Module Boundaries

1. **Clear Public API**
   - Export only what's needed through the module's `index.ts`
   - Use explicit named exports rather than default exports
   - Document the public API in the module's README.md

2. **Type Safety at Boundaries**
   - Define strong types for all inputs and outputs
   - Use Zod schemas to validate data crossing module boundaries
   - Export types needed by other modules

3. **Error Handling**
   - Handle errors within the module when possible
   - Provide clear error messages when propagating errors
   - Use consistent error patterns (Either, Result, etc.)

## Module Implementation Patterns

### Service Implementation

1. **Singleton Pattern**
   ```typescript
   // RECOMMENDED
   class ProductServiceImpl {
     private static instance: ProductServiceImpl;
     
     private constructor() {
       // Private constructor
     }
     
     public static getInstance(): ProductServiceImpl {
       if (!ProductServiceImpl.instance) {
         ProductServiceImpl.instance = new ProductServiceImpl();
       }
       return ProductServiceImpl.instance;
     }
     
     // Service methods
   }
   
   export const ProductService = ProductServiceImpl.getInstance();
   ```

2. **Object Literal Pattern**
   ```typescript
   // ALTERNATIVE
   export const ProductService = {
     getProductById: async (id: string): Promise<Product | null> => {
       // Implementation
     },
     
     getProductsByCategory: async (category: string): Promise<Product[]> => {
       // Implementation
     },
     
     // Other methods
   };
   ```

### Client/Server Component Separation

1. **Mark Client Components**
   - Add `'use client';` at the top of any component using React hooks
   - Keep the directive at the top level of the file, not in nested components
   - Document which components are client vs. server components

2. **Dynamic Imports in Client Components**
   ```typescript
   // In client components
   import { useState, useEffect } from 'react';
   
   export default function ClientComponent() {
     const [data, setData] = useState(null);
     
     useEffect(() => {
       async function loadData() {
         const { SomeService } = await import('@/modules/some-module/services');
         const result = await SomeService.getData();
         setData(result);
       }
       
       loadData();
     }, []);
     
     // Component implementation
   }
   ```

3. **Server Component Data Fetching**
   ```typescript
   // In server components (no 'use client' directive)
   import { SomeService } from '@/modules/some-module/services';
   
   export default async function ServerComponent() {
     // Direct data fetching in server component
     const data = await SomeService.getData();
     
     // Pass data to client components as props
     return <ClientComponent initialData={data} />;
   }
   ```

## Common Pitfalls and Solutions

### Module Import Issues

1. **Path Aliasing Consistency**
   - Use consistent path aliases (e.g., `@/modules/...`)
   - Ensure `tsconfig.json` and `jsconfig.json` have matching path configurations
   - Verify Next.js config includes the same paths

2. **Default vs. Named Exports**
   - Prefer named exports for consistency
   - When using default exports, ensure consistent import naming

3. **Barrel File Management**
   - Be careful with circular dependencies in barrel files
   - Consider using selective re-exports instead of wildcard exports

### State Management

1. **Module-Level State**
   - Use appropriate patterns for module-level state (Context, Zustand, etc.)
   - Document how state is shared between components
   - Consider where state should live (module vs. component)

2. **Server/Client State Synchronization**
   - Use hydration-safe patterns
   - Pass initial state from server to client components
   - Document revalidation strategies

## Testing Modular Architecture

1. **Unit Testing Services**
   - Test each service in isolation
   - Mock dependencies appropriately
   - Test error conditions thoroughly

2. **Integration Testing**
   - Test module boundaries
   - Verify correct interaction between modules
   - Test the public API of each module

3. **Component Testing**
   - Test components with realistic props
   - Mock service calls consistently
   - Test loading and error states

## Module Documentation

Each module should include documentation that covers:

1. **Purpose and Responsibilities**
   - What the module does
   - What it's responsible for
   - What it's not responsible for

2. **Public API**
   - What the module exports
   - How to use the exports
   - Examples of common usage patterns

3. **Dependencies**
   - Which other modules it depends on
   - External dependencies
   - How to mock dependencies for testing

4. **Internal Structure**
   - Key components and services
   - How they interact
   - State management approach

By following these best practices, we can build a more maintainable and robust modular architecture that avoids common pitfalls and makes development more predictable.