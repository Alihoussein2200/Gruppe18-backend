import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

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
    <div className="card h-100">
      <img
        className="card-img-top"
        src={imageUrl}
        alt={name}
        style={{ height: "250px", objectFit: "scale-down" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </h5>
        <div className="mt-auto">
          {quantity === 0 ? (
            <button
              className="btn btn-info w-100"
              onClick={() => increaseCartQuantity(id, name, price)}
            >
              Tilføj til kurv
            </button>
          ) : (
            <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
              <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
                <button onClick={() => decreaseCartQuantity(id)}>-</button>
                <div>
                  <span className="fs-3">{quantity}</span>
                </div>
                <button onClick={() => increaseCartQuantity(id, name, price)}>+</button>
              </div>
              <button onClick={() => removeFromCart(id)} className="btn btn-danger btn-sm">
                Fjern
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
