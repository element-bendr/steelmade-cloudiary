// Entry point for modular-furniture products
import workstationsSeries from './workstations';

export const modularFurniture: { [key: string]: typeof workstationsSeries } = {
  workstations: workstationsSeries,
};

export { workstationsSeries };
