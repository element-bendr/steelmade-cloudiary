# Fixing Dynamic Route Parameter Inconsistencies

This guide provides step-by-step instructions to fix the error:

```
Error: You cannot use different slug names for the same dynamic path ('productType' !== 'categoryId').
```

## Understanding the Issue

Next.js requires consistent parameter naming across dynamic routes. If you have two routes like:

- `/app/[productType]/page.tsx`
- `/app/[categoryId]/page.tsx`

Next.js will generate an error because the parameter names in the same position are different.

## Manual Fix Instructions

### 1. Identify Inconsistent Parameter Names

First, identify all the directories with dynamic parameters using this command:

```bash
find ./app -type d -name "[[]*[]]*"
```

### 2. Rename Dynamic Route Directories

Rename any directories using `[productType]` to use `[categoryId]` instead:

```bash
# Example: Rename [productType] to [categoryId]
mv ./app/[productType] ./app/[categoryId]
mv ./app/[productType]/[series] ./app/[categoryId]/[seriesId]
```

### 3. Update Parameter References in Files

After renaming directories, you'll need to update all parameter references in your code.

Find files that use the old parameter names:

```bash
grep -r "productType" --include="*.tsx" --include="*.ts" ./app
```

In each file, update:

- Parameter destructuring: 
  - `const { productType } = params` → `const { categoryId } = params`

- Interface definitions: 
  - `params: { productType: string }` → `params: { categoryId: string }`

- Parameter usage:
  - `productType.charAt(0)` → `categoryId.charAt(0)`
  - `params.productType` → `params.categoryId`

### 4. Use Consistent Parameter Naming Convention

Follow this convention for all dynamic routes:

| URL Level | Parameter Name |
|-----------|---------------|
| First level (category) | `categoryId` |
| Second level (series) | `seriesId` |
| Third level (product) | `productId` |
| Fourth level (variant) | `variantId` |

### 5. Test Your Routes

After making these changes, test your application to ensure all routes work correctly:

```bash
npm run dev
```

## Automated Fix

If you prefer an automated solution, run:

```bash
node scripts/fix-param-inconsistencies.js
```

This script will:
1. Find all dynamic route directories
2. Rename directories with inconsistent parameter names
3. Update parameter references in files

Make sure to backup your code before running this script!

## Prevention

To prevent this issue in the future:
- Document parameter naming conventions (see `docs/dynamic-route-conventions.md`)
- Use the utility functions in `lib/routes/route-config.ts` for consistent parameter handling
- Review PRs for adherence to the naming conventions