import { Row, CardDeck } from "react-bootstrap";
import { ProductsListItem } from "./ProductsListItem";
import { ProductsListProps } from "./ProductsList";
import { Product } from "types";

const NO_PRODUCTS_TEXT = "No products fitting the criteria found";

export interface FilteredProductsProps
  extends Omit<ProductsListProps, "dataState"> {
  productsToShowCount: number;
  searchValue: string;
}

function FilteredProducts({
  products,
  cart,
  addToCart,
  productsToShowCount,
  searchValue,
}: FilteredProductsProps) {
  const filterProducts = (products: Product[]) => {
    if (products.length > 0) {
      const searchValues = searchValue.toLowerCase().trim().split(" ");

      const regex = new RegExp(`^(?=.*${searchValues.join(")(?=.*")}).*$`, "i");
      return products.filter((product) => regex.test(product.name));
    }
    return [];
  };

  const filteredProducts = filterProducts(products).slice(
    0,
    productsToShowCount
  );

  if (filteredProducts.length === 0) {
    return (
      <Row className="justify-content-center">
        <p>{NO_PRODUCTS_TEXT}</p>
      </Row>
    );
  }

  return (
    <CardDeck role="list">
      {filteredProducts.map((product) => {
        const productInCart = cart.find(
          (productInCart) => productInCart.id === product.id
        );

        return (
          <ProductsListItem
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            addToCart={addToCart}
            quantity={productInCart ? productInCart.quantity : 0}
          />
        );
      })}
    </CardDeck>
  );
}

export { FilteredProducts };
