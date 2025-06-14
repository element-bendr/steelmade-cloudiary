/**
 * Collection Error Types and Constants
 */

export enum CollectionErrorType {
  NOT_FOUND = "NOT_FOUND",
  INVALID_TYPE = "INVALID_TYPE",
  FETCH_ERROR = "FETCH_ERROR",
  CACHE_ERROR = "CACHE_ERROR",
  FILTER_ERROR = "FILTER_ERROR"
}

export class CollectionError extends Error {
  constructor(
    public type: CollectionErrorType,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = "CollectionError";
  }
}

export const CollectionErrorMessages = {
  [CollectionErrorType.NOT_FOUND]: (id: string) => `Collection '${id}' not found`,
  [CollectionErrorType.INVALID_TYPE]: (type: string) => `Invalid product type '${type}'`,
  [CollectionErrorType.FETCH_ERROR]: (id: string) => `Error fetching collection '${id}'`,
  [CollectionErrorType.CACHE_ERROR]: (type: string) => `Error managing cache for type '${type}'`,
  [CollectionErrorType.FILTER_ERROR]: (type: string) => `Error computing filters for type '${type}'`
} as const;

export function createCollectionError(
  type: CollectionErrorType,
  id: string,
  details?: any
): CollectionError {
  return new CollectionError(
    type,
    CollectionErrorMessages[type](id),
    details
  );
}
