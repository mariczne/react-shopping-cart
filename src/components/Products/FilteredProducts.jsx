import React from "react";
import { Row, CardDeck } from "react-bootstrap";
import Product from "./Product.jsx";

const NO_PRODUCTS_TEXT = "No products fitting the criteria found";

export default function FilteredProducts({
  products,
  cart,
  addToCart,
  productsToShow,
  searchValue
}) {
  const filterProducts = products => {
    if (products.length > 0) {
      const searchValues = searchValue
        .toLowerCase()
        .trim()
        .split(" ");

      const regex = new RegExp(`^(?=.*${searchValues.join(")(?=.*")}).*$`, "i");
      return products.filter(product => regex.test(product.name));
    }
    return [];
  };

  const filteredProducts = filterProducts(products).slice(0, productsToShow);

  if (filteredProducts.length === 0) {
    return (
      <Row className="justify-content-center">
        <p>{NO_PRODUCTS_TEXT}</p>
      </Row>
    );
  }

  return (
    <CardDeck>
      {filteredProducts.map(product => {
        const productInCart = cart.find(
          productInCart => productInCart.id === product.id
        );

        return (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            addToCart={addToCart}
            quantityInCart={productInCart ? productInCart.quantity : 0}
          />
        );
      })}
    </CardDeck>
  );
}

FilteredProducts.defaultProps = {
  products: [],
  cart: [],
  addToCart: () => {},
  productsToShow: 25,
  searchValue: ""
};