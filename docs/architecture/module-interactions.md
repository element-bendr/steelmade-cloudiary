# Module Interactions

## Data Flow Patterns

### 1. Product → Image
```typescript
// Product module requests image optimization
pipe(
  productImage,
  ImageModule.optimize,
  E.map(UI.Image.render)
)
```

### 2. Cart → Product
```typescript
// Cart module fetches product details
pipe(
  cartItem.productId,
  ProductModule.getProduct,
  TE.map(Cart.addItem)
)
```

### 3. UI → Cart
```typescript
// UI triggers cart updates
pipe(
  userAction,
  UI.Button.handleClick,
  E.chain(Cart.processAction)
)
```

## State Management

### 1. Local State
- Each module manages internal state
- Pure state updates only
- No shared mutable state

### 2. Cross-Module State
- Event-based communication
- Functional state updates
- Immutable data flow

### 3. Error Handling
- Each boundary handles errors
- Clear error propagation
- Type-safe error handling