import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Informations } from './pages/Informations';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/" className="nav-link">Accueil</Link>
        <Link to="/informations" className="nav-link">Informations</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/informations" element={<Informations />} />
      </Routes>
    </BrowserRouter>
  );
};
