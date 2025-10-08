import React, { useContext, useMemo, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { UserContext } from "../../context/UserContext";
import { calculateDaysToBirthday } from "../../utils/dateUtils";
import './Home.css';

/**
 * Page d'accueil:
 * - Affiche une image DummyJSON dynamique avec le prénom et le nom de l'utilisateur.
 * - Affiche le nombre de jours restants avant le prochain anniversaire de l'utilisateur.
 * - Gère les cas où les informations de l'utilisateur ne sont pas encore définies.
 */
const Home: React.FC = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const userContext = useContext(UserContext);
    const user = userContext?.user;

    const dummyImageUrl = useMemo(() => {
        if (!user?.firstName && !user?.lastName) {
            return null;
        }

        const first = encodeURIComponent(user.firstName || "");
        const last = encodeURIComponent(user.lastName || "");

        return `https://dummyjson.com/image/400x200/36B9BD/ffffff?text=${first}+${last}`;
    }, [user?.firstName, user?.lastName]);

    const daysToNextBirthday = useMemo(() => {
        const birthDate = user?.birthDate ? new Date(user.birthDate) : null;
        return calculateDaysToBirthday(birthDate)
    }, [user?.birthDate]);
    
    if(!userContext) {
        return <div className="message-erreur">Erreur: contexte utilisateur non trouvé</div>
    }

    return(
        <>
            <div className="home-container">
                <PageTitle title="Accueil" className="page-title"/>

                <div>
                    {user?.lastName && user?.firstName && dummyImageUrl ? (
                        <div className="image-container">
                            {!isImageLoaded && <p>Chargement de l'image...</p>}
                            <img 
                                src={dummyImageUrl} 
                                alt={`${user?.firstName} ${user?.lastName}`}
                                onLoad={() => setIsImageLoaded(true)}/>
                        </div>
                    ) : (
                        <p>Veuillez renseigner vos nom et prénom dans la page Informations</p>
                    )}

                    {user?.birthDate ? (
                        <p>Votre anniversaire est dans {daysToNextBirthday} jours</p>
                    ) : (
                        <p>Veuillez renseigner votre date de naissance dans la page Informations</p>
                    )}
                </div>
            </div> 
        </>
    )
}

export default Home;