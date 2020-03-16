import React from "react";
import { Card, Button, Badge, Col } from "react-bootstrap";

const COL_STYLE = {
  flexBasis: "50%"
};

const CARD_STYLE = {
  minHeight: "12.5rem",
  minWidth: "12.5rem"
};

const ADD_TO_CART_TEXT = "Add to cart";

const IN_CART_TEXT = "in cart";

const CURRENCY_CODE = ""; // not specified in the data

export default function Product({
  id,
  name,
  price,
  quantityInCart,
  addToCart
}) {
  return (
    <Col style={COL_STYLE} className="col-md-6 col-lg-4 flex-grow-0">
      <Card style={CARD_STYLE} className="my-3">
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle>
            {price.toFixed(2)} <small>{CURRENCY_CODE} /per item</small>
          </Card.Subtitle>
        </Card.Body>
        <Card.Footer className="d-flex flex-row justify-content-between">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => addToCart(id)}
          >
            {ADD_TO_CART_TEXT}
          </Button>
          <BadgeInCart quantityInCart={quantityInCart} />
        </Card.Footer>
      </Card>
    </Col>
  );
}

function BadgeInCart({ quantityInCart }) {
  if (quantityInCart > 0) {
    return (
      <Badge variant="success" className="d-flex align-items-center">
        {quantityInCart} {IN_CART_TEXT}
      </Badge>
    );
  }
  return null;
}

Product.defaultProps = {
  id: 0,
  name: "",
  price: 0,
  quantityInCart: 0,
  addToCart: () => {}
};
