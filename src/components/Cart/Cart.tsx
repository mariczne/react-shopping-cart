import { Modal, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Cart as ICart, Product, ProductInCart } from "types";
import CartItemList from "./CartItemList";

const MODAL_TITLE = `Your cart`;
const CLOSE_BTN_TEXT = "Close cart";
const CHECKOUT_BTN_TEXT = "To checkout";

export interface CartProps {
  cart: ICart;
  addToCart: (id: Product["id"]) => void;
  removeFromCart: (id: ProductInCart["id"]) => void;
  showCartModal: boolean;
  toggleCartModal: () => void;
}

export default function Cart({
  cart,
  addToCart,
  removeFromCart,
  showCartModal,
  toggleCartModal,
}: CartProps) {
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

export interface CloseButtonProps {
  toggleCartModal: () => void;
}

function CloseButton({ toggleCartModal }: CloseButtonProps) {
  return (
    <Button variant="outline-secondary" onClick={toggleCartModal}>
      {CLOSE_BTN_TEXT}
    </Button>
  );
}

export interface CheckoutButtonProps {
  itemsInCartCount: number;
}

function CheckoutButton({ itemsInCartCount }: CheckoutButtonProps) {
  if (itemsInCartCount > 0) {
    return <Button variant="success">{CHECKOUT_BTN_TEXT}</Button>;
  }
  return null;
}
