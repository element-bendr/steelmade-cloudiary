# Ergonomic Series Registration Guide

## How to Add a New Ergonomic Chair

To ensure every new ergonomic chair appears in the UI and product catalog:

1. **Create the Chair Module**
   - Place the new chair's `index.ts` in `lib/data/products/chairs/ergonomic-series/<chair-id>/index.ts`.

2. **Import the Chair in the Series Index**
   - Open `lib/data/products/chairs/ergonomic-series/index.ts`.
   - Add an import at the top:
     ```ts
     import { newChair } from './<chair-id>/index';
     ```

3. **Register the Chair in the Products Object**
   - Add the chair to `ergonomicSeriesProducts`:
     ```ts
     [newChair.id]: newChair,
     ```

4. **Test**
   - Visit `/chairs/ergonomic-series` to confirm the new chair appears.

5. **Document the Change**
   - Add a note in `docs/architecture` and update `task-master-ai.json` as required.

---

> This process ensures all new ergonomic chairs are visible and discoverable. For automation, consider a script or convention-based dynamic import in the future.

#architecture #memory
