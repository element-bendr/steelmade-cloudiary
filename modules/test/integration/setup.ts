import { beforeEach } from 'vitest';
import { CartService, CartStorageService } from '@modules/cart';
import { ValidationService } from '@modules/shared';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';

export const clearTestData = () => {
  localStorage.clear();
};

beforeEach(() => {
  clearTestData();
});