import { Routes, Route } from "react-router-dom";
import HomePage  from "./pages/HomePage";
import { About } from "./pages/OmPage";
import EventPage  from "./pages/EventPage";
import { Navbar } from "./components/Navbar";
import { DotLoader } from "react-spinners";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';




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

        <Navbar />
        <div className="AppContainer">
          {isLoading ? null : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/event" element={<EventPage />} />
            </Routes>
          )}
        </div>
    </div>
  );

          }
export default App;


