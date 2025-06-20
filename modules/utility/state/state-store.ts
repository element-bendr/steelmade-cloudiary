/**
 * Simple state store implementation
 * This provides a type-safe way to manage state without relying on React context
 */

// Listener type for state changes
type Listener<T> = (state: T) => void;

/**
 * A simple state store that can be used to manage state
 * without relying on React context API.
 */
export class StateStore<T> {
  private state: T;
  private listeners: Listener<T>[] = [];

  /**
   * Create a new state store with initial state
   */
  constructor(initialState: T) {
    this.state = initialState;
  }

  /**
   * Get the current state value
   */
  getState(): T {
    return this.state;
  }

  /**
   * Update the state with a partial update
   */
  setState(partialState: Partial<T>): void {
    // Create a new state object with the updated values
    this.state = { ...this.state, ...partialState };
    
    // Notify all listeners
    this.notifyListeners();
  }

  /**
   * Set the entire state at once (replacing the previous state)
   */
  replaceState(newState: T): void {
    this.state = newState;
    this.notifyListeners();
  }

  /**
   * Subscribe to state changes
   * Returns an unsubscribe function
   */
  subscribe(listener: Listener<T>): () => void {
    this.listeners.push(listener);
    
    // Return an unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Reset the state to the initial value
   */
  reset(initialState: T): void {
    this.state = initialState;
    this.notifyListeners();
  }

  /**
   * Notify all listeners of state change
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.state);
      } catch (error) {
        console.error('Error in state listener:', error);
      }
    });
  }
}

/**
 * Create a new state store with the given initial state
 */
export function createStore<T>(initialState: T): StateStore<T> {
  return new StateStore<T>(initialState);
}