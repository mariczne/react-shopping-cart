import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TopBar from "./TopBar.jsx";
import Products from "./Products/Products.jsx";
import Cart from "./Cart/Cart.jsx";

const API_URL = // bypassing CORS via proxy for now
  "https://cors-anywhere.herokuapp.com/https://www.reasonapps.pl/data.json";

const DATA_STATES = { loading: "loading", loaded: "loaded" };

export default function App() {
  const [dataState, setDataState] = useState(DATA_STATES.loading);
  const [showCartModal, setCartModalVisibility] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts(API_URL).then(products => {
      setProducts(products);
      setDataState(DATA_STATES.loaded);
    });
  }, []);

  const fetchProducts = async url => {
    const response = await fetch(url);
    const products = await response.json();
    return products;
  };

  const toggleCartModal = () => {
    setCartModalVisibility(!showCartModal);
  };

  const addToCart = id => {
    const isProductAlreadyInCart = !!cart.find(
      productInCart => productInCart.id === id
    );
    if (isProductAlreadyInCart) {
      setCart(
        cart.map(productInCart => {
          if (productInCart.id === id) {
            return { ...productInCart, quantity: productInCart.quantity + 1 };
          }
          return productInCart;
        })
      );
    } else {
      const product = products.find(product => product.id === id);
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = id => {
    const productInCart = cart.find(productInCart => productInCart.id === id);

    if (productInCart) {
      if (productInCart.quantity < 2) {
        setCart(cart.filter(productInCart => productInCart.id !== id));
      } else {
        setCart(
          cart.map(productInCart => {
            if (productInCart.id === id) {
              return { ...productInCart, quantity: productInCart.quantity - 1 };
            }
            return productInCart;
          })
        );
      }
    }
  };

  return (
    <>
      <TopBar cart={cart} toggleCartModal={toggleCartModal} />
      <Cart
        showCartModal={showCartModal}
        toggleCartModal={toggleCartModal}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
      <Container>
        <Row style={{ marginTop: 70 }}>
          <Col>
            <Products
              dataState={dataState}
              products={products}
              cart={cart}
              addToCart={addToCart}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
