import './Menu.css';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <ul className='menu-container'>
      <li>
        <Link className='menu-link' to='/' data-testid='home'>
          Accueil
        </Link>
      </li>
      <li>
        <Link className='menu-link' to='/informations' data-testid='about'>
          Informations
        </Link>
      </li>
    </ul>
  );
}
