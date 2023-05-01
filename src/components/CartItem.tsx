import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import "./CartItem.css";

type CartItemProps = {
  id: number;
  quantity: number;
  name: string;
  price: number;
};

export function CartItem({ id, quantity, name, price }: CartItemProps) {
  const { removeFromCart, cartItems } = useShoppingCart();
  const item = cartItems.find((i) => i.id === id);

  if (item == null) return null;

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted small">
              x {quantity}
            </span>
          )}
        </div>
        <div className="text-muted small">
          {formatCurrency(item.price)}
        </div>
      </div>
      <div className="cart-item-price"> {formatCurrency(item.price * quantity)}</div>
      <button
        className="cart-item-remove-button"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </button>
    </div>
  );
}

export function CheckoutItem({ id, quantity }: CartItemProps) {
  const { removeFromCart, cartItems } = useShoppingCart();
  const item = cartItems.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <div className="checkout-item">
      <div className="checkout-item-details">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="quantity small">
              x {quantity}
            </span>
          )}
        </div>
      </div>
      <div className="checkout-item-price">
        {formatCurrency(item.price * quantity)}
      </div>
      <button
        className="checkout-item-remove-button"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </button>
    </div>
  );
}
