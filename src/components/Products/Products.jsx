import React, { Component } from "react";
import { Row, Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";
import SearchBox from "./SearchBox.jsx";
import FilteredProducts from "./FilteredProducts.jsx"

const DEFAULT_PRODUCTS_VISIBLE = 25;

export default class Products extends Component {
  state = {
    searchValue: "",
    productsToShowCount: DEFAULT_PRODUCTS_VISIBLE
  };

  loadMoreProducts = () => {
    this.setState(state => {
      return {
        productsToShowCount: state.productsToShowCount + DEFAULT_PRODUCTS_VISIBLE
      };
    });
  };

  onSearchChange = e => {
    const targetValue = e.target.value;
    this.setState({
      searchValue: targetValue,
      productsToShowCount: DEFAULT_PRODUCTS_VISIBLE
    });
  };

  render() {
    const { searchValue, productsToShowCount } = this.state;
    const { dataState, products, cart, addToCart } = this.props;
    const hasMoreProducts = products.length > productsToShowCount;

    return (
      <>
        <Row>
          <SearchBox value={searchValue} onSearchChange={this.onSearchChange} />
        </Row>
        <Row className="justify-content-center">
          {dataState === "loading" ? (
            <Spinner animation="border" />
          ) : (
            <InfiniteScroll
              className="w-100"
              hasMore={hasMoreProducts}
              loadMore={this.loadMoreProducts}
              loader={
                <div className="d-flex justify-content-center" key={0}>
                  <Spinner animation="border" />
                </div>
              }
            >
              <FilteredProducts
                products={products}
                cart={cart}
                addToCart={addToCart}
                productsToShowCount={productsToShowCount}
                searchValue={searchValue}
              />
            </InfiniteScroll>
          )}
        </Row>
      </>
    );
  }
}

Products.defaultProps = {
  dataState: "loading",
  products: [],
  cart: [],
  addToCart: () => {}
};