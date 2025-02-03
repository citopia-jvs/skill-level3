import './Header.css';
import Menu from './Menu';

const Header = () => {
  return (
    <header className='header-container' data-testid='header'>
      {/* Logo ? */}
      <nav>
        <Menu />
      </nav>
    </header>
  );
};

export default Header;
