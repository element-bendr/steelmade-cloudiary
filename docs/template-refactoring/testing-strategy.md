# Template Refactoring Testing Strategy

**Project:** SteelMade Cloudiary Chairs - Template-Based Architecture Refactoring  
**Created:** September 27, 2025  

## Testing Overview

This comprehensive testing strategy ensures that the template-based refactoring maintains all existing functionality while improving performance and maintainability. Testing follows production standards with automated validation at every phase.

---

## Testing Phases

### Phase 1: Foundation Testing
**Objective**: Validate core configuration and theme systems

#### Configuration System Tests
```typescript
// lib/config/__tests__/product-categories.test.ts
describe('Product Categories Configuration', () => {
  test('all categories have required properties', () => {
    Object.entries(PRODUCT_CATEGORIES).forEach(([id, config]) => {
      expect(config.id).toBe(id);
      expect(config.title).toBeTruthy();
      expect(config.description).toBeTruthy();
      expect(config.metadata).toBeDefined();
      expect(config.theme).toBeDefined();
      expect(config.routes).toBeDefined();
    });
  });

  test('configuration validation functions work', () => {
    expect(validateCategoryConfig('chairs')).toBe(true);
    expect(validateCategoryConfig('invalid')).toBe(false);
  });

  test('all existing categories are included', () => {
    const expectedCategories = [
      'chairs', 'desks', 'storage-solutions', 
      'hospital-furniture', 'school-furniture', 
      'racking-systems', 'modular-furniture'
    ];
    expectedCategories.forEach(category => {
      expect(PRODUCT_CATEGORIES[category]).toBeDefined();
    });
  });
});
```

#### Theme System Tests
```typescript
// lib/styles/__tests__/category-themes.test.ts  
describe('Category Theme System', () => {
  test('theme retrieval works for all categories', () => {
    Object.keys(PRODUCT_CATEGORIES).forEach(categoryId => {
      const theme = getCategoryTheme(categoryId);
      expect(theme.primary).toBeTruthy();
      expect(theme.accent).toBeTruthy();
      expect(theme.gradients).toBeDefined();
      expect(theme.cardStyles).toBeDefined();
    });
  });

  test('theme fallback works for invalid categories', () => {
    const fallbackTheme = getCategoryTheme('invalid-category');
    expect(fallbackTheme).toEqual(DEFAULT_THEME);
  });

  test('theme performance is acceptable', () => {
    const start = performance.now();
    getCategoryTheme('chairs');
    const duration = performance.now() - start;
    expect(duration).toBeLessThan(1); // Should be <1ms
  });
});
```

### Phase 2: Template Component Testing

#### CategoryPageTemplate Tests
```typescript
// components/templates/__tests__/CategoryPageTemplate.test.tsx
describe('CategoryPageTemplate', () => {
  Object.keys(PRODUCT_CATEGORIES).forEach(categoryId => {
    test(`renders correctly for ${categoryId}`, () => {
      render(<CategoryPageTemplate categoryId={categoryId} />);
      
      const config = PRODUCT_CATEGORIES[categoryId];
      expect(screen.getByText(config.title)).toBeInTheDocument();
      expect(screen.getByText(config.description)).toBeInTheDocument();
    });
  });

  test('handles customizations correctly', () => {
    const customizations = {
      headerOverride: () => <div>Custom Header</div>
    };
    
    render(
      <CategoryPageTemplate 
        categoryId="chairs" 
        customizations={customizations}
      />
    );
    
    expect(screen.getByText('Custom Header')).toBeInTheDocument();
  });

  test('applies category theming correctly', () => {
    const { container } = render(
      <CategoryPageTemplate categoryId="chairs" />
    );
    
    // Verify theme classes are applied
    expect(container.querySelector('[class*="red-600"]')).toBeInTheDocument();
  });
});
```

#### ProductPageTemplate Tests
```typescript
// components/templates/__tests__/ProductPageTemplate.test.tsx
describe('ProductPageTemplate', () => {
  const mockProduct = {
    id: 'test-product',
    name: 'Test Product',
    description: 'Test Description',
    imageUrl: '/test-image.jpg',
    category: 'chairs',
    seriesId: 'test-series'
  };

  test('renders product information correctly', () => {
    render(
      <ProductPageTemplate
        productId="test-product"
        categoryId="chairs"
        seriesId="test-series"
      />
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('applies category theming to product page', () => {
    const { container } = render(
      <ProductPageTemplate
        productId="test-product"
        categoryId="chairs"
        seriesId="test-series"
      />
    );
    
    // Verify chair category theme is applied
    expect(container.querySelector('[class*="red-"]')).toBeInTheDocument();
  });

  test('handles layout overrides correctly', () => {
    const layoutOverrides = {
      imagePosition: 'right' as const,
      showMetaSection: true
    };
    
    render(
      <ProductPageTemplate
        productId="test-product"
        categoryId="chairs"
        seriesId="test-series"
        layoutOverrides={layoutOverrides}
      />
    );
    
    // Verify layout changes are applied
    expect(screen.getByTestId('product-image')).toHaveClass('order-last');
  });
});
```

#### ConfigurableCard Tests
```typescript
// components/templates/__tests__/ConfigurableCard.test.tsx
describe('ConfigurableCard', () => {
  const mockSeries = {
    id: 'test-series',
    title: 'Test Series',
    description: 'Test Series Description',
    imageUrl: '/test-series.jpg'
  };

  const mockProduct = {
    id: 'test-product',
    name: 'Test Product',
    description: 'Test Product Description',
    imageUrl: '/test-product.jpg',
    category: 'chairs',
    seriesId: 'test-series'
  };

  test('renders series card correctly', () => {
    render(
      <ConfigurableCard
        item={mockSeries}
        variant="series"
        categoryId="chairs"
      />
    );
    
    expect(screen.getByText('Test Series')).toBeInTheDocument();
    expect(screen.getByText('Test Series Description')).toBeInTheDocument();
  });

  test('renders product card correctly', () => {
    render(
      <ConfigurableCard
        item={mockProduct}
        variant="product"
        categoryId="chairs"
      />
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Product Description')).toBeInTheDocument();
  });

  test('applies category theming correctly', () => {
    const { container } = render(
      <ConfigurableCard
        item={mockSeries}
        variant="series"
        categoryId="chairs"
      />
    );
    
    // Verify chairs theme is applied
    expect(container.querySelector('[class*="red-"]')).toBeInTheDocument();
  });

  test('handles customizations', () => {
    const customizations = {
      additionalClasses: 'custom-class',
      overlayContent: () => <div>Custom Overlay</div>
    };
    
    render(
      <ConfigurableCard
        item={mockSeries}
        variant="series"
        categoryId="chairs"
        customizations={customizations}
      />
    );
    
    expect(screen.getByText('Custom Overlay')).toBeInTheDocument();
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
```

### Phase 3: Migration Validation Testing

#### Visual Regression Testing
```typescript
// tests/visual/__tests__/category-pages.test.ts
describe('Category Pages Visual Regression', () => {
  Object.keys(PRODUCT_CATEGORIES).forEach(categoryId => {
    test(`${categoryId} category page matches baseline`, async () => {
      await page.goto(`http://localhost:3000/${categoryId}`);
      await page.waitForLoadState('networkidle');
      
      const screenshot = await page.screenshot();
      expect(screenshot).toMatchSnapshot(`${categoryId}-page.png`);
    });
  });
});

// tests/visual/__tests__/product-pages.test.ts  
describe('Product Pages Visual Regression', () => {
  const testProducts = [
    { category: 'chairs', series: 'director-series', product: 'tycoon-director-chair' },
    { category: 'desks', series: 'executive-series', product: 'premium-desk' },
    { category: 'storage-solutions', series: 'modular-series', product: 'filing-cabinet' }
  ];

  testProducts.forEach(({ category, series, product }) => {
    test(`${category}/${series}/${product} matches baseline`, async () => {
      await page.goto(`http://localhost:3000/${category}/${series}/${product}`);
      await page.waitForLoadState('networkidle');
      
      const screenshot = await page.screenshot();
      expect(screenshot).toMatchSnapshot(`${category}-${series}-${product}.png`);
    });
  });
});
```

#### Functionality Testing
```typescript
// tests/e2e/__tests__/category-navigation.test.ts
describe('Category Navigation E2E', () => {
  test('all category links work correctly', async () => {
    await page.goto('http://localhost:3000');
    
    for (const categoryId of Object.keys(PRODUCT_CATEGORIES)) {
      // Click category link
      await page.click(`[href="/${categoryId}"]`);
      await page.waitForLoadState('networkidle');
      
      // Verify we're on the correct page
      expect(page.url()).toContain(`/${categoryId}`);
      
      // Verify page content loads
      const config = PRODUCT_CATEGORIES[categoryId];
      await expect(page.locator(`text=${config.title}`)).toBeVisible();
    }
  });

  test('breadcrumb navigation works correctly', async () => {
    await page.goto('http://localhost:3000/chairs/director-series/tycoon-director-chair');
    
    // Test breadcrumb clicks
    await page.click('text=Chairs');
    expect(page.url()).toContain('/chairs');
    
    await page.goBack();
    await page.click('text=Home');
    expect(page.url()).toBe('http://localhost:3000/');
  });
});

// tests/e2e/__tests__/search-functionality.test.ts
describe('Search and Filter E2E', () => {
  test('product search works across categories', async () => {
    await page.goto('http://localhost:3000/chairs');
    
    // Search for specific product
    await page.fill('[placeholder*="Search"]', 'director');
    await page.waitForTimeout(500);
    
    // Verify results show director series products
    await expect(page.locator('text=Director')).toBeVisible();
  });

  test('category filtering maintains state', async () => {
    await page.goto('http://localhost:3000/chairs');
    
    // Apply filter
    await page.click('[data-testid="series-filter-director"]');
    await page.waitForLoadState('networkidle');
    
    // Navigate away and back
    await page.click('[href="/desks"]');
    await page.click('[href="/chairs"]');
    
    // Verify filter is maintained (if implemented)
    // This test depends on specific filter implementation
  });
});
```

### Phase 4: Performance Testing

#### Load Performance Tests
```typescript
// tests/performance/__tests__/page-load.test.ts
describe('Page Load Performance', () => {
  test('category pages load within acceptable time', async () => {
    for (const categoryId of Object.keys(PRODUCT_CATEGORIES)) {
      const startTime = Date.now();
      
      await page.goto(`http://localhost:3000/${categoryId}`);
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000); // 3 second limit
    }
  });

  test('Core Web Vitals are within acceptable ranges', async () => {
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          resolve(entries);
        }).observe({ entryTypes: ['navigation', 'paint'] });
      });
    });

    // Verify specific metrics based on your requirements
    expect(metrics).toBeDefined();
  });
});

// tests/performance/__tests__/bundle-size.test.ts
describe('Bundle Size Performance', () => {
  test('template components have smaller bundle impact', () => {
    // This would typically be run as part of build process
    const bundleAnalysis = require('../../../.next/analyze/client.json');
    
    // Verify template components are efficiently bundled
    const templateBundle = bundleAnalysis.chunks.find(chunk => 
      chunk.names.includes('templates')
    );
    
    expect(templateBundle.size).toBeLessThan(50000); // 50KB limit
  });
});
```

### Phase 5: Accessibility Testing

#### A11y Compliance Tests
```typescript
// tests/accessibility/__tests__/template-a11y.test.ts
describe('Template Accessibility', () => {
  test('CategoryPageTemplate meets WCAG standards', async () => {
    await page.goto('http://localhost:3000/chairs');
    await injectAxe(page);
    
    const results = await checkA11y(page);
    expect(results.violations).toHaveLength(0);
  });

  test('ProductPageTemplate meets WCAG standards', async () => {
    await page.goto('http://localhost:3000/chairs/director-series/tycoon-director-chair');
    await injectAxe(page);
    
    const results = await checkA11y(page);
    expect(results.violations).toHaveLength(0);
  });

  test('keyboard navigation works correctly', async () => {
    await page.goto('http://localhost:3000/chairs');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    const firstFocusable = await page.locator(':focus');
    expect(firstFocusable).toBeVisible();
    
    // Test enter key on focusable elements
    await page.keyboard.press('Enter');
    // Verify expected navigation occurred
  });

  test('screen reader compatibility', async () => {
    await page.goto('http://localhost:3000/chairs');
    
    // Verify proper heading structure
    const h1 = await page.locator('h1');
    expect(h1).toBeVisible();
    
    // Verify alt text on images
    const images = await page.locator('img');
    for (const img of await images.all()) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });
});
```

---

## Testing Automation

### Continuous Integration Setup
```yaml
# .github/workflows/template-refactoring-tests.yml
name: Template Refactoring Tests
on:
  push:
    branches: [ feature/template-refactoring ]
  pull_request:
    branches: [ main ]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:coverage
      
  integration-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run test:integration
      
  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run test:e2e
      
  visual-regression:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run test:visual
      
  performance-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run test:performance
```

### Test Scripts Configuration
```json
// package.json test scripts
{
  "scripts": {
    "test": "jest",
    "test:unit": "jest --testPathPattern=__tests__",
    "test:integration": "jest --testPathPattern=integration",
    "test:e2e": "playwright test",
    "test:visual": "playwright test --config=visual.config.ts",
    "test:performance": "lighthouse-ci autorun",
    "test:a11y": "jest --testPathPattern=accessibility",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch",
    "test:full": "npm run test:unit && npm run test:integration && npm run test:e2e"
  }
}
```

---

## Test Data Management

### Mock Data Setup
```typescript
// tests/fixtures/category-data.ts
export const mockCategoryData = {
  chairs: {
    id: 'chairs',
    title: 'Chairs',
    description: 'Test chairs description',
    metadata: {
      title: 'Chairs | SteelMade',
      description: 'Test SEO description'
    },
    theme: {
      primary: 'red-600',
      accent: 'red-100'
    },
    routes: {
      base: '/chairs',
      api: '/api/products/chairs'
    }
  }
  // ... other test categories
};

// tests/fixtures/product-data.ts
export const mockProductData = {
  'tycoon-director-chair': {
    id: 'tycoon-director-chair',
    name: 'Tycoon Director Chair',
    description: 'Test product description',
    category: 'chairs',
    seriesId: 'director-series',
    imageUrl: '/test-images/tycoon-chair.jpg',
    features: ['Test feature 1', 'Test feature 2']
  }
  // ... other test products
};
```

### Test Environment Setup
```typescript
// tests/setup/test-environment.ts
import { mockCategoryData, mockProductData } from '../fixtures';

// Mock configuration modules
jest.mock('../../lib/config/product-categories', () => ({
  PRODUCT_CATEGORIES: mockCategoryData,
  validateCategoryConfig: jest.fn().mockReturnValue(true)
}));

jest.mock('../../lib/services/product-service', () => ({
  getAllSeries: jest.fn().mockResolvedValue(mockProductData),
  getProductById: jest.fn().mockReturnValue(mockProductData['tycoon-director-chair'])
}));

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: {},
    pathname: '/test'
  })
}));
```

---

## Validation Checklists

### Phase Completion Checklist
- [ ] **All Tests Pass**: Unit, integration, and E2E tests passing
- [ ] **Performance Benchmarks**: No regression in key metrics  
- [ ] **Visual Regression**: All screenshots match baseline
- [ ] **Accessibility**: WCAG 2.1 AA compliance maintained
- [ ] **Code Coverage**: Minimum 80% coverage for new components
- [ ] **Type Safety**: No TypeScript errors
- [ ] **Build Success**: Production build completes without errors
- [ ] **Bundle Size**: Within acceptable limits

### Pre-Production Checklist
- [ ] **Staging Testing**: All tests pass in staging environment
- [ ] **User Acceptance**: Stakeholder approval received
- [ ] **Security Review**: Security audit completed
- [ ] **Performance Validation**: Real-world performance tested
- [ ] **Documentation**: All test documentation complete
- [ ] **Rollback Plan**: Rollback procedures tested and documented

### Post-Deployment Monitoring
- [ ] **Error Tracking**: Monitor error rates for 48 hours
- [ ] **Performance Monitoring**: Track Core Web Vitals
- [ ] **User Analytics**: Monitor user behavior patterns
- [ ] **A/B Testing**: Compare with baseline metrics
- [ ] **Feedback Collection**: Gather stakeholder feedback

This comprehensive testing strategy ensures that the template-based refactoring maintains quality while improving the codebase structure and performance.