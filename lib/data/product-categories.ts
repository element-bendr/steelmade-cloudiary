// Update the product category types to include all categories we're supporting
export type ProductCategorySlug = 
  | 'chairs'
  | 'hospital-furniture'
  | 'racking-systems'
  | 'school-furniture'
  | 'storage-solutions'
  | 'modular-furniture'
  | 'office-accessories';

export interface ProductCategory {
  id: ProductCategorySlug;
  name: string;
  description: string;
  slug: ProductCategorySlug;
}

// Define the categories
export const productCategories: ProductCategory[] = [
  {
    id: 'chairs',
    name: 'Chairs',
    description: 'Explore our premium chair collection designed for comfort and style.',
    slug: 'chairs'
  },
  {
    id: 'hospital-furniture',
    name: 'Hospital Furniture',
    description: 'Medical-grade furniture designed for healthcare environments.',
    slug: 'hospital-furniture'
  },
  {
    id: 'racking-systems',
    name: 'Racking Systems',
    description: 'Efficient storage solutions for industrial and commercial spaces.',
    slug: 'racking-systems'
  },
  {
    id: 'school-furniture',
    name: 'School Furniture',
    description: 'Durable and functional furniture for educational institutions.',
    slug: 'school-furniture'
  },
  {
    id: 'storage-solutions',
    name: 'Storage Solutions',
    description: 'Versatile storage options for any space.',
    slug: 'storage-solutions'
  },
  {
    id: 'modular-furniture',
    name: 'Modular Furniture',
    description: 'Adaptable furniture systems that grow with your needs.',
    slug: 'modular-furniture'
  },
  {
    id: 'office-accessories',
    name: 'Office Accessories',
    description: 'Essential accessories to complete your workspace.',
    slug: 'office-accessories'
  }
];