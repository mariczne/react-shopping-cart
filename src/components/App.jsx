import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header.jsx";
import ProductDeck from "./ProductDeck.jsx";
import Cart from "./Cart.jsx";

const API_URL = // bypassing CORS via proxy for now
  "https://cors-anywhere.herokuapp.com/https://www.reasonapps.pl/data.json";

const DATA_STATES = { loading: "loading", loaded: "loaded" };

export default class App extends Component {
  state = {
    dataState: DATA_STATES.loading,
    showCart: false,
    products: [],
    cart: []
  };

  async componentDidMount() {
    const response = await fetch(API_URL);
    const products = await response.json();
    this.setState({ products, dataState: DATA_STATES.loaded });
  }

  toggleCartModal = () => {
    this.setState(state => {
      return {
        showCart: !state.showCart
      };
    });
  };

  addToCart = id => {
    this.setState(state => {
      const isProductAlreadyInCart = !!state.cart.find(
        product => product.id === id
      );

      if (isProductAlreadyInCart) {
        return {
          cart: state.cart.map(productInCart => {
            if (productInCart.id === id) {
              return { ...productInCart, quantity: productInCart.quantity + 1 };
            }
            return productInCart;
          })
        };
      }

      const product = state.products.find(product => product.id === id);
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    });
  };

  removeFromCart = id => {
    this.setState(state => {
      const productInCart = state.cart.find(product => product.id === id);

      if (productInCart) {
        if (productInCart.quantity < 2) {
          return { cart: state.cart.filter(product => product.id !== id) };
        }

        return {
          cart: state.cart.map(productInCart => {
            if (productInCart.id === id) {
              return { ...productInCart, quantity: productInCart.quantity - 1 };
            }
            return productInCart;
          })
        };
      }
    });
  };

  render() {
    const { dataState, products, cart, showCart } = this.state;

    return (
      <>
        <Header cart={cart} toggleCartModal={this.toggleCartModal} />
        <Cart
          showCart={showCart}
          toggleCartModal={this.toggleCartModal}
          cart={cart}
          addToCart={this.addToCart}
          removeFromCart={this.removeFromCart}
        />
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
