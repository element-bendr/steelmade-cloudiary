'use client';

import { useState, useEffect } from 'react';
import { StateStore } from './state-store';

/**
 * React hook to use a StateStore in a component
 * 
 * @param store The state store to use
 * @returns A tuple containing the current state and a setState function
 */
export function useStateStore<T>(store: StateStore<T>): [T, (update: Partial<T>) => void] {
  // Initialize with current store state
  const [state, setState] = useState<T>(store.getState());
  
  useEffect(() => {
    // Subscribe to store updates
    const unsubscribe = store.subscribe((newState) => {
      setState(newState);
    });
    
    // Unsubscribe when the component unmounts
    return unsubscribe;
  }, [store]);
  
  // Return the current state and a function to update it
  const updateState = (update: Partial<T>) => {
    store.setState(update);
  };
  
  return [state, updateState];
}

/**
 * React hook to use a selector function to extract specific values from a state store
 * This can help prevent unnecessary re-renders when only part of the state changes
 * 
 * @param store The state store to use
 * @param selector A function that extracts the needed value from the state
 * @returns The selected value from the state
 */
export function useStateSelector<T, R>(
  store: StateStore<T>, 
  selector: (state: T) => R
): R {
  // Initialize with current selected value
  const [selectedValue, setSelectedValue] = useState<R>(selector(store.getState()));
  
  useEffect(() => {
    // Subscribe to store updates, but only update when the selected value changes
    const unsubscribe = store.subscribe((newState) => {
      const newSelectedValue = selector(newState);
      
      // Only update if the selected value has changed
      // This is a simple equality check - for complex objects, you might want to use a deep equality check
      if (newSelectedValue !== selectedValue) {
        setSelectedValue(newSelectedValue);
      }
    });
    
    // Unsubscribe when the component unmounts
    return unsubscribe;
  }, [store, selector, selectedValue]);
  
  return selectedValue;
}