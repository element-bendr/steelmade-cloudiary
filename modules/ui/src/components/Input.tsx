import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { z } from 'zod';
import { clsx } from 'clsx';
import { ComponentVariant } from '../types';

const InputPropsSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
  onChange: z.function().args(z.string()).returns(z.void()),
  label: z.string().optional(),
  error: z.string().optional(),
  placeholder: z.string().optional(),
  type: z.enum(['text', 'email', 'password', 'number']).default('text'),
  required: z.boolean().optional(),
  disabled: z.boolean().optional(),
  variant: z.enum(['primary', 'secondary', 'outline']).optional(),
  size: z.enum(['sm', 'md', 'lg']).optional()
});

type InputProps = z.infer<typeof InputPropsSchema>;

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

const getInputStyles = ({ size = 'md', variant = 'primary', error, disabled }: InputProps & ComponentVariant) =>
  clsx(
    'block w-full rounded-md border shadow-sm transition-colors',
    'focus:outline-none focus:ring-1',
    sizeStyles[size],
    variantStyles[variant],
    error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
    disabled && 'bg-gray-50 text-gray-500 cursor-not-allowed'
  );

export const Input = (props: InputProps) =>
  pipe(
    props,
    InputPropsSchema.safeParse,
    (result) => result.success
      ? (
        <div className="w-full">
          {props.label && (
            <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
              {props.label}
              {props.required && <span className="text-red-500">*</span>}
            </label>
          )}
          <input
            id={props.id}
            name={props.name}
            type={props.type}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            disabled={props.disabled}
            placeholder={props.placeholder}
            required={props.required}
            className={getInputStyles(props)}
          />
          {props.error && (
            <p className="mt-1 text-sm text-red-500">{props.error}</p>
          )}
        </div>
      )
      : null
  );