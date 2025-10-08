import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from './routes/Routes';

/**
 * Composant racine de l'application
 * - Contient la Navbar commune aux différentes pages.
 * - Intègre les routes de navigation (AppRoutes).
 */
const App: React.FC = () => {
  return (
    <Router>
      <Navbar/>
      <h1 className='title'>Welcome in Citopia Test App 🚀 </h1>
      <AppRoutes />
    </Router>
  )
}

export default App;
