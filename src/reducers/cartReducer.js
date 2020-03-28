import { CART } from "../actions/cartActions";

export default function cartReducer(cart, action) {
  switch (action.type) {
    case CART.ADD_PRODUCT: {
      const { product } = action.payload;
      return [...cart, { ...product, quantity: 1 }];
    }
    case CART.INCREMENT_PRODUCT_QUANTITY: {
      const { product } = action.payload;
      return cart.map(productInCart => {
        if (productInCart.id === product.id) {
          return { ...productInCart, quantity: productInCart.quantity + 1 };
        }
        return productInCart;
      });
    }
    case CART.REMOVE_PRODUCT: {
      const { productId } = action.payload;
      return cart.filter(productInCart => productInCart.id !== productId);
    }
    case CART.DECREMENT_PRODUCT_QUANTITY: {
      const { productId } = action.payload;
      return cart.map(productInCart => {
        if (productInCart.id === productId) {
          return { ...productInCart, quantity: productInCart.quantity - 1 };
        }
        return productInCart;
      });
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}
