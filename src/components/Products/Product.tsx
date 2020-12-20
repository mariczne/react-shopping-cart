import { Card, Button, Badge, Col } from "react-bootstrap";
import { ProductInCart } from "types";
import { ProductsListProps } from "./Products";

const COL_STYLE = {
  flexBasis: "50%",
};

const CARD_STYLE = {
  minHeight: "12.5rem",
  minWidth: "12.5rem",
};

const ADD_TO_CART_TEXT = "Add to cart";

const IN_CART_TEXT = "in cart";

const CURRENCY_CODE = ""; // not specified in the data

export interface ProductProps extends ProductInCart {
  addToCart: ProductsListProps["addToCart"];
}

export default function Product({
  id,
  name,
  price,
  quantity,
  addToCart,
}: ProductProps) {
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
          <BadgeInCart quantityInCart={quantity} />
        </Card.Footer>
      </Card>
    </Col>
  );
}

export interface BadgeInCartProps {
  quantityInCart: ProductInCart["quantity"];
}

function BadgeInCart({ quantityInCart }: BadgeInCartProps) {
  if (quantityInCart > 0) {
    return (
      <Badge variant="success" className="d-flex align-items-center">
        {quantityInCart} {IN_CART_TEXT}
      </Badge>
    );
  }
  return null;
}
