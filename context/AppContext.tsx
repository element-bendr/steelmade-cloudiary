'use client'

import React, { createContext, useContext, ReactNode } from 'react';

// Define the shape of our context state
interface AppContextState {
  isLoading: boolean;
  error: string | null;
}

// Define initial state
const initialState: AppContextState = {
  isLoading: false,
  error: null
};

// Create the context with initial state
const AppContext = createContext<AppContextState>(initialState);

// Define props for our provider component
interface AppContextProviderProps {
  children: ReactNode;
  initialState?: Partial<AppContextState>;
}

/**
 * Application context provider component
 */
export const AppContextProvider: React.FC<AppContextProviderProps> = ({ 
  children, 
  initialState: providedState 
}) => {
  // Merge provided state with default initial state
  const contextValue = {
    ...initialState,
    ...providedState
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Hook to use the app context
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

export default AppContext;