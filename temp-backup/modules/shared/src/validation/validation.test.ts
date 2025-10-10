import { describe, it, expect } from 'vitest';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { z } from 'zod';
import { ValidationService } from './service';
import { IDSchema } from './schemas';

describe('ValidationService', () => {
  const TestSchema = z.object({
    id: IDSchema,
    value: z.number().min(0)
  });

  it('should validate correct data', () => {
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

  it('should return validation error for invalid data', () => {
    const result = ValidationService.validate(TestSchema)({
      id: '',
      value: -1
    });

    expect(E.isLeft(result)).toBe(true);
    if (E.isLeft(result)) {
      expect(result.left.code).toBe('VALIDATION_ERROR');
    }
  });

  it('should validate arrays', () => {
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