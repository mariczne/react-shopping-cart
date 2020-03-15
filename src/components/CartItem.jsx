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
      <td>{name}</td>
      <td className="d-flex justify-content-around">
        <DecrementButton id={id} removeFromCart={removeFromCart} />
        {quantity}
        <IncrementButton id={id} addToCart={addToCart} />
      </td>
      <td className="text-right">{price.toFixed(2)}</td>
      <td className="text-right">
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

function IncrementButton({ id, addToCart }) {
  return (
    <Button variant="outline-success" size="sm" onClick={() => addToCart(id)}>
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
