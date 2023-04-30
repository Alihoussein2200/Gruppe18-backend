import { formatCurrency } from "../utilities/formatCurrency";
import { useEffect, useState } from "react";
import { City } from "../models/City";
import { CartItem, CheckoutItem } from "../components/CartItem";
import { useShoppingCart } from "../context/ShoppingCartContext";
import "./KassePage.css";

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
<<<<<<< Updated upstream
    <div className="rowKassePage">
      <div className="col-75">
        <div className="container">
          <form>
            <div className="rowKassePage">
              <div className="col-50">
                <h3>Leveringsadresse</h3>
=======
    <div className="row, main-container">
      <div>
        <div>
          <form>
            <div className="row">
              <div className="border1">
                <h3>Kundeinfo</h3>
>>>>>>> Stashed changes
                <label htmlFor="fname">Fulde navn</label>
                <input
                  type="text"
                  id="fname"
                  name="firstname"
                  placeholder="Nielsen Larsen"
                />
                <label htmlFor="adr"> Vejnavn + husnummer</label>
                <input type="text" id="adr" name="address" />

<<<<<<< Updated upstream
                <div className="rowKassePage">
                  <div className="col-50">
                    <label htmlFor="postalNr">Postnummer</label>
                    <input
                      type="text"
                      id="PostalNr"
                      name="state"
                      placeholder=""
                      onChange={(e) => handlePostalChange(e.target.value)}
                    />
                    <label htmlFor="city">By</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="Intast venligst et postnummer"
                      value={cityName}
                      disabled
                    />
                    <label htmlFor="phone">Telefonummer</label>
                    <input type="text" id="phone" placeholder="" required />
=======
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

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

              <div className="col-50">
                <h3>Betalingsmetode</h3>
                <label htmlFor="fname">Betalingskort</label>
                <div className="icon-container">
                  <i className="fa fa-cc-visa" style={{ color: "navy" }}></i>
                  <i className="fa fa-cc-amex" style={{ color: "blue" }}></i>
                  <i
                    className="fa fa-cc-mastercard"
                    style={{ color: "red;" }}
                  ></i>
                  <i
                    className="fa fa-cc-discover"
                    style={{ color: "orange;" }}
                  ></i>
                </div>
                <label htmlFor="cname">Navn på kortet</label>
                <input
                  type="text"
                  id="cname"
                  name="cardname"
                  placeholder="John More Doe"
                />
                <label htmlFor="ccnum">Kortnummer</label>
                <input
                  type="text"
                  id="ccnum"
                  name="cardnumber"
                  placeholder="1111-2222-3333-4444"
                />
                <label htmlFor="expmonth">Udløbsdato</label>
                <input
                  type="text"
                  id="expmonth"
                  name="expmonth"
                  placeholder="MM"
                />

                <div className="rowKassePage">
                  <div className="col-50">
                    <label htmlFor="expyear">Udløbsår</label>
                    <input
                      type="text"
                      id="expyear"
                      name="expyear"
                      placeholder="ÅÅ"
                    />
                  </div>
                  <div className="col-50">
                    <label htmlFor="cvv">Kontrolcifre</label>
                    <input type="text" id="cvv" name="cvv" placeholder="352" />
                  </div>
                </div>
              </div>
=======
>>>>>>> Stashed changes
            </div>
          </form>
        </div>
      </div>

      <div className="border2">
        <h3>Kurv</h3>

        <ul>
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
            <li className="list-group-item d-flex justify-content-between ">
              <div className="text-success">
                <h6 className="my-0">Rabat</h6>
                <small>Mængderabat</small>
              </div>
              <span className="text-success">{discount + " kr."}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <div className="ms-auto fw-bold fs-5">
                Total pris {formatCurrency(total - discount)}
              </div>
            </li>

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
        </ul>

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
          <input style={{ width: "700px", height: "150px" }} />
        </div>
        <div className="b">
          <button className="button2" type="button">
            Fortsæt til betaling
          </button>
        </div>
      </div>
    </div>
  );
}
