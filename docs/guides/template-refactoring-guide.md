# Template-Based Refactoring Implementation Guide

**Project:** SteelMade Cloudiary Chairs - Template-Based Architecture Refactoring  
**Created:** September 27, 2025  
**Branch:** `feature/template-refactoring`  
**Estimated Duration:** 3-4 weeks  

## Overview

This guide provides a step-by-step approach to refactor the existing repetitive codebase into a template-based architecture following production standards. The refactoring will reduce codebase size by ~70% while maintaining functionality.

## Production Standards Compliance

- All code written in TypeScript with functional programming style
- Declarative and modular approach
- Maximum 350 lines per file
- DRY principles enforced
- Production-ready with no technical debt
- Comprehensive documentation and testing
- Poetic code structure

---

## Phase 1: Foundation Setup (Week 1)

### Step 1.1: Git Branch Management
```bash
# Create and switch to feature branch
git checkout -b feature/template-refactoring
git push -u origin feature/template-refactoring

# Create tracking branch for rollback safety
git checkout -b feature/template-refactoring-backup
git push -u origin feature/template-refactoring-backup
git checkout feature/template-refactoring
```

**Validation:** Confirm branch creation and remote tracking setup

### Step 1.2: Documentation Structure Setup
Create documentation templates in `docs/template-refactoring/`:

- `architecture-changes.md` - Track architectural decisions
- `migration-log.md` - Record each migration step with timestamps
- `component-mapping.md` - Map old components to new templates
- `testing-checklist.md` - Validation steps for each phase
- `rollback-procedures.md` - Emergency rollback steps

**Validation:** All documentation files created with proper headers

### Step 1.3: Time Tracking Setup
Create `docs/template-refactoring/time-log.md`:
```markdown
# Template Refactoring Time Log

## Phase 1: Foundation Setup
- Start: [TIMESTAMP]
- Tasks: [LIST]
- End: [TIMESTAMP]
- Duration: [CALCULATED]
- Issues: [ANY_BLOCKERS]
```

**Validation:** Time tracking system in place

---

## Phase 2: Core Configuration System (Week 1)

### Step 2.1: Create Category Configuration
**File:** `lib/config/product-categories.ts` (≤350 lines)

```typescript
// Centralized configuration for all product categories
export interface CategoryConfig {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly metadata: CategoryMetadata;
  readonly theme: CategoryTheme;
  readonly routes: CategoryRoutes;
}

export const PRODUCT_CATEGORIES: Record<string, CategoryConfig> = {
  chairs: {
    id: 'chairs',
    title: 'Chairs',
    description: 'Explore our diverse collection of high-quality chairs...',
    // ... complete configuration
  },
  // ... other categories
};
```

**Implementation Steps:**
1. Create type interfaces for configuration
2. Define all existing categories with their metadata
3. Add validation functions for configuration integrity
4. Export category utilities and helpers

**Validation Checklist:**
- [ ] All existing categories mapped
- [ ] Type safety enforced
- [ ] No hardcoded strings in components
- [ ] Configuration validates successfully

### Step 2.2: Create Theme System
**File:** `lib/styles/category-themes.ts` (≤350 lines)

```typescript
export interface CategoryTheme {
  readonly primary: string;
  readonly accent: string;
  readonly gradients: Record<string, string>;
  readonly cardStyles: ComponentStyles;
}

export const getCategoryTheme = (categoryId: string): CategoryTheme => {
  // Functional approach to theme retrieval
};
```

**Implementation Steps:**
1. Extract existing color schemes from components
2. Create theme interfaces and utilities
3. Implement theme application functions
4. Test theme consistency across components

**Validation Checklist:**
- [ ] All existing themes preserved
- [ ] Theme application works correctly
- [ ] No style regressions
- [ ] Performance impact minimal

---

## Phase 3: Template Components (Week 1-2)

### Step 3.1: Create Generic Category Page Template
**File:** `components/templates/CategoryPageTemplate.tsx` (≤350 lines)

```typescript
interface CategoryPageTemplateProps {
  readonly categoryId: string;
  readonly customizations?: CategoryCustomizations;
}

export const CategoryPageTemplate = ({ categoryId, customizations }: CategoryPageTemplateProps) => {
  const config = useCategoryConfig(categoryId);
  const theme = useCategoryTheme(categoryId);
  
  // Functional, declarative implementation
};
```

**Implementation Steps:**
1. Analyze existing category pages for common patterns
2. Extract reusable logic into template
3. Implement configuration injection
4. Add customization points for edge cases
5. Test with one category first (chairs)

**Validation Checklist:**
- [ ] Template renders correctly
- [ ] Configuration injection works
- [ ] Customization points functional
- [ ] Performance meets standards
- [ ] Accessibility maintained

### Step 3.2: Create Universal Product Page Template
**File:** `components/templates/ProductPageTemplate.tsx` (≤350 lines)

```typescript
interface ProductPageTemplateProps {
  readonly productId: string;
  readonly categoryId: string;
  readonly seriesId: string;
  readonly layoutOverrides?: LayoutOverrides;
}

export const ProductPageTemplate = ({ productId, categoryId, seriesId, layoutOverrides }: ProductPageTemplateProps) => {
  // Consolidate existing ProductDetailLayout variations
};
```

**Implementation Steps:**
1. Merge existing `ProductDetailLayout` variations
2. Create configuration-driven layout system
3. Implement category-specific theming
4. Add extension points for special cases
5. Test across different product types

**Validation Checklist:**
- [ ] All product page features preserved
- [ ] Category theming works correctly
- [ ] Extension points functional
- [ ] SEO metadata maintained
- [ ] Performance optimized

### Step 3.3: Create Configurable Card Component
**File:** `components/templates/ConfigurableCard.tsx` (≤350 lines)

```typescript
interface ConfigurableCardProps {
  readonly item: ProductSeries | ExtendedProductData;
  readonly variant: 'series' | 'product';
  readonly categoryId: string;
  readonly customizations?: CardCustomizations;
}

export const ConfigurableCard = ({ item, variant, categoryId, customizations }: ConfigurableCardProps) => {
  // Replace ChairCard, ProductCard, SeriesCardStatic, etc.
};
```

**Implementation Steps:**
1. Identify all existing card components
2. Extract common functionality and styling
3. Create variant system for different card types
4. Implement category theming
5. Test visual parity with existing cards

**Validation Checklist:**
- [ ] Visual parity maintained
- [ ] All card variants supported
- [ ] Theming works correctly
- [ ] Hover effects preserved
- [ ] Performance improved

---

## Phase 4: Migration Implementation (Week 2-3)

### Step 4.1: Migrate Category Pages
**Migration Order:** chairs → desks → storage-solutions → others

**For each category:**
1. **Backup Original**: Copy to `temp-backup/app/[category]/`
2. **Replace Implementation**: Update `app/[category]/page.tsx`
3. **Test Functionality**: Verify all features work
4. **Visual Regression Test**: Compare with original
5. **Performance Test**: Measure loading times
6. **Document Changes**: Update migration log

**Template for category page:**
```typescript
// app/[category]/page.tsx
export default function CategoryPage() {
  return <CategoryPageTemplate categoryId="chairs" />;
}
```

**Validation per Category:**
- [ ] Page loads correctly
- [ ] All series displayed
- [ ] Navigation works
- [ ] SEO metadata present
- [ ] Performance maintained
- [ ] Visual consistency preserved

### Step 4.2: Migrate Product Pages
**Migration Strategy:**
1. Update dynamic routes to use `ProductPageTemplate`
2. Test with sample products from each category
3. Validate breadcrumbs and navigation
4. Check SEO and metadata
5. Performance testing

**Template Implementation:**
```typescript
// app/[category]/[seriesId]/[productId]/page.tsx
export default function ProductPage({ params }: ProductPageProps) {
  return (
    <ProductPageTemplate
      productId={params.productId}
      categoryId={params.category}
      seriesId={params.seriesId}
    />
  );
}
```

**Validation per Product Type:**
- [ ] Product details display correctly
- [ ] Images load properly
- [ ] Features and specifications shown
- [ ] Contact forms functional
- [ ] Breadcrumbs accurate

### Step 4.3: Replace Card Components
**Replacement Strategy:**
1. Identify all card usage locations
2. Replace one component type at a time
3. Test visual and functional parity
4. Remove unused components
5. Update imports and exports

**Implementation:**
```typescript
// Replace ChairCard with ConfigurableCard
<ConfigurableCard
  item={chair}
  variant="product"
  categoryId="chairs"
/>
```

**Validation:**
- [ ] All cards render correctly
- [ ] Click behavior preserved
- [ ] Hover effects maintained
- [ ] Responsive design works
- [ ] Performance improved

---

## Phase 5: Route Optimization (Week 3)

### Step 5.1: Dynamic Route Implementation
**Goal:** Replace multiple static routes with dynamic parameter-based routing

**Implementation:**
```typescript
// app/[category]/page.tsx - Single file for all categories
export default function DynamicCategoryPage({ params }: { params: { category: string } }) {
  return <CategoryPageTemplate categoryId={params.category} />;
}

// Generate static params for all categories
export function generateStaticParams() {
  return Object.keys(PRODUCT_CATEGORIES).map(category => ({ category }));
}
```

**Migration Steps:**
1. Create dynamic route structure
2. Test with existing categories
3. Validate SEO and metadata
4. Update navigation components
5. Remove old static routes

**Validation:**
- [ ] All category URLs work
- [ ] Static generation functions
- [ ] SEO metadata preserved
- [ ] Navigation updates correctly
- [ ] No broken links

### Step 5.2: Update Sitemap Generation
**File:** `app/sitemap.ts`

```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categoryPages = Object.keys(PRODUCT_CATEGORIES).map(categoryId => ({
    url: `${BASE_URL}/${categoryId}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  // ... rest of sitemap logic
}
```

**Validation:**
- [ ] All categories included in sitemap
- [ ] URLs generate correctly
- [ ] Metadata accurate
- [ ] No duplicate entries

---

## Phase 6: Component Cleanup (Week 3-4)

### Step 6.1: Remove Deprecated Components
**Cleanup Strategy:**
1. Identify all components replaced by templates
2. Verify no remaining usage
3. Move to `temp-backup/` directory first
4. Test entire application
5. Permanently delete if no issues

**Components to Remove:**
- Individual category page components
- Duplicate card components
- Redundant layout components
- Unused utility functions

**Validation:**
- [ ] No import errors
- [ ] Application builds successfully
- [ ] All features functional
- [ ] Performance improved

### Step 6.2: Update Exports and Imports
**Files to Update:**
- `components/index.ts`
- `components/products/index.ts`
- All importing components

**Process:**
1. Update export statements
2. Fix import paths
3. Remove unused imports
4. Optimize bundle size

**Validation:**
- [ ] No unused imports remain
- [ ] Bundle size reduced
- [ ] Tree shaking effective
- [ ] Build warnings cleared

---

## Phase 7: Testing and Validation (Week 4)

### Step 7.1: Comprehensive Testing
**Testing Categories:**
1. **Functional Testing**: All features work as before
2. **Visual Regression**: Screenshots comparison
3. **Performance Testing**: Loading times and metrics
4. **SEO Testing**: Metadata and indexing
5. **Accessibility Testing**: Screen reader and keyboard navigation

**Testing Tools:**
- Jest for unit tests
- Playwright for E2E tests
- Lighthouse for performance
- axe for accessibility

**Test Implementation:**
```typescript
// Create comprehensive test suite for templates
describe('CategoryPageTemplate', () => {
  test('renders correctly for all categories', () => {
    // Test each category configuration
  });
});
```

### Step 7.2: Performance Benchmarking
**Metrics to Track:**
- Bundle size reduction
- Initial page load time
- Time to interactive
- Core Web Vitals

**Benchmarking Process:**
1. Measure baseline performance
2. Compare with refactored version
3. Identify any regressions
4. Optimize if necessary

**Expected Improvements:**
- 30-50% bundle size reduction
- Faster build times
- Consistent performance across categories

---

## Phase 8: Documentation and Deployment (Week 4)

### Step 8.1: Complete Documentation
**Documentation Requirements:**

1. **Architecture Documentation** (`docs/architecture/template-system.md`)
   - System overview
   - Component relationships
   - Configuration patterns

2. **Developer Guide** (`docs/template-refactoring/developer-guide.md`)
   - How to add new categories
   - Customization patterns
   - Troubleshooting guide

3. **Migration Report** (`docs/template-refactoring/migration-report.md`)
   - Changes summary
   - Performance improvements
   - Lessons learned

### Step 8.2: Production Deployment Strategy
**Deployment Process:**
1. **Staging Deployment**: Deploy to staging environment
2. **User Acceptance Testing**: Stakeholder review
3. **Performance Validation**: Production-like testing
4. **Gradual Rollout**: Feature flag-based deployment
5. **Monitoring Setup**: Track performance and errors

**Rollback Plan:**
- Keep original branch available
- Feature flag for instant rollback
- Database migrations reversible
- CDN cache invalidation ready

---

## Quality Assurance Checklist

### Pre-Deployment Validation
- [ ] All tests passing (unit, integration, E2E)
- [ ] Performance benchmarks met
- [ ] Accessibility standards maintained
- [ ] SEO metadata preserved
- [ ] Visual consistency confirmed
- [ ] Documentation complete
- [ ] Code review approved
- [ ] Production instructions followed

### Post-Deployment Monitoring
- [ ] Error rates within normal range
- [ ] Performance metrics stable
- [ ] User experience unaffected
- [ ] SEO rankings maintained
- [ ] Analytics tracking functional

---

## Emergency Procedures

### Immediate Rollback (If Critical Issues Found)
```bash
# Quick rollback to previous version
git checkout main
git revert [commit-hash] --no-edit
git push origin main
# Update deployment
```

### Partial Rollback (Category-Specific Issues)
```bash
# Rollback specific category while keeping others
git checkout feature/template-refactoring-backup -- app/[category]/
git commit -m "Partial rollback: [category] issues"
git push
```

---

## Success Metrics

### Quantitative Goals
- **Code Reduction**: 70% fewer lines of code
- **Component Count**: 60% fewer components
- **Build Time**: 30% faster builds
- **Bundle Size**: 40% smaller production bundle
- **Performance**: No degradation in Core Web Vitals

### Qualitative Goals
- **Maintainability**: Easier to add new categories
- **Consistency**: Uniform behavior across all categories
- **Developer Experience**: Simpler mental model
- **Code Quality**: Better adherence to production standards

---

## Implementation Timeline

| Week | Phase | Key Deliverables |
|------|-------|------------------|
| 1 | Foundation + Core Config | Git setup, Documentation structure, Configuration system |
| 2 | Template Components | CategoryPageTemplate, ProductPageTemplate, ConfigurableCard |
| 3 | Migration + Routes | Migrate all categories, Dynamic routing, Component cleanup |
| 4 | Testing + Deployment | Comprehensive testing, Documentation, Production deployment |

**Total Estimated Time**: 120-160 hours across 4 weeks

---

## Task Tracking Integration

All tasks will be tracked in `task-master-ai.json` with the following structure:

```json
{
  "id": "template-refactoring-[step-id]",
  "title": "[Step Title]",
  "description": "[Detailed description]",
  "status": "not-started|in-progress|completed",
  "estimatedHours": "[number]",
  "actualHours": "[number]",
  "completionDate": "[ISO date]",
  "notes": "[Implementation notes and issues]"
}
```

This ensures full traceability and progress tracking throughout the refactoring process.