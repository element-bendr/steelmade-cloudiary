Modular Furniture Index Update

Summary:

- Modified `lib/data/products/modular-furniture/index.ts` to ensure the `modularFurniture` export only maps series slugs to `ProductSeries` objects.
- Removed the direct `curveSeries` property from the default mapping. The named export `curveSeries` remains available.

Rationale:

- Individual workstation products live under `workstationsSeries.products`. Including `curveSeries` directly in the mapping created duplication and inconsistent data shape for consumers.

Files changed:

- lib/data/products/modular-furniture/index.ts

Follow-up:

- This change is part of a broader remediation to normalize workstation data and re-enable the modular-furniture routes.
