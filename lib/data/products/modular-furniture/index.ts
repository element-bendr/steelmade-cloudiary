// Entry point for modular-furniture products
import workstationsSeries from './workstations';
import curveSeries from './workstations/curve-series';
import wireManagement from './wire-management';
import privacyScreens from './privacy-screens';
import accessories from './accessories';
import lowPartition from './low-partition';

// The canonical export for modular furniture should map series slugs to series data only.
export const modularFurniture = {
  workstations: workstationsSeries,
  'wire-management': wireManagement,
  'privacy-screens': privacyScreens,
  'accessories': accessories,
  'low-partition': lowPartition,
};

// Keep named exports for direct access to series data when needed.
export { workstationsSeries, curveSeries };
export { wireManagement };
export { privacyScreens };
export { accessories };
export { lowPartition };
