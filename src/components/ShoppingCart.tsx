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
  }, [cartItems]);

  useEffect(() => {
    if (cartItems.length === 0 && isOpen) {
      closeCart();
    }
  }, [cartItems, isOpen]);

  const handleCheckout = () => {
    closeCart();
  };

  return (
    <div className={`offcanvas ${isOpen ? "show" : ""}`}>
      <div className="offcanvas-header">
      <div className="offcanvas-title">Din kurv 
      <button className="btn-close" onClick={closeCart}> 
      &times;</button>
      </div>
      </div>
      <div className="offcanvas-body">
        <div className="stackShoppingCart gapStack">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              price={item.price}
              id={item.id}
              quantity={item.quantity}
            />
          ))}
        </div>
      </div>
      <div className="totalShoppingCart">
            I alt {formatCurrency(total)}
          </div>
      <div>
      <Link to="StorePreview/">
              <button className="btnShoppingCart" onClick={handleCheckout}>
                Gå til Kassen
              </button>
            </Link>
      </div>
    </div>

  );
}
