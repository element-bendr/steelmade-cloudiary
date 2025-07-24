# Pricing Strategy: "Request a Quote"

## Overview

This document outlines the decision to standardize the pricing model across all product detail pages. Instead of displaying specific prices for products, we will be using a "Request a Quote" call-to-action.

## Rationale

The primary reasons for this approach are:

1.  **B2B Focus:** Our target audience consists of businesses, designers, and distributors who often purchase in bulk or require custom configurations. A "Request a Quote" model is better suited for these complex transactions.
2.  **Price Fluctuation:** Material and manufacturing costs can vary. This model allows for flexibility without constantly updating prices on the website.
3.  **Lead Generation:** Requiring a quote request is an effective way to capture qualified leads and initiate a conversation with potential clients.
4.  **Competitive Advantage:** It prevents competitors from easily scraping our pricing information.

## Implementation

- All product detail pages (PDPs) will have the price display removed or hidden.
- The primary call-to-action (CTA) button will be "Request a Quote" or a similar phrase like "Contact for Pricing".
- This CTA will typically open the main contact form, potentially pre-filling the subject with the product name for better context.

## Consistency Check

All new and existing product pages should be reviewed to ensure they adhere to this standard. The `ProductDetailLayout` component has been updated to support hiding the price and customizing the CTA.

**Example:**

```tsx
<ProductDetailLayout
  product={{
    ...productData,
    price: '', // Set price to an empty string to hide it
  }}
  contactOptions={{
    onContactClick: () => setShowContactForm(true),
    contactButtonText: 'Request a Quote',
  }}
  // ... other props
/>
```

This ensures a consistent, professional experience for our B2B audience and aligns with our lead generation goals.
