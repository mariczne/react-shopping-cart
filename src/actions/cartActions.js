export const CART = {
  ADD_PRODUCT: "ADD_PRODUCT",
  INCREMENT_PRODUCT_QUANTITY: "INCREMENT_PRODUCT_QUANTITY",
  REMOVE_PRODUCT: "REMOVE_PRODUCT",
  DECREMENT_PRODUCT_QUANTITY: "DECREMENT_PRODUCT_QUANTITY"
};

export function addProductToCart(product, cart) {
  const isProductAlreadyInCart = Boolean(
    cart.find(productInCart => productInCart.id === product.id)
  );

  if (isProductAlreadyInCart) {
    return { type: CART.INCREMENT_PRODUCT_QUANTITY, payload: { product } };
  }
  return { type: CART.ADD_PRODUCT, payload: { product } };
}

export function removeProductFromCart(productId, cart) {
  const productInCart = cart.find(
    productInCart => productInCart.id === productId
  );

  if (productInCart) {
    if (productInCart.quantity > 1) {
      return { type: CART.DECREMENT_PRODUCT_QUANTITY, payload: { productId } };
    }
    return { type: CART.REMOVE_PRODUCT, payload: { productId } };
  }
}
