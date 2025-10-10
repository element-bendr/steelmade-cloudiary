import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { ValidationService, createSafeTransform } from '@modules/shared';
import type { ValidationError, Transform, ToMutable } from '@modules/shared';
import { RawProductSchema, type RawProduct } from '../validation/schemas';
import type { Product } from '../types';

const transformToProduct: Transform<RawProduct, Product> = (raw) => ({
  id: raw.id,
  title: raw.name,
  description: raw.description,
  images: raw.images.map(url => ({
    id: `img-${url.split('/').pop()}`,
    url,
    alt: raw.name
  })),
  variants: raw.variants?.map(variant => ({
    variantId: variant.id,
    variantName: variant.name,
    isDefault: variant.isDefault ?? false
  })),
  specifications: raw.attributes
});

const safeTransformToProduct = createSafeTransform(transformToProduct);

export const ProductService = {
  validateProduct: (product: unknown): E.Either<ValidationError, Product> =>
    pipe(
      ValidationService.validate(RawProductSchema)(product),
      E.chain(safeTransformToProduct)
    ),  validateProducts: (products: unknown[]): E.Either<ValidationError, Product[]> =>
    pipe(
      ValidationService.validateArray(RawProductSchema)(products),
      E.map(rawProducts => Array.from(rawProducts) as ToMutable<typeof rawProducts>),
      E.chain(rawProducts => 
        pipe(
          rawProducts,
          E.traverseArray(safeTransformToProduct),
          E.map(transformedProducts => Array.from(transformedProducts) as Product[])
        )
      )
    ),

  createProduct: (data: unknown): TE.TaskEither<ValidationError, Product> =>
    pipe(
      ProductService.validateProduct(data),
      TE.fromEither
    )
};