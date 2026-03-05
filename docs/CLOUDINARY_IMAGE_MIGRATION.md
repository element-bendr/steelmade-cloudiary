# Cloudinary Image Assignment & Migration Guide

## Overview

The `assign-cloudinary-images.ts` script manages the migration of product images from Sanity CDN to Cloudinary. It analyzes your current image setup, identifies products that can be auto-migrated, and generates detailed reports for manual review.

## Prerequisites

- Environment variables configured in `.env.local`:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_API_TOKEN` (with write permissions)

## Quick Start

### 1. Analyze Current Image State (Recommended First Step)

```bash
npx tsx scripts/assign-cloudinary-images.ts --analyze
```

**Output:**

- Console report showing image migration summary
- `image-migration-map.json` file with detailed breakdown

**What it shows:**

- Total products and categorized image status
- Number of products that can auto-migrate
- Number needing manual assignment
- Number with zero images

---

### 2. Preview Changes Before Execution

```bash
npx tsx scripts/assign-cloudinary-images.ts --preview
```

**Output:**

- Full analysis report (same as --analyze)
- Preview of first 3 migrations showing current vs new URLs
- Count of remaining migrations
- `image-migration-map.json` file

**Use this to:**

- Verify the URL transformations are correct
- Check that asset IDs are being extracted properly
- Ensure the suggested Cloudinary URLs look valid

---

### 3. Execute Migrations (With Confirmation)

```bash
npx tsx scripts/assign-cloudinary-images.ts --execute
```

**Workflow:**

1. Fetches all products from Sanity
2. Analyzes each one
3. Displays full report
4. Prompts for confirmation before making any changes
5. Executes auto-migrations one at a time
6. Reports success/failure for each update
7. Saves final report to `image-migration-map.json`

**Output:**

```
✅ Success: 45
❌ Failed:  2
```

---

## Report Format: `image-migration-map.json`

### Structure

```json
{
  "timestamp": "2026-03-05T14:32:10.123Z",
  "summary": {
    "total": 147,
    "autoMigrate": 45,
    "manualAssign": 28,
    "noImage": 74
  },
  "migrations": {
    "auto": [
      {
        "productId": "amazon",
        "productName": "Amazon Executive Chair",
        "type": "auto-migrate",
        "currentUrl": "https://cdn.sanity.io/images/...",
        "suggestedCloudinaryUrl": "https://res.cloudinary.com/dqde19mfs/image/amazon/abc123def456.jpg",
        "reason": "Can auto-migrate from Sanity CDN to Cloudinary"
      }
    ],
    "manual": [
      {
        "productId": "legacy-chair-01",
        "productName": "Legacy Chair",
        "type": "manual-assign",
        "currentUrl": "https://example.com/image.jpg",
        "reason": "Unexpected URL format: https://example.com/image.jpg (first 50 chars)"
      }
    ],
    "noImage": [
      {
        "productId": "desk-001",
        "productName": "Desk Model 001",
        "type": "no-image",
        "reason": "No images found in Sanity (mainImage and variants)"
      }
    ]
  },
  "stats": {
    "sanityUrlsFound": 45,
    "cloudinaryUrlsFound": 28,
    "missingImages": 74
  }
}
```

### Key Fields

- **autoMigrate**: Products with Sanity CDN URLs that can be automatically converted
- **manualAssign**: Products with images but in unexpected URL formats
- **noImage**: Products with no images anywhere in the system
- **suggestedCloudinaryUrl**: Auto-generated target URL based on asset ID

---

## Step-by-Step Workflow

### Phase 1: Assessment (No Changes)

```bash
# Run analysis to understand scope
npx tsx scripts/assign-cloudinary-images.ts --analyze

# Review the generated image-migration-map.json
cat image-migration-map.json

# Check the breakdown:
# - How many can auto-migrate? (target: 45+)
# - How many need manual work? (target: 0)
# - How many have zero images? (target: 0)
```

### Phase 2: Quality Assurance (Review Only)

```bash
# Preview the transformations
npx tsx scripts/assign-cloudinary-images.ts --preview

# Manually verify:
# - Are the Cloudinary URLs being generated correctly?
# - Do asset IDs match what you expect?
# - Are any products being skipped that shouldn't be?
```

### Phase 3: Execution (Safe & Reversible)

```bash
# Execute with explicit confirmation prompt
npx tsx scripts/assign-cloudinary-images.ts --execute

# At the prompt, review the stats:
# ✅ Success: 45
# ❌ Failed:  0

# Check the timestamp in image-migration-map.json to
# verify all changes were recorded
```

---

## Handling Different Image States

### ✅ Auto-Migrate (45 products)

**Status:** Easiest to handle

```json
{
  "productId": "amazon",
  "type": "auto-migrate",
  "currentUrl": "https://cdn.sanity.io/images/...",
  "suggestedCloudinaryUrl": "https://res.cloudinary.com/dqde19mfs/image/amazon/abc123.jpg"
}
```

**How it works:**

1. Extracts asset ID from Sanity CDN URL
2. Maps to Cloudinary using product slug + asset ID
3. Updates Sanity record automatically

**Safe because:** Preserves the same image asset, just changes the URL host

---

### ⚠️ Manual Assignment (28 products)

**Status:** Requires human decision

```json
{
  "productId": "legacy-chair",
  "type": "manual-assign",
  "currentUrl": "https://example.com/image.jpg",
  "reason": "Unexpected URL format"
}
```

**What to do:**

1. Review the current URL
2. Determine if it's valid and can be used
3. Either:
   - Assign a proper Cloudinary URL
   - Assign a Sanity CDN image
   - Contact product owner for clarification

---

### ❌ No Image (74 products)

**Status:** Highest priority, blocking users

```json
{
  "productId": "desk-001",
  "type": "no-image",
  "reason": "No images found in Sanity"
}
```

**What to do:**

1. Check if the product should have an image
2. If yes:
   - Upload to Cloudinary
   - Update Sanity product record
   - Rerun the migration script
3. If no:
   - Mark product as "no-image-needed" (for display logic)
   - Document the decision

---

## Integration with Categorization Workflow

The script works alongside `categorization-fixes.json`:

```bash
# When you have 70 uncategorized products:
# 1. First categorize them
npx tsx scripts/infer-product-categories.ts --save

# 2. Then assign/migrate images
npx tsx scripts/assign-cloudinary-images.ts --analyze

# 3. Update products with both category AND image
# (This may require a separate bulk-update script)
```

---

## Cloudinary URL Format

All migrated URLs follow this pattern:

```
https://res.cloudinary.com/dqde19mfs/image/{product-slug}/{asset-id}.jpg
```

**Example:**

```
https://res.cloudinary.com/dqde19mfs/image/amazon/abc123def456.jpg
```

- `dqde19mfs` = Your Cloudinary account
- `{product-slug}` = Slug from product document
- `{asset-id}` = Sanity asset identifier

---

## Common Issues & Solutions

### Issue: "SANITY_API_TOKEN not found"

**Solution:** Ensure `.env.local` has valid token with write permissions

### Issue: Many products in "manual-assign"

**Solution:** Check URL formats in Sanity - may indicate data migration issue

### Issue: Expected more auto-migrate candidates

**Solution:** Ensure products have `mainImage.asset.*` fields in Sanity schema

### Issue: "Error patching document"

**Solution:** Verify Sanity token has `POST` permissions on `/documents` endpoint

---

## Output Files

After each run, the script creates:

- **image-migration-map.json** (Primary deliverable)
  - Complete analysis results
  - Sorted by migration type
  - Timestamped for audit trail
  - Safe to commit to version control

---

## Performance Notes

- Fetching 147 products: ~2-3 seconds
- Analysis: ~1 second
- Auto-migrations (45 products): ~5-10 seconds (API dependent)

For larger datasets, migrations are shown with real-time progress.

---

## Next Steps After Migration

1. **Verify URLs:** Check that images load correctly in the UI
2. **Update Product Schema:** If needed, modify Sanity schema to enforce Cloudinary URLs
3. **Cleanup:** Remove any Sanity CDN image references
4. **Document:** Record which products were migrated and when

---

## Rollback Procedure

If something goes wrong:

```bash
# 1. Check the image-migration-map.json timestamp
# 2. Compare with git history to see what changed
# 3. Revert individual products in Sanity manually
# 4. Or restore from backup

# The --analyze mode is always safe to run for diagnosis
npx tsx scripts/assign-cloudinary-images.ts --analyze
```

---

## Example Session

```bash
# Step 1: Understand the scope
$ npx tsx scripts/assign-cloudinary-images.ts --analyze

# Output shows:
# Total Products: 147
# Can Auto-Migrate: 45 ✅
# Need Manual Assignment: 28 ⚠️
# Missing Images: 74 ❌

# Step 2: Preview the changes
$ npx tsx scripts/assign-cloudinary-images.ts --preview

# Shows 3 examples:
# amazon → https://res.cloudinary.com/dqde19mfs/image/amazon/abc123.jpg
# amigo → https://res.cloudinary.com/dqde19mfs/image/amigo/def456.jpg
# ashley → https://res.cloudinary.com/dqde19mfs/image/ashley/ghi789.jpg

# Step 3: Execute with confirmation
$ npx tsx scripts/assign-cloudinary-images.ts --execute

# Prompt:
# ⚠️ This will update 45 products in Sanity. Continue? (yes/no): yes

# Results:
# ✅ Success: 45
# ❌ Failed: 0
```

---

## For Development / In-House Use

To add more sophisticated features:

1. **Asset Lookup:** Query Cloudinary for existing assets
2. **Bulk Upload:** Upload missing images directly
3. **Validation:** Check image dimensions, formats, etc.
4. **Reporting:** Generate CSV for stakeholder review

Contact the development team to extend the script.
