# Module Interface Conventions

## Public API Design

### 1. Entry Points
```typescript
// index.ts serves as the public API
export * from './components';
export * from './services';
export * from './types';

// No direct exports of internal implementations
```

### 2. Service Interfaces
```typescript
// Service modules expose pure functions
export const ServiceName = {
  functionOne: (input: Input): Either<Error, Output> => ...,
  functionTwo: (input: Input): TaskEither<Error, Output> => ...,
};
```

### 3. Component Interfaces
```typescript
// Components use validated props
export interface ComponentProps {
  // Required props first
  required: string;
  // Optional props with clear types
  optional?: number;
  // Function props with explicit signatures
  onEvent: (data: EventData) => void;
}
```

## Module Boundaries

### 1. Input Validation
- All inputs validated with Zod
- Clear error types
- Runtime type checking
- Explicit null handling

### 2. Error Handling
- Either for sync operations
- TaskEither for async
- Pure error transformations
- Clear error messages

### 3. State Management
- Pure state updates
- Immutable data
- Clear update patterns
- Event-based communication