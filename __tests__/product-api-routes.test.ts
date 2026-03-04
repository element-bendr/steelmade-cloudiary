import { describe, it, expect, vi } from 'vitest';
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

describe('[api][products] products-by-series route', () => {
  it('[success] returns products for valid categoryId and seriesId', async () => {
    const request = new Request('http://localhost');
    const response = await getProducts(request, { 
      params: { categoryId: 'desks', seriesId: 'designer-desk-collection' } 
    });
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveLength(1);
    expect(data[0].id).toBe('apex-workstation');
  });

  it('[validation] returns 400 when route parameters are missing', async () => {
    const request = new Request('http://localhost');
    const response = await getProducts(request, { 
      params: { categoryId: '', seriesId: '' } 
    });
    expect(response.status).toBe(400);
  });
});

describe('[api][products] variant resolution route', () => {
  it('[success] returns variant from explicit variants array', async () => {
    const request = new Request('http://localhost');
    const response = await getVariant(request, {
      params: { productId: 'apex-workstation', variantId: 'v1' }
    });
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.variant.id).toBe('v1');
    expect(data.variant.name).toBe('Oak');
  });

  it('[not-found] returns 404 when product does not exist', async () => {
      const request = new Request('http://localhost');
      const response = await getVariant(request, {
        params: { productId: 'unknown-product', variantId: 'v1' }
      });
      
      expect(response.status).toBe(404);
  });

  it('[not-found] returns 404 when variant does not exist for product', async () => {
      const request = new Request('http://localhost');
      const response = await getVariant(request, {
        params: { productId: 'apex-workstation', variantId: 'v99' }
      });
      
      expect(response.status).toBe(404);
  });
});
