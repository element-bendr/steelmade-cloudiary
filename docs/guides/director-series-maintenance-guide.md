# Director Series Maintenance Guide

This document provides guidelines for maintaining the Director Series implementation and avoiding common issues.

## File Structure

The Director Series follows this file structure:

```
lib/
  ├── factories/
  │   └── chairFactory.ts        # Chair factory functions and interfaces
  └── data/
      └── products/
          └── chairs/
              └── director-series/
                  ├── index.ts   # Chair registry and exports
                  ├── ashley.ts  # Individual chair data
                  ├── opera.ts
                  ├── tycoon.ts
                  ├── bigboss-gold.ts
                  ├── woodland.ts
                  └── boston.ts

app/
  └── chairs/
      └── director-series/
          ├── page.tsx           # Director series overview page
          ├── ashley/
          │   └── page.tsx       # Individual chair pages
          ├── opera/
          │   └── page.tsx
          ├── tycoon/
          │   └── page.tsx
          ├── bigboss-gold/
          │   └── page.tsx
          ├── woodland/
          │   └── page.tsx
          └── boston/
              └── page.tsx

components/
  └── products/
      ├── ChairCard.tsx          # Chair card for overview page
      ├── ChairDetail.tsx        # Chair detail component
      └── ChairPageLayout.tsx    # Layout wrapper for chair pages
```

## Common Maintenance Tasks

### Adding a New Chair

1. Create a new chair data file in `lib/data/products/chairs/director-series/`
2. Use the chairFactory to create the chair data
3. Register the chair with registerDirectorChair
4. Create a new chair page in `app/chairs/director-series/`
5. Add the chair import to the director series page
6. Test the new chair renders correctly

### Updating an Existing Chair

1. Locate the chair's data file in `lib/data/products/chairs/director-series/`
2. Update the chair data as needed
3. Test the chair renders correctly on both overview and detail pages

### Modifying Chair Layout Components

1. Update the relevant component in `components/products/`
2. Test across all chair pages to ensure consistent behavior
3. Update documentation if component interface changes

## Best Practices

### Import Order

When working with the `index.ts` file:

1. **Define functions before imports**: Always place function definitions before importing chair files
2. **Order imports alphabetically**: Keep imports organized for better readability
3. **Comment imports clearly**: Add comments to indicate the purpose of each import

### Chair Registration

1. **Register chairs in their own files**: Each chair should register itself using the registerDirectorChair function
2. **Don't manually modify directorSeriesChairs**: Use the registerDirectorChair function instead
3. **Check for duplicates**: Before adding a new chair, verify it doesn't already exist

### Data Structure Consistency

1. **Use the factory pattern**: Always use createDirectorChair to ensure consistent data structure
2. **Maintain variant consistency**: Keep variant IDs consistent across chairs (e.g., 'high-back', 'mid-back')
3. **Follow naming conventions**: Use kebab-case for IDs and descriptive names for display

## Troubleshooting Common Issues

### Duplicate Function Definitions

If you encounter duplicate function errors:

1. Check import order in index.ts
2. Ensure function definitions come before imports
3. Look for multiple exports of the same function

### Chair Not Displaying

If a chair doesn't appear on the overview page:

1. Verify it's being properly registered
2. Check that it's imported in the director series page
3. Ensure the chair data has all required fields

### Styling Inconsistencies

If chair styling appears inconsistent:

1. Check that all chair pages use the ChairPageLayout component
2. Verify proper props are passed to components
3. Inspect the ChairDetail component for styling issues

## Performance Considerations

1. **Lazy load chair data**: Consider lazy loading for better performance
2. **Optimize images**: Ensure Cloudinary images use proper optimization parameters
3. **Memoize components**: Use React.memo for frequently re-rendered components

## Documentation Updates

When making changes to the Director Series:

1. Update relevant documentation files in the docs directory
2. Add comments to code explaining complex logic
3. Keep this maintenance guide updated with new patterns or practices