import { describe, it, expect } from 'vitest';
import { CloudinaryImageService } from '../../src/services/CloudinaryImageService';
import * as E from 'fp-ts/Either';

describe('CloudinaryImageService', () => {
  const testImage = {
    publicId: 'test-image',
    url: 'https://res.cloudinary.com/test/image/upload/test-image',
    width: 800,
    height: 600,
    format: 'jpg',
    resourceType: 'image'
  };
  it('should transform image with options', () => {
    const transformed = CloudinaryImageService.optimizeProductImage(testImage, {
      width: 400,
      height: 300,
      format: 'webp'
    });

    expect(transformed.url).toContain('w_400');
    expect(transformed.url).toContain('h_300');
    expect(transformed.url).toContain('f_webp');
    expect(transformed.format).toBe('webp');
  });
  it('should optimize image with defaults', () => {
    const optimized = CloudinaryImageService.optimizeProductImage(testImage);

    expect(optimized.url).toContain('f_webp');
    expect(optimized.url).toContain('q_85');
    expect(optimized.format).toBe('webp');
  });
});