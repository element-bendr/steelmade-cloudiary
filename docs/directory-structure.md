# Directory Structure Guide

## Root Structure
```
steelmade-cloudiary-chairs/
├── modules/              # Core modules
├── apps/                # Applications
├── docs/               # Documentation
└── task-master-ai/    # Task management
```

## Module Structure
```
modules/{module-name}/
├── src/
│   ├── components/     # UI components
│   ├── services/      # Business logic
│   ├── validation/    # Zod schemas
│   ├── types/        # TypeScript types
│   └── index.ts      # Public API
├── tests/            # Test files
├── docs/            # Module docs
└── package.json    # Module config
```

## Conventions

### 1. Naming
- Modules: kebab-case
- Files: PascalCase for components
- Files: camelCase for utilities
- Types: PascalCase

### 2. Exports
- Use named exports
- Export types separately
- Centralize in index.ts
- Document public API

### 3. Documentation
- README.md per module
- API documentation
- Usage examples
- Type definitions