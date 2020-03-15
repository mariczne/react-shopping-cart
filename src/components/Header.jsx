import React from "react";
import { Navbar, Container, Badge, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

export default function Header({ cart }) {
  const itemsInCart = cart.reduce((acc, curr) => acc + curr.quantity, 0)

  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="#">
          <img
            src="/logo512.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Shopping Cart"
          />{" "}
          React Shopping Cart
        </Navbar.Brand>
        <Button>
          <FaShoppingCart size="1rem" />
          <Badge size="big">{itemsInCart || null}</Badge>
        </Button>
      </Container>
    </Navbar>
  );
}

Header.defaltProps = {
  cart: []
};
