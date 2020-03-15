import React from "react";
import { Navbar, Container, Badge, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

const APP_NAME = "React Shopping Cart";

export default function Header({ cart, toggleCartModal }) {
  const itemsInCart = cart.reduce((acc, curr) => acc + curr.quantity, 0);

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
        <Button onClick={toggleCartModal}>
          <FaShoppingCart size="1rem" />
          <Badge size="big">{itemsInCart || null}</Badge>
        </Button>
      </Container>
    </Navbar>
  );
}

Header.defaltProps = {
  cart: [],
  toggleCartModal: () => {}
};
