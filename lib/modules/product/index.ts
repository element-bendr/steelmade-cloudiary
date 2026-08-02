import { ProductRepository } from './repository';
import { ModularProductRepository } from './modular-repository';
import { LegacyProductRepository } from './legacy-repository';
import { SanityProductRepository } from './sanity-repository';
import { ProductNotFoundError, SeriesNotFoundError, CategoryNotFoundError } from './repository';
import { productModuleConfig } from './config';
import { ProductCategorySlug } from '../../../types/product-categories';

// Create the appropriate repository based on configuration
let repository: ProductRepository;

// USE SANITY FOR NOW!
// Later this can be toggleable via environment variables.
repository = new SanityProductRepository();

/* Keep old logic preserved in comments
if (productModuleConfig.features.disableLegacySystem || productModuleConfig.features.fullModularMode) {
  repository = new ModularProductRepository();
} else {
  repository = new LegacyProductRepository();
}
*/

export async function getProductById(category: ProductCategorySlug, seriesId: string, productId: string) {
  return repository.getProductById(category, seriesId, productId);
}

export async function getProduct(category: ProductCategorySlug, seriesId: string, productId: string) {
  return getProductById(category, seriesId, productId);
}

export async function getProductsBySeries(seriesId: string, category: ProductCategorySlug) {
  return repository.getProductsBySeries(category, seriesId);
}

export async function getSeries(category: ProductCategorySlug, seriesId: string) {
  return repository.getSeriesById(category, seriesId);
}

export async function getAllSeriesInCategory(category: ProductCategorySlug) {
  return repository.getAllSeries(category);
}

export { ProductNotFoundError, SeriesNotFoundError, CategoryNotFoundError };
