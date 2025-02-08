import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Informations from "./pages/Informations";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Accueil />} />
                <Route path="/informations" element={<Informations />} />
            </Routes>
        </Router>
    );
}

export default App;
