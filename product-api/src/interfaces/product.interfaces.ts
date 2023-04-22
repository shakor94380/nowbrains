export interface BaseProduct {
  idAccount: string;
  name: string;
  price: number;
  description: string;
  stock: number;
}
  
export interface Product extends BaseProduct {
  id: string;
}

export interface SearchProduct {
  name: string;
  price: number;
  stock: number;
  start: Date;
  end: Date;
}