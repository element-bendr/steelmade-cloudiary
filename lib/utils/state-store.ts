/**
 * This file provides state management utilities without using React's createContext
 * which is causing errors in the server components
 */

// Simple state store implementation
export class StateStore<T> {
  private state: T;
  private listeners: ((state: T) => void)[] = [];

  constructor(initialState: T) {
    this.state = initialState;
  }

  // Get current state
  getState(): T {
    return this.state;
  }

  // Update state
  setState(newState: Partial<T>): void {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }

  // Subscribe to state changes
  subscribe(listener: (state: T) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners of state change
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.state));
  }
}

// Product store state type
export interface ProductStoreState {
  selectedProductId: string | null;
  selectedVariantId: string | null;
  isLoading: boolean;
  error: string | null;
}

// Create singleton product store
const initialProductState: ProductStoreState = {
  selectedProductId: null,
  selectedVariantId: null,
  isLoading: false,
  error: null
};

// Export singleton instance
export const productStore = new StateStore<ProductStoreState>(initialProductState);

// Helper functions for common operations
export const productStoreActions = {
  selectProduct: (productId: string) => {
    productStore.setState({ 
      selectedProductId: productId,
      selectedVariantId: null // Reset variant when product changes
    });
  },
  
  selectVariant: (variantId: string) => {
    productStore.setState({ selectedVariantId: variantId });
  },
  
  setLoading: (isLoading: boolean) => {
    productStore.setState({ isLoading });
  },
  
  setError: (error: string | null) => {
    productStore.setState({ error });
  }
};

// App store state type
export interface AppStoreState {
  isAppLoading: boolean;
  appError: string | null;
  isDarkMode: boolean;
}

// Create singleton app store
const initialAppState: AppStoreState = {
  isAppLoading: false,
  appError: null,
  isDarkMode: false
};

// Export singleton instance
export const appStore = new StateStore<AppStoreState>(initialAppState);

// Helper functions for common operations
export const appStoreActions = {
  setLoading: (isAppLoading: boolean) => {
    appStore.setState({ isAppLoading });
  },
  
  setError: (appError: string | null) => {
    appStore.setState({ appError });
  },
  
  toggleDarkMode: () => {
    const currentState = appStore.getState();
    appStore.setState({ isDarkMode: !currentState.isDarkMode });
  }
};