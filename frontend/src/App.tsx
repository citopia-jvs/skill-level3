import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Accueil from "./pages/Accueil";
import Informations from "./pages/Informations";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <nav>
                    <ul>
                        <li><Link to="/">Accueil |</Link><Link to="/informations"> Informations |</Link><a href="https://camerone-frontend.vercel.app/" target="_blank" rel="noopener noreferrer"> Announce</a></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/informations" element={<Informations />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
