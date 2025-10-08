import React, { useState } from "react";
import Input from "../../components/Input/Input";
import "./Information.css";
import PageTitle from "../../components/PageTitle/PageTitle";

/**
 * Page Information qui permet la saisie des informations utilisateur.
 * Le composant gère un état local pour lastName (nom de l'utilisateur), firstName (prénom de l'utilisateur)
 * et birthDate (date de naissance).
 * 
 * Utilise les composants réutilisables <PageTitle /> et <Input />.
 * Les valeurs des champs sont mises à jour automatiquement au fur et à mesure de la saisie grâce à la fonction handleChange.
 * 
 * Les champs Nom, Prénom et Date de naissance sont requis par défaut.
 */

const Information: React.FC = () => {
    const [user, setUser] = useState({
        lastName: "",
        firstName: "",
        birthDate: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value ?? ""}));
    };

    return(
        <>
            <div>
                <PageTitle title="Informations" className="page-title"></PageTitle>
                <div className="input-container">
                    <Input
                        label="Nom"
                        name="lastName"
                        placeholder="Doe"
                        value={user?.lastName || ""}
                        onChange={handleChange}
                        className="input"
                    />

                    <Input
                        label="Prénom"
                        name="firstName"
                        placeholder="John"
                        value={user?.firstName || ""}
                        onChange={handleChange}
                        className="input"
                    />

                    <Input
                        label="Date de naissance"
                        name="birthDate"
                        value={user?.birthDate || ""}
                        onChange={handleChange}
                        type="date"
                        className="input"
                    />
                </div>
            </div>            
        </>
    )
}

export default Information;