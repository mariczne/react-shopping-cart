import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import CartItemList from "./CartItemList.jsx";

const MODAL_TITLE = `Your shopping cart`;
const CLOSE_BTN_TEXT = "Close cart";
const CHECKOUT_BTN_TEXT = "To checkout";

export default function Cart({
  showCartModal,
  toggleCartModal,
  cart,
  addToCart,
  removeFromCart
}) {
  const itemsInCartCount = cart.length;

  return (
    <Modal show={showCartModal} onHide={toggleCartModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <FaShoppingCart size="2.5rem" /> {MODAL_TITLE}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CartItemList
          itemsInCartCount={itemsInCartCount}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      </Modal.Body>
      <Modal.Footer>
        <CloseButton toggleCartModal={toggleCartModal} />
        <CheckoutButton itemsInCartCount={itemsInCartCount} />
      </Modal.Footer>
    </Modal>
  );
}

Cart.defaultProps = {
  showCartModal: false,
  toggleCartModal: () => {},
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {}
};

function CloseButton({ toggleCartModal }) {
  return (
    <Button variant="outline-secondary" onClick={toggleCartModal}>
      {CLOSE_BTN_TEXT}
    </Button>
  );
}

CloseButton.defaultProps = {
  toggleCartModal: () => {}
};

function CheckoutButton({ itemsInCartCount }) {
  if (itemsInCartCount > 0) {
    return <Button variant="success">{CHECKOUT_BTN_TEXT}</Button>;
  }
  return null;
}

CheckoutButton.defaultProps = {
  itemsInCartCount: 0
};
