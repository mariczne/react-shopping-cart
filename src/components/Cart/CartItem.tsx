import { Button } from "react-bootstrap";
import { ProductInCart } from "types";
import { CartItemListProps } from "./CartItemList";

export type CartItemProps = ProductInCart &
  Pick<CartItemListProps, "addToCart" | "removeFromCart">;

export default function CartItem({
  id,
  name,
  quantity,
  price,
  addToCart,
  removeFromCart,
}: CartItemProps) {
  return (
    <tr>
      <td className="align-middle">{name}</td>
      <td className="align-middle text-right text-nowrap">
        <DecrementButton id={id} removeFromCart={removeFromCart} />
        <span className="mx-2">{quantity}</span>
        <IncrementButton id={id} addToCart={addToCart} />
      </td>
      <td className="align-middle text-right">{price.toFixed(2)}</td>
      <td className="align-middle text-right">
        {((100 * price * quantity) / 100).toFixed(2)}
      </td>
    </tr>
  );
}

const BUTTON_STYLE = { width: "1.5rem", height: "1.5rem" };

const BUTTON_CLASSES = `d-inline-flex justify-content-center align-items-center
rounded-circle p-0`;

export type IncrementButtonProps = Pick<CartItemProps, "id" | "addToCart">;

function IncrementButton({ id, addToCart }: IncrementButtonProps) {
  return (
    <Button
      variant="outline-success"
      size="sm"
      style={BUTTON_STYLE}
      className={BUTTON_CLASSES}
      onClick={() => addToCart(id)}
    >
      +
    </Button>
  );
}

export type DecrementButtonProps = Pick<CartItemProps, "id" | "removeFromCart">;

function DecrementButton({ id, removeFromCart }: DecrementButtonProps) {
  return (
    <Button
      variant="outline-danger"
      size="sm"
      style={BUTTON_STYLE}
      className={BUTTON_CLASSES}
      onClick={() => removeFromCart(id)}
    >
      -
    </Button>
  );
}
