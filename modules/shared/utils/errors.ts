/**
 * Shared utilities for error handling across modules
 */

/**
 * Standard error type for all modules
 */
export interface ServiceError {
  code: string;
  message: string;
  details?: unknown;
}

/**
 * Create a standardized service error
 */
export function createServiceError(
  code: string,
  message: string,
  details?: unknown
): ServiceError {
  return {
    code,
    message,
    details
  };
}

/**
 * Check if an error is a ServiceError
 */
export function isServiceError(error: unknown): error is ServiceError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error
  );
}

/**
 * Convert any error to a ServiceError
 */
export function toServiceError(error: unknown): ServiceError {
  if (isServiceError(error)) {
    return error;
  }

  const message = error instanceof Error ? error.message : String(error);
  
  return createServiceError(
    'UNKNOWN_ERROR',
    message,
    error
  );
}

/**
 * Safely access a property from an object that might be undefined
 */
export function safeGet<T, K extends keyof T>(obj: T | undefined | null, key: K): T[K] | undefined {
  if (obj == null) {
    return undefined;
  }
  return obj[key];
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Delay execution for specified milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (e) {
    return fallback;
  }
}

/**
 * Try to execute a function and return the result or fallback on error
 */
export function tryCatch<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch (e) {
    return fallback;
  }
}

/**
 * Log error with consistent format
 */
export function logError(error: unknown, context?: string): void {
  const serviceError = toServiceError(error);
  console.error(
    `[ERROR]${context ? ` [${context}]` : ''} ${serviceError.code}: ${serviceError.message}`,
    serviceError.details || ''
  );
}

/**
 * Create a retry function with exponential backoff
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: { maxRetries?: number; baseDelay?: number } = {}
): Promise<T> {
  const { maxRetries = 3, baseDelay = 300 } = options;
  
  let lastError: unknown;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Exponential backoff
      const delayMs = baseDelay * Math.pow(2, attempt);
      await delay(delayMs);
    }
  }
  
  throw lastError;
}