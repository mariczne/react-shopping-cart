import { Row, CardDeck } from "react-bootstrap";
import Product from "./Product";
import { ProductsListProps } from "./Products";
import { Product as IProduct } from "types";

const NO_PRODUCTS_TEXT = "No products fitting the criteria found";

export interface FilteredProductsProps
  extends Omit<ProductsListProps, "dataState"> {
  productsToShowCount: number;
  searchValue: string;
}

export default function FilteredProducts({
  products,
  cart,
  addToCart,
  productsToShowCount,
  searchValue,
}: FilteredProductsProps) {
  const filterProducts = (products: IProduct[]) => {
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
    <CardDeck>
      {filteredProducts.map((product) => {
        const productInCart = cart.find(
          (productInCart) => productInCart.id === product.id
        );

        return (
          <Product
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
