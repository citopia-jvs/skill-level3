import { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    const [active, setActive] = useState<string>("home");

    return (
        <div>
            <nav
                className={
                    "flex justify-center py-6 text-lg bg-indigo-100 mb-12"
                }
            >
                <Link
                    className={`px-4 font-semibold cursor-pointer
                        ${
                            active === "home" &&
                            "underline underline-offset-8 decoration-indigo-500 decoration-2"
                        }
                            `}
                    to="/"
                    onClick={() => setActive("home")}
                >
                    Acccueil
                </Link>
                <Link
                    className={`px-4 font-semibold cursor-pointer
                        ${
                            active === "info" &&
                            "underline underline-offset-8 decoration-indigo-500 decoration-2"
                        }
                            `}
                    to="/information"
                    onClick={() => setActive("info")}
                >
                    Informations
                </Link>
            </nav>
        </div>
    );
};

export default Header;
