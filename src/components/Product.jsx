import React from "react";
import { Card, Button, Badge } from "react-bootstrap";

const CARD_STYLE = {
  minWidth: "12.5rem",
  minHeight: "12.5rem",
  marginBottom: "2rem",
  flex: "0"
};

const CARD_BODY_STYLE = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};

const CARD_FOOTER_STYLE = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between"
};

const BADGE_STYLE = {
  display: "flex",
  alignItems: "center"
};

const ADD_TO_CART_TEXT = "Add to cart";

const IN_CART_TEXT = "In cart"

export default function Product({ id, name, price, inCartQuantity, addToCart }) {
  function renderInCartBadge() {
    if (inCartQuantity > 0) {
      return (
        <Badge style={BADGE_STYLE} variant="success">
          {IN_CART_TEXT} ({inCartQuantity})
        </Badge>
      );
    }
    return null;
  }

  return (
    <Card style={CARD_STYLE}>
      <Card.Body style={CARD_BODY_STYLE}>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>{price}</Card.Subtitle>
      </Card.Body>
      <Card.Footer style={CARD_FOOTER_STYLE}>
        <Button variant="primary" size="sm" onClick={() => addToCart(id)}>
          {ADD_TO_CART_TEXT}
        </Button>
        {renderInCartBadge()}
      </Card.Footer>
    </Card>
  );
}

Product.defaultProps = {
  id: 0,
  name: "",
  price: 0,
  inCartQuantity: 0,
  addToCart: () => {}
};
