import { modularStorage } from "./modular-storage";
import { metalStorages } from "./metal-storages";

export const storage = {
  [modularStorage.id]: modularStorage,
  [metalStorages.id]: metalStorages
};