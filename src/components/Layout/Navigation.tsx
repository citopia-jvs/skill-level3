import { useTheme } from "../../hooks/useTheme";
import { NavLink } from "react-router-dom";
import "../../styles/components/Navigation.css";

const Navigation = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav>
      <div>
        <NavLink to="/" end>
          {({ isActive }) => (
            <span aria-current={isActive ? "page" : undefined}>Accueil</span>
          )}
        </NavLink>
        <NavLink to="/informations">
          {({ isActive }) => (
            <span aria-current={isActive ? "page" : undefined}>
              Informations
            </span>
          )}
        </NavLink>
      </div>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={
          isDark ? "Activer le thème clair" : "Activer le thème sombre"
        }
      >
        {isDark ? "☀️" : "🌙"}
      </button>
    </nav>
  );
};

export default Navigation;
