import { ProductInCart } from "types";

export function productInCartById(id: ProductInCart["id"]) {
  return (productInCart: ProductInCart) => productInCart.id === id;
}

export function incrementQuantityIfProductWithId(id: ProductInCart["id"]) {
  return (productInCart: ProductInCart) => {
    if (productInCart.id === id) {
      return { ...productInCart, quantity: productInCart.quantity + 1 };
    }
    return productInCart;
  };
}

export function decrementQuantityIfProductWithId(id: ProductInCart["id"]) {
  return (productInCart: ProductInCart) => {
    if (productInCart.id === id) {
      return { ...productInCart, quantity: productInCart.quantity - 1 };
    }
    return productInCart;
  };
}

export function removeProductWithId(id: ProductInCart["id"]) {
  return (productInCart: ProductInCart) => productInCart.id !== id;
}
