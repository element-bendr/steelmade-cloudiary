import { Product } from '../types';
import { validateProduct } from '../validation';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import * as TE from 'fp-ts/TaskEither';

type ProductCache = Map<string, Product>;

const createCache = (): ProductCache => new Map();

const getFromCache = (cache: ProductCache, id: string): O.Option<Product> =>
  pipe(
    id,
    (id) => cache.get(id),
    O.fromNullable
  );

const setInCache = (cache: ProductCache, id: string, product: Product): Product => {
  cache.set(id, product);
  return product;
};

/**
 * Service for managing product data with functional patterns and caching
 */
export const ProductDataService = {
  cache: createCache(),

  /**
   * Fetches a product by ID, using cache when available
   */
  getProductById: (id: string): TE.TaskEither<Error, Product> =>
    pipe(
      getFromCache(ProductDataService.cache, id),
      O.fold(
        // Cache miss - fetch and validate
        () => TE.tryCatch(
          async () => {
            // TODO: Replace with actual API call
            const product = {} as Product;
            const validated = validateProduct(product);
            return setInCache(ProductDataService.cache, id, validated);
          },
          (error) => new Error(`Failed to fetch product ${id}: ${error}`)
        ),
        // Cache hit
        (product) => TE.right(product)
      )
    ),

  /**
   * Clears the product cache
   */
  clearCache: () => {
    ProductDataService.cache.clear();
  }
};