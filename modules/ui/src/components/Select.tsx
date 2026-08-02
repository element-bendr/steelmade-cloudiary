import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { z } from 'zod';
import { clsx } from 'clsx';
import { ComponentVariant } from '../types';

const SelectOptionSchema = z.object({
  value: z.string(),
  label: z.string()
});

const SelectPropsSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
  onChange: z.function().args(z.string()).returns(z.void()),
  options: z.array(SelectOptionSchema),
  label: z.string().optional(),
  error: z.string().optional(),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  disabled: z.boolean().optional(),
  variant: z.enum(['primary', 'secondary', 'outline']).optional(),
  size: z.enum(['sm', 'md', 'lg']).optional()
});

type SelectProps = z.infer<typeof SelectPropsSchema>;

const sizeStyles = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg'
};

const variantStyles = {
  primary: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
  secondary: 'border-gray-200 focus:border-gray-500 focus:ring-gray-500',
  outline: 'border-transparent bg-gray-100 focus:bg-white focus:border-blue-500'
};

const getSelectStyles = ({ size = 'md', variant = 'primary', error, disabled }: SelectProps & ComponentVariant) =>
  clsx(
    'block w-full rounded-md border shadow-sm transition-colors appearance-none',
    'focus:outline-none focus:ring-1',
    'pr-8 bg-no-repeat bg-right',
    sizeStyles[size],
    variantStyles[variant],
    error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
    disabled && 'bg-gray-50 text-gray-500 cursor-not-allowed'
  );

export const Select = (props: SelectProps) =>
  pipe(
    props,
    SelectPropsSchema.safeParse,
    (result) => result.success
      ? (
        <div className="w-full">
          {props.label && (
            <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
              {props.label}
              {props.required && <span className="text-red-500">*</span>}
            </label>
          )}
          <div className="relative">
            <select
              id={props.id}
              name={props.name}
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
              disabled={props.disabled}
              required={props.required}
              className={getSelectStyles(props)}
            >
              {props.placeholder && (
                <option value="" disabled>{props.placeholder}</option>
              )}
              {props.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {props.error && (
            <p className="mt-1 text-sm text-red-500">{props.error}</p>
          )}
        </div>
      )
      : null
  );