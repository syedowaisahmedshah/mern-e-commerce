import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/header/header";
import Footer from "./components/layout/footer/footer";
import Home from "./pages/home/home";
import ProductInformation from "./components/products/product-information/product-information";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/search/:keyword" element={<Home />} />
            <Route
              exact
              path="/products/:id"
              element={<ProductInformation />}
            />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
