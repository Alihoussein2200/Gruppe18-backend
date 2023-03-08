import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Store } from "./pages/VitaminerPage";
import { About } from "./pages/OmPage";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { StorePreview } from "./pages/KassePage";

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className=" mb-4">
        <Routes>
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/StorePreview" element={<StorePreview />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
