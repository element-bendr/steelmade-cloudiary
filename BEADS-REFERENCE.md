# Beads Tracking Reference

## Updated Beads (March 5, 2026)

### steelmade-6md [P0 TASK - IN_PROGRESS]

**Title:** Clean & categorize 70 uncategorized legacy products

**Updated with:**

- Corrected architecture understanding (Cloudinary = source of truth)
- New automation: `apply-categorization-fixes.ts`
- Documentation: `CLOUDINARY-SYNC-STRATEGY.md`
- Execution commands and completion criteria

**Commands:**

```bash
bd show steelmade-6md                                                    # View details
npx tsx scripts/apply-categorization-fixes.ts --dry-run                  # Preview
npx tsx scripts/apply-categorization-fixes.ts --execute                  # Execute
bd close steelmade-6md --reason "70 products categorized"                # Close when done
```

---

### steelmade-ucs [P0 BUG - IN_PROGRESS]

**Title:** 75 products missing images - reconciliation needed

**Updated with:**

- Corrected problem definition (no migration needed - find & link)
- Current status: 81/179 linked (45%)
- Automated workflow: `complete-cloudinary-sync.ts`
- Expected results: 140-150/179 after automation (78-84%)

**Commands:**

```bash
bd show steelmade-ucs                                                    # View details
npx tsx scripts/complete-cloudinary-sync.ts                              # Execute workflow
npx tsx scripts/verify-sanity-cloudinary-parity.ts                       # Verify
bd update steelmade-ucs --append-notes "Results: X/179 synced"          # Progress update
```

---

### steelmade-880 [P1 EPIC - OPEN]

**Title:** Migrate from Sanity images to Cloudinary URL strings

**Updated with:**

- Architecture correction (Cloudinary already has all 308 images)
- Revised strategy: Find & link existing Cloudinary URLs, not migrate images
- Updated blocking issues status
- Timeline accelerated due to automation

**Commands:**

```bash
bd show steelmade-880                                                    # View epic
bd list --deps steelmade-880                                             # View subtasks
```

---

## Quick Reference

### Check Status

```bash
bd show steelmade-6md              # Categorization
bd show steelmade-ucs              # Image linking
bd show steelmade-880              # Migration epic
bd list --status open              # All open beads
bd ready                           # Ready to work on
```

### Execute Automation

```bash
# Full workflow (recommended)
npx tsx scripts/complete-cloudinary-sync.ts --dry-run       # Preview
npx tsx scripts/complete-cloudinary-sync.ts                 # Execute

# Individual steps
npx tsx scripts/apply-categorization-fixes.ts --execute     # Step 1: Categorize
npx tsx scripts/fetch-cloudinary-images.ts --analyze        # Step 2: Analyze
npx tsx scripts/fetch-cloudinary-images.ts --execute        # Step 2: Execute
```

### Verify & Analyze

```bash
npx tsx scripts/verify-sanity-cloudinary-parity.ts          # Sync check
npx tsx scripts/analyze-sync-gaps.ts                        # Gap analysis
cat sync-gap-analysis.json | jq .summary                    # Quick metrics
```

### Update Beads

```bash
bd update steelmade-6md --append-notes "progress notes"
bd update steelmade-ucs --append-notes "progress notes"
bd close steelmade-6md --reason "70 products categorized"
bd close steelmade-ucs --reason "All products synced"
```

---

## Current State

**Architecture (Corrected):**

- Cloudinary: **308 total assets** (source of truth) ⭐
- Sanity: 179 products (references Cloudinary URLs)

**Asset Allocation (All 308 Accounted For):**

- ✅ Linked: 81 products (26% of assets)
- 🟢 High confidence: 2 products ready to link (< 1 min)
- 🟡 Medium confidence: 19 products to review (1-2 hrs)
- ⚪ Unmapped: 227 images (components, variants, legacy)

**Product Sync Status (179 Products):**

- ✅ With images: 81 products (45%)
- ❌ Old refs: 51 products (28%)
- ❌ No image: 47 products (26%)

**Target:**

- 179/179 products (100%) correctly linked to Cloudinary
- All 308 assets documented/organized

---

## Documentation Files

### Primary References

- [CLOUDINARY-SYNC-STRATEGY.md](docs/CLOUDINARY-SYNC-STRATEGY.md) - Architecture & strategy
- [CLOUDINARY-SYNC-EXEC-SUMMARY.md](CLOUDINARY-SYNC-EXEC-SUMMARY.md) - Quick reference
- [BEADS-REFERENCE.md](BEADS-REFERENCE.md) - This file

### Data Files

- `sync-gap-analysis.json` - Current state & gaps
- `categorization-fixes.json` - 70 products to categorize
- `unmapped-cloudinary-images.json` - 257 unmapped images
- `cloudinary-sanity-matches.json` - 81 matched products

### Available Scripts

- `scripts/complete-cloudinary-sync.ts` - Full automation workflow
- `scripts/apply-categorization-fixes.ts` - Auto-categorize products
- `scripts/fetch-cloudinary-images.ts` - Match & link Cloudinary images
- `scripts/analyze-sync-gaps.ts` - Comprehensive gap analysis
- `scripts/verify-sanity-cloudinary-parity.ts` - Verification tool

---

## Next Actions

### Immediate (NOW)

1. Run: `npx tsx scripts/complete-cloudinary-sync.ts`
2. Review output for success metrics
3. Expected: 45% → 80%+ automated sync

### After Automation

4. Manual review ~20-30 remaining products
5. Update beads:
   - `bd close steelmade-6md --reason "70 products categorized"`
   - `bd update steelmade-ucs --append-notes "Results: X/179 synced"`
6. Verify: `npx tsx scripts/verify-sanity-cloudinary-parity.ts`

### Quality Gates

7. Test website - all products display correctly
8. Document products genuinely without images
9. Final verification: 100% products on Cloudinary
10. Close steelmade-ucs when complete

---

## Key Insight

**What was corrected:**

- ❌ OLD: Migrate images from Sanity CDN to Cloudinary
- ✅ NEW: Find existing Cloudinary URLs and link to Sanity products

Cloudinary already has all 308 images. We just need to update Sanity product records to reference the correct Cloudinary URLs. No image migration needed!
