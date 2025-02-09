import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
    const location = useLocation();

    return (
        <div>
            <nav
                className={
                    "flex justify-center py-6 text-md bg-indigo-100 mb-12"
                }
            >
                <Link
                    className={`px-4 cursor-pointer
                        ${
                            location.pathname === "/" &&
                            "underline underline-offset-8 decoration-indigo-500 decoration-2"
                        }
                            `}
                    to="/"
                >
                    ACCUEIL
                </Link>
                <Link
                    className={`px-4 cursor-pointer
                        ${
                            location.pathname === "/information" &&
                            "underline underline-offset-8 decoration-indigo-500 decoration-2"
                        }
                            `}
                    to="/information"
                >
                    INFORMATIONS
                </Link>
            </nav>
        </div>
    );
};

export default Header;
