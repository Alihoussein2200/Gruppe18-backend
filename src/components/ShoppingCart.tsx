import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ShoppingCart.css";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  };

  useEffect(() => {
    calculateTotal();
  });

  const handleCheckout = () => {
    closeCart(); // Close the shopping cart
  };

  return (
    <div className={`offcanvas ${isOpen ? "show" : ""}`}>
      <div className="offcanvas-header">
      <h3 className="offcanvas-title">Kurv</h3>
        <button type="button" className="btn-close" onClick={closeCart}> 
        &times;</button>
      </div>
      <div className="offcanvas-body">
        <div className="stack gap-3">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              price={item.price}
              id={item.id}
              quantity={item.quantity}
            />
          ))}

          <div className="ms-auto fw-bold fs-5">
            I alt {formatCurrency(total)}
          </div>

          <div>
            <Link to="StorePreview/">
              <button className="btn btn-info w-100" onClick={handleCheckout}>
                Gå til Kassen
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
