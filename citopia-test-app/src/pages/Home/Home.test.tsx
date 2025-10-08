import { render, screen } from "@testing-library/react"
import Home from "./Home"; 

/**
 * Tests unitaires de la page d'accueil
 * Ce fichier vérifie que la page d'accueil s'affiche correctement
 * et contient le bon titre.
 */
describe("<Home />", () => {
  test("Home page displays Accueil", () =>{
    render( <Home /> );

    expect(screen.getByText("Accueil")).toBeInTheDocument();
  })
});