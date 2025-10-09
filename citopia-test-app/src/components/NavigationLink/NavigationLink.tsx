import { Link } from "react-router-dom";
import "./NavigationLink.css";

/**
 * Composant de lien stylisé avec <link> de react-router-dom.
 * Ce composant est Utilisé pour rediriger vers d'autres pages.
 */
interface NavigationLinkProps {
    linkLabel: string;
    to: string;
    className?: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ linkLabel, to, className = ""}) => {
  return (
    <div className="link">
        <Link
            to={to}
            className={className}>
            👉 {linkLabel}
        </Link>
    </div>
  );
}

export default NavigationLink;