// Entry point for modular-furniture products
import workstationsSeries from './workstations';
import curveSeries from './workstations/curve-series';

// The canonical export for modular furniture should map series slugs to series data only.
export const modularFurniture = {
  workstations: workstationsSeries,
};

// Keep named exports for direct access to series data when needed.
export { workstationsSeries, curveSeries };
