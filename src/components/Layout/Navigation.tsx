import { useTheme } from "../../hooks/useTheme";
import { Link } from "react-router-dom";
import "../../styles/components/Navigation.css";

const Navigation = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav>
      <div>
        <Link to="/">Accueil</Link>
        <Link to="/informations">Informations</Link>
      </div>

      <button onClick={toggleTheme} aria-label="Changer le thème">
        {isDark ? "☀️" : "🌙"}
      </button>
    </nav>
  );
};

export default Navigation;
