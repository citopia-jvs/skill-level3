import { UserForm } from "../components/UserForm/UserForm";
import "../styles/pages/Informations.css";

export const Informations = () => {
  return (
    <main className="informations-page fade-in">
      <h1>Mes Informations</h1>
      <p className="info-sub">
        Les données sont enregistrées automatiquement dès que vous les modifiez.
      </p>
      <UserForm />
    </main>
  );
};
