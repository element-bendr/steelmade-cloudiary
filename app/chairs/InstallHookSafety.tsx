'use client'

import { useEffect } from 'react';

/**
 * This component is a safety measure for the /chairs/installHook.js.map path
 * It prevents the TypeError related to Object.entries by adding a safe polyfill
 */
export default function InstallHookSafety() {
  useEffect(() => {
    // Add safety measure for Object.entries
    const originalEntries = Object.entries;
    
    // Override Object.entries with a safer version
    Object.entries = function safeEntries(obj: object | null | undefined): [string, any][] {
      if (obj === null || obj === undefined) {
        console.warn('Object.entries called with null/undefined, returning empty array');
        return [];
      }
      return originalEntries(obj);
    };
    
    return () => {
      // Restore original function when component unmounts
      Object.entries = originalEntries;
    };
  }, []);
  
  // This component doesn't render anything
  return null;
}