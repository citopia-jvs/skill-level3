import "../styles/pages/Home.css";
import { useUserStore } from "../stores/userStore";
import { useBirthday } from "../hooks/useBirthday";
import { getUserImageUrl } from "../services/api";

const Home = () => {
  const { firstName, lastName, birthDate } = useUserStore();
  const birthdayInfo = useBirthday(birthDate);

  const imageUrl =
    firstName && lastName ? getUserImageUrl(firstName, lastName) : null;

  return (
    <main className="home-page">
      <h1>Accueil</h1>

      {firstName && lastName && imageUrl && (
        <img
          src={imageUrl}
          alt={`Avatar de ${firstName} ${lastName}`}
          className="user-avatar"
        />
      )}

      {birthDate && birthdayInfo ? (
        <div className="birthday-message">
          {birthdayInfo.isTodayBirthday ? (
            <span>🎉 Joyeux anniversaire!</span>
          ) : (
            <span>
              Votre anniversaire est dans{" "}
              <strong>{birthdayInfo.daysUntilBirthday}</strong> jour
              {birthdayInfo.daysUntilBirthday > 1 ? "s" : ""}.
            </span>
          )}
        </div>
      ) : (
        <div className="birthday-message warning">
          <span>
            Renseignez votre prénom, nom et date de naissance dans
            "Informations".
          </span>
        </div>
      )}
    </main>
  );
};

export default Home;
