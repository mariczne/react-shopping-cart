import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TopBar from "./TopBar.jsx";
import Products from "./Products/Products.jsx";
import Cart from "./Cart/Cart.jsx";

const API_URL = // bypassing CORS via proxy for now
  "https://cors-anywhere.herokuapp.com/https://www.reasonapps.pl/data.json";

const DATA_STATES = { loading: "loading", loaded: "loaded" };

export default class App extends Component {
  state = {
    dataState: DATA_STATES.loading,
    showCartModal: false,
    products: [],
    cart: []
  };

  componentDidMount() {
    this.fetchProducts(API_URL).then(products =>
      this.setState({ products, dataState: DATA_STATES.loaded })
    );
  }

  fetchProducts = async url => {
    const response = await fetch(url);
    const products = await response.json();
    return products;
  };

  toggleCartModal = () => {
    this.setState(state => {
      return {
        showCartModal: !state.showCartModal
      };
    });
  };

  addToCart = id => {
    this.setState(state => {
      const { cart, products } = state;
      const isProductAlreadyInCart = !!cart.find(
        productInCart => productInCart.id === id
      );

      if (isProductAlreadyInCart) {
        return {
          cart: cart.map(productInCart => {
            if (productInCart.id === id) {
              return { ...productInCart, quantity: productInCart.quantity + 1 };
            }
            return productInCart;
          })
        };
      }

      const product = products.find(product => product.id === id);
      return { cart: [...cart, { ...product, quantity: 1 }] };
    });
  };

  removeFromCart = id => {
    this.setState(state => {
      const { cart } = state;
      const productInCart = cart.find(productInCart => productInCart.id === id);

      if (productInCart) {
        if (productInCart.quantity < 2) {
          return {
            cart: cart.filter(productInCart => productInCart.id !== id)
          };
        }

        return {
          cart: cart.map(productInCart => {
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
    const { dataState, products, cart, showCartModal } = this.state;

    return (
      <>
        <TopBar cart={cart} toggleCartModal={this.toggleCartModal} />
        <Cart
          showCartModal={showCartModal}
          toggleCartModal={this.toggleCartModal}
          cart={cart}
          addToCart={this.addToCart}
          removeFromCart={this.removeFromCart}
        />
        <Container>
          <Row style={{marginTop: 70}}>
            <Col>
              <Products
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
