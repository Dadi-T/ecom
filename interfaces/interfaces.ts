export interface cartProduct {
  name: string;
  quantity: number;
  price: number;
  picture: string;
  sizes: string[];
  size: string;
  id: string;
  rating: number;
  category: string;
}

export interface product {
  name: string;
  description: string;
  picture: string;
  price: number;
  quantity: number;
  rating: number;
  sizes: string[];
  category: string;
  id: string;
}
