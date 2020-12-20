import { useState } from "react";
import { Row, Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";
import SearchBox from "./SearchBox";
import FilteredProducts from "./FilteredProducts";
import { DataStates } from "components/App";
import { Cart, Product } from "types";

const DEFAULT_PRODUCTS_VISIBLE = 25;

export interface ProductsListProps {
  dataState: keyof typeof DataStates;
  products: Product[];
  cart: Cart;
  addToCart: (product: Product["id"]) => void;
}

export default function Products({
  dataState,
  products,
  cart,
  addToCart,
}: ProductsListProps) {
  const [searchValue, setSearchValue] = useState("");
  const [productsToShowCount, setProductsToShowCount] = useState(
    DEFAULT_PRODUCTS_VISIBLE
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setProductsToShowCount(DEFAULT_PRODUCTS_VISIBLE);
  };

  const loadMoreProducts = () => {
    setProductsToShowCount(productsToShowCount + DEFAULT_PRODUCTS_VISIBLE);
  };

  const hasMoreProducts = products.length > productsToShowCount;

  return (
    <>
      <Row>
        <SearchBox value={searchValue} onSearchChange={onSearchChange} />
      </Row>
      <Row className="justify-content-center">
        {dataState === "loading" ? (
          <Spinner animation="border" />
        ) : (
          <InfiniteScroll
            className="w-100"
            hasMore={hasMoreProducts}
            loadMore={loadMoreProducts}
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
