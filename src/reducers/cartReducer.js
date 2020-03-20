export const CART_ACTIONS = {
  ADD_PRODUCT: "ADD_PRODUCT",
  REMOVE_PRODUCT: "REMOVE_PRODUCT"
};

export default function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_PRODUCT:
      return addProductToCart(action.product, state);
    case CART_ACTIONS.REMOVE_PRODUCT:
      return removeProductFromCart(action.productId, state);
    default:
      return state;
  }
}

function addProductToCart(product, cart) {
  const isProductAlreadyInCart = !!cart.find(
    productInCart => productInCart.id === product.id
  );
  if (isProductAlreadyInCart) {
    return cart.map(productInCart => {
      if (productInCart.id === product.id) {
        return { ...productInCart, quantity: productInCart.quantity + 1 };
      }
      return productInCart;
    });
  } else {
    return [...cart, { ...product, quantity: 1 }];
  }
}

function removeProductFromCart(productId, cart) {
  const productInCart = cart.find(
    productInCart => productInCart.id === productId
  );

  if (productInCart) {
    if (productInCart.quantity < 2) {
      return cart.filter(productInCart => productInCart.id !== productId);
    } else {
      return cart.map(productInCart => {
        if (productInCart.id === productId) {
          return { ...productInCart, quantity: productInCart.quantity - 1 };
        }
        return productInCart;
      });
    }
  }
}
