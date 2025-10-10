# Director Series Rebuild Plan

## Overview

This document outlines the plan to rebuild the Director Series chair collection with consistent styling, data structure, and component usage. The current implementation suffers from inconsistent styling and varying implementation patterns, which creates maintenance challenges and an inconsistent user experience.

## Current Issues

1. **Inconsistent Styling**:
   - Different visual treatments across chair pages
   - Inconsistent use of SteelMade brand colors
   - Varying layout structures and spacing
   - Different component implementations for the same functionality

2. **Data Structure Inconsistencies**:
   - Varying property names and data structures
   - Inconsistent handling of variants
   - Different approaches to image management
   - Lack of standardized interfaces

3. **Component Usage Variations**:
   - Some pages use ProductDetailLayout while others don't
   - Different implementations of variant selectors
   - Inconsistent feature list presentations
   - Varying approaches to responsive design

## Implementation Plan

### Phase 1: Documentation and Preparation

1. **Catalog Existing Chairs**:
   - Document all chair models, variants, and features
   - Capture all Cloudinary image URLs
   - Note any chair-specific customizations
   - Create a reference document for consistent reimplementation

2. **Define Standardized Data Structure**:
   - Create a consistent Chair interface
   - Standardize variant structure
   - Define image URL patterns
   - Document required and optional fields

3. **Design Component Standards**:
   - Define consistent layout patterns
   - Establish styling guidelines using SteelMade brand colors
   - Create component usage documentation
   - Establish accessibility standards

### Phase 2: Implementation of Core Systems

1. **Chair Factory Implementation**:
   - Create `createDirectorChair` factory function
   - Implement Cloudinary URL generator
   - Add validation for required fields
   - Create documentation for factory pattern usage

2. **Standardized Component Library**:
   - Implement reusable chair components
   - Create consistent styling across all components
   - Ensure proper responsive behavior
   - Add comprehensive prop interfaces

3. **Page Template Development**:
   - Create standardized chair detail page template
   - Implement consistent director series grid
   - Add proper loading and error states
   - Ensure accessibility compliance

### Phase 3: Chair Reimplementation

For each chair (Ashley, Opera, Tycoon, BigBoss Gold, Woodland, Boston):

1. **Chair Data Creation**:
   - Use factory function to generate chair data
   - Ensure consistent variant structure
   - Validate against standardized interface
   - Apply consistent naming conventions

2. **Detail Page Implementation**:
   - Create chair detail page using standardized template
   - Implement consistent variant selection
   - Apply standardized feature list
   - Ensure proper image display

3. **Testing and Validation**:
   - Verify consistent styling
   - Test responsive behavior
   - Ensure accessibility compliance
   - Validate proper data flow

### Phase 4: Documentation and Finalization

1. **Implementation Documentation**:
   - Document all implementation details
   - Create usage examples for future chair additions
   - Add troubleshooting guidelines
   - Update architecture documentation

2. **Quality Assurance**:
   - Conduct final review of all chair pages
   - Ensure consistent styling across all pages
   - Verify consistent behavior of all interactive elements
   - Test across different screen sizes and devices

## Styling Standards

### Colors
- Primary Brand Color: #B91C1C (SteelMade Red)
- Background: White (#FFFFFF)
- Text: Dark Gray (#1F2937)
- Muted Text: Medium Gray (#6B7280)
- Decorative Elements: SteelMade Red with reduced opacity

### Typography
- Headings: Font-semibold, text-gray-900
- Body Text: text-gray-700
- Feature Items: text-gray-600
- Variant Selection: text-red-700 when selected, text-gray-500 when not selected

### Layout
- Two-column layout on desktop (image left, details right)
- Single column on mobile (stack vertically)
- Consistent spacing between sections
- Grid-based feature list (2 columns on desktop, 1 on mobile)

### Components
- Consistent ProductDetailLayout for all chair pages
- Standardized ChairVariantSelector for variant selection
- Unified ChairImageDisplay with decorative rectangle
- Consistent ChairFeatureList with grid layout
- Standardized ChairContactButton with variant display

## Cloudinary URL Pattern

All chair images will follow this pattern:
```
https://res.cloudinary.com/dqde19mfs/image/upload/v{version}/steelmade/chairs/director-series/{chair-name}/{image-id}.jpg
```

Where:
- `{version}` is the Cloudinary version number
- `{chair-name}` is the lowercase, hyphenated chair name (e.g., "ashley", "big-boss-gold")
- `{image-id}` includes the image code and variant identifier (e.g., "ic-339-mb" for mid-back)

## Factory Function Usage

Example of creating a chair using the factory pattern:

```typescript
const ashleyChair = createDirectorChair({
  id: 'ashley',
  name: 'Ashley Director Chair',
  description: 'Premium director chair with elegant design and superior comfort.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-123-hb'
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-124-mb'
    }
  ],
  features: [
    'Premium aluminum frame',
    'Ergonomic design',
    'Weather-resistant materials',
    'Foldable for easy storage',
    'Available in multiple variants',
    'Durable construction'
  ]
});
```

This approach ensures consistent data structure and simplifies the addition of new chairs in the future.