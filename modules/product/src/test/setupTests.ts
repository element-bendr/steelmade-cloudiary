import { expect, afterEach } from 'vitest';
import * as E from 'fp-ts/Either';

// Custom matchers for fp-ts
expect.extend({
  toBeRight(received) {
    const pass = E.isRight(received);
    return {
      pass,
      message: () => `expected ${received} to be Right`
    };
  },
  toBeLeft(received) {
    const pass = E.isLeft(received);
    return {
      pass,
      message: () => `expected ${received} to be Left`
    };
  }
});

// Clean up after each test
afterEach(() => {
  // Clear any test data or mocks
});