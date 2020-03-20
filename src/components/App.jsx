import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col } from "react-bootstrap";
import cartReducer, { CART_ACTIONS } from "../reducers/cartReducer";
import TopBar from "./TopBar.jsx";
import Products from "./Products/Products.jsx";
import Cart from "./Cart/Cart.jsx";

const API_URL = // bypassing CORS via proxy for now
  "https://cors-anywhere.herokuapp.com/https://www.reasonapps.pl/data.json";

const DATA_STATES = { loading: "loading", loaded: "loaded" };

const { ADD_PRODUCT, REMOVE_PRODUCT } = CART_ACTIONS;

export default function App() {
  const [dataState, setDataState] = useState(DATA_STATES.loading);
  const [showCartModal, setCartModalVisibility] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, dispatch] = useReducer(cartReducer, []);

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
    const product = products.find(product => product.id === id);
    dispatch({ type: ADD_PRODUCT, product });
  };

  const removeFromCart = id => {
    dispatch({ type: REMOVE_PRODUCT, productId: id });
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
