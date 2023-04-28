import { formatCurrency } from "../utilities/formatCurrency";
import { useEffect, useState } from "react";
import { City } from "../models/City";
import { CheckoutItem } from "../components/CartItem";
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
      setDiscount(Math.round(total * 0.10));
    } else {
      setDiscount(0);
    }
  }

  async function fetchPostalCityLists(): Promise<City[]> {
    const apiCity = "https://api.dataforsyningen.dk/postnumre";

    try {
      const response = await fetch(apiCity);
      const responseData = await response.json();
      const cityList = responseData.map((e: { nr: string; navn: string }) => new City(e.nr, e.navn));
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
    <div className="maincontainer">
      <div className="header">
        <h2>Din Kurv</h2>
        <p className="tekst">Oversigt over tilføjede produkter til din kurv</p>
      </div>

      <div className="row">
        <div className="col-md4 order-md2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Kurv</span>
            <span className="badge badge-secondary badge-pill"></span>
          </h4>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                {cartItems.map((item) => (
                  <CheckoutItem key={item.id} {...item} />
                ))}
              </div>
            </li>

            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                <h6 className="my-0">Rabat</h6>
                <small>Mængderabat</small>
              </div>
              <span className="text-success">{discount + " kr."}</span>
              </li>
            <li className="list-group-item d-flex justify-content-between">
              <div className="ms-auto fw-bold fs-5">
                I alt{" "}
                {formatCurrency(
                  total - discount
                )}
              </div>
            </li>
          </ul>
          <form className="card p-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Kuponkode"
              />
              <div className="input-group-append">
                <button type="button" className="btn btn-secondary">
                  Tilføj
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Leveringsadresse</h4>
          <form className="needs-validation">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">Fornavn</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder=""
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Efternavn</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder=""
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">Emailadresse</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder=""
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address">Gadenavn</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder=""
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="postalNr">Postnummer</label>
                <input
                  type="text"
                  className="form-control"
                  id="postalNr"
                  placeholder=""
                  onChange={(e) => handlePostalChange(e.target.value)}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="city">By</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder=""
                  value={cityName}
                  disabled
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="country">Land</label>
                  <select
                    className="custom-select d-block w-100"
                    id="country"
                    required
                  >
                    <option value="">Vælg...</option>
                    <option>Danmark</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="phone">Telefonummer</label>
                  <input
                    type="phone"
                    className="form-control"
                    id="phone"
                    placeholder=""
                    required
                  />
                </div>
              </div>
            </div>

            <h4 className="mb-3">Betalingsadresse </h4>

            <div className="col-md-6 mb-3">
              <label htmlFor="firstName">Fornavn</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder=""
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="lastName">Efternavn</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder=""
              />
            </div>

            <div className="mb-3">
              <label htmlFor="companyName">Firma navn</label>
              <input
                type="text"
                className="form-control"
                id="companyName"
                placeholder=""
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address">Gadenavn</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder=""
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="city">By</label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder=""
                value={cityName}
                disabled
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="postalNr">Postnummer</label>
              <input
                type="text"
                className="form-control"
                id="postalNr"
                placeholder=""
                onChange={(e) => handlePostalChange(e.target.value)}
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="country">Land</label>
                <select
                  className="custom-select d-block w-100"
                  id="country"
                  required
                >
                  <option value="">Vælg...</option>
                  <option>Danmark</option>
                </select>
              </div>
            </div>

            <div>
              <label>
              Når du bestiller, godkender du den gældende fortrydelsesret og
              fortrolighedspolitik samt vores salgs- og leveringsbetingelser
                <input type="checkbox" style={{ width: "20px" }} />
              </label>
            </div>
            <li>
            
            </li>

            <div>
              <label>
              Ja, tak - jeg vil gerne modtage målrettede e-mails og SMS fra
              Gruppe 12 om eksklusive tilbud, trends og personlige
              anbefalinger. Jeg kan altid tilbagekalde mit samtykke
                <input type="checkbox" style={{ width: "20px" }} />
              </label>
            </div>

            <div>
              Tilføj eventuelle kommentarer til ordren
              <div></div>
              <input
                style={{ width: "600px", height: "200px" }}
              />
            </div>
            </form>
          </div>
        </div>
        <div>
        <button className="btn btn-primary btn-lg btn-block" type="button">
            Fortsæt til betaling
          </button>
        </div>
      </div>
);
}
