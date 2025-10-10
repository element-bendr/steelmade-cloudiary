# Director Series Canonical Pattern Migration (June 2025)

## Tasks

- [x] Audit and summarize legacy and canonical data structure for director series chairs
- [x] Mark all legacy/duplicate files as safe to delete
- [x] Update `lib/data/products/chairs/director-series/index.ts` to export a single canonical `directorSeries` object
- [x] Confirm all canonical chair data files exist in their own folders as `index.ts`
- [x] Document plan for standardizing director series structure
- [x] Confirm director series page and dynamic detail page exist and are ready for update
- [x] Extract best practices from executive series and documentation
- [x] Refactor dynamic detail page to use canonical `directorSeries.products` object
- [x] Refactor listing page to use `Object.values(directorSeries.products)`
- [x] Remove all references to runtime registry and legacy lookup code
- [x] Update documentation to reflect new structure and usage
- [x] Test all pages for correct data loading and UI
- [x] Add/mark tasks in `task-master-ai.json` as per production instructions

## Status

All tasks for the director series canonical migration and UI refactor are now complete. All code is DRY, modular, declarative, and production-ready. No legacy registry or lookup code remains. Documentation and task tracking are up to date.
