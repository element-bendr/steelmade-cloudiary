import { ProductRepository, ProductNotFoundError, SeriesNotFoundError, CategoryNotFoundError } from './repository';
import { ProductCategorySlug } from '../../../types/product-categories';
import { ProductSeries, ExtendedProductData, ProductImage } from '@/lib/data/product-types';
import { client } from '@/lib/sanity/client';

export class SanityProductRepository implements ProductRepository {
  
  async getProductById(category: ProductCategorySlug, seriesId: string, productId: string): Promise<ExtendedProductData> {
    const query = `*[_type == "product" && categoryId == $category && seriesId == $seriesId && id == $productId][0]`;
    const doc = await client.fetch(query, { category, seriesId, productId });
    
    if (!doc) {
      throw new ProductNotFoundError(`Product ${productId} not found in series ${seriesId} of category ${category}`);
    }
    
    // Map Sanity schema back to ExtendedProductData frontend expects
    return this.mapSanityProductToFrontend(doc);
  }

  async getProductsBySeries(category: ProductCategorySlug, seriesId: string): Promise<ExtendedProductData[]> {
    const query = `*[_type == "product" && categoryId == $category && seriesId == $seriesId]`;
    const docs = await client.fetch(query, { category, seriesId });
    
    return docs.map((doc: any) => this.mapSanityProductToFrontend(doc));
  }

  async getSeriesById(category: ProductCategorySlug, seriesId: string): Promise<ProductSeries | null> {
    const seriesQuery = `*[_type == "series" && categoryId == $category && id == $seriesId][0]`;
    const seriesDoc = await client.fetch(seriesQuery, { category, seriesId });
    
    if (!seriesDoc) return null;

    const products = await this.getProductsBySeries(category, seriesId);
    
    // Map array to object Record<string, ExtendedProductData>
    const productsRecord: Record<string, ExtendedProductData> = {};
    for (const p of products) {
      productsRecord[p.id] = p;
    }

    return {
      id: seriesDoc.id,
      title: seriesDoc.title,
      description: seriesDoc.description,
      seoDescription: seriesDoc.description || '', // fallback
      category: seriesDoc.categoryId,
      coverImage: { url: '', alt: seriesDoc.title }, // Need to map if needed
      products: productsRecord
    };
  }

  async getAllSeries(category: ProductCategorySlug): Promise<Record<string, ProductSeries>> {
    const seriesQuery = `*[_type == "series" && categoryId == $category]`;
    const seriesDocs = await client.fetch(seriesQuery, { category });
    
    const result: Record<string, ProductSeries> = {};
    
    for (const sDoc of seriesDocs) {
      const seriesProducts = await this.getProductsBySeries(category, sDoc.id);
      const productsRecord: Record<string, ExtendedProductData> = {};
      for (const p of seriesProducts) {
        productsRecord[p.id] = p;
      }
      
      result[sDoc.id] = {
        id: sDoc.id,
        title: sDoc.title,
        description: sDoc.description,
        seoDescription: sDoc.description || '',
        category: sDoc.categoryId,
        coverImage: { url: '', alt: sDoc.title },
        products: productsRecord
      };
    }
    
    return result;
  }

  // --- Helper mapping function ---
  private mapSanityProductToFrontend(doc: any): ExtendedProductData {
    return {
      id: doc.id,
      name: doc.name,
      description: doc.description || '',
      category: doc.categoryId,
      seriesId: doc.seriesId,
      price: doc.price || '',
      imageUrl: doc.cloudinaryImageUrl || '', 
      features: doc.features || [],
      // mapping remaining legacy properties if any
    };
  }
}
