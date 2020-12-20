import { useState, useEffect, useReducer } from "react";
import { Container, Row, Col } from "react-bootstrap";
import cartReducer from "../reducers/cartReducer";
import {
  addProductToCart,
  removeProductFromCart,
} from "../actions/cartActions";
import TopBar from "./TopBar";
import Products from "./Products/Products";
import Cart from "./Cart/Cart";
import { Product } from "types";

const API_URL = "/react-shopping-cart/data.json";

export enum DataStates {
  loading = "loading",
  loaded = "loaded",
  error = "error",
}

export default function App() {
  const [dataState, setDataState] = useState(DataStates.loading);
  const [showCartModal, setCartModalVisibility] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const fetchProducts = async (url: string) => {
      const response = await fetch(url);
      const products = await response.json();

      try {
        setProducts(products);
        setDataState(DataStates.loaded);
      } catch {
        setDataState(DataStates.error);
      }
    };

    fetchProducts(API_URL);
  }, []);

  const toggleCartModal = () => {
    setCartModalVisibility((isVisible) => !isVisible);
  };

  const addToCart = (id: Product["id"]) => {
    const product = products.find((product) => product.id === id);
    if (!product) return;
    dispatch(addProductToCart(product));
  };

  const removeFromCart = (id: Product["id"]) => {
    const product = products.find((product) => product.id === id);
    if (!product) return;
    dispatch(removeProductFromCart(product));
  };

  const itemsInCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <>
      <TopBar
        itemsInCartCount={itemsInCartCount}
        toggleCartModal={toggleCartModal}
      />
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
