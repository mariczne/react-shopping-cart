import { Cart, Product } from "types";
import { CartActions } from "../actions/cartActions";

export interface CartAction {
  type: keyof typeof CartActions;
  payload: {
    product: Product;
  };
}

export default function cartReducer(cart: Cart, action: CartAction) {
  switch (action.type) {
    case CartActions.ADD_PRODUCT: {
      const { product } = action.payload;
      if (!product) return cart;

      const isProductAlreadyInCart = Boolean(
        cart.find((productInCart) => productInCart.id === product.id)
      );

      if (isProductAlreadyInCart) {
        return cart.map((productInCart) => {
          if (productInCart.id === product.id) {
            return { ...productInCart, quantity: productInCart.quantity + 1 };
          }
          return productInCart;
        });
      }

      return [...cart, { ...product, quantity: 1 }];
    }
    case CartActions.REMOVE_PRODUCT: {
      const { product } = action.payload;
      if (!product) return cart;

      const productInCart = cart.find(
        (productInCart) => productInCart.id === product.id
      );

      if (!productInCart) return cart;

      if (productInCart.quantity > 1) {
        return cart.map((productInCart) => {
          if (productInCart.id === product.id) {
            return { ...productInCart, quantity: productInCart.quantity - 1 };
          }
          return productInCart;
        });
      }

      return cart.filter((productInCart) => productInCart.id !== product.id);
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}
