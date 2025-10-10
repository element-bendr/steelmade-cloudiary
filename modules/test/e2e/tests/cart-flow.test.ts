import { test, expect } from '@playwright/test';

test.describe('Cart Flow', () => {
  test('should add product to cart', async ({ page }) => {
    await page.goto('/products');
    await page.getByTestId('product-card').first().click();
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    
    const cartCount = await page.getByTestId('cart-count').innerText();
    expect(cartCount).toBe('1');
  });

  test('should validate product variants', async ({ page }) => {
    await page.goto('/products/test-product');
    
    const variantSelect = page.getByTestId('variant-select');
    await variantSelect.selectOption('variant-1');
    
    const addButton = page.getByRole('button', { name: 'Add to Cart' });
    expect(await addButton.isEnabled()).toBe(true);
  });
});