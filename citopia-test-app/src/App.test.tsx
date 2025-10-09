import { render, screen } from "@testing-library/react"
import App from "./App";

/**
 * Test pour App
 * Ce fichier vérifie que l'application se lance correctement
 * et que la page d'accueil s'affiche.
 */
describe("<App />", () => {
  test("renders App without crash", () =>{
    render( <App /> );

    const elements = screen.getAllByText("Accueil");
    expect(elements.length).toBeGreaterThan(0);
  })
});