import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <div>
            <nav className="p-4 flex justify-center">
                <Link className="px-4" to="/">
                    Acccueil
                </Link>
                <Link to="/information">Informations</Link>
            </nav>
        </div>
    );
};

export default Header;
