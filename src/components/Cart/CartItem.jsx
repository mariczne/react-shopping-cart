import React from "react";
import { Button } from "react-bootstrap";

export default function CartItem({
  id,
  name,
  quantity,
  price,
  addToCart,
  removeFromCart
}) {
  return (
    <tr>
      <td className="align-middle">{name}</td>
      <td className="align-middle text-right text-nowrap">
        <DecrementButton id={id} removeFromCart={removeFromCart} />
        <span className="mx-2">{quantity}</span>
        <IncrementButton id={id} addToCart={addToCart} />
      </td>
      <td className="align-middle text-right">{price.toFixed(2)}</td>
      <td className="align-middle text-right">
        {((100 * price * quantity) / 100).toFixed(2)}
      </td>
    </tr>
  );
}

CartItem.defaultProps = {
  id: 0,
  name: "default product",
  quantity: 0,
  price: 0,
  addToCart: () => {},
  removeFromCart: () => {}
};

const BUTTON_STYLE = { width: "1.5rem", height: "1.5rem" };

const BUTTON_CLASSES = `d-inline-flex justify-content-center align-items-center
rounded-circle p-0`;

function IncrementButton({ id, addToCart }) {
  return (
    <Button
      variant="outline-success"
      size="sm"
      style={BUTTON_STYLE}
      className={BUTTON_CLASSES}
      onClick={() => addToCart(id)}
    >
      +
    </Button>
  );
}

IncrementButton.defaultProps = {
  id: 0,
  addToCart: () => {}
};

function DecrementButton({ id, removeFromCart }) {
  return (
    <Button
      variant="outline-danger"
      size="sm"
      style={BUTTON_STYLE}
      className={BUTTON_CLASSES}
      onClick={() => removeFromCart(id)}
    >
      -
    </Button>
  );
}

DecrementButton.defaultProps = {
  id: 0,
  removeFromCart: () => {}
};
