import { ValidationService } from '@modules/shared';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import { z } from 'zod';

export const ProductVariantSchema = z.object({
  id: z.string(),
  productId: z.string(),
  name: z.string(),
  sku: z.string(),
  price: z.number().positive(),
  attributes: z.record(z.string())
});

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  images: z.array(z.string()),
  variants: z.array(ProductVariantSchema),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductVariant = z.infer<typeof ProductVariantSchema>;

export const ProductValidation = {
  validateProduct: (data: unknown): E.Either<Error, Product> =>
    pipe(
      ValidationService.validate(ProductSchema)(data),
      E.mapLeft(validationError => new Error(validationError.message))
    ),

  validateVariant: (data: unknown): E.Either<Error, ProductVariant> =>
    pipe(
      ValidationService.validate(ProductVariantSchema)(data),
      E.mapLeft(validationError => new Error(validationError.message))
    ),

  validateProducts: (data: unknown[]): E.Either<Error, Product[]> =>
    pipe(
      ValidationService.validateArray(ProductSchema)(data),
      E.mapLeft(validationError => new Error(validationError.message)),
      E.map(products => Array.from(products) as Product[])
    )
};