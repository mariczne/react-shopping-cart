import { Navbar, Container, Badge, Button, Nav } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import reactLogo from "../logo192.png";

const APP_NAME = "Shopping Cart";

const BADGE_STYLE = { width: "1.5rem", height: "1.5rem" };

const BADGE_CLASSES = `d-inline-flex justify-content-center align-items-center
rounded-circle p-0 ml-2`;

export default function TopBar({ cart, toggleCartModal }) {
  const itemsInCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <Navbar bg="light" fixed="top">
      <Container>
        <Navbar.Brand href="#">
          <img
            src={reactLogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Shopping Cart"
          />
        </Navbar.Brand>
        <Navbar.Brand href="#" className="d-none d-sm-inline-block">
          {APP_NAME}
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="https://github.com/mariczne/react-shopping-cart">
            GitHub repo
          </Nav.Link>
        </Nav>
        <Button
          variant={itemsInCartCount ? "primary" : "outline-secondary"}
          className="text-nowrap"
          onClick={toggleCartModal}
        >
          <FaShoppingCart size="1.5rem" />
          {itemsInCartCount ? (
            <Badge
              style={BADGE_STYLE}
              className={BADGE_CLASSES}
              variant="light"
            >
              {itemsInCartCount}
            </Badge>
          ) : null}
        </Button>
      </Container>
    </Navbar>
  );
}

TopBar.defaultProps = {
  cart: [],
  toggleCartModal: () => {}
};
