# Cloudinary-Sanity Sync Strategy

## Architecture Clarification

**IMPORTANT**: Cloudinary is the DEFAULT and ONLY image provider. All images are already on Cloudinary.

```
┌─────────────────────────────────────────────────────────────┐
│                    SOURCE OF TRUTH                          │
│                                                             │
│  CLOUDINARY (dqde19mfs)                                     │
│  • 308 product images manually uploaded                     │
│  • Organized by folders (chairs, desks, etc.)              │
│  • Each image has public_id and secure_url                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
                    References URLs
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    CONTENT ORCHESTRATION                     │
│                                                             │
│  SANITY CMS (clut35k6f)                                     │
│  • 179 products with metadata                               │
│  • SHOULD reference: mainImage.cloudinaryUrl (string)       │
│  • PROBLEM: Some still use: mainImage.asset (old reference) │
└─────────────────────────────────────────────────────────────┘
```

## Current State

### ✅ Correct Architecture (81 products)

```javascript
{
  _id: "product-123",
  name: "Amazon Executive Chair",
  mainImage: {
    _type: "cloudinaryImage",
    cloudinaryUrl: "https://res.cloudinary.com/dqde19mfs/...",
    publicId: "chairs/amazon-executive-chair"
  }
}
```

### ❌ Wrong/Legacy References (51 products)

```javascript
{
  _id: "product-456",
  name: "Ashley Director Chair",
  mainImage: {
    _type: "image",
    asset: {
      _ref: "image-abc123",
      _type: "reference"
    }
  }
}
```

This resolves to `https://cdn.sanity.io/...` but the **actual image is on Cloudinary!**

### ❌ Missing References (47 products)

```javascript
{
  _id: "product-789",
  name: "Visitor Classic Chair",
  mainImage: null  // or undefined
}
```

Image exists on Cloudinary but not linked to product.

## The Real Problem

The issue is **NOT** that images need to be migrated. The issue is:

1. **51 products** have old Sanity asset references instead of Cloudinary URLs
2. **47 products** have no image reference at all
3. All ~98 of these products' images **already exist on Cloudinary**
4. We need to **find and link** the Cloudinary URLs to these products

## Solution Strategy

### Phase 1: Match Existing Cloudinary Images to Products

**Goal**: Find the Cloudinary URLs for products currently using Sanity references or no references.

**Approach**:

1. Fetch all 308 Cloudinary images with metadata
2. Match to Sanity products using:
   - Product slug matching public_id
   - Product name similarity to filename
   - Category-based folder matching
3. Update Sanity products with correct cloudinaryUrl

**Status**: ✅ Already implemented in `fetch-cloudinary-images.ts`

- Successfully matched 81 products initially
- Need to re-run after categorization to improve matching

### Phase 2: Improve Matching with Categorization

**Goal**: Categorize 70 uncategorized products to enable better matching.

**Why This Helps**:

- Category information helps match to Cloudinary folder structure
- Series information helps disambiguate similar product names
- Better metadata = better fuzzy matching confidence

**Status**: 🟡 In progress (steelmade-6md)

- categorization-fixes.json generated (70 products analyzed)
- Ready to apply with: `npx tsx scripts/apply-categorization-fixes.ts --execute`

### Phase 3: Re-run Matching After Categorization

**Goal**: Find additional matches now that products are categorized.

**Expected Improvement**:

- Current: 81/179 matched (45%)
- After categorization: ~140-150/179 matched (78-84%)
- Remaining ~20-30 products for manual review

**Command**:

```bash
# Re-analyze with fresh data
npx tsx scripts/fetch-cloudinary-images.ts --analyze

# Apply new matches
npx tsx scripts/fetch-cloudinary-images.ts --execute
```

### Phase 4: Manual Review & Assignment

**Goal**: Assign remaining products through visual matching or content team knowledge.

**Approach**:

1. Review unmapped-cloudinary-images.json suggested mappings
2. Use Cloudinary media library to visually match products
3. Manually update Sanity products with correct URLs

## Key Scripts

### 1. Verification (Check Current State)

```bash
npx tsx scripts/verify-sanity-cloudinary-parity.ts
```

Shows:

- How many products use Cloudinary (target: 100%)
- How many still use Sanity CDN (target: 0%)
- How many missing images (target: 0%)

### 2. Gap Analysis (Strategic View)

```bash
npx tsx scripts/analyze-sync-gaps.ts
```

Comprehensive analysis of all gaps and remediation plan.

### 3. Apply Categorization (Improve Matching)

```bash
# Preview changes
npx tsx scripts/apply-categorization-fixes.ts --dry-run

# Apply all fixes
npx tsx scripts/apply-categorization-fixes.ts --execute

# Or just high-confidence ones
npx tsx scripts/apply-categorization-fixes.ts --execute --high-confidence-only
```

### 4. Fetch & Match Cloudinary Images

```bash
# Analyze matches
npx tsx scripts/fetch-cloudinary-images.ts --analyze

# Preview changes
npx tsx scripts/fetch-cloudinary-images.ts --preview

# Execute updates
npx tsx scripts/fetch-cloudinary-images.ts --execute
```

### 5. Apply Unmapped Suggestions

```bash
# Apply high-confidence unmapped suggestions
npx tsx scripts/apply-high-confidence-mappings.ts --execute
```

## Naming Convention (Future)

To prevent sync issues, establish this convention:

### Cloudinary Upload

```
public_id = "{category}/{product-slug}"

Examples:
- chairs/amazon-executive-chair
- desks/horizon-desk
- modular-furniture/screen-100cm
```

### Sanity Product

```javascript
{
  slug: { current: "amazon-executive-chair" },
  category: "chairs",
  mainImage: {
    _type: "cloudinaryImage",
    cloudinaryUrl: "https://res.cloudinary.com/dqde19mfs/.../amazon-executive-chair",
    publicId: "chairs/amazon-executive-chair"
  }
}
```

### Matching Algorithm

```
1. Try exact match: product.slug === publicId base
2. Try folder match: product.category + "/" + product.slug === publicId
3. Try fuzzy match: similarity(product.name, filename) > 80%
```

## Success Metrics

| Metric                      | Current   | Target              |
| --------------------------- | --------- | ------------------- |
| Products on Cloudinary      | 81 (45%)  | 179 (100%)          |
| Products with images        | 132 (74%) | 179 (100%)          |
| Products displayable on web | 132 (74%) | 179 (100%)          |
| Unmapped Cloudinary images  | 257       | Documented/Archived |

## Verification Checklist

- [ ] All products categorized (steelmade-6md)
- [ ] Re-run Cloudinary matching after categorization
- [ ] Apply high/medium confidence mappings
- [ ] Manual review remaining products
- [ ] Run verification: 100% products use Cloudinary
- [ ] Test website: All product images display
- [ ] Document any products genuinely without images
- [ ] Archive or organize unused Cloudinary images

## Next Actions

1. **Apply categorization** (completes steelmade-6md):

   ```bash
   npx tsx scripts/apply-categorization-fixes.ts --execute
   ```

2. **Re-run matching** with better metadata:

   ```bash
   npx tsx scripts/fetch-cloudinary-images.ts --analyze
   npx tsx scripts/fetch-cloudinary-images.ts --execute
   ```

3. **Verify progress**:

   ```bash
   npx tsx scripts/verify-sanity-cloudinary-parity.ts
   ```

4. **Target**: Achieve 90%+ automatic matching, leaving ~10-20 for manual review.
