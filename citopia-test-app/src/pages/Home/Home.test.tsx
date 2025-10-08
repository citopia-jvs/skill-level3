import { render, screen } from "@testing-library/react"
import Home from "./Home"; 
import { UserProvider } from "../../context/UserProvider";

/**
 * Tests unitaires de la page d'accueil
 * Ce fichier vérifie que la page d'accueil s'affiche correctement
 * et contient le bon titre.
 */

// Ajout du contexte utilisateur pour rendre le composant
const renderWithUserContext = (context: React.ReactElement) => {
  return render (<UserProvider>{context}</UserProvider>);
};

describe("<Home />", () => {
  test("Home page displays Accueil", () =>{
    renderWithUserContext( <Home /> );

    expect(screen.getByText("Accueil")).toBeInTheDocument();
  })
});