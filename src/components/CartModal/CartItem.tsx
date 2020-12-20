import { Button } from "react-bootstrap";
import { ComponentProps } from "react";
import { ProductInCart } from "types";
import { CartItemListProps } from "./CartItemList";

export type CartItemProps = ProductInCart &
  Pick<CartItemListProps, "addToCart" | "removeFromCart">;

function CartItem({
  id,
  name,
  quantity,
  price,
  addToCart,
  removeFromCart,
}: CartItemProps) {
  return (
    <tr role="listitem">
      <td className="align-middle">{name}</td>
      <td className="align-middle text-right text-nowrap">
        <DecrementButton removeFromCart={() => removeFromCart(id)} />
        <span className="mx-2">{quantity}</span>
        <IncrementButton addToCart={() => addToCart(id)} />
      </td>
      <td className="align-middle text-right">{price.toFixed(2)}</td>
      <td className="align-middle text-right">
        {((100 * price * quantity) / 100).toFixed(2)}
      </td>
    </tr>
  );
}

function ActionButton(props: ComponentProps<typeof Button>) {
  return (
    <Button
      size="sm"
      style={{ width: "1.5rem", height: "1.5rem" }}
      className="d-inline-flex justify-content-center align-items-center
  rounded-circle p-0"
      {...props}
    />
  );
}

export interface IncrementButtonProps {
  addToCart: () => void;
}

function IncrementButton({ addToCart }: IncrementButtonProps) {
  return (
    <ActionButton variant="outline-success" onClick={addToCart}>
      +
    </ActionButton>
  );
}

export interface DecrementButtonProps {
  removeFromCart: () => void;
}

function DecrementButton({ removeFromCart }: DecrementButtonProps) {
  return (
    <ActionButton variant="outline-danger" onClick={removeFromCart}>
      -
    </ActionButton>
  );
}

export { CartItem };
