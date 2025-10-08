import { render, screen } from "@testing-library/react"
import AppRoutes from "./Routes";
import { MemoryRouter  } from "react-router-dom"; 

/**
 * Tests unitaires des Routes
 * Ce fichier vérifie que le routage fonctionne correctement.
 * Chaque route définie doit afficher la page correspondate.
 */
describe("<AppRoutes />", () => {
  test("renders Home and Information pages with routing", () =>{
    render(
        <MemoryRouter initialEntries={['/']}>
            <AppRoutes />
        </MemoryRouter>
    );

    expect(screen.getByText("Accueil")).toBeInTheDocument();

    render(
        <MemoryRouter initialEntries={['/information']}>
            <AppRoutes />
        </MemoryRouter>
    );

    expect(screen.getByText("Informations")).toBeInTheDocument();

  })
});