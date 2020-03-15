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
          <th className="text-left">Product name</th>
          <th className="text-right">Quantity</th>
          <th className="text-right">Price per item</th>
          <th className="text-right">Total item value</th>
        </tr>
      </thead>
      <tbody>{renderCartItems()}</tbody>
      <tfoot>
        <tr>
          <th colSpan="4" className="text-right">
            Total order value: {totalPrice.toFixed(2)}
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
