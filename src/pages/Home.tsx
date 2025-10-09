import "../styles/pages/Home.css";
import { useUserStore } from "../stores/userStore";
import { useBirthday } from "../hooks/useBirthday";
import { getUserImageUrl } from "../services/api";
import { useEffect, useState } from "react";

const Home = () => {
  const { firstName, lastName, birthDate } = useUserStore();
  const hasAllIdentity = Boolean(firstName && lastName && birthDate);
  const birthdayInfo = useBirthday(hasAllIdentity ? birthDate : "");
  const [loaded, setLoaded] = useState(false);

  const imageUrl =
    firstName && lastName ? getUserImageUrl(firstName, lastName) : null;

  useEffect(() => {
    setLoaded(false);
  }, [imageUrl]);

  return (
    <main className="home-page fade-in">
      <h1>Accueil</h1>
      <p className="hero-intro">
        Visualisation simple de vos informations et du prochain anniversaire.
      </p>

      {imageUrl && (
        <div className="user-avatar-wrapper">
          {!loaded && <div className="avatar-skeleton" aria-hidden="true" />}
          <img
            src={imageUrl}
            alt={`Avatar de ${firstName} ${lastName}`}
            className={`user-avatar ${loaded ? "loaded" : ""}`}
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      {hasAllIdentity && birthdayInfo ? (
        <div className="birthday-message" aria-live="polite">
          {birthdayInfo.isTodayBirthday ? (
            <span>🎉 Joyeux anniversaire {firstName} !</span>
          ) : (
            <span>
              Votre anniversaire est dans{" "}
              <strong>{birthdayInfo.daysUntilBirthday}</strong> jour
              {birthdayInfo.daysUntilBirthday > 1 ? "s" : ""}.
            </span>
          )}
        </div>
      ) : (
        <div className="birthday-message warning" aria-live="polite">
          <span>
            Complétez vos informations (prénom, nom, date) dans la page{" "}
            <strong>Informations</strong>.
          </span>
        </div>
      )}
    </main>
  );
};

export default Home;
