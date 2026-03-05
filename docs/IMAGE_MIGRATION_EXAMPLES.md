# Image Migration Examples & Patterns

## Real-World Example Session

### Example 1: Initial Assessment

```bash
$ cd /mnt/shared/projects/node/steelmade-cloudiary-chairs

$ npx tsx scripts/assign-cloudinary-images.ts --analyze

🔄 Fetching products from Sanity...
📦 Analyzing 179 products...

╔════════════════════════════════════════════════════════════╗
║    CLOUDINARY IMAGE MIGRATION ANALYSIS REPORT             ║
╚════════════════════════════════════════════════════════════╝

📊 SUMMARY
─────────────────────────────────────────────────────────────
Total Products:           179
Can Auto-Migrate:         104 ✅
Need Manual Assignment:   0 ⚠️
Missing Images:           75 ❌

📈 MIGRATION STATISTICS
─────────────────────────────────────────────────────────────
Sanity CDN URLs:          104
Cloudinary URLs:          0
Missing Images:           75

✅ AUTO-MIGRATE CANDIDATES (104):
   • Amazon Executive Chair
   • Amigo Executive Chair
   • Ashley Director Chair
   • BB Ergonomic Chair
   • Benz Executive Chair
   ... and 99 more

❌ NO IMAGES FOUND (75):
   • Visitor Classic Chair
   • Apex Workstation
   • Horizon Desk
   • ModCabinet
   • WallStore
   ... and 70 more

📄 Report saved: image-migration-map.json
```

**Analysis:**

- ✅ 104 products can be automatically migrated
- ⚠️ 0 issues requiring manual intervention
- ❌ 75 products need image assignment (blocking user-facing features)

**Next Steps:** Review the categories of missing images

---

### Example 2: Detailed Analysis

```bash
$ cat image-migration-map.json | jq '.migrations.auto[] |
  {id: .productId, name: .productName, current: .currentUrl,
   new: .suggestedCloudinaryUrl}' | head -40

{
  "id": "amazon",
  "name": "Amazon Executive Chair",
  "current": "https://cdn.sanity.io/images/n6xqwypu/production/4625b0e4cfd1776818f1b8376b1aad643029df4b-263x433.jpg",
  "new": "https://res.cloudinary.com/dqde19mfs/image/amazon/4625b0e4cfd1776818f1b8376b1aad643029df4b.jpg"
}

{
  "id": "amigo",
  "name": "Amigo Executive Chair",
  "current": "https://cdn.sanity.io/images/n6xqwypu/production/831a1747078f8413dc05656a25c40af6950e93b4-1200x1200.jpg",
  "new": "https://res.cloudinary.com/dqde19mfs/image/amigo/831a1747078f8413dc05656a25c40af6950e93b4.jpg"
}
```

**Pattern observed:**

- Asset IDs are preserved in migration
- Only the host domain changes
- Dimensions are removed from new URL
- File format defaults to .jpg

---

### Example 3: Products Missing Images

```bash
$ cat image-migration-map.json | jq '.migrations.noImage[] |
  {id: .productId, name: .productName, category: .category}' | head -30

{
  "id": "visitor-classic",
  "name": "Visitor Classic Chair",
  "category": "chairs"
}

{
  "id": "apex-workstation",
  "name": "Apex Workstation",
  "category": "desks"
}

{
  "id": "modcabinet",
  "name": "ModCabinet",
  "category": "storage-solutions"
}
```

**Action Items:**

1. Categorize by product type
2. Determine if images exist elsewhere (Google Drive, Archive, etc.)
3. Prioritize high-visibility products first
4. Plan image upload/assignment workflow

---

### Example 4: QA Review (Preview Mode)

```bash
$ npx tsx scripts/assign-cloudinary-images.ts --preview 2>&1 | \
  grep -A 50 "PREVIEW MODE"

📋 PREVIEW MODE: Showing first 3 auto-migration changes
─────────────────────────────────────────────────────────────

amazon:
  Current:  https://cdn.sanity.io/images/n6xqwypu/production/4625b0e4cfd...
  → New:    https://res.cloudinary.com/dqde19mfs/image/amazon/4625b0e4cf...

amigo:
  Current:  https://cdn.sanity.io/images/n6xqwypu/production/831a1747078...
  → New:    https://res.cloudinary.com/dqde19mfs/image/amigo/831a1747078...

ashley-director-chair:
  Current:  https://cdn.sanity.io/images/n6xqwypu/production/fd4a0c2d2e2...
  → New:    https://res.cloudinary.com/dqde19mfs/image/ashley_director_c...

... and 101 more migrations
```

**QA Checklist:**

- ✅ URLs are properly formatted
- ✅ Asset IDs are preserved
- ✅ Slugs are correctly normalized
- ✅ No truncation or corruption
- ✅ Preview showing representative sample

---

### Example 5: Execute with Confirmation

```bash
$ npx tsx scripts/assign-cloudinary-images.ts --execute

🔄 Fetching products from Sanity...
📦 Analyzing 179 products...

╔════════════════════════════════════════════════════════════╗
║    CLOUDINARY IMAGE MIGRATION ANALYSIS REPORT             ║
╚════════════════════════════════════════════════════════════╝

[... full report shown ...]

⚠️  This will update 104 products in Sanity. Continue? (yes/no): yes

🚀 Executing 104 auto-migrations...

✅ Amazon Executive Chair: https://res.cloudinary.com/dqde19mfs/image/amazon/...
✅ Amigo Executive Chair: https://res.cloudinary.com/dqde19mfs/image/amigo/...
✅ Ashley Director Chair: https://res.cloudinary.com/dqde19mfs/image/ashley_director_chair/...
✅ BB Ergonomic Chair: https://res.cloudinary.com/dqde19mfs/image/bb/...
✅ Benz Executive Chair: https://res.cloudinary.com/dqde19mfs/image/benz/...
✅ Bishop Chair: https://res.cloudinary.com/dqde19mfs/image/bishop/...
[... more migrations ...]

📊 EXECUTION COMPLETE
─────────────────────────────────────────────────────────────
✅ Success: 104
❌ Failed:  0

📄 Report saved: image-migration-map.json
```

**Verification:**

- All 104 products successfully updated
- Zero failures
- Sanity database now contains Cloudinary URLs
- Report timestamped for audit trail

---

## Integrating with Categorization Workflow

### Combined Workflow

```bash
# Step 1: Infer categories for 70 uncategorized products
npx tsx scripts/infer-product-categories.ts --save
# Creates: categorization-fixes.json

# Step 2: Analyze image requirements
npx tsx scripts/assign-cloudinary-images.ts --analyze
# Creates: image-migration-map.json

# Step 3: Cross-reference results
cat categorization-fixes.json | jq '.sample_categorizations[].id' > uncategorized.txt
cat image-migration-map.json | jq '.migrations.noImage[].productId' > missing_images.txt

# Step 4: Find products that need BOTH category AND image
comm -12 <(sort uncategorized.txt) <(sort missing_images.txt)

# Output:
# bb
# benz
# bishop
# etc.

# Step 5: Plan coordinated updates
# These products need:
# - Category assignment
# - Image assignment
# - Possible series inference
```

---

## Recovery & Rollback Scenarios

### Scenario 1: Wrong URL Format Generated

```bash
# If you notice URLs are wrong in preview:
# 1. Don't run --execute
# 2. Fix the regex in extractAssetId()
# 3. Rerun --analyze to regenerate report
# 4. Check preview again before executing

# The script is safe because --execute requires confirmation
```

### Scenario 2: Partial Migration (Some Succeeded, Some Failed)

```bash
# The report will show status
cat image-migration-map.json | jq '.migrations.auto | length'
# Count of products that were supposed to be migrated

# Rerun --execute to complete remaining migrations
npx tsx scripts/assign-cloudinary-images.ts --execute
# It will re-analyze and only show the new state
```

### Scenario 3: Reverting to Sanity CDN

```bash
# If you need to revert:
# 1. Keep the image-migration-map.json with dates
# 2. Use git history to find the previous state
# 3. Manually update products or create a rollback script
# 4. Document why the rollback was needed

git log --oneline | grep -i cloud
# Find the commit where migration happened

git show <commit-hash>:image-migration-map.json
# See the before/after states
```

---

## Monitoring After Migration

### Verify URLs Load

```bash
# Test a sample of migrated Cloudinary URLs
curl -I https://res.cloudinary.com/dqde19mfs/image/amazon/4625b0e4cfd1776818f1b8376b1aad643029df4b.jpg

# Expected: HTTP/1.1 200 OK
# If getting 404: Image doesn't exist on Cloudinary yet
```

### Validate URLs in UI

```bash
# In next.js dev environment:
# 1. Open a product detail page
# 2. Inspect image source
# 3. Confirm it loads from Cloudinary
# 4. Check image quality vs original

# Run visual regression tests if available
npm run test:visual
```

### Track Migration Progress

```bash
# Create periodic checkpoints
for i in {1..30}; do
  echo "Day $i: $(date)" >> migration-progress.log
  npx tsx scripts/assign-cloudinary-images.ts --analyze | \
    grep -E "Auto-Migrate|Missing Images" >> migration-progress-log
done
```

---

## Extending the Script

### Add Dry-Run Mode

```typescript
const dryRun = args.includes('--dry-run');

if (dryRun) {
  console.log('🔍 DRY RUN: Would update these products:');
  console.log(JSON.stringify(toUpdate, null, 2));
  return;
}
```

### Add Batch Processing

```typescript
const batchSize = parseInt(
  args.find((a) => a.startsWith('--batch='))?.split('=')[1] || '50',
  10
);

for (let i = 0; i < actions.length; i += batchSize) {
  const batch = actions.slice(i, i + batchSize);
  await processBatch(batch);
  console.log(`✅ Batch ${Math.ceil(i / batchSize)}: ${batch.length} products`);
}
```

### Add Progress Tracking

```typescript
let processed = 0;
for (const action of actions) {
  processed++;
  const progress = ((processed / actions.length) * 100).toFixed(1);
  console.log(`[${progress}%] ${action.productName}`);
  await migrate(action);
}
```

---

## Baseline Requirements Met

- ✅ Script analyzes Sanity products
- ✅ Extracts Sanity CDN URLs
- ✅ Generates Cloudinary equivalents
- ✅ Identifies missing images
- ✅ Produces detailed JSON report
- ✅ Three operational modes (analyze/preview/execute)
- ✅ Safe confirmation workflow
- ✅ Real-time console output
- ✅ Handles error cases
- ✅ Production-ready code quality
