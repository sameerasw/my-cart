export interface Product {
    id: number; 
    title: string; 
    imageUrl: string; 
    price: number; 
    rating: number; 
    quantity?: number;
    description?: string;
    category?: string;
  }