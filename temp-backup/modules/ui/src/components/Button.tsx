import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { ButtonProps, ButtonPropsSchema } from '../types';
import { clsx } from 'clsx';

const variantStyles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

const getButtonStyles = ({ variant = 'primary', size = 'md', intent = 'default', disabled, loading }: ButtonProps) =>
  clsx(
    'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    variantStyles[variant],
    sizeStyles[size],
    disabled && 'opacity-50 cursor-not-allowed',
    loading && 'relative !text-transparent'
  );

export const Button = (props: ButtonProps) => pipe(
  props,
  ButtonPropsSchema.safeParse,
  O.fromPredicate((result): result is { success: true; data: ButtonProps } => result.success),
  O.map(result => result.data),
  O.fold(
    () => null,
    (validProps) => (
      <button
        className={getButtonStyles(validProps)}
        onClick={validProps.onClick}
        disabled={validProps.disabled || validProps.loading}
      >
        {validProps.loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
          </div>
        )}
        {validProps.label}
      </button>
    )
  )
);