import React, { Component } from "react";
import { Row, CardDeck, Spinner } from "react-bootstrap";
import Product from "./Product.jsx";
import SearchBox from "./SearchBox.jsx";

const DEFAULT_PRODUCTS_VISIBLE = 25;
const NO_PRODUCTS_TEXT = "No products fitting the criteria found";

export default class ProductDeck extends Component {
  state = {
    searchValue: "",
    productsToShow: DEFAULT_PRODUCTS_VISIBLE
  };

  componentWillMount() {
    window.addEventListener("scroll", this.loadMoreProducts);
    window.addEventListener("touchmove", this.loadMoreProducts);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.loadMoreProducts);
    window.removeEventListener("touchmove", this.loadMoreProducts);
  }

  loadMoreProducts = () => {
    const endOfPageReached =
      window.innerHeight + document.documentElement.scrollTop ===
      document.scrollingElement.scrollHeight;
    if (endOfPageReached) {
      this.setState(state => {
        return {
          productsToShow: state.productsToShow + DEFAULT_PRODUCTS_VISIBLE
        };
      });
    }
  };

  onSearchChange = e => {
    const targetValue = e.target.value;
    this.setState({
      searchValue: targetValue,
      productsToShow: DEFAULT_PRODUCTS_VISIBLE
    });
  };

  filterProducts = products => {
    if (products.length > 0) {
      return products.filter(
        product =>
          product.name
            .toLowerCase()
            .indexOf(this.state.searchValue.toLowerCase()) !== -1
      );
    }
    return [];
  };

  renderFilteredProducts = () => {
    const { products, cart, addToCart } = this.props;
    const { productsToShow } = this.state;
    const filteredProducts = this.filterProducts(products).slice(
      0,
      productsToShow
    );
    if (filteredProducts.length === 0) {
      return <p>{NO_PRODUCTS_TEXT}</p>;
    }
    return filteredProducts.map(product => {
      const productInCart = cart.find(
        productInCart => productInCart.id === product.id
      );
      let inCartQuantity;
      if (productInCart) {
        inCartQuantity = productInCart.quantity;
      } else {
        inCartQuantity = 0;
      }
      return (
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          addToCart={addToCart}
          inCartQuantity={inCartQuantity}
        />
      );
    });
  };

  render() {
    return (
      <>
        <Row>
          <SearchBox
            value={this.state.searchValue}
            onSearchChange={this.onSearchChange}
          />
        </Row>
        <Row className="justify-content-md-center">
          {this.props.dataState === "loading" ? (
            <Spinner animation="border" />
          ) : (
            <CardDeck style={{ justifyContent: "space-between" }}>
              {this.renderFilteredProducts()}
            </CardDeck>
          )}
        </Row>
      </>
    );
  }
}

ProductDeck.defaultProps = {
  dataState: "loading",
  products: [],
  cart: [],
  addToCart: () => {}
};
