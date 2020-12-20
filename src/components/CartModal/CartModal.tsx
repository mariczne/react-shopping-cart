import { Modal, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { CartItemList } from "./CartItemList";
import { CartState } from "cart";
import { Product, ProductInCart } from "types";

const MODAL_TITLE = "Your cart";
const CLOSE_BTN_TEXT = "Close cart";
const CHECKOUT_BTN_TEXT = "To checkout";

export interface CartModalProps {
  cart: CartState;
  addToCart: (id: Product["id"]) => void;
  removeFromCart: (id: ProductInCart["id"]) => void;
  showCartModal: boolean;
  toggleCartModal: () => void;
}

function CartModal({
  cart,
  addToCart,
  removeFromCart,
  showCartModal,
  toggleCartModal,
}: CartModalProps) {
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
        <Button variant="outline-secondary" onClick={toggleCartModal}>
          {CLOSE_BTN_TEXT}
        </Button>
        {itemsInCartCount > 0 && (
          <Button variant="success">{CHECKOUT_BTN_TEXT}</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export { CartModal };
