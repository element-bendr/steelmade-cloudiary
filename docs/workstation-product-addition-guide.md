# Workstation Product Addition Guide

This guide ensures you can add new products to the workstation lineup (or any category) in a canonical, robust way.

---

## 1. Create Product Data File
- **Path:** `lib/data/products/modular-furniture/workstations/[new-product]/index.ts`
- **Structure:**
```typescript
const newProduct = {
  id: 'unique-id',
  name: 'Product Name',
  description: 'Description...',
  category: 'workstations',
  seriesId: 'modular-furniture',
  imageUrl: 'https://cloudinary.com/image.png',
  gallery: [
    { url: 'https://cloudinary.com/image1.png', alt: 'Image 1' },
    { url: 'https://cloudinary.com/image2.png', alt: 'Image 2' }
  ],
  variants: [
    { variantId: 'v1', variantName: 'Variant 1', imageUrl: '...', specifications: { ... } }
  ],
  features: [ 'Feature 1', 'Feature 2' ],
  specifications: { ... }
};
export default newProduct;
```

---

## 2. Register Product in Series Index
- **Edit:** `lib/data/products/modular-furniture/workstations/index.ts`
- **Add:**
```typescript
import newProduct from './[new-product]/index';
export const products = [newProduct, ...otherProducts];
```

---

## 3. Create Product Page
- **Path:** `app/modular-furniture/workstations/[new-product]/page.tsx`
- **Use:**
```tsx
import ProductDetailLayout from '../../../../components/products/ProductDetailLayout';
import newProduct from '../../../../lib/data/products/modular-furniture/workstations/[new-product]/index';

export default function NewProductPage() {
  return (
    <ProductDetailLayout
      product={newProduct}
      layoutOptions={{ imagePosition: 'left' }}
    />
  );
}
```

---

## 4. Upload Images to Cloudinary
- Use direct Cloudinary URLs in your product data.

---

## 5. Restart Server
- Run `npm run dev` after adding new products.

---

## 6. Test Product Page
- Visit the product page in your browser and confirm all images, features, and variants display correctly.

---

## 7. Breadcrumbs & UI
- Breadcrumbs and gallery will automatically reflect the correct product hierarchy and images.

---

## Template
```typescript
const product = {
  id: '',
  name: '',
  description: '',
  category: 'workstations',
  seriesId: 'modular-furniture',
  imageUrl: '',
  gallery: [
    { url: '', alt: '' },
  ],
  variants: [
    { variantId: '', variantName: '', imageUrl: '', specifications: {} },
  ],
  features: [],
  specifications: {},
};
export default product;
```

---

## Example: Adding Elevate Series Workstation

### 1. Product Data File
- **Path:** `lib/data/products/modular-furniture/workstations/elevate-series/index.ts`
- **Structure:**
```typescript
const elevateSeries = {
  id: 'elevate-series',
  name: 'Elevate Series Workstation',
  description: 'The Elevate Series Workstation offers modern design, robust steel legs, and flexible configurations for dynamic workspaces.',
  category: 'workstations',
  seriesId: 'modular-furniture',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355090/steelmade/workstations/desk%20based%20workstation%20legs/elevate-series1.png',
  gallery: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355090/steelmade/workstations/desk%20based%20workstation%20legs/elevate-series1.png', alt: 'Elevate Series Workstation 1' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355089/steelmade/workstations/desk%20based%20workstation%20legs/elevate-series2.png', alt: 'Elevate Series Workstation 2' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355088/steelmade/workstations/desk%20based%20workstation%20legs/elevate-series3.png', alt: 'Elevate Series Workstation 3' }
  ],
  variants: [
    {
      variantId: 'elevate-series1',
      variantName: 'Elevate Series 1',
      name: 'Elevate Series Workstation 1',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355090/steelmade/workstations/desk%20based%20workstation%20legs/elevate-series1.png',
      specifications: {
        'Leg Type': 'Steel',
        'Surface': 'Engineered wood',
        'Series': 'Elevate'
      }
    },
    {
      variantId: 'elevate-series2',
      variantName: 'Elevate Series 2',
      name: 'Elevate Series Workstation 2',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355089/steelmade/workstations/desk%20based%20workstation%20legs/elevate-series2.png',
      specifications: {
        'Leg Type': 'Steel',
        'Surface': 'Engineered wood',
        'Series': 'Elevate'
      }
    },
    {
      variantId: 'elevate-series3',
      variantName: 'Elevate Series 3',
      name: 'Elevate Series Workstation 3',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355088/steelmade/workstations/desk%20based%20workstation%20legs/elevate-series3.png',
      specifications: {
        'Leg Type': 'Steel',
        'Surface': 'Engineered wood',
        'Series': 'Elevate'
      }
    }
  ],
  features: [
    'Modern design',
    'Robust steel legs',
    'Flexible configurations',
    'Easy assembly'
  ],
  specifications: {
    'Material': 'Steel, engineered wood',
    'Dimensions': 'Customizable',
    'Warranty': '3 years'
  }
};
export default elevateSeries;
```

### 2. Register in Series Index
- **Edit:** `lib/data/products/modular-furniture/workstations/index.ts`
- **Add:**
```typescript
import elevateSeries from './elevate-series/index';
// ...
products: {
  [marvelWorkstation.id]: marvelWorkstation,
  [elevateSeries.id]: elevateSeries
}
```

### 3. Create Product Page
- **Path:** `app/modular-furniture/workstations/elevate-series/page.tsx`
- **Use:**
```tsx
import ProductDetailLayout from '../../../../components/products/ProductDetailLayout';
import elevateSeries from '../../../../lib/data/products/modular-furniture/workstations/elevate-series/index';

export default function ElevateSeriesPage() {
  return (
    <ProductDetailLayout
      product={elevateSeries}
      layoutOptions={{ imagePosition: 'left' }}
    />
  );
}
```

---

## Example: Adding Neo Series Workstation

### 1. Product Data File
- **Path:** `lib/data/products/modular-furniture/workstations/neo-series/index.ts`
- **Structure:**
```typescript
const neoSeries = {
  id: 'neo-series',
  name: 'Neo Series Workstation',
  description: 'The Neo Series Workstation features innovative steel leg designs and modern aesthetics for high-performance workspaces.',
  category: 'workstations',
  seriesId: 'modular-furniture',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355086/steelmade/workstations/desk%20based%20workstation%20legs/neo-legs2.png',
  gallery: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355086/steelmade/workstations/desk%20based%20workstation%20legs/neo-legs2.png', alt: 'Neo Series Workstation 2' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355085/steelmade/workstations/desk%20based%20workstation%20legs/neo-legs3.png', alt: 'Neo Series Workstation 3' }
  ],
  variants: [
    {
      variantId: 'neo-legs2',
      variantName: 'Neo Legs 2',
      name: 'Neo Series Workstation 2',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355086/steelmade/workstations/desk%20based%20workstation%20legs/neo-legs2.png',
      specifications: {
        'Leg Type': 'Steel (Neo 2)',
        'Surface': 'Engineered wood',
        'Series': 'Neo'
      }
    },
    {
      variantId: 'neo-legs3',
      variantName: 'Neo Legs 3',
      name: 'Neo Series Workstation 3',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355085/steelmade/workstations/desk%20based%20workstation%20legs/neo-legs3.png',
      specifications: {
        'Leg Type': 'Steel (Neo 3)',
        'Surface': 'Engineered wood',
        'Series': 'Neo'
      }
    }
  ],
  features: [
    'Innovative steel leg designs',
    'Modern aesthetics',
    'High-performance workspace',
    'Easy assembly'
  ],
  specifications: {
    'Material': 'Steel, engineered wood',
    'Dimensions': 'Customizable',
    'Warranty': '3 years'
  }
};
export default neoSeries;
```

### 2. Register in Series Index
- **Edit:** `lib/data/products/modular-furniture/workstations/index.ts`
- **Add:**
```typescript
import neoSeries from './neo-series/index';
// ...
products: {
  [marvelWorkstation.id]: marvelWorkstation,
  [elevateSeries.id]: elevateSeries,
  [neoSeries.id]: neoSeries
}
```

### 3. Create Product Page
- **Path:** `app/modular-furniture/workstations/neo-series/page.tsx`
- **Use:**
```tsx
import ProductDetailLayout from '../../../../components/products/ProductDetailLayout';
import neoSeries from '../../../../lib/data/products/modular-furniture/workstations/neo-series/index';

export default function NeoSeriesPage() {
  return (
    <ProductDetailLayout
      product={neoSeries}
      layoutOptions={{ imagePosition: 'left' }}
    />
  );
}
```

---

## Example: Adding Neo Eco Series Workstation
...existing code...
---

## Example: Adding Spark Series Workstation

### 1. Product Data File
- **Path:** `lib/data/products/modular-furniture/workstations/spark-series/index.ts`
- **Structure:**
```typescript
const sparkSeries = {
  id: 'spark-series',
  name: 'Spark Series Workstation',
  description: 'The Spark Series Workstation features vibrant design, durable steel legs, and versatile configurations for energetic workspaces.',
  category: 'workstations',
  seriesId: 'modular-furniture',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355081/steelmade/workstations/desk%20based%20workstation%20legs/spark-series1.png',
  gallery: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355081/steelmade/workstations/desk%20based%20workstation%20legs/spark-series1.png', alt: 'Spark Series Workstation 1' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355080/steelmade/workstations/desk%20based%20workstation%20legs/spark-series2.png', alt: 'Spark Series Workstation 2' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355079/steelmade/workstations/desk%20based%20workstation%20legs/spark-series3.png', alt: 'Spark Series Workstation 3' }
  ],
  variants: [
    {
      variantId: 'spark-series1',
      variantName: 'Spark Series 1',
      name: 'Spark Series Workstation 1',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355081/steelmade/workstations/desk%20based%20workstation%20legs/spark-series1.png',
      specifications: {
        'Leg Type': 'Steel',
        'Surface': 'Engineered wood',
        'Series': 'Spark'
      }
    },
    {
      variantId: 'spark-series2',
      variantName: 'Spark Series 2',
      name: 'Spark Series Workstation 2',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355080/steelmade/workstations/desk%20based%20workstation%20legs/spark-series2.png',
      specifications: {
        'Leg Type': 'Steel',
        'Surface': 'Engineered wood',
        'Series': 'Spark'
      }
    },
    {
      variantId: 'spark-series3',
      variantName: 'Spark Series 3',
      name: 'Spark Series Workstation 3',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355079/steelmade/workstations/desk%20based%20workstation%20legs/spark-series3.png',
      specifications: {
        'Leg Type': 'Steel',
        'Surface': 'Engineered wood',
        'Series': 'Spark'
      }
    }
  ],
  features: [
    'Vibrant design',
    'Durable steel legs',
    'Versatile configurations',
    'Easy assembly'
  ],
  specifications: {
    'Material': 'Steel, engineered wood',
    'Dimensions': 'Customizable',
    'Warranty': '3 years'
  }
};
export default sparkSeries;
```

### 2. Register in Series Index
- **Edit:** `lib/data/products/modular-furniture/workstations/index.ts`
- **Add:**
```typescript
import sparkSeries from './spark-series/index';
// ...
products: {
  [marvelWorkstation.id]: marvelWorkstation,
  [elevateSeries.id]: elevateSeries,
  [neoSeries.id]: neoSeries,
  [neoEcoSeries.id]: neoEcoSeries,
  [sparkSeries.id]: sparkSeries
}
```

### 3. Create Product Page
- **Path:** `app/modular-furniture/workstations/spark-series/page.tsx`
- **Use:**
```tsx
import ProductDetailLayout from '../../../../components/products/ProductDetailLayout';
import sparkSeries from '../../../../lib/data/products/modular-furniture/workstations/spark-series/index';

export default function SparkSeriesPage() {
  return (
    <ProductDetailLayout
      product={sparkSeries}
      layoutOptions={{ imagePosition: 'left' }}
    />
  );
}
```

---

### 1. Product Data File
- **Path:** `lib/data/products/modular-furniture/workstations/neo-eco-series/index.ts`
- **Structure:**
```typescript
const neoEcoSeries = {
  id: 'neo-eco-series',
  name: 'Neo Eco Series Workstation',
  description: 'The Neo Eco Series Workstation combines eco-friendly materials with modern steel leg designs for sustainable, stylish workspaces.',
  category: 'workstations',
  seriesId: 'modular-furniture',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355084/steelmade/workstations/desk%20based%20workstation%20legs/neo-eco-legs1.png',
  gallery: [
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355084/steelmade/workstations/desk%20based%20workstation%20legs/neo-eco-legs1.png', alt: 'Neo Eco Series Workstation 1' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355083/steelmade/workstations/desk%20based%20workstation%20legs/neo-eco-legs2.png', alt: 'Neo Eco Series Workstation 2' },
    { url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355082/steelmade/workstations/desk%20based%20workstation%20legs/neo-eco-legs3.png', alt: 'Neo Eco Series Workstation 3' }
  ],
  variants: [
    {
      variantId: 'neo-eco-legs1',
      variantName: 'Neo Eco Legs 1',
      name: 'Neo Eco Series Workstation 1',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355084/steelmade/workstations/desk%20based%20workstation%20legs/neo-eco-legs1.png',
      specifications: {
        'Leg Type': 'Steel (Eco 1)',
        'Surface': 'Eco-friendly engineered wood',
        'Series': 'Neo Eco'
      }
    },
    {
      variantId: 'neo-eco-legs2',
      variantName: 'Neo Eco Legs 2',
      name: 'Neo Eco Series Workstation 2',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355083/steelmade/workstations/desk%20based%20workstation%20legs/neo-eco-legs2.png',
      specifications: {
        'Leg Type': 'Steel (Eco 2)',
        'Surface': 'Eco-friendly engineered wood',
        'Series': 'Neo Eco'
      }
    },
    {
      variantId: 'neo-eco-legs3',
      variantName: 'Neo Eco Legs 3',
      name: 'Neo Eco Series Workstation 3',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1754355082/steelmade/workstations/desk%20based%20workstation%20legs/neo-eco-legs3.png',
      specifications: {
        'Leg Type': 'Steel (Eco 3)',
        'Surface': 'Eco-friendly engineered wood',
        'Series': 'Neo Eco'
      }
    }
  ],
  features: [
    'Eco-friendly materials',
    'Modern steel leg designs',
    'Sustainable workspace',
    'Easy assembly'
  ],
  specifications: {
    'Material': 'Steel, eco-friendly engineered wood',
    'Dimensions': 'Customizable',
    'Warranty': '3 years'
  }
};
export default neoEcoSeries;
```

### 2. Register in Series Index
- **Edit:** `lib/data/products/modular-furniture/workstations/index.ts`
- **Add:**
```typescript
import neoEcoSeries from './neo-eco-series/index';
// ...
products: {
  [marvelWorkstation.id]: marvelWorkstation,
  [elevateSeries.id]: elevateSeries,
  [neoSeries.id]: neoSeries,
  [neoEcoSeries.id]: neoEcoSeries
}
```

### 3. Create Product Page
- **Path:** `app/modular-furniture/workstations/neo-eco-series/page.tsx`
- **Use:**
```tsx
import ProductDetailLayout from '../../../../components/products/ProductDetailLayout';
import neoEcoSeries from '../../../../lib/data/products/modular-furniture/workstations/neo-eco-series/index';

export default function NeoEcoSeriesPage() {
  return (
    <ProductDetailLayout
      product={neoEcoSeries}
      layoutOptions={{ imagePosition: 'left' }}
    />
  );
}
```

---

**You are now ready to add new workstation products with no issues!**
