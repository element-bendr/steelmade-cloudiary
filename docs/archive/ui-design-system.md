# UI Design System

This document outlines the UI design system for the SteelMade Cloudiary Chairs application, with a focus on creating a consistent, modular approach to UI elements.

## Color System

### Primary Colors

- **Primary Red**: `#B91C1C` - Used for accents, interactive elements, and branding
- **Primary Red (Dark)**: `#991B1B` - Used for hover states and emphasis

### Secondary Colors

- **Gray Light**: `#F9FAFB` - Primary background color
- **Gray Medium**: `#E5E7EB` - Borders and subtle accents
- **Gray Dark**: `#1F2937` - Text and primary content

### System Colors

- **Success**: `#10B981` - Used for success states and confirmations
- **Warning**: `#F59E0B` - Used for warnings and important notices
- **Error**: `#EF4444` - Used for error states and critical information

## Typography

### Font Families

- **Primary**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` - Used for all body text and headings

### Font Sizes

- **xs**: `0.75rem` (12px) - Fine print, captions
- **sm**: `0.875rem` (14px) - Secondary text, labels
- **base**: `1rem` (16px) - Body text
- **lg**: `1.125rem` (18px) - Large body text, subheadings
- **xl**: `1.25rem` (20px) - Small headings
- **2xl**: `1.5rem` (24px) - Medium headings
- **3xl**: `1.875rem` (30px) - Large headings
- **4xl**: `2.25rem` (36px) - Extra large headings

### Font Weights

- **normal**: `400` - Regular text
- **medium**: `500` - Emphasized text
- **semibold**: `600` - Subheadings
- **bold**: `700` - Headings

## Spacing System

Based on a 4px unit scale (using Tailwind's scale):

- **0**: `0px`
- **1**: `0.25rem` (4px)
- **2**: `0.5rem` (8px)
- **3**: `0.75rem` (12px)
- **4**: `1rem` (16px)
- **6**: `1.5rem` (24px)
- **8**: `2rem` (32px)
- **12**: `3rem` (48px)
- **16**: `4rem` (64px)

## Component System

### Buttons

- **Primary Button**: Red background (`bg-red-700`), white text, rounded corners
- **Secondary Button**: White background, red text, red border
- **Tertiary Button**: No background, red text

### Cards

- **Standard Card**: White background, subtle shadow, rounded corners
- **Featured Card**: White background, larger shadow, rounded corners, red accent
- **Glassmorphic Card**: Semi-transparent background, backdrop filter, soft shadow

### Forms

- **Input**: White background, medium gray border, rounded corners
- **Select**: White background, medium gray border, rounded corners, custom dropdown icon
- **Checkbox**: Custom design with red accent when checked
- **Radio**: Custom design with red accent when selected

## Product UI Patterns

### Grid Pages

- Two-column grid on mobile, three-column on tablet, four-column on desktop
- Consistent card sizing
- Subtle hover effects

### Detail Pages

- Two-column layout on desktop (image left, details right)
- Single column on mobile (image top, details bottom)
- Consistent spacing between sections
- Clear visual hierarchy

## Animation Guidelines

- **Transitions**: `transition-all duration-300` for most state changes
- **Hover Effects**: Subtle scale or shadow changes
- **Page Transitions**: Fade in, slide in from bottom
- **Loading States**: Use branded loading spinners

## Accessibility Requirements

- Ensure color contrast meets WCAG 2.1 AA standards
- Include focus states for keyboard navigation
- Use semantic HTML elements
- Provide alternative text for images
- Use ARIA attributes when necessary

## Usage Examples

### Button Example

```jsx
<button className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md transition-colors">
  Contact Us
</button>
```

### Card Example

```jsx
<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Card Title</h2>
  <p className="text-gray-600 dark:text-gray-300">Card content goes here...</p>
</div>
```

### Product Grid Example

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
```