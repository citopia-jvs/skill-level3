import { Link } from "react-router-dom";

const Informations = () => {
    return (
        <div>
            <h1>Informations Utilisateur</h1>
            <p>Cette page contiendra un formulaire utilisateur.</p>
            <Link to="/">Retour à l'accueil</Link>
        </div>
    );
};

export default Informations;
