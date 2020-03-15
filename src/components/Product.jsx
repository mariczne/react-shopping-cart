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
  alignItems: "center",
  transition: "opacity 1s"
};

const ADD_TO_CART_TEXT = "Add to cart";

const IN_CART_TEXT = "In cart";

// const CURRENCY_CODE = "XXX";

export default function Product({
  id,
  name,
  price,
  inCartQuantity,
  addToCart
}) {
  return (
    <Card style={CARD_STYLE}>
      <Card.Body style={CARD_BODY_STYLE}>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>{price.toFixed(2)} /per item</Card.Subtitle>
      </Card.Body>
      <Card.Footer style={CARD_FOOTER_STYLE}>
        <Button variant="primary" size="sm" onClick={() => addToCart(id)}>
          {ADD_TO_CART_TEXT}
        </Button>
        <BadgeInCart inCartQuantity={inCartQuantity} />
      </Card.Footer>
    </Card>
  );
}

function BadgeInCart({ inCartQuantity }) {
  if (inCartQuantity > 0) {
    return (
      <Badge style={BADGE_STYLE} variant="success">
        {IN_CART_TEXT} ({inCartQuantity})
      </Badge>
    );
  }
  return null;
}

Product.defaultProps = {
  id: 0,
  name: "",
  price: 0,
  inCartQuantity: 0,
  addToCart: () => {}
};
