export class ValidationError extends Error {
  constructor(
    message: string,
    public code: string = 'VALIDATION_ERROR',
    public field?: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}