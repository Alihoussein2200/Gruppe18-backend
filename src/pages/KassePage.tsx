import { Button } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function CheckoutPage(price: number) {
  return (
    <div className="maincontainer">
      <div className="py-5 text-center">
        <h2>Kassen</h2>
        <p className="lead">oversigt</p>
      </div>

      <div className="row">
        <div className="col-md4 order-md2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Kurv</span>
            <span className="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Produkt</h6>
                <small className="text-muted">Beskrivelse</small>
              </div>
              <span className="text-muted">{formatCurrency(price)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Produkt</h6>
                <small className="text-muted">Brief description</small>
              </div>
              <span className="text-muted">{formatCurrency(price)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Produkt</h6>
                <small className="text-muted">beskrivelse</small>
              </div>
              <span className="text-muted">{formatCurrency(price)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                <h6 className="my-0">Rabat</h6>
                <small>Mængderabt</small>
              </div>
              <span className="text-success">-20 kr</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (DKK)</span>
              <strong>//</strong>
            </li>
          </ul>
          <form className="card p-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Promo code"
              />
              <div className="input-group-append">
                <Button type="button" className="btn btn-secondary">
                  Tilføj
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Adresse</h4>
          <form className="needs-validation">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label form="firstName">Fornavn</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder=""
                />
              </div>
              <div className="col-md-6 mb-3">
                <label form="lastName">Efternavn</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder=""
                />
              </div>

              <div className="mb-3">
                <label form="email">Emailadresse</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder=""
                />
                <div className="mb-3">
                  <label form="address">Gadenavn</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder=""
                  />
                  <div className="col-md-6 mb-3">
                    <label form="lastName">By</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder=""
                      value=""
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label form="lastName">Postnummer</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder=""
                      value=""
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label form="country">Land</label>
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
                      <label form="email">Telefonummer</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button className="btn btn-primary btn-lg btn-block" type="button">
              Fortsæt til betaling
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
