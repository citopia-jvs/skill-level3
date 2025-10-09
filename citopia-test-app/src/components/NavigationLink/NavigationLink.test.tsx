import { render, screen } from "@testing-library/react"
import NavigationLink from "./NavigationLink"; 
import { MemoryRouter } from "react-router-dom";

/**
 * Tests unitaires du composant NavigationLink
 * Ce fichier vérifie que le lien s'affiche et envoie à la bonne url.
 */
describe("<NavigationLink />", () => {
  test("renders link with correct text", () =>{
    render(
        <MemoryRouter>
            <NavigationLink to="/information" linkLabel="Aller à la page Informations"/>
        </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "👉 Aller à la page Informations" })).toBeInTheDocument();
  });
});