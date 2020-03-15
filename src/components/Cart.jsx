import React from "react";
import { Modal, Button } from "react-bootstrap";
import CartItemList from "./CartItemList.jsx";

const NO_ITEMS_IN_CART_TEXT =
  "There are currently no products in the shopping cart";

const MODAL_TITLE = "Your shopping cart";
const CLOSE_BTN_TEXT = "Close";
const CHECKOUT_BTN_TEXT = "To checkout";

export default function Cart({
  showCart,
  toggleCartModal,
  cart,
  addToCart,
  removeFromCart
}) {
  const itemsInCart = cart.length;

  function renderCartItemList() {
    if (itemsInCart > 0) {
      return (
        <CartItemList
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      );
    }
    return NO_ITEMS_IN_CART_TEXT;
  }

  return (
    <Modal show={showCart} onHide={toggleCartModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{MODAL_TITLE}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderCartItemList()}</Modal.Body>
      <Modal.Footer>
        <CloseButton toggleCartModal={toggleCartModal} />
        <CheckoutButton itemsInCart={itemsInCart} />
      </Modal.Footer>
    </Modal>
  );
}

Cart.defaultProps = {
  showCart: false,
  toggleCartModal: () => {},
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {}
};

function CloseButton({ toggleCartModal }) {
  return (
    <Button variant="secondary" onClick={toggleCartModal}>
      {CLOSE_BTN_TEXT}
    </Button>
  );
}

CloseButton.defaultProps = {
  toggleCartModal: () => {}
};

function CheckoutButton({ itemsInCart }) {
  if (itemsInCart > 0) {
    return <Button variant="primary">{CHECKOUT_BTN_TEXT}</Button>;
  }
  return null;
}

CheckoutButton.defaultProps = {
  itemsInCart: 0
};
