# Cloudinary Migration Plan

**Issue:** steelmade-880  
**Goal:** Use Cloudinary as primary image provider, Sanity only for content/metadata  
**Date:** March 5, 2026

## Current State

**Problem:** Images are currently stored in Sanity's CDN (`cdn.sanity.io`), which contradicts the intended architecture where Cloudinary should be the primary image provider.

**Current Architecture:**

```typescript
// Sanity Schema (sanity/schemas/product.ts)
{
  name: 'mainImage',
  type: 'image',  // ← Sanity's native image type
  options: { hotspot: true }
}

// GROQ Query (lib/sanity.queries.ts)
"imageUrl": mainImage.asset->url  // ← Dereferences Sanity asset
// Returns: https://cdn.sanity.io/images/n6xqwypu/production/...
```

**Data:**

- ~70 products in chairs category
- Each product has mainImage + variant images
- All currently hosted on cdn.sanity.io
- Some legacy Cloudinary fallbacks in code

## Target State

**Desired Architecture:**

```typescript
// Sanity Schema (updated)
{
  name: 'imageUrl',
  type: 'string',  // ← Plain string field
  title: 'Cloudinary Image URL',
  validation: Rule => Rule.required().regex(/^https:\/\/res\.cloudinary\.com/)
}

// GROQ Query (updated)
"imageUrl": imageUrl  // ← Direct string value
// Returns: https://res.cloudinary.com/dqde19mfs/image/upload/...
```

**Benefits:**

- ✅ Cloudinary as single source of truth for images
- ✅ Sanity only manages content/metadata (products, descriptions, features)
- ✅ Better image optimization control (q_auto, f_auto)
- ✅ Existing Cloudinary folder structure maintained
- ✅ Clear separation of concerns

## Migration Tasks

### 1. Audit Current Usage

**Issue:** steelmade-c6u  
**Tasks:**

- Query Sanity for all image asset references
- Document schema fields: `product.mainImage`, `variant.image`, `category.mainImage`, `series.coverImage`
- Count affected documents (products, variants, categories, series)
- Record sample data structure for rollback reference

### 2. Update Sanity Schemas

**Issue:** steelmade-xrb  
**Files:**

- `sanity/schemas/product.ts`
- `sanity/schemas/category.ts`
- `sanity/schemas/series.ts`

**Changes:**

```typescript
// BEFORE
{
  name: 'mainImage',
  title: 'Main Image',
  type: 'image',
  options: { hotspot: true }
}

// AFTER
{
  name: 'imageUrl',
  title: 'Cloudinary Image URL',
  type: 'string',
  description: 'Full Cloudinary URL (e.g., https://res.cloudinary.com/dqde19mfs/...)',
  validation: (Rule) => Rule.required()
    .regex(/^https:\/\/res\.cloudinary\.com\/dqde19mfs\//)
    .error('Must be a valid Cloudinary URL')
}
```

### 3. Update GROQ Queries

**Issue:** steelmade-mgh  
**File:** `lib/sanity.queries.ts`

**Changes:**

```typescript
// BEFORE
"imageUrl": mainImage.asset->url

// AFTER
"imageUrl": imageUrl
```

Apply to all queries:

- `allCategoriesQuery`
- `categoryByIdQuery`
- `productsByCategoryQuery`
- `productsBySeriesQuery`
- `productByIdQuery`
- `productBySlugQuery`

### 4. Export Images to Cloudinary

**Issue:** steelmade-42m  
**New Script:** `scripts/export-sanity-to-cloudinary.mjs`

**Process:**

1. Query all Sanity documents with image assets
2. Download each image from `cdn.sanity.io`
3. Upload to Cloudinary maintaining folder structure:
   ```
   steelmade/chairs/executive-series/amigo/ic-331-hb.jpg
   steelmade/chairs/director-series/ashley/ic-361-hb.jpg
   ```
4. Generate mapping file: `sanity-asset-id` → `cloudinary-url`
5. Store mapping as JSON for migration script

### 5. Create Migration Script

**Issue:** steelmade-sro  
**New Script:** `scripts/migrate-sanity-to-cloudinary-urls.mjs`

**Features:**

```javascript
// Dry-run mode
node scripts/migrate-sanity-to-cloudinary-urls.mjs --dry-run

// Execute migration
node scripts/migrate-sanity-to-cloudinary-urls.mjs --execute

// Rollback if needed
node scripts/migrate-sanity-to-cloudinary-urls.mjs --rollback
```

**Process:**

1. Load asset-to-URL mapping from export step
2. Query all Sanity documents
3. For each document with image assets:
   - Replace `mainImage: {asset: {_ref: "..."}}`
   - With `imageUrl: "https://res.cloudinary.com/..."`
4. Update via Sanity API
5. Log all changes for rollback

### 6. Test on Local Dataset

**Issue:** steelmade-8s0

**Test Checklist:**

- [ ] Create test Sanity dataset with sample products
- [ ] Run schema changes (deploy to test dataset)
- [ ] Run image export script (upload to Cloudinary test folder)
- [ ] Run migration script (update test documents)
- [ ] Verify GROQ queries return correct Cloudinary URLs
- [ ] Test frontend rendering (homepage, /chairs, product pages)
- [ ] Check Sanity Studio UI (string fields display correctly)
- [ ] Test image optimization (q_auto, f_auto parameters work)
- [ ] Verify Next.js Image component works with Cloudinary URLs
- [ ] Test rollback script

### 7. Execute Production Migration

**Issue:** steelmade-lkp

**Production Timeline:**

1. **Pre-Migration (30 min before):**
   - Announce maintenance window (if needed)
   - Create full Sanity dataset backup
   - Verify Cloudinary credentials and quota

2. **Migration (estimated 1-2 hours):**
   - Deploy schema changes to production Sanity
   - Run image export script (all images to Cloudinary)
   - Verify upload success (check mapping file completeness)
   - Run migration script with --dry-run first
   - Review dry-run output
   - Execute migration script
   - Monitor for errors

3. **Post-Migration (30 min after):**
   - Run verification script (check all routes)
   - Test critical pages: /, /chairs, /desks, product pages
   - Check browser console for errors
   - Monitor Cloudinary bandwidth usage
   - Update documentation

4. **Rollback Plan (if issues):**
   - Run migration script with --rollback flag
   - Revert schema changes
   - Re-deploy previous version
   - Investigate and fix issues before retry

## Affected Files

### Schema Changes

- `sanity/schemas/product.ts` - mainImage → imageUrl
- `sanity/schemas/category.ts` - mainImage → imageUrl
- `sanity/schemas/series.ts` - coverImage → imageUrl

### Query Changes

- `lib/sanity.queries.ts` - All image projections

### New Scripts

- `scripts/export-sanity-to-cloudinary.mjs`
- `scripts/migrate-sanity-to-cloudinary-urls.mjs`

### Configuration (already correct)

- `next.config.js` - Already includes both Cloudinary and Sanity in remotePatterns
- `lib/cloudinary.ts` - Existing helper functions

### No Changes Needed

- Frontend components (already use `imageUrl` string)
- `lib/services/sanity-product-service.ts` (already maps to `imageUrl`)

## Key Considerations

### Image URLs

- Maintain Cloudinary folder structure: `steelmade/{category}/{series}/{product-id}`
- Use optimization params: `q_auto,f_auto` for all URLs
- Keep consistent naming conventions

### Downtime

- Schema changes in Sanity are instant (no rebuild needed)
- Frontend only needs re-fetch of data (ISR handles this)
- No deployment needed if queries return correct imageUrl strings
- Should be zero downtime migration

### Rollback

- Keep backup of original Sanity documents
- Migration script stores original values
- Rollback can restore image asset references
- Test rollback on local dataset first

### Performance

- Cloudinary CDN is global (faster than Sanity CDN in many regions)
- Image optimization applied automatically via URL params
- Next.js Image component handles caching
- Monitor Cloudinary bandwidth after migration

### Sanity Studio

- Editors will paste full Cloudinary URLs instead of uploading
- Can add custom input component for Cloudinary media library picker (future)
- URL validation prevents invalid entries

## Success Criteria

Migration is successful when:

- [ ] All products show Cloudinary URLs in Sanity
- [ ] No cdn.sanity.io URLs in production data
- [ ] All routes render correctly with images
- [ ] No console errors about missing images
- [ ] Verification script passes (steelmade-e6o can be reused)
- [ ] Sanity Studio shows string URL fields
- [ ] Performance is equal or better
- [ ] Documentation updated

## Related Issues

- **steelmade-e6o**: Visual inconsistency investigation (discovered current image architecture)
- **steelmade-880**: Parent migration epic
- **steelmade-c6u**: Audit task
- **steelmade-xrb**: Schema updates
- **steelmade-mgh**: Query updates
- **steelmade-42m**: Image export
- **steelmade-sro**: Migration script
- **steelmade-8s0**: Testing
- **steelmade-lkp**: Production execution

## Next Steps

```bash
# View all migration tasks
bd ready --json | jq '.[] | select(.id | startswith("steelmade-")) | {id, title, status}'

# Start with audit
bd update steelmade-c6u --claim

# Track progress
bd show steelmade-880
```

---

**Note:** This migration aligns the system with the original design intent where Cloudinary is the permanent image provider and Sanity is purely for content management.
