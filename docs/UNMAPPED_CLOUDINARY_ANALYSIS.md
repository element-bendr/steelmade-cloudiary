# Unmapped Cloudinary Images Analysis

This document explains how to use the `analyze-unmapped-cloudinary.ts` script to identify and map the unmapped Cloudinary images to Sanity products.

## Overview

The script analyzes the gap between Cloudinary images and Sanity product assignments:

- **Total Cloudinary Images**: 308
- **Currently Matched**: 51 (from `cloudinary-sanity-matches.json`)
- **Unmapped**: 257 images
- **Products Needing Images**: 128

## Usage

```bash
npx tsx scripts/analyze-unmapped-cloudinary.ts
```

## Output

The script generates `unmapped-cloudinary-images.json` with:

### 1. Overall Statistics

- Total count of Cloudinary images
- Number of matched vs unmapped images
- Products still needing images

### 2. Unmapped Images by Folder

Groups unmapped images by their Cloudinary folder structure:

```
steelmade/workstations/desk based workstation legs: 23 images
steelmade/chairs/ergonomic-series/honda: 5 images
...
```

### 3. Suggested Mappings

AI-powered suggestions for matching images to products:

**High Confidence**: Exact slug matches

- `50MM_PANEL_BASED_PARTITION` → `50mm-panel-based-partition`

**Medium Confidence**: Partial matches

- `three-drawerpedestal02` → `three-drawerpedestal`

**Low/Manual Review**: No clear match found

- Requires human review of folder structure and product catalog

### 4. Products Needing Images

List of 128 products without any Cloudinary images:

- 70 uncategorized products (blocked by steelmade-6md)
- 29 chairs
- 23 modular-furniture items
- 4 storage-solutions
- 2 desks

## Next Steps

### 1. Review High-Confidence Matches

```bash
jq '.suggestedMappings | map(select(.confidence == "high"))' unmapped-cloudinary-images.json
```

These can likely be applied automatically with a follow-up script.

### 2. Review Medium-Confidence Matches

```bash
jq '.suggestedMappings | map(select(.confidence == "medium"))' unmapped-cloudinary-images.json
```

These need manual verification before application.

### 3. Analyze Unmapped Folders

```bash
jq '.unmappedByFolder | keys' unmapped-cloudinary-images.json
```

Check if images in specific folders (e.g., `steelmade/chairs/ergonomic-series/honda`) should create new products or be matched to existing ones.

### 4. Address Products Needing Images

```bash
jq '.productsNeedingImages | group_by(.category) | map({category: .[0].category, count: length})' unmapped-cloudinary-images.json
```

For the 128 products without images:

- Wait for `steelmade-6md` to categorize the 70 uncategorized products
- Search for matching images in unmapped pool
- Request new product photography if no matches exist

## Integration with Other Scripts

This analysis complements:

- `fetch-cloudinary-images.ts` - Initial sync (51 matched)
- `assign-cloudinary-images.ts` - Automated migration tool
- `verify-sanity-cloudinary-parity.ts` - Verify matches after assignment

## Report Structure

```json
{
  "timestamp": "2026-03-05T...",
  "totalCloudinaryImages": 308,
  "matched": 51,
  "unmapped": 257,
  "unmappedByFolder": {
    "folder/path": [array of CloudinaryAsset objects]
  },
  "suggestedMappings": [
    {
      "cloudinaryImage": "public_id",
      "cloudinaryUrl": "full_url",
      "cloudinaryFolder": "folder",
      "suggestedProduct": "slug",
      "suggestedProductName": "name",
      "confidence": "high|medium|low",
      "reason": "explanation"
    }
  ],
  "productsNeedingImages": [array of products],
  "summary": {
    "topFolders": [...],
    "imageFormats": {...}
  }
}
```

## Automation Opportunities

Based on this analysis, you can:

1. **Create auto-assign script** for high-confidence matches (2 images)
2. **Create manual review workflow** for medium-confidence matches (19 images)
3. **Identify orphaned images** that may need new products created
4. **Bulk-assign by folder** for series products (e.g., all Honda chair variants)

## Example Queries

**Find all chair images:**

```bash
jq '.unmappedByFolder | to_entries | map(select(.key | contains("chairs")))' unmapped-cloudinary-images.json
```

**Count unmapped by format:**

```bash
jq '.summary.imageFormats' unmapped-cloudinary-images.json
```

**Products by category needing images:**

```bash
jq '.productsNeedingImages | group_by(.category) | map({category: .[0].category, products: map(.name)})' unmapped-cloudinary-images.json
```
