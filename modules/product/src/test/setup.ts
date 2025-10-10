import { expect } from 'vitest';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';

declare module 'vitest' {
  interface Assertion<T = any> {
    toBeRight(): void;
    toBeLeft(): void;
    toBeSome(): void;
    toBeNone(): void;
  }
}

expect.extend({
  toBeRight(received: E.Either<unknown, unknown>) {
    return {
      pass: E.isRight(received),
      message: () => `expected ${this.utils.printReceived(received)} to be Right`
    };
  },
  toBeLeft(received: E.Either<unknown, unknown>) {
    return {
      pass: E.isLeft(received),
      message: () => `expected ${this.utils.printReceived(received)} to be Left`
    };
  },
  toBeSome(received: O.Option<unknown>) {
    return {
      pass: O.isSome(received),
      message: () => `expected ${this.utils.printReceived(received)} to be Some`
    };
  },
  toBeNone(received: O.Option<unknown>) {
    return {
      pass: O.isNone(received),
      message: () => `expected ${this.utils.printReceived(received)} to be None`
    };
  }
});