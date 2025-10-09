import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Navigation from "./components/Layout/Navigation";
import Home from "./pages/Home";
import { Informations } from "./pages/Informations";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/informations" element={<Informations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
