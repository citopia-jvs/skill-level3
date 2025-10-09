import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Information from "../pages/Information/Information";

/**
 * Configuration des différentes routes de l'application avec React Router
 * - "/" : page d'accueil.
 * - "/information" : page d'informations.
 */
const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/information" element={<Information />} />   
        </Routes>
    );
};

export default AppRoutes;