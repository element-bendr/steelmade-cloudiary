# UI Implementation Guide

This guide provides practical implementation details for developers working on the SteelMade Cloudiary Chairs application.

## Getting Started

### Brand Colors

Use Tailwind utility classes for consistent brand colors:

```jsx
// Primary brand color (red)
<button className="bg-red-700 text-white">Click Me</button>

// Secondary colors
<div className="bg-gray-50 dark:bg-gray-800">Content here</div>
```

### Typography

Use Tailwind classes for typography with consistent sizing:

```jsx
// Headings
<h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Page Title</h1>
<h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Section Title</h2>

// Body text
<p className="text-base text-gray-700 dark:text-gray-300">Regular paragraph text</p>
<p className="text-sm text-gray-600 dark:text-gray-400">Smaller text for secondary information</p>
```

### Spacing

Use consistent spacing with Tailwind:

```jsx
// Margin
<div className="mt-4 mb-8">Vertical spacing</div>
<div className="mx-4">Horizontal spacing</div>

// Padding
<div className="p-6">Padding on all sides</div>
<div className="px-4 py-6">Horizontal and vertical padding</div>

// Gap (for grids and flex)
<div className="flex gap-4">Items with gap</div>
<div className="grid grid-cols-2 gap-6">Grid with gap</div>
```

## Component Examples

### Standard Button

```jsx
<button
  className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md transition-colors"
  onClick={handleClick}
>
  Click Me
</button>
```

### Secondary Button

```jsx
<button
  className="px-4 py-2 bg-white hover:bg-gray-50 text-red-700 border border-red-700 rounded-md transition-colors"
  onClick={handleClick}
>
  Click Me
</button>
```

### Card Component

```jsx
<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Card Title</h3>
  <p className="text-gray-700 dark:text-gray-300">Card content goes here...</p>
  {/* Card footer */}
  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
    <button className="text-red-700 hover:text-red-800 font-medium">Learn More</button>
  </div>
</div>
```

### Form Elements

```jsx
{/* Input */}
<div className="mb-4">
  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
    Name
  </label>
  <input
    id="name"
    type="text"
    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
    placeholder="Enter your name"
  />
</div>

{/* Select */}
<div className="mb-4">
  <label htmlFor="variant" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
    Variant
  </label>
  <select
    id="variant"
    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
  >
    <option value="">Select a variant</option>
    <option value="high-back">High Back</option>
    <option value="medium-back">Medium Back</option>
  </select>
</div>
```

## Responsive Design

### Breakpoints

Use Tailwind's responsive prefixes:

```jsx
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {/* Grid items */}
</div>

// Text size adjustments
<h1 className="text-2xl md:text-3xl lg:text-4xl">Responsive Heading</h1>

// Element visibility
<div className="hidden md:block">Only visible on medium screens and up</div>
<div className="md:hidden">Only visible on small screens</div>
```

## Accessibility Best Practices

### Keyboard Navigation

```jsx
// Ensure proper focus styles
<button
  className="px-4 py-2 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-white rounded-md transition-colors"
  onClick={handleClick}
>
  Accessible Button
</button>
```

### Screen Readers

```jsx
{/* Hidden text for screen readers */}
<span className="sr-only">Product details</span>

{/* Aria attributes */}
<button
  aria-label="Close dialog"
  onClick={closeDialog}
>
  <XIcon className="h-5 w-5" />
</button>
```

## Common UI Patterns

### Loading State

```jsx
{isLoading ? (
  <div className="flex items-center justify-center h-40">
    <div className="w-10 h-10 border-4 border-gray-300 border-t-red-700 rounded-full animate-spin"></div>
  </div>
) : (
  // Content
)}
```

### Error State

```jsx
{error && (
  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-6">
    <div className="flex">
      <div className="flex-shrink-0">
        <ExclamationIcon className="h-5 w-5 text-red-700" />
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Error</h3>
        <p className="mt-2 text-sm text-red-700 dark:text-red-200">{error}</p>
      </div>
    </div>
  </div>
)}
```

## CSS Variables for Theming

Add these to your global CSS:

```css
:root {
  --color-primary: #B91C1C;
  --color-primary-dark: #991B1B;
  --color-secondary: #1F2937;
  --color-background: #F9FAFB;
  --color-surface: #FFFFFF;
  --color-error: #EF4444;
  --color-success: #10B981;
  --color-warning: #F59E0B;
}

.dark {
  --color-primary: #EF4444;
  --color-primary-dark: #DC2626;
  --color-secondary: #E5E7EB;
  --color-background: #111827;
  --color-surface: #1F2937;
  --color-error: #F87171;
  --color-success: #34D399;
  --color-warning: #FBBF24;
}
```

## Code Organization

### Component Structure

```
components/
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── ... (other base components)
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ... (layout components)
└── products/
    ├── ProductCard.tsx
    ├── ProductGrid.tsx
    ├── ProductDetail.tsx
    └── ... (product-specific components)
```

### Performance Considerations

1. Use `React.memo()` for components that render often but rarely change
2. Implement virtualization for long lists using `react-window` or similar
3. Use Next.js Image component for optimized images
4. Lazy load components that aren't immediately visible
5. Implement proper code-splitting using dynamic imports