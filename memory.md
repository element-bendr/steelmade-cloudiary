## 2025-06-28: Director Series Canonical Refactor

- Refactored all Director Series chair data and UI to use the canonical `directorSeries.products` object.
- Removed all legacy/duplicate files and the runtime registry (`registerDirectorChair`).
- Updated listing and detail pages to use the canonical object for all lookups and rendering.
- All code is DRY, modular, declarative, and production-ready, following project standards and poetic principles.
- Documentation and onboarding updated to reference only the canonical pattern.
- Change tracked in `task-master-ai.json` and summarized in `architecture/` docs.

#director-series #canonical #drystandards #migration #production

# Memory Log

## 2024-06-22
- Added Venus & Vista chair to Visitor Series registry as a single modular entry with three variants (Venus Standard, Venus With Arms, Vista).
- Each variant includes a dedicated Cloudinary image.
- Registry and UI are fully DRY, declarative, and production-ready.
- Navigation menu updated to reflect the new Visitor Series entry.
- All changes documented in architecture and memory files.

## 2025-07-15
- Visitor Series refactored to use modular folder structure: each chair has its own folder and index.ts, registered in the main index.ts.
- This pattern matches Executive Series and is now required for every new visitor chair addition.
- Documentation updated to reflect this canonical approach.
- Modular folder/index.ts structure is now required for every chair product and every new series in the website.
- All series (Director, Executive, Ergonomic, Visitor, and future) must follow this pattern for maintainability and extensibility.
- Documentation updated to reflect this universal standard.
