# Product Module Integration Guide

## Module Integration

### 1. Installation

Add the module to your project:
```json
{
  "dependencies": {
    "@modules/product": "workspace:*"
  }
}
```

### 2. Configuration

Required environment variables:
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: API key for Cloudinary (optional)
- `CLOUDINARY_API_SECRET`: API secret (optional)

### 3. Module Boundaries

Data entering the module must be validated:
1. Use `ValidationService.validateProduct` for incoming data
2. Handle validation errors appropriately
3. Process validated data through module services

### 4. Error Handling

The module uses fp-ts for error handling:
- `Either` for synchronous operations
- `TaskEither` for asynchronous operations
- No thrown exceptions at module boundaries

### 5. Performance Considerations

- Use the built-in caching in ProductDataService
- Optimize images through CloudinaryImageService
- Batch operations when possible

### 6. Security

- Validate all input data at module boundaries
- Use proper error handling for failed operations
- Sanitize data before processing

## Migration Guide

### From Legacy Code

1. Replace direct data access with ProductDataService
2. Add validation at integration points
3. Update image handling to use CloudinaryImageService
4. Convert error handling to use Either/TaskEither