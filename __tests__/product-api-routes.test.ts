import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET as getProducts } from '../app/api/[categoryId]/[seriesId]/products/route';
import { GET as getVariant } from '../app/api/products/[productId]/[variantId]/route';

// Mock dependencies
vi.mock('@/lib/modules/product', () => ({
  getProductsBySeries: vi.fn().mockImplementation(async (seriesId, categoryId) => {
    if (seriesId === 'designer-desk-collection' && categoryId === 'desks') {
      return [{ id: 'apex-workstation', name: 'Apex Workstation' }];
    }
    return [];
  })
}));

vi.mock('@/lib/sanity/client', () => ({
  client: {
    fetch: vi.fn().mockImplementation(async (query, params) => {
      if (params.slug === 'apex-workstation') {
        return {
          id: 'apex-workstation',
          name: 'Apex Workstation',
          variants: [
            { id: 'v1', name: 'Oak' },
            { id: 'v2', name: 'Walnut' }
          ]
        };
      }
      return null;
    })
  }
}));

describe('API Route: Products by Series', () => {
  it('should return products using categoryId and seriesId', async () => {
    const request = new Request('http://localhost');
    const response = await getProducts(request, { 
      params: { categoryId: 'desks', seriesId: 'designer-desk-collection' } 
    });
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveLength(1);
    expect(data[0].id).toBe('apex-workstation');
  });

  it('should return 400 if parameters missing', async () => {
    const request = new Request('http://localhost');
    const response = await getProducts(request, { 
      params: { categoryId: '', seriesId: '' } 
    });
    expect(response.status).toBe(400);
  });
});

describe('API Route: Variant Resolution', () => {
  it('should return variant from explicit variants array', async () => {
    const request = new Request('http://localhost');
    const response = await getVariant(request, {
      params: { productId: 'apex-workstation', variantId: 'v1' }
    });
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.variant.id).toBe('v1');
    expect(data.variant.name).toBe('Oak');
  });

  it('should return 404 if product not found', async () => {
      const request = new Request('http://localhost');
      const response = await getVariant(request, {
        params: { productId: 'unknown-product', variantId: 'v1' }
      });
      
      expect(response.status).toBe(404);
  });

  it('should return 404 if variant not found in product', async () => {
      const request = new Request('http://localhost');
      const response = await getVariant(request, {
        params: { productId: 'apex-workstation', variantId: 'v99' }
      });
      
      expect(response.status).toBe(404);
  });
});
