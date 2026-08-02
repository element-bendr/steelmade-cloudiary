type TrackingEvent = {
  name: string;
  category?: string;
  label?: string;
  value?: number;
  properties?: Record<string, unknown>;
}

export function trackEvent({ name, category, label, value, properties }: TrackingEvent) {
  // Integration with your analytics provider (e.g., Google Analytics)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, {
      event_category: category,
      event_label: label,
      value,
      ...properties
    })
  }
}

export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      page_path: url
    })
  }
}

// Product specific tracking
export function trackProductView(product: { id: string; title: string; category: string }) {
  trackEvent({
    name: 'product_view',
    category: 'Product',
    label: product.title,
    properties: {
      product_id: product.id,
      product_category: product.category
    }
  })
}

export function trackAddToCart(product: { id: string; title: string; price: number }) {
  trackEvent({
    name: 'add_to_cart',
    category: 'Ecommerce',
    label: product.title,
    value: product.price,
    properties: {
      product_id: product.id
    }
  })
}