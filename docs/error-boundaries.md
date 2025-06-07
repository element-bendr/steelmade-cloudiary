# Error Boundary Usage Guide

## Overview
This guide explains how to properly use error boundaries with client-side components in Next.js, particularly when dealing with React hooks.

## Key Components

### ClientErrorBoundary
Located in `components/error-boundary/client-error-boundary.tsx`, this is our main error boundary component that should be used to wrap any client components that use hooks.

```tsx
import { ErrorBoundaryWrapper } from '@/components/error-boundary/client-error-boundary';

function MyClientComponent() {
  // Your component code
}

export function ProtectedMyClientComponent() {
  return (
    <ErrorBoundaryWrapper>
      <MyClientComponent />
    </ErrorBoundaryWrapper>
  );
}
```

## When to Use Error Boundaries

1. **Client Components Using Hooks**
   - Any component using `useState`, `useEffect`, `useContext`, etc.
   - Components using Next.js hooks like `usePathname`, `useRouter`
   - Components that handle user interactions and state

2. **Collection Components**
   - CollectionsGrid and related components
   - Components that manage collection state and updates

3. **Navigation Components**
   - Header and navigation menus
   - Any component using route-based hooks

## Implementation Pattern

1. Create your base component with hooks
2. Create a protected version that wraps it with ErrorBoundaryWrapper
3. Use the protected version in your application
4. Mark both files as "use client"

Example:
```tsx
// my-component.tsx
"use client"
export function MyComponent() {
  const [state, setState] = useState();
  // Component logic
}

// protected-my-component.tsx
"use client"
import { MyComponent } from './my-component';
import { ErrorBoundaryWrapper } from '@/components/error-boundary/client-error-boundary';

export function ProtectedMyComponent() {
  return (
    <ErrorBoundaryWrapper>
      <MyComponent />
    </ErrorBoundaryWrapper>
  );
}
```

## Error Handling Best Practices

1. Always use the "use client" directive in components with hooks
2. Keep error boundary components close to where they're needed
3. Use appropriate error messages and recovery actions
4. Consider fallback UI for different error states

## Testing

When testing components with error boundaries:
1. Test happy path functionality
2. Test error scenarios
3. Verify error recovery
4. Check error boundary reset behavior

## Common Issues

1. "Invalid hook call" errors
   - Solution: Ensure component is marked as "use client"
   - Verify component is wrapped with ErrorBoundaryWrapper

2. Missing error boundaries
   - Solution: Use protected versions of components
   - Follow the implementation pattern above

## Future Development

When creating new components:
1. Consider if hooks are needed
2. Create protected versions if using hooks
3. Document error handling behavior
4. Add appropriate tests
