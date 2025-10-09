import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from './routes/Routes';
import Footer from './components/Footer/Footer';

/**
 * Composant racine de l'application
 * - Contient la Navbar et le footer communs aux différentes pages.
 * - Intègre les routes de navigation (AppRoutes).
 */
const App: React.FC = () => {
  return (
    <Router>
      <Navbar/>
      <AppRoutes />
      <Footer />
    </Router>
  )
}

export default App;
