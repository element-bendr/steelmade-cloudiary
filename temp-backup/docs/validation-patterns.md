# Module Validation Patterns

## Core Data Structures

### Product Module
```typescript
// Product schemas
ProductSchema
ProductImageSchema
ProductVariantSchema
ProductSeriesSchema

// Validation points
- Product creation/updates
- Image transformations
- Variant selection
```

### Cart Module
```typescript
// Cart schemas
CartSchema
CartItemSchema

// Validation points
- Item addition/removal
- Cart persistence
- Checkout process
```

### UI Module
```typescript
// Component schemas
ButtonPropsSchema
CardPropsSchema
InputPropsSchema
SelectPropsSchema

// Validation points
- Component props
- Event handlers
- User input
```

## Cross-Module Validation

### Data Flow Points
1. Product → Cart (adding items)
2. Cart → UI (rendering state)
3. UI → Product (user interactions)

### Error Handling
```typescript
// Pattern for validation errors
type ValidationError = {
  code: string;
  message: string;
  field?: string;
};

// Error response type
type ErrorResult = Either<ValidationError, never>;
```