import { fireEvent, render, screen } from "@testing-library/react"
import Information from "./Information"; 

/**
 * Tests unitaires de la page Information
 * Ce fichier vérifie que la page d'information s'affiche correctement
 * et contient les champs attendus.
 */
describe("<Information />", () => {
  test("Information page displays Informations", () => {
    render( <Information /> );

    expect(screen.getByText("Informations")).toBeInTheDocument();
  });

  test("Renders form values", () => {
    render( <Information /> );

    expect(screen.getByLabelText("Nom")).toBeInTheDocument();
    expect(screen.getByLabelText("Prénom")).toBeInTheDocument();
    expect(screen.getByLabelText("Date de naissance")).toBeInTheDocument();
  });

  test("Update values when user types", () => {
    render( <Information /> );

    const inputName = screen.getByLabelText("Nom") as HTMLInputElement;
    fireEvent.change(inputName, { target: { value: "Doe" }});

    expect(inputName.value).toBe("Doe");
  });
});