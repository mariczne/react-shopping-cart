import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

export default function Cart({ showCart, toggleCartModal, cart }) {
  function renderCartItems() {
    console.log(cart);
    return cart.map(item => {
      return (
        <tr>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          <td>{item.price.toFixed(2)}</td>
        </tr>
      );
    });
  }

  const totalPrice = cart.reduce(
    (acc, curr) => (acc + curr.price * 100) * curr.quantity,
    0
  ) / 100;

  return (
    <Modal show={showCart} onHide={toggleCartModal}>
      <Modal.Header closeButton>
        <Modal.Title>Your shopping cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table>
          <thead>
            <tr>
              <th>Product name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{renderCartItems()}</tbody>
        </Table>
        Total price: {totalPrice.toFixed(2)}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleCartModal}>
          Close
        </Button>
        <Button variant="primary" onClick={toggleCartModal}>
          To checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
