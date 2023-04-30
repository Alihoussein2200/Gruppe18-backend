import "./BetalingPage.css";
export function PaymentPage() {
  
    return (
    <div className="creditCardForm">
    <div className="heading">
        <h1>Godkendt Køb</h1>
    </div>
    <div className="payment">
        <form>
            <div className="form-group owner">
                <label htmlFor="owner">Ejer</label>
                <input type="text" className="form-control" id="owner"/>
            </div>
            <div className="form-group CVV">
                <label htmlFor="cvv">CVV</label>
                <input type="text" className="form-control" id="cvv"/>
            </div>
            <div className="form-group" id="card-number-field">
                <label htmlFor="cardNumber">Kort Nummer</label>
                <input type="text" className="form-control" id="cardNumber"/>
            </div>
            <div className="form-group" id="expiration-date">
                <label>Udløbs dato</label>
                <select>
                    <option value="01">January</option>
                    <option value="02">February </option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
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
            <div className="form-group" id="credit_cards">
                
            </div>
            <div className="form-group" id="pay-now">
                <button type="submit" className="btn btn-default" id="confirm-purchase">Køb nu</button>
            </div>
        </form>
    </div>
</div>

  );
}
