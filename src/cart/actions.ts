import { Product } from "types";

export enum CartActions {
  ADD_PRODUCT = "ADD_PRODUCT",
  REMOVE_PRODUCT = "REMOVE_PRODUCT",
}

export interface CartAction {
  type: keyof typeof CartActions;
  payload: {
    product: Product;
  };
}

export function addProductToCart(product: Product) {
  return { type: CartActions.ADD_PRODUCT, payload: { product } };
}

export function removeProductFromCart(product: Product) {
  return { type: CartActions.REMOVE_PRODUCT, payload: { product } };
}
