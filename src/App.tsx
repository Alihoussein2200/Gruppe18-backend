import { Routes, Route } from "react-router-dom";
import { Store } from "./pages/ShopPage";
import { About } from "./pages/OmPage";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { CheckoutPage } from "./pages/KassePage";
import "./App.css"
import { PaymentPage } from "./pages/BetalingPage";

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <div className="AppContainer">
        <Routes>
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/StorePreview" element={<CheckoutPage />} />
          <Route path="/PaymentPage" element={<PaymentPage/>} />
        </Routes>
      </div>
    </ShoppingCartProvider>
  );
}

export default App;
