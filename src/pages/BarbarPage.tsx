import { useState, useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"

export function Store() {

  const storeItemsUrl = "https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json";

  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    fetch(storeItemsUrl)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        const items = responseData.map((item: JSX.IntrinsicAttributes & { //raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json";
          id: number; name: string; price: number; imageUrl: string;
        }) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ));
        setDisplayData(items);
      })
      .catch((error) => console.error(error));
  }, [storeItemsUrl]);

  return (
    <>
      <h1>Store Items</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {displayData}
      </Row>
    </>
  );
}