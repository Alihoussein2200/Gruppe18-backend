import { useState, useEffect } from "react";
import { StoreItem } from "../components/StoreItem"
import "./ShopPage.css";

export function Store() {
  const storeItemsUrl =
    "https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json";

  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    fetch(storeItemsUrl)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        const items = responseData.map((item: JSX.IntrinsicAttributes & { id: number; name: string; price: number; imageUrl: string; }) => (
          <div className="colShopPage" key={item.id}>
            <StoreItem {...item} />
          </div>
        ));
        setDisplayData(items);
      })
      .catch((error) => console.error(error));
  }, [storeItemsUrl]);

  return (
   <div className="colorShopPage AppContainerShopPage">
    <div className="title">
    Super Bazar Lyngby #SBL
    </div>
    <div className="rowShopPage">
      {displayData}
    </div>
    </div>
  );
  }