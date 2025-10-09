import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-citopia_w.svg";

/**
 * Composant Navbar
 * - Affiche le logo Citopia et les liens de navigation vers les différentes pages.
 * - Présent sur toutes les pages de l'application.
 * - Responsive: le layout s'adapte selon la taille de l'écran.
 */
const Navbar: React.FC = () => {
    return(
        <nav className="navbar">
            <Link to="/">
                <img src={logo} alt="Logo Citopia" className="logo"/>
            </Link>

            <div className="links">
                <Link to="/" className="menuItem">Accueil</Link>
                <Link to="/information" className="menuItem">Informations</Link>
            </div>
        </nav>
    )
}

export default Navbar;