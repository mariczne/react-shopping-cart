import { useState, useReducer } from "react";
import { cartReducer, addProductToCart, removeProductFromCart } from "cart";
import { Container, Row, Col } from "react-bootstrap";
import { TopBar } from "components/TopBar";
import { CartModal } from "components/CartModal";
import { ProductsList } from "components/ProductsList";
import { useProducts } from "utils";
import { Product } from "types";

function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [showCartModal, setCartModalVisibility] = useState(false);

  const { products, dataState } = useProducts();

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
      <CartModal
        showCartModal={showCartModal}
        toggleCartModal={toggleCartModal}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
      <Container>
        <Row style={{ marginTop: 70 }}>
          <Col>
            <ProductsList
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

export { App };
