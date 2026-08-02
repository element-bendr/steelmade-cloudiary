import { describe, it, expect } from 'vitest';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { z } from 'zod';
import { ValidationService } from './service';
import { IDSchema } from './schemas';

describe('[unit][shared][validation] ValidationService', () => {
  const TestSchema = z.object({
    id: IDSchema,
    value: z.number().min(0)
  });

  it('[schema] validates correct object payload', () => {
    const result = ValidationService.validate(TestSchema)({
      id: 'test-id',
      value: 42
    });

    expect(E.isRight(result)).toBe(true);
    if (E.isRight(result)) {
      expect(result.right).toEqual({
        id: 'test-id',
        value: 42
      });
    }
  });

  it('[schema] returns validation error for invalid object payload', () => {
    const result = ValidationService.validate(TestSchema)({
      id: '',
      value: -1
    });

    expect(E.isLeft(result)).toBe(true);
    if (E.isLeft(result)) {
      expect(result.left.code).toBe('VALIDATION_ERROR');
    }
  });

  it('[schema] validates arrays of typed objects', () => {
    const result = ValidationService.validateArray(TestSchema)([
      { id: 'id-1', value: 1 },
      { id: 'id-2', value: 2 }
    ]);

    expect(E.isRight(result)).toBe(true);
    if (E.isRight(result)) {
      expect(result.right).toHaveLength(2);
    }
  });
});