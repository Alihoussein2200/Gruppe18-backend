import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalPrice);
  }
  

  useEffect(() => {
    calculateTotal();
  })

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title> Kurv </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} name={item.name} price={item.price} id={item.id} quantity={item.quantity} />
          ))}

          <div className="ms-auto fw-bold fs-5">
            I alt{" "}
            {formatCurrency(
              total
            )}
          </div>

          <div >
            <Link to="StorePreview/">
              {" "}
              <Button className="bg-info w-100">Gå til Kassen</Button>
            </Link>
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
