# File Naming Convention Issues

Found 30 files with naming convention issues:

## General Issues

| File | Issue | Recommendation |
|------|-------|----------------|
| `.gitignore` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `.prettierrc` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `.roo/rules-architect/architect-rules` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `.roo/rules-ask/ask-rules` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `.roo/rules-boomerang/boomerang-rules` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `.roo/rules-code/code-rules` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `.roo/rules-debug/debug-rules` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `.roo/rules-test/test-rules` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `.roomodes` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `.taskmasterconfig` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `.windsurfrules` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `temp-backup/.gitignore` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `temp-backup/.prettierrc` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `temp-backup/.roo/rules-architect/architect-rules` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `temp-backup/.roo/rules-ask/ask-rules` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `temp-backup/.roo/rules-boomerang/boomerang-rules` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `temp-backup/.roo/rules-code/code-rules` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `temp-backup/.roo/rules-debug/debug-rules` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `temp-backup/.roo/rules-test/test-rules` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `temp-backup/.roomodes` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `temp-backup/.taskmasterconfig` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |
| `temp-backup/.windsurfrules` | File name contains unusual characters | Use alphanumeric characters, hyphens, underscores, and periods only |

## Temporary File Issues

| File | Issue | Recommendation |
|------|-------|----------------|
| `app/chairs/director-series/page.tsx.bak` | File name contains temporary indicators (-new, .bak, -fixed, etc.) | Rename to remove temporary indicators or consolidate with the canonical version |
| `components/products/SeriesCard.tsx.bak` | File name contains temporary indicators (-new, .bak, -fixed, etc.) | Rename to remove temporary indicators or consolidate with the canonical version |
| `docs/package.json.backup` | File name contains temporary indicators (-new, .bak, -fixed, etc.) | Rename to remove temporary indicators or consolidate with the canonical version |
| `lib/data/products/chairs/director-series/index.ts.bak` | File name contains temporary indicators (-new, .bak, -fixed, etc.) | Rename to remove temporary indicators or consolidate with the canonical version |
| `temp-backup/components/products/SeriesCard.tsx.bak` | File name contains temporary indicators (-new, .bak, -fixed, etc.) | Rename to remove temporary indicators or consolidate with the canonical version |
| `temp-backup/docs/package.json.backup` | File name contains temporary indicators (-new, .bak, -fixed, etc.) | Rename to remove temporary indicators or consolidate with the canonical version |

## Versioned File Issues

| File | Issue | Recommendation |
|------|-------|----------------|
| `components/ui/optimized-product-image-v2.tsx` | File name contains version numbers | Use git for versioning instead of including version numbers in file names |
| `temp-backup/components/ui/optimized-product-image-v2.tsx` | File name contains version numbers | Use git for versioning instead of including version numbers in file names |

## How to Fix

1. Rename files to follow the conventions outlined in file-consolidation-best-practices.md
2. Update any imports that reference these files
3. Run this linter again to verify the issues are resolved
4. For temporary files, consider consolidating with the canonical version

## Reference

See file-consolidation-best-practices.md for comprehensive naming conventions.
