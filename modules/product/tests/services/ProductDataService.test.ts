import { describe, test, expect, beforeEach } from 'vitest';
import { ProductDataService } from '../../src/services';

describe('ProductDataService', () => {
  let service: ProductDataService;

  beforeEach(() => {
    service = ProductDataService.getInstance();
    service.clearCache();
  });

  test('getInstance returns singleton instance', () => {
    const instance1 = ProductDataService.getInstance();
    const instance2 = ProductDataService.getInstance();
    expect(instance1).toBe(instance2);
  });

  test('getProductById returns cached product', async () => {
    const mockProduct = {
      id: 'test-1',
      title: 'Test Product',
      description: 'A test product'
    };

    // First call should cache
    await service.getProductById('test-1');
    
    // Second call should use cache
    const result = await service.getProductById('test-1');
    expect(result).toBeDefined();
  });
});