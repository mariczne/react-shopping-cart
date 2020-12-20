import { fireEvent, render, waitFor, within } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { App } from "App";
import { Product } from "types";

const data: Product[] = require("../../public/data.json");

const server = setupServer(
  rest.get("/react-shopping-cart/data.json", (req, res, ctx) => {
    return res(ctx.json(data));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("should render first 25 products on initial render", async () => {
  const { getAllByText } = render(<App />);

  const products = await waitFor(() =>
    getAllByText((text) => data.some((product) => product.name === text))
  );

  expect(products).toHaveLength(25);
});

it("should handle adding product to cart", async () => {
  const { getByRole } = render(<App />);

  const productList = await waitFor(() => getByRole("list"));
  const productListItems = within(productList).getAllByRole("listitem");
  const firstProductCard = productListItems[0];

  fireEvent.click(within(firstProductCard).getByRole("button"));
  expect(within(firstProductCard).getByText("1 in cart")).toBeInTheDocument();

  fireEvent.click(within(firstProductCard).getByRole("button"));
  expect(within(firstProductCard).getByText("2 in cart")).toBeInTheDocument();
});

it("should show cart modal when cart button is clicked", async () => {
  const { getByRole } = render(<App />);
  const navigation = getByRole("navigation");

  fireEvent.click(within(navigation).getByRole("button"));

  expect(getByRole("dialog")).toBeInTheDocument();
  expect(getByRole("dialog")).toHaveTextContent("Your cart");
});

it("should handle removing product from cart", async () => {
  const { getByRole } = render(<App />);

  const productList = await waitFor(() => getByRole("list"));
  const productListItems = within(productList).getAllByRole("listitem");
  const firstProductCard = productListItems[0];

  fireEvent.click(within(firstProductCard).getByRole("button"));
  expect(within(firstProductCard).getByText("1 in cart")).toBeInTheDocument();

  const navigation = getByRole("navigation");

  fireEvent.click(within(navigation).getByRole("button"));

  const modal = getByRole("dialog");

  expect(modal).toBeInTheDocument();
  expect(modal).toHaveTextContent("Your cart");

  const cartList = within(modal).getByRole("list");
  const cartItem = within(cartList).getByRole("listitem");

  expect(cartItem).toBeInTheDocument();

  const decrementButton = within(cartItem)
    .getAllByRole("button")
    .filter((button) => button.textContent === "-")[0];

  fireEvent.click(decrementButton);

  expect(cartItem).not.toBeInTheDocument();
});
