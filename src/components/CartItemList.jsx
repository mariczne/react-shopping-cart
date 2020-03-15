import React from "react";
import { Table } from "react-bootstrap";

import CartItem from "./CartItem.jsx";

export default function CartItemList({ cart, addToCart, removeFromCart }) {
  function renderCartItems() {
    return cart.map(item => (
      <CartItem
        key={item.id}
        id={item.id}
        name={item.name}
        price={item.price}
        quantity={item.quantity}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    ));
  }

  const totalPrice =
    cart.reduce((acc, curr) => acc + curr.price * 100 * curr.quantity, 0) / 100;

  return (
    <Table responsive striped hover size="sm">
      <thead>
        <tr>
          <th>Product name</th>
          <th>Quantity</th>
          <th>Price per item</th>
          <th>Total item price</th>
        </tr>
      </thead>
      <tbody>{renderCartItems()}</tbody>
      <tfoot>
        <tr>
          <th />
          <th />
          <th />
          <th className="text-right">
            Total order price: {totalPrice.toFixed(2)}
          </th>
        </tr>
      </tfoot>
    </Table>
  );
}

CartItemList.defaultProps = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {}
};
