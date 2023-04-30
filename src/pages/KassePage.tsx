import { formatCurrency } from "../utilities/formatCurrency";
import { useEffect, useState } from "react";
import { City } from "../models/City";
import { CartItem, CheckoutItem } from "../components/CartItem";
import { useShoppingCart } from "../context/ShoppingCartContext";
import "./KassePage.css";
import { Link } from "react-router-dom";
import { PaymentPage } from "./BetalingPage";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function CheckoutPage() {
  const [postalCode, setPostalCode] = useState("");
  const [cityName, setCityName] = useState("");
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const { cartItems } = useShoppingCart();

  async function handlePostalChange(input: string): Promise<void> {
    setPostalCode(input);

    if (input.length === 4) {
      const cityList = await fetchPostalCityLists();

      const cityMatch = cityList.find((city) => {
        return city.postalCode === input;
      });

      if (cityMatch) {
        setCityName(cityMatch.name);
      }
    } else {
      setCityName("");
    }
  }

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

  async function fetchPostalCityLists(): Promise<City[]> {
    const apiCity = "https://api.dataforsyningen.dk/postnumre";

    try {
      const response = await fetch(apiCity);
      const responseData = await response.json();
      const cityList = responseData.map(
        (e: { nr: string; navn: string }) => new City(e.nr, e.navn)
      );
      return cityList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  useEffect(() => {
    calculateTotal();
    calculateDiscount();
  }, [cartItems, total]);

  return (
    <div className="row">
      <div>
        <form>
          <div>
            <div className="border1">
              <h3>Kundeinfo</h3>
              <label htmlFor="fname">Fulde navn</label>
              <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Nielsen Larsen"
              />
              <label htmlFor="adr"> Vejnavn + husnummer</label>
              <input type="text" id="adr" name="address" />

              <div>
                <div>
                  <div className="post-container">
                    <div className="postnummer">
                      <label htmlFor="postalNr">Postnummer</label>
                      <input
                        type="text"
                        id="PostalNr"
                        name="state"
                        placeholder=""
                        onChange={(e) => handlePostalChange(e.target.value)}
                      />
                    </div>
                    <div className="by">
                      <label htmlFor="city">By</label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="Intast venligst et postnummer"
                        value={cityName}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="con-tele">
                    <div className="telefonummer">
                      <label htmlFor="phone">Telefonummer</label>
                      <input type="text" id="phone" placeholder="" required />
                    </div>

                    <div className="land">
                      <label htmlFor="country">Land</label>
                      <select className="country" id="country" required>
                        <option value="">Vælg...</option>
                        <option>Danmark</option>
                      </select>
                    </div>
                  </div>

                  <label htmlFor="email">E-mail</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Mail"
                  />

                  <label htmlFor="email">Bekræft e-mail</label>
                  <input type="text" id="email2" name="email2" />
                  <div className="checkbox1">
                    <label>
                      <input type="checkbox" name="sameadr" /> Levering til
                      arbejdsplads
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="border2">
        <h3>Din kurv</h3>

        <div className="gap">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              price={item.price}
              id={item.id}
              quantity={item.quantity}
            />
          ))}

          <ul className="intetpad">
            <div className="mainKasse">
              <div className="MængdeRabatKasse">
                Mængderabat:
              </div>
              <div>
                <span className="totalPriceKasse">
                  {discount + " kr."}
                </span>
              </div>
            </div>

          </ul>
          <ul>
            <div className="totalPriceKasse">
              Total pris {formatCurrency(total - discount)}
            </div>
          </ul>

          <form>
            <div className="kupon">
              <div className="kupon-child1">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Kuponkode"
                />
              </div>
              <div className="kupon.child2">
                <button type="button" className="button1">
                  Tilføj
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="gap">
          <div>
            <label>
              Når du bestiller, godkender du den gældende fortrydelsesret og
              fortrolighedspolitik samt vores salgs- og leveringsbetingelser
              <input type="checkbox" style={{ width: "20px" }} />
            </label>
          </div>
          <div>
            <label>
              Ja, tak - jeg vil gerne modtage målrettede e-mails og SMS fra
              Gruppe 12 om eksklusive tilbud, trends og personlige anbefalinger.
              Jeg kan altid tilbagekalde mit samtykke
              <input type="checkbox" style={{ width: "20px" }} />
            </label>
          </div>
          Tilføj eventuelle kommentarer til ordren
          <input style={{ width: "500px", height: "150px" }} />
        </div>


        

        <div className="b">
          <Link to="PaymentPage/">
          <button className="button2" onClick={PaymentPage}>
            Fortsæt til betaling
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
