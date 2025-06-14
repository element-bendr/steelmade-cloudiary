export interface Product {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Series {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  products: Product[];
}

export interface PortfolioProps {
  className?: string;
  series?: Series[];
}
