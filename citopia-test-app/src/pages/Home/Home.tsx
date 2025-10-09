import React, { useContext, useEffect, useMemo, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { UserContext } from "../../context/UserContext";
import { calculateDaysToBirthday } from "../../utils/dateUtils";
import './Home.css';
import NavigationLink from "../../components/NavigationLink/NavigationLink";
import { fetchWeather, getWeatherDescription } from "../../utils/weatherUtils";

/**
 * Page d'accueil:
 * - Affiche une image DummyJSON dynamique avec le prénom et le nom de l'utilisateur.
 * - Affiche le nombre de jours restants avant le prochain anniversaire de l'utilisateur.
 * - Gère les cas où les informations de l'utilisateur ne sont pas encore définies.
 * - Bonus: affichage de la météo à Citopia (Saint-Martin sur le Pré)
 */
const Home: React.FC = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [weather, setWeather] = useState<{ temperature: number; weathercode: number} | null>(null);

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

    useEffect(() => {
        async function getWeather() {
            try {
                const latitudeCitopia = 48.971431;
                const longitudeCitopia = 4.345522;
                const data = await fetchWeather(latitudeCitopia, longitudeCitopia);
                setWeather(data);
            } catch (error) {
                console.error(error);
            }  
        }
        getWeather();
    }, []);
    
    if(!userContext) {
        return <div className="message-erreur">Erreur: contexte utilisateur non trouvé</div>
    }

    return(
        <>
            <div className="home-container">
                <PageTitle title="Accueil" className="page-title"/>

                <div>
                    {weather && (
                        <p>
                            {getWeatherDescription(weather.weathercode)} - {weather.temperature}°C à Citopia
                        </p>
                    )}
                </div>

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
                        <div>
                            <p>Veuillez renseigner vos nom et prénom dans la page Informations</p>
                            <NavigationLink to="/information" linkLabel="Aller à la page Informations"/>     
                        </div>
                    )}

                    {user?.birthDate ? (
                        <p>Votre anniversaire est dans {daysToNextBirthday} jours</p>
                    ) : (
                        <div>
                            <p>Veuillez renseigner votre date de naissance dans la page Informations</p>
                            <NavigationLink to="/information" linkLabel="Aller à la page Informations"/>     
                        </div>
                    )}
                </div>
            </div> 
        </>
    )
}

export default Home;