import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col } from "react-bootstrap";
import cartReducer from "../reducers/cartReducer";
import {
  addProductToCart,
  removeProductFromCart,
} from "../actions/cartActions";
import TopBar from "./TopBar.jsx";
import Products from "./Products/Products.jsx";
import Cart from "./Cart/Cart.jsx";

const API_URL = "/react-shopping-cart/data.json";

const DATA_STATES = { loading: "loading", loaded: "loaded" };

export default function App() {
  const [dataState, setDataState] = useState(DATA_STATES.loading);
  const [showCartModal, setCartModalVisibility] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const fetchProducts = async (url) => {
      const response = await fetch(url);
      const products = await response.json();
      return products;
    };
    fetchProducts(API_URL).then((products) => {
      setProducts(products);
      setDataState(DATA_STATES.loaded);
    });
  }, []);

  const toggleCartModal = () => {
    setCartModalVisibility(!showCartModal);
  };

  const addToCart = (id) => {
    const product = products.find((product) => product.id === id);
    dispatch(addProductToCart(product, cart));
  };

  const removeFromCart = (id) => {
    dispatch(removeProductFromCart(id, cart));
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
