import { CartActions, CartAction } from "./actions";
import {
  productInCartById,
  decrementQuantityIfProductWithId,
  incrementQuantityIfProductWithId,
  removeProductWithId,
} from "./utils";
import { ProductInCart } from "types";

export type CartState = ProductInCart[];

function cartReducer(cart: CartState, action: CartAction) {
  switch (action.type) {
    case CartActions.ADD_PRODUCT: {
      const { product } = action.payload;

      const isProductAlreadyInCart = Boolean(
        cart.find(productInCartById(product.id))
      );

      if (isProductAlreadyInCart) {
        return cart.map(incrementQuantityIfProductWithId(product.id));
      }

      return [...cart, { ...product, quantity: 1 }];
    }
    case CartActions.REMOVE_PRODUCT: {
      const {
        product: { id },
      } = action.payload;

      const productInCart = cart.find(productInCartById(id));
      if (!productInCart) return cart;

      if (productInCart.quantity > 1) {
        return cart.map(decrementQuantityIfProductWithId(id));
      }

      return cart.filter(removeProductWithId(id));
    }
    default: {
      return cart;
    }
  }
}

export { cartReducer };
