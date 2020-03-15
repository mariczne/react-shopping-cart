import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header.jsx";
import ProductDeck from "./ProductDeck.jsx";

const API_URL = // bypassing CORS via proxy for now
  "https://cors-anywhere.herokuapp.com/https://www.reasonapps.pl/data.json";

const DATA_STATES = { loading: "loading", loaded: "loaded" };

export default class App extends Component {
  state = {
    dataState: DATA_STATES.loading,
    products: [],
    cart: []
  };

  async componentDidMount() {
    const response = await fetch(API_URL);
    const products = await response.json();
    this.setState({ products, dataState: DATA_STATES.loaded });
  }

  addToCart = id => {
    this.setState(state => {
      const isProductAlreadyInCart = !!state.cart.find(
        product => product.id === id
      );
      if (isProductAlreadyInCart) {
        const newCart = [...state.cart];
        const productInCart = newCart.find(product => product.id === id);
        productInCart.quantity++;
        return { cart: newCart };
      }
      const product = state.products.find(product => product.id === id);
      const productToAdd = { ...product };
      return { cart: [...state.cart, { ...productToAdd, quantity: 1 }] };
    });
  };

  render() {
    const { dataState, products, cart } = this.state;

    return (
      <>
        <Header cart={cart} />
        <Container>
          <Row>
            <Col>
              <ProductDeck
                dataState={dataState}
                products={products}
                cart={cart}
                addToCart={this.addToCart}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
