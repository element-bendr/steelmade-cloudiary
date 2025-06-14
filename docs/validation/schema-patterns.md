# Validation Schema Patterns

## Core Schemas

### 1. Common Types
```typescript
IDSchema: string with min length 1
SlugSchema: lowercase alphanumeric with dashes
EmailSchema: valid email format
DateSchema: Date object
```

### 2. Product Schemas
```typescript
ProductCommonSchema:
  - id: IDSchema
  - slug: SlugSchema
  - name: non-empty string
  - description: string
  - createdAt: DateSchema
  - updatedAt: DateSchema
```

### 3. UI Schemas
```typescript
ComponentBaseSchema:
  - className?: string
  - disabled?: boolean
  - testId?: string
```

## Validation Patterns

### 1. Input Validation
```typescript
// Use schema.safeParse for validation
const result = schema.safeParse(input)
if (result.success) {
  // Handle valid data
}
```

### 2. Error Handling
```typescript
ValidationErrorSchema:
  - code: string
  - message: string
  - field?: string
```

### 3. Helper Functions
```typescript
createArraySchema<T>: Create array validator
createOptionalSchema<T>: Make schema optional