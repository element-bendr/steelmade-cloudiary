// Simplified version of ProductCategory for now, will be expanded as needed
export type ProductCategory = {
  id: string;
  name: string;
  description: string;
  [key: string]: any; // Allow for additional properties
};