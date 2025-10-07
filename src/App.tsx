import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Informations } from './pages/Informations/Informations';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Accueil</NavLink>
        <NavLink to="/informations" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Informations</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/informations" element={<Informations />} />
      </Routes>
    </BrowserRouter>
  );
};
