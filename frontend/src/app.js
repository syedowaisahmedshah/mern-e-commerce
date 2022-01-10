import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/header/header";
import Footer from "./components/layout/footer/footer";
import Home from "./pages/home/home";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container container-fluid">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
