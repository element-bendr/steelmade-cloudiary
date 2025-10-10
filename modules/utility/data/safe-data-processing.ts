/**
 * Safe data processing utilities
 * These utilities provide safer ways to work with potentially null/undefined objects
 */

/**
 * Safely access object entries without throwing on null/undefined
 */
export function safeObjectEntries<T = any>(obj: Record<string, T> | null | undefined): [string, T][] {
  if (!obj) return [];
  try {
    return Object.entries(obj) as [string, T][];
  } catch (error) {
    console.error('Error in safeObjectEntries:', error);
    return [];
  }
}

/**
 * Safely access object values without throwing on null/undefined
 */
export function safeObjectValues<T = any>(obj: Record<string, T> | null | undefined): T[] {
  if (!obj) return [];
  try {
    return Object.values(obj) as T[];
  } catch (error) {
    console.error('Error in safeObjectValues:', error);
    return [];
  }
}

/**
 * Safely access object keys without throwing on null/undefined
 */
export function safeObjectKeys(obj: Record<string, any> | null | undefined): string[] {
  if (!obj) return [];
  try {
    return Object.keys(obj);
  } catch (error) {
    console.error('Error in safeObjectKeys:', error);
    return [];
  }
}

/**
 * Safely access an array without throwing on null/undefined
 */
export function safeArray<T = any>(arr: T[] | null | undefined): T[] {
  if (!arr) return [];
  try {
    return Array.isArray(arr) ? arr : [];
  } catch (error) {
    console.error('Error in safeArray:', error);
    return [];
  }
}

/**
 * Safely parse JSON without throwing
 */
export function safeJsonParse<T = any>(jsonString: string | null | undefined, defaultValue: T): T {
  if (!jsonString) return defaultValue;
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return defaultValue;
  }
}

/**
 * Safely stringify JSON without throwing
 */
export function safeJsonStringify(data: any, defaultValue: string = ''): string {
  try {
    return JSON.stringify(data);
  } catch (error) {
    console.error('Error stringifying JSON:', error);
    return defaultValue;
  }
}

/**
 * Safe string operations
 */
export const safeString = {
  /**
   * Ensure a value is a string, or return an empty string
   */
  ensure: (value: any): string => {
    if (value === null || value === undefined) return '';
    return String(value);
  },

  /**
   * Safely get a substring without throwing on invalid inputs
   */
  substring: (value: string | null | undefined, start: number, end?: number): string => {
    if (!value) return '';
    try {
      return value.substring(start, end);
    } catch (error) {
      console.error('Error in substring:', error);
      return '';
    }
  },

  /**
   * Safely trim a string without throwing on invalid inputs
   */
  trim: (value: string | null | undefined): string => {
    if (!value) return '';
    try {
      return value.trim();
    } catch (error) {
      console.error('Error in trim:', error);
      return '';
    }
  }
};