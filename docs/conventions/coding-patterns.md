# Coding Conventions and Patterns

## Functional Patterns

### 1. Data Flow
```typescript
// Use pipe for sequential operations
pipe(
  initialData,
  validateWithSchema(schema),
  E.chain(processData),
  E.fold(handleError, handleSuccess)
)

// Use Either for error handling
const result: Either<Error, Data> = ...
```

### 2. Module Structure
```typescript
// Export only from index.ts
export * from './types';
export * from './services';

// Use named exports
export const ServiceName = { ... }
```

### 3. Type Safety
```typescript
// Use Zod for runtime validation
const schema = z.object({ ... })

// Use TypeScript for static typing
type ValidatedData = z.infer<typeof schema>
```

## Code Organization

### 1. File Structure
- types/index.ts - Type definitions
- services/ServiceName.ts - Business logic
- validation/schemas.ts - Zod schemas
- index.ts - Public API

### 2. Naming Conventions
- PascalCase for types and components
- camelCase for functions and variables
- kebab-case for files
- UPPER_CASE for constants

### 3. Documentation
- JSDoc for public APIs
- Markdown for module docs
- Clear type definitions
- Usage examples