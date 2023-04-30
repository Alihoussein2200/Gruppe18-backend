import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Store } from "./pages/BarbarPage";
import { About } from "./pages/OmPage";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { CheckoutPage } from "./pages/KassePage";
import { DotLoader } from "react-spinners";
import React from "react";

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulating loading time
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center h-100" style={{ marginTop: '100px' }}>
        <DotLoader color="#000" loading={isLoading} size={50} />
      </div>
      
      ) : (
        <ShoppingCartProvider>
          <Navbar />
          <Container className=" mb-4">
            <Routes>
              <Route path="/store" element={<Store />} />
              <Route path="/about" element={<About />} />
              <Route path="/StorePreview" element={<CheckoutPage />} />
            </Routes>
          </Container>
        </ShoppingCartProvider>
      )}
    </>
  );
}

export default App;

