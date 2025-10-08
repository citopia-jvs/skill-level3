import React, { useContext } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { UserContext } from "../../context/UserContext";
import { calculateDaysToBirthday } from "../../utils/dateUtils";

const Home: React.FC = () => {
    const userContext = useContext(UserContext);

    if(!userContext) {
        return <div>Erreur: contexte utilisateur non trouvé</div>
    }

    const { user } = userContext;
    const birthDate = user?.birthDate ? new Date(user.birthDate) : null;
    const daysToNextBirthday = birthDate ? calculateDaysToBirthday(birthDate) : null;

    return(
        <>
            <PageTitle title="Accueil" className="page-title"></PageTitle>
            {birthDate ? (
                <p>Votre anniversaire est dans {daysToNextBirthday} jours</p>
            ) : (
                <p>Date de naissance non définie</p>
            )}
        </>
    )
}

export default Home;