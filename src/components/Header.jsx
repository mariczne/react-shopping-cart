import React from "react";
import { Navbar, Container, Badge, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

const APP_NAME = "React Shopping Cart";

const BADGE_STYLE = { width: "1.5rem", height: "1.5rem" };

const BADGE_CLASSES = `d-inline-flex justify-content-center align-items-center
rounded-circle p-0 ml-2`;

export default function Header({ cart, toggleCartModal }) {
  const itemsInCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="https://github.com/mariczne/react-shopping-cart">
          <img
            src="/logo512.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Shopping Cart"
          />{" "}
          {APP_NAME}
        </Navbar.Brand>
        <Button
          variant={itemsInCartCount ? "primary" : "outline-secondary"}
          onClick={toggleCartModal}
        >
          <FaShoppingCart size="1.5rem" />
          {itemsInCartCount ? (
            <Badge
              style={BADGE_STYLE}
              className={BADGE_CLASSES}
              variant="light"
            >
              {itemsInCartCount}
            </Badge>
          ) : null}
        </Button>
      </Container>
    </Navbar>
  );
}

Header.defaltProps = {
  cart: [],
  toggleCartModal: () => {}
};
