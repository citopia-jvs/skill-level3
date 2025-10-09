import { fireEvent, render, screen } from "@testing-library/react"
import Information from "./Information"; 
import { UserProvider } from "../../context/UserProvider";
import { MemoryRouter } from "react-router-dom";

/**
 * Tests unitaires de la page Information
 * Ce fichier vérifie que la page d'information s'affiche correctement
 * et contient les champs attendus.
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

describe("<Information />", () => {
  test("information page displays Informations", () => {
    renderWithUserContextAndMemoryRouter( <Information /> );

    expect(screen.getByText("Informations")).toBeInTheDocument();
  });

  test("renders form values", () => {
    renderWithUserContextAndMemoryRouter( <Information /> );

    expect(screen.getByLabelText("Nom")).toBeInTheDocument();
    expect(screen.getByLabelText("Prénom")).toBeInTheDocument();
    expect(screen.getByLabelText("Date de naissance")).toBeInTheDocument();
  });

  test("update values when user types", () => {
    renderWithUserContextAndMemoryRouter( <Information /> );

    const inputName = screen.getByLabelText("Nom") as HTMLInputElement;
    fireEvent.change(inputName, { target: { value: "Doe" }});

    expect(inputName.value).toBe("Doe");
  });

  test("renders error when UserContext is missing", () => {
    render(<Information />);

    expect(screen.getByText("Erreur: contexte utilisateur non trouvé")).toBeInTheDocument();
  });
});