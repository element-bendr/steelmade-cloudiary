import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import type { ValidationError } from './types';

export const ValidationErrorHandling = {
  toUserMessage: (error: ValidationError): string =>
    error.field
      ? `Invalid ${error.field}: ${error.message}`
      : error.message,

  isFieldError: (error: ValidationError, field: string): boolean =>
    error.field === field,

  getFieldErrors: (errors: ValidationError[], field: string): ValidationError[] =>
    errors.filter(error => ValidationErrorHandling.isFieldError(error, field)),

  combineErrors: (errors: ValidationError[]): ValidationError => ({
    code: 'MULTIPLE_VALIDATION_ERRORS',
    message: errors.map(e => e.message).join('; '),
    field: errors[0]?.field
  }),

  handleValidationResult: <T>(
    result: E.Either<ValidationError, T>,
    onSuccess: (data: T) => void,
    onError: (error: ValidationError) => void
  ): void => {
    pipe(
      result,
      E.fold(onError, onSuccess)
    );
  }
};