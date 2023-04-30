import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";
import "./StoreItem.css";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export function StoreItem({ id, name, price, imageUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);

  return (
    <div className="card">
      <img
        className="picture"
        src={imageUrl}
        alt={name}
      />
      <div className="card-body">
        <h5 className="card-title">
          <span className="text">{name}</span>
          <span className="price-text">{formatCurrency(price)}</span>
        </h5>
        <div>
          {quantity === 0 ? (
            <button
              className="btnstoreItem btn-tilføj"
              onClick={() => increaseCartQuantity(id, name, price)}
            >
              Tilføj til kurv
            </button>
          ) : (
            <div>
              <div>
                <button onClick={() => decreaseCartQuantity(id)} className="btn-margin">-</button>
                <span className="text">{quantity}</span>
                <button onClick={() => increaseCartQuantity(id, name, price)} className="btn-margin">+</button>
                <button onClick={() => removeFromCart(id)} className="btnstoreItem btn-fjern">
                Fjern
              </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
