# Layered Architecture

## Layer Structure

### 1. Core Layer
- Shared utilities
- Type definitions
- Validation services
- Error handling

### 2. Domain Layer
- Product logic
- Cart management
- Image processing
- Business rules

### 3. UI Layer
- Components
- Pages
- Layouts
- Styling

## Layer Dependencies

```
UI Layer
   ↓
Domain Layer
   ↓
Core Layer
```

## Layer Guidelines

### 1. Core Layer
- Pure functions only
- No external dependencies
- Shared types
- Base utilities

### 2. Domain Layer
- Business logic
- State management
- Data validation
- Service integration

### 3. UI Layer
- Presentation logic
- User interactions
- Layout management
- Styling systems