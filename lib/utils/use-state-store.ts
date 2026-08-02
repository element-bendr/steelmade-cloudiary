'use client'

import { useState, useEffect } from 'react';
import { StateStore } from './state-store';

/**
 * Custom hook to use a StateStore in React components
 */
export function useStateStore<T>(store: StateStore<T>): [T, (newState: Partial<T>) => void] {
  // Initialize state with current store value
  const [state, setState] = useState<T>(store.getState());
  
  useEffect(() => {
    // Subscribe to store updates
    const unsubscribe = store.subscribe((newState) => {
      setState(newState);
    });
    
    // Unsubscribe on cleanup
    return unsubscribe;
  }, [store]);
  
  // Return current state and a setter function
  const setPartialState = (newState: Partial<T>) => {
    store.setState(newState);
  };
  
  return [state, setPartialState];
}