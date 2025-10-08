import { render, screen } from "@testing-library/react"
import Navbar from "./Navbar";
import { MemoryRouter  } from "react-router-dom"; 

/**
 * Tests unitaires de la Navbar
 * Ce fichier vérifie que la barre de navigation s'affiche correctement
 * avec le logo et les liens vers les différentes pages.
 */
describe("<Navbar />", () => {
  test("renders Navbar with links", () =>{
    render(
        <MemoryRouter >
            <Navbar />
        </MemoryRouter>
    );

    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("Informations")).toBeInTheDocument();
    expect(screen.getByAltText("Logo Citopia")).toBeInTheDocument();
  })
});