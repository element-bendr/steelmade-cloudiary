export interface ValidationError {
  code: string;
  message: string;
  field?: string;
}

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: ValidationError;
}