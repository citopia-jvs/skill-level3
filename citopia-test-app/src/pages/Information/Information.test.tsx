import { fireEvent, render, screen } from "@testing-library/react"
import Information from "./Information"; 
import { UserProvider } from "../../context/UserProvider";

/**
 * Tests unitaires de la page Information
 * Ce fichier vérifie que la page d'information s'affiche correctement
 * et contient les champs attendus.
 */

// Ajout du contexte utilisateur pour rendre le composant
const renderWithUserContext = (context: React.ReactElement) => {
  return render (<UserProvider>{context}</UserProvider>);
};

describe("<Information />", () => {
  test("information page displays Informations", () => {
    renderWithUserContext( <Information /> );

    expect(screen.getByText("Informations")).toBeInTheDocument();
  });

  test("renders form values", () => {
    renderWithUserContext( <Information /> );

    expect(screen.getByLabelText("Nom")).toBeInTheDocument();
    expect(screen.getByLabelText("Prénom")).toBeInTheDocument();
    expect(screen.getByLabelText("Date de naissance")).toBeInTheDocument();
  });

  test("update values when user types", () => {
    renderWithUserContext( <Information /> );

    const inputName = screen.getByLabelText("Nom") as HTMLInputElement;
    fireEvent.change(inputName, { target: { value: "Doe" }});

    expect(inputName.value).toBe("Doe");
  });

  test("renders error when UserContext is missing", () => {
    render(<Information />);

    expect(screen.getByText("Erreur: contexte utilisateur non trouvé")).toBeInTheDocument();
  });
});