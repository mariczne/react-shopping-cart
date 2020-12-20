export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface ProductInCart extends Product {
  quantity: number;
}
