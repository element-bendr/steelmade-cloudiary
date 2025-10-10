# Director Series Chair Styling Standardization

This document outlines the standardized styling approach for all director series chair pages, based on the Opera Director Chair design as the reference standard.

## Design Guidelines

### 1. Consistent Layout Structure

All director series chair pages now follow a consistent layout pattern:

- Single product image display on the left
- Product details section on the right
- Consistent spacing and typography
- No price display as per new design guidelines
- Custom section with bullet-point features list

### 2. Standardized Custom Sections

Each chair page includes a custom section that follows this structure:

```jsx
const renderCustomSection = () => {
  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <h3 className="text-lg font-medium text-gray-900">[Chair Name] Premium Features</h3>
      <p className="text-gray-600">
        [Description paragraph about the chair]
      </p>
      <ul className="mt-3 space-y-1 list-disc list-inside text-gray-600 pl-2">
        <li>[Feature 1]</li>
        <li>[Feature 2]</li>
        <li>[Feature 3]</li>
      </ul>
    </div>
  );
};
```

### 3. Brand Color Usage

- SteelMade red (`#B91C1C`/`text-red-700`) is used for:
  - Buttons
  - Links
  - Selected variant text
  - Interactive elements

### 4. Typography Standards

- Product name: Large (text-3xl), bold, dark gray (`text-gray-900`)
- Description: Regular weight, medium gray (`text-gray-600`)
- Section headers: Medium size (text-lg), medium weight, dark gray
- Feature lists: Regular size, medium gray with bullet points

### 5. Image Display

- Consistent aspect-square ratio
- Overflow hidden with rounded corners
- Red decorator in top right corner
- Proper loading and error states

## Implementation Checklist

All chair pages have been updated to follow these standards:

- [x] Opera Director Chair (reference design)
- [x] Woodland Director Chair
- [x] Tycoon Director Chair
- [x] Ashley Director Chair
- [x] BigBoss Gold Director Chair

## Removed Elements

As part of the standardization, the following elements have been removed:

- **Price Display**: Removed from all chair pages per new design guidelines
- **Amber/Gold Styling**: Replaced with standard styling in BigBoss Gold page
- **Inconsistent Layouts**: All pages now use the same layout structure
- **Debugging Components**: Removed debugging tools from production pages

## Technical Implementation

All chair pages now use the centralized `ProductDetailLayout` component with consistent props:

```jsx
<ProductDetailLayout
  product={{
    ...chairData,
    price: chairData.price || 'Price on request', // Required for type system but not displayed
    imageUrl: chairData.imageUrl || '/images/chairs/placeholder.jpg',
  }}
  contactOptions={{
    onContactClick: () => setShowContactForm(true),
  }}
  renderCustomSection={renderCustomSection}
/>
```

## Benefits of Standardization

1. **Consistent User Experience**: Users encounter the same UI patterns across all chair pages
2. **Improved Brand Recognition**: Consistent use of SteelMade red strengthens brand identity
3. **Reduced Information Overload**: Focused presentation without price display
4. **Easier Maintenance**: Changes to styling can be made in one central location
5. **Streamlined Development**: New chair pages can be created following established patterns