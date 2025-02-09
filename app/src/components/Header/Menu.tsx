import './Menu.css';
import { Link, useLocation } from 'react-router-dom';

export default function Menu() {
  const location = useLocation();
  const isActivePage = (path: string) => {
    const currentPath = location.pathname;
    return currentPath === path ? 'active' : '';
  };

  return (
    <ul className='menu-container'>
      <li>
        <Link className={`menu-link ${isActivePage('/')}`} to='/' data-testid='home'>
          Accueil
        </Link>
      </li>
      <li>
        <Link className={`menu-link ${isActivePage('/informations')}`} to='/informations' data-testid='about'>
          Informations
        </Link>
      </li>
    </ul>
  );
}
