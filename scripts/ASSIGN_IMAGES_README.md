# Cloudinary Image Migration - Quick Reference

## Three Simple Commands

### 1. 🔍 Analyze (Safe - Read Only)
```bash
npx tsx scripts/assign-cloudinary-images.ts --analyze
```
Shows status without making changes. Generates `image-migration-map.json` report.

### 2. 👁️ Preview (Safe - What-If Analysis)
```bash
npx tsx scripts/assign-cloudinary-images.ts --preview
```
Shows what WOULD happen. Display first 3 migration examples. Good for QA.

### 3. 🚀 Execute (Creates Changes)
```bash
npx tsx scripts/assign-cloudinary-images.ts --execute
```
Makes actual updates to Sanity. Asks for confirmation before proceeding.

---

## What Each Mode Does

| Mode | Input | Output | Changes DB? | Best Used For |
|------|-------|--------|-------------|--------------|
| `--analyze` | Sanity products | Report JSON | ❌ No | First review |
| `--preview` | Sanity products | Report + examples | ❌ No | QA review |
| `--execute` | Sanity products | Report + updates | ✅ Yes | Production |

---

## Expected Results

After running any mode, you'll see:

```
📊 SUMMARY
─────────────────────────────────────────────────────────────
Total Products:           147
Can Auto-Migrate:         45 ✅
Need Manual Assignment:   28 ⚠️
Missing Images:           74 ❌
```

---

## Report File: image-migration-map.json

Created by every run. Contains:

```json
{
  "summary": {
    "autoMigrate": 45,    // Can auto-migrate
    "manualAssign": 28,   // Need human review
    "noImage": 74         // Zero images anywhere
  },
  "migrations": {
    "auto": [...],        // Auto-migration candidates
    "manual": [...],      // Manual review needed
    "noImage": [...]      // No images found
  }
}
```

---

## Recommended Workflow

```bash
# Step 1: Understand scope (5 minutes)
npx tsx scripts/assign-cloudinary-images.ts --analyze
cat image-migration-map.json | jq '.summary'

# Step 2: QA the transformation logic (2 minutes)
npx tsx scripts/assign-cloudinary-images.ts --preview

# Step 3: Execute when ready (5 minutes)
npx tsx scripts/assign-cloudinary-images.ts --execute
# Answer: yes
```

**Total Time:** ~12 minutes for full migration

---

## Cloudinary URL Format

All URLs will be:
```
https://res.cloudinary.com/dqde19mfs/image/{product-slug}/{asset-id}.jpg
```

Example: `amazon` product
```
https://res.cloudinary.com/dqde19mfs/image/amazon/abc123def456.jpg
```

---

## When to Use Each Mode

**Use --analyze when:**
- First time setting up migration
- You want to understand current state
- Before scheduling execution
- To track progress over time

**Use --preview when:**
- Need to validate URL transformations
- Doing QA or code review
- Showing stakeholders what will happen
- Testing in non-production environment

**Use --execute when:**
- You've reviewed --preview output
- You have production Sanity access
- You're ready to commit changes
- Images are validated and ready

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| "SANITY_API_TOKEN not found" | Missing .env.local | Add token to .env.local |
| Script hangs | Network issue | Check Sanity API connectivity |
| Many in "manual-assign" | URL format issue | Review Sanity schema |
| Low "auto-migrate" count | Sanity CDN URLs not found | Check mainImage.asset fields |

---

## Key Numbers to Watch

- **Auto-Migrate:** Higher is better (lower manual effort)
- **Manual Assign:** Should approach 0 (indicates data issues)
- **No Image:** Should approach 0 (blocks users)

**Goal:**
```
Auto-Migrate: 140+  ✅
Manual Assign: 0    ✅
No Image: 0         ✅
```

---

## Files Created

After running script:
- ✅ `image-migration-map.json` - Main deliverable
- ✅ Console output with statistics
- (For --execute) Sanity database updates

---

## Example Output

```
🔄 Fetching products from Sanity...
📦 Analyzing 147 products...

╔════════════════════════════════════════════════════════════╗
║    CLOUDINARY IMAGE MIGRATION ANALYSIS REPORT             ║
╚════════════════════════════════════════════════════════════╝

📊 SUMMARY
─────────────────────────────────────────────────────────────
Total Products:           147
Can Auto-Migrate:         45 ✅
Need Manual Assignment:   28 ⚠️
Missing Images:           74 ❌

✅ AUTO-MIGRATE CANDIDATES (45):
   • Amazon Executive Chair
   • Amigo Executive Chair
   • Benz Executive Chair
   ... and 42 more

⚠️  MANUAL REVIEW NEEDED (28):
   • Legacy Chair 01
   • Custom Product
   ... and 26 more

❌ NO IMAGES FOUND (74):
   • Desk Model 001
   • Chair Base Unit
   ... and 72 more

📄 Report saved: image-migration-map.json
```

---

## Need Help?

Refer to `docs/CLOUDINARY_IMAGE_MIGRATION.md` for:
- Detailed phase-by-phase workflow
- Integration with categorization
- Handling different image states
- Rollback procedures
- Development extensions

---

## Environment Setup

Required in `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_with_write_permissions
```

**Get token:** Manage → API → Tokens → Create new token (Editor role minimum)
