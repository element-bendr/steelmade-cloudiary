# Component Mapping - Template Refactoring

**Project:** SteelMade Cloudiary Chairs - Template-Based Architecture Refactoring  
**Created:** September 27, 2025  

## Overview

This document maps existing components to their new template-based equivalents, providing a clear migration path and ensuring no functionality is lost during the refactoring process.

---

## Category Page Components

### Current Implementation (Before)
```
app/
├── chairs/page.tsx                  (305 lines)
├── desks/page.tsx                   (287 lines) 
├── storage-solutions/page.tsx       (276 lines)
├── hospital-furniture/page.tsx      (263 lines)
├── school-furniture/page.tsx        (258 lines)
├── racking-systems/page.tsx         (271 lines)
├── modular-furniture/page.tsx       (284 lines)
└── office-accessories/page.tsx      (249 lines)
```

### Template Implementation (After)
```
components/templates/
└── CategoryPageTemplate.tsx         (≤350 lines)

app/[category]/
└── page.tsx                         (≤50 lines each)
```

### Mapping Details

| Original Component | Template Equivalent | Lines Reduced | Functionality Status |
|--------------------|-------------------|---------------|---------------------|
| `app/chairs/page.tsx` | `CategoryPageTemplate` instance | 290 | ✅ Preserved |
| `app/desks/page.tsx` | `CategoryPageTemplate` instance | 270 | ✅ Preserved |
| `app/storage-solutions/page.tsx` | `CategoryPageTemplate` instance | 260 | ✅ Preserved |
| `app/hospital-furniture/page.tsx` | `CategoryPageTemplate` instance | 250 | ✅ Preserved |
| `app/school-furniture/page.tsx` | `CategoryPageTemplate` instance | 240 | ✅ Preserved |
| `app/racking-systems/page.tsx` | `CategoryPageTemplate` instance | 255 | ✅ Preserved |
| `app/modular-furniture/page.tsx` | `CategoryPageTemplate` instance | 270 | ✅ Enhanced & Preserved |
| `app/office-accessories/page.tsx` | `CategoryPageTemplate` instance | 235 | ✅ Preserved |

**Total Reduction: ~2,070 lines → ~400 lines (80.7% reduction)**

### Special Implementation Note: Modular-Furniture Category
The modular-furniture category required additional architecture work beyond simple template replacement:
- **Category System Integration**: Added to centralized configuration
- **Workstations Series**: 11 individual product pages integrated
- **Dynamic Routing**: Full `[categoryId]` route compatibility
- **Breadcrumb Navigation**: Custom seriesId override implementation
- **URL Generation**: Complex multi-level routing structure

---

## Card Components

### Current Implementation (Before)
```
components/products/
├── ChairCard.tsx                    (156 lines)
├── ProductCard.tsx                  (142 lines)
├── SeriesCardStatic.tsx             (128 lines)  
├── SeriesCardInteractive.tsx        (134 lines)
├── EnhancedSeriesCard.tsx           (149 lines)
├── FeaturedProduct.tsx              (117 lines)
└── ProductFilter.tsx                (89 lines)
```

### Template Implementation (After)  
```
components/templates/
└── ConfigurableCard.tsx             (≤350 lines)
```

### Mapping Details

| Original Component | Template Equivalent | Usage Pattern | Migration Status |
|--------------------|-------------------|---------------|-----------------|
| `ChairCard` | `ConfigurableCard` with `variant="product"` | Product listings | 🔄 To migrate |
| `ProductCard` | `ConfigurableCard` with `variant="product"` | General products | 🔄 To migrate |
| `SeriesCardStatic` | `ConfigurableCard` with `variant="series"` | Series listings | 🔄 To migrate |
| `SeriesCardInteractive` | `ConfigurableCard` with `variant="series"` + interactions | Interactive series | 🔄 To migrate |
| `EnhancedSeriesCard` | `ConfigurableCard` with enhanced styling | Premium series | 🔄 To migrate |
| `FeaturedProduct` | `ConfigurableCard` with `variant="featured"` | Homepage features | 🔄 To migrate |

### Usage Examples

#### Before (ChairCard):
```typescript
<ChairCard 
  chair={chairData} 
  basePath="/chairs/director-series" 
/>
```

#### After (ConfigurableCard):
```typescript
<ConfigurableCard 
  item={chairData}
  variant="product"
  categoryId="chairs"
  customizations={{
    basePath: "/chairs/director-series"
  }}
/>
```

**Total Reduction: ~915 lines → ~350 lines (61.7% reduction)**

---

## Layout Components

### Current Implementation (Before)
```  
components/products/
├── ProductCategoryPageLayout.tsx    (201 lines)
├── ProductPageLayout.tsx            (178 lines)
├── ChairPageLayout.tsx              (164 lines)
├── ProductDetailLayout.tsx          (227 lines)
└── ProductSeriesPage.tsx            (156 lines)
```

### Template Implementation (After)
```
components/templates/
├── CategoryPageTemplate.tsx         (≤350 lines)
├── ProductPageTemplate.tsx          (≤350 lines)
└── SeriesPageTemplate.tsx           (≤350 lines)
```

### Mapping Details

| Original Component | Template Equivalent | Integration Method | Status |
|--------------------|-------------------|-------------------|---------|
| `ProductCategoryPageLayout` | Integrated into `CategoryPageTemplate` | Direct integration | 🔄 To integrate |
| `ChairPageLayout` | Integrated into `ProductPageTemplate` | Enhanced version | 🔄 To integrate |
| `ProductDetailLayout` | Enhanced `ProductPageTemplate` | Feature merge | 🔄 To enhance |
| `ProductPageLayout` | Base `ProductPageTemplate` | Foundation | 🔄 To build |
| `ProductSeriesPage` | New `SeriesPageTemplate` | New template | 🔄 To create |

### Feature Mapping

| Feature | Original Location | Template Location | Notes |
|---------|------------------|------------------|--------|
| Breadcrumbs | `ProductCategoryPageLayout` | `CategoryPageTemplate` | Enhanced with configuration |
| SEO Metadata | Multiple files | Template base classes | Centralized |
| Theme Application | Scattered | Template theme system | Unified approach |
| Error Handling | Individual components | Template error boundaries | Consistent handling |
| Loading States | Various locations | Template loading system | Standardized |

**Total Reduction: ~926 lines → ~1,050 lines (-13.4% increase for enhanced features)**

---

## Page Route Components

### Current Implementation (Before)
```
app/
├── chairs/[seriesId]/[productId]/page.tsx        (89 lines)
├── desks/[seriesId]/[productId]/page.tsx         (92 lines)
├── storage-solutions/[seriesId]/[productId]/page.tsx (87 lines)
├── hospital-furniture/[seriesId]/[productId]/page.tsx (85 lines)
├── school-furniture/[seriesId]/[productId]/page.tsx   (88 lines)
├── racking-systems/[seriesId]/[productId]/page.tsx    (91 lines)
└── modular-furniture/[seriesId]/[productId]/page.tsx  (84 lines)
```

### Template Implementation (After)
```
app/[category]/[seriesId]/[productId]/page.tsx    (≤50 lines)
```

### Route Mapping

| Original Route | Template Route | Parameters | Migration |
|---------------|---------------|------------|-----------|
| `/chairs/[seriesId]/[productId]` | `/[category]/[seriesId]/[productId]` | `category="chairs"` | 🔄 Dynamic |
| `/desks/[seriesId]/[productId]` | `/[category]/[seriesId]/[productId]` | `category="desks"` | 🔄 Dynamic |
| `/storage-solutions/[seriesId]/[productId]` | `/[category]/[seriesId]/[productId]` | `category="storage-solutions"` | 🔄 Dynamic |

### Dynamic Route Implementation
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

export async function generateStaticParams() {
  // Generate all valid category/series/product combinations
  return getAllProductCombinations();
}
```

**Total Reduction: ~616 lines → ~50 lines (91.9% reduction)**

---

## Utility and Hook Components

### Current Implementation (Before)
```
hooks/
├── useProductData.ts                (67 lines)
├── useCategoryData.ts              (54 lines)  
├── useSeriesData.ts                (49 lines)
└── useChairData.ts                 (43 lines)

utils/
├── product-utils.ts                (134 lines)
├── chair-utils.ts                  (89 lines)
├── category-utils.ts               (76 lines)
└── series-utils.ts                 (62 lines)
```

### Template Implementation (After)
```
hooks/
├── useTemplateData.ts              (≤100 lines)
└── useCategoryConfig.ts            (≤80 lines)

utils/
├── template-utils.ts               (≤150 lines)
└── configuration-utils.ts          (≤120 lines)
```

### Hook Consolidation

| Original Hook | Template Hook | Functionality | Status |
|--------------|--------------|---------------|---------|
| `useProductData` | `useTemplateData` with product type | Product data fetching | 🔄 To merge |
| `useCategoryData` | `useCategoryConfig` | Category configuration | 🔄 To enhance |
| `useSeriesData` | `useTemplateData` with series type | Series data fetching | 🔄 To merge |
| `useChairData` | `useTemplateData` with chair category | Chair-specific data | 🔄 To generalize |

### Utility Consolidation

| Original Utility | Template Utility | Purpose | Migration |
|------------------|-----------------|---------|-----------|
| `product-utils` | `template-utils` | General product operations | 🔄 Enhance & merge |
| `chair-utils` | `template-utils` | Chair-specific operations | 🔄 Generalize |
| `category-utils` | `configuration-utils` | Category operations | 🔄 Configuration-based |
| `series-utils` | `template-utils` | Series operations | 🔄 Template integration |

**Total Reduction: ~674 lines → ~450 lines (33.2% reduction)**

---

## Type Definition Components

### Current Implementation (Before)
```
types/
├── chair-types.ts                  (89 lines)
├── product-types.ts                (76 lines)
├── category-types.ts               (54 lines)
├── series-types.ts                 (43 lines)
└── layout-types.ts                 (38 lines)

lib/data/
├── chair-data-types.ts             (67 lines)
├── product-data-types.ts           (59 lines)
└── category-data-types.ts          (45 lines)
```

### Template Implementation (After)
```
types/
├── template-types.ts               (≤200 lines)
└── configuration-types.ts          (≤150 lines)

lib/config/
└── category-config-types.ts        (≤100 lines)
```

### Type Consolidation

| Original Type File | Template Type File | Contents | Status |
|--------------------|--------------------|----------|---------|
| `chair-types.ts` | `template-types.ts` | Chair interfaces → Generic product interfaces | 🔄 Generalize |
| `product-types.ts` | `template-types.ts` | Product interfaces → Enhanced generic types | 🔄 Enhance |
| `category-types.ts` | `configuration-types.ts` | Category types → Configuration types | 🔄 Transform |
| `series-types.ts` | `template-types.ts` | Series interfaces → Generic series types | 🔄 Merge |
| `layout-types.ts` | `template-types.ts` | Layout props → Template props | 🔄 Template-ify |

**Total Reduction: ~471 lines → ~450 lines (4.5% reduction with enhanced type safety)**

---

## Migration Priority Matrix

### High Priority (Critical Path)
1. **Category Configuration System** - Foundation for everything else
2. **CategoryPageTemplate** - Highest impact, most usage
3. **ConfigurableCard** - Used across all categories
4. **ProductPageTemplate** - Core product functionality

### Medium Priority (Feature Complete)
1. **Route Optimization** - Performance and SEO benefits
2. **Utility Consolidation** - Developer experience
3. **Type System** - Development safety

### Low Priority (Polish)
1. **Documentation Updates** - Post-migration cleanup
2. **Performance Optimization** - Final tuning
3. **Legacy Cleanup** - Remove deprecated code

---

## Risk Assessment

### High Risk Components
- **ProductPageTemplate**: Complex integration of multiple layouts
- **Dynamic Routing**: SEO and static generation implications
- **Configuration System**: Single point of failure if misconfigured

### Medium Risk Components  
- **ConfigurableCard**: Visual regression potential
- **CategoryPageTemplate**: Performance impact with large datasets
- **Theme System**: Browser compatibility concerns

### Low Risk Components
- **Utility Functions**: Well-defined interfaces
- **Type Definitions**: Compile-time validation
- **Documentation**: No runtime impact

---

## Rollback Mapping

### Component-Level Rollback
Each component mapping includes a rollback path to the original implementation:

```typescript
// Rollback example for CategoryPageTemplate
// Original: app/chairs/page.tsx
// Backup: temp-backup/app/chairs/page.tsx  
// Rollback: cp temp-backup/app/chairs/page.tsx app/chairs/page.tsx
```

### Feature Flag Integration
```typescript
// Allow gradual rollout with feature flags
const shouldUseTemplate = useFeatureFlag('template-refactoring-enabled');

return shouldUseTemplate ? (
  <CategoryPageTemplate categoryId="chairs" />
) : (
  <LegacyChairsPage />
);
```

### Validation Checkpoints
- ✅ **Visual Parity**: Screenshots match between old and new
- ✅ **Functional Parity**: All interactions work identically  
- ✅ **Performance Parity**: No regression in key metrics
- ✅ **SEO Parity**: Metadata and structure maintained

This mapping ensures a safe, traceable migration path from the current repetitive architecture to the new template-based system while maintaining all existing functionality.