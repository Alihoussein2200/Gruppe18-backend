import { Link } from "react-router-dom";
import "./BetalingPage.css";

import { useEffect, useState } from "react";
import { formatCurrency } from "../utilities/formatCurrency";
import "./BetalingPage.css";

import { CartItem } from "../components/CartItem";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function PaymentPage() {
  const handlePurchase = () => {
    alert("Tak fordi du handlede i Super Bazar Lyngby!");
  };

  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const { cartItems } = useShoppingCart();

  const calculateTotal = () => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  };

  function calculateDiscount() {
    if (total > 300 && cartItems.length > 0) {
      setDiscount(Math.round(total * 0.1));
    } else {
      setDiscount(0);
    }
  }

  useEffect(() => {
    calculateTotal();
    calculateDiscount();
  }, [cartItems, total]);

  return (
    <div className="creditCardForm">
      <div className="heading">
        <h1>kundeinformation</h1>
      </div>
      <div className="payment">
        <form>
          <div className="form-group owner">
            <label htmlFor="owner">Ejer</label>
            <input type="text" className="form-control" id="owner" />
          </div>
          <div className="form-group CVV">
            <label htmlFor="cvv">CVV</label>
            <input type="text" className="form-control" id="cvv" />
          </div>
          <div className="form-group" id="card-number-field">
            <label htmlFor="cardNumber">Kortnummer</label>
            <input type="text" className="form-control" id="cardNumber" />
          </div>
          <div className="form-group" id="expiration-date">
            <label>Udløbsdato</label>
            <select>
              <option value="01">Januar</option>
              <option value="02">Februar </option>
              <option value="03">Marts</option>
              <option value="04">April</option>
              <option value="05">Maj</option>
              <option value="06">Juni</option>
              <option value="07">Juli</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">Oktober</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <select>
              <option value="16"> 2016</option>
              <option value="17"> 2017</option>
              <option value="18"> 2018</option>
              <option value="19"> 2019</option>
              <option value="20"> 2020</option>
              <option value="21"> 2021</option>
            </select>
          </div>
          <div className="form-group" id="credit_cards"></div>
          <div className="form-group" id="pay-now">
            <Link to="/store">
              <button
                type="submit"
                className="btn btn-default"
                id="confirm-purchase"
                onClick={handlePurchase}
              >
                Betal {formatCurrency(total - discount)}
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
