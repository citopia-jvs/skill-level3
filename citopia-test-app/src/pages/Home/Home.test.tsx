import { render, screen } from "@testing-library/react"
import Home from "./Home"; 
import { UserProvider } from "../../context/UserProvider";
import { UserContext } from "../../context/UserContext";
import { MemoryRouter } from "react-router-dom";

/**
 * Tests unitaires de la page d'accueil
 * Ce fichier vérifie que la page d'accueil s'affiche correctement et contient le bon titre
 * et que le composant gère l'absence du contexte utilisateur.
 */

// Ajout du contexte utilisateur et du router pour rendre le composant
const renderWithUserContextAndMemoryRouter = (context: React.ReactElement) => {
  return render (
    <MemoryRouter>
      <UserProvider>
        {context}
      </UserProvider>
    </MemoryRouter>
  );
};

describe("<Home />", () => {
  test("Home page displays Accueil", () => {
    renderWithUserContextAndMemoryRouter( <Home /> );

    expect(screen.getByText("Accueil")).toBeInTheDocument();
  });

  test("renders error when UserContext is missing", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText("Erreur: contexte utilisateur non trouvé")).toBeInTheDocument();
  });

  test("renders DummyJSON dynamic image when firstname and lastname are defined", () => {
    const mockUser = {
      firstName: "John",
      lastName: "Doe",
      birthDate: "2003-04-18",
    };

    const mockSetUser = vi.fn();

    render( 
      <UserContext.Provider value={{ user: mockUser, setUser: mockSetUser}}>
        <Home />
      </UserContext.Provider> 
    );

    const image = screen.getByRole("img") as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("https://dummyjson.com/image");
    expect(image.src).toContain("John");
      expect(image.src).toContain("Doe");
  })
});