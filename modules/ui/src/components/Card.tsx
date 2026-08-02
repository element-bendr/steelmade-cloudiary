import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { CardProps, CardPropsSchema } from '../types';
import { clsx } from 'clsx';

const variantStyles = {
  primary: 'bg-white shadow-lg',
  secondary: 'bg-gray-50 shadow-md',
  outline: 'border border-gray-200'
};

const sizeStyles = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6'
};

const getCardStyles = ({ variant = 'primary', size = 'md', className }: CardProps) =>
  clsx(
    'rounded-lg',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

const validateProps = (props: CardProps): E.Either<Error, CardProps> =>
  pipe(
    props,
    (p) => CardPropsSchema.safeParse(p),
    (result) => result.success
      ? E.right(result.data)
      : E.left(new Error('Invalid card props'))
  );

export const Card = (props: CardProps) =>
  pipe(
    props,
    validateProps,
    E.fold(
      () => null,
      (validProps) => (
        <div className={getCardStyles(validProps)}>
          {validProps.title && (
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {validProps.title}
            </h3>
          )}
          {validProps.children}
        </div>
      )
    )
  );