import React from "react";
import { Card, Button } from "react-bootstrap";

export default function Product({ id, name, price, addToCart }) {
  return (
    <Card style={CARD_STYLE}>
      <Card.Body style={CARD_BODY_STYLE}>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>{price}</Card.Subtitle>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" onClick={() => addToCart(id)}>
          {ADD_TO_CART_TEXT}
        </Button>
      </Card.Footer>
    </Card>
  );
}

Product.defaultProps = {
  id: 0,
  name: "",
  price: 0,
  addToCart: () => {}
};

const CARD_STYLE = {
  minWidth: "12rem",
  minHeight: "12rem",
  marginBottom: "2rem",
  flex: '0'
};

const CARD_BODY_STYLE = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};

const ADD_TO_CART_TEXT = "Add to cart";
