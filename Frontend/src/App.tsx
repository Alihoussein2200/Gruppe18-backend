import { Routes, Route } from "react-router-dom";
import { Store } from "./pages/ShopPage";
import { About } from "./pages/OmPage";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { CheckoutPage } from "./pages/KassePage";
import { PaymentPage } from "./pages/BetalingPage";
import { DotLoader } from "react-spinners";
import React from "react";
import "./App.css"


function App() {

  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);


  return (
    <div>
      {isLoading && (
        <div className="loadingDot">
          <DotLoader color="#000" loading={isLoading} size={50} />
        </div>
      )}

      <ShoppingCartProvider>
        <Navbar />
        <div className="AppContainer">
          {isLoading ? null : (
            <Routes>
              <Route path="/store" element={<Store />} />
              <Route path="/about" element={<About />} />
              <Route path="/StorePreview" element={<CheckoutPage />} />
              <Route path="/PaymentPage" element={<PaymentPage />} />
            </Routes>
          )}
        </div>
      </ShoppingCartProvider>
    </div>
  );
}

export default App;


