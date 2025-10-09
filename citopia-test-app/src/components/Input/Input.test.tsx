import { render, screen, fireEvent } from "@testing-library/react"
import Input from "./Input"; 

/**
 * Tests unitaires du composant réutilisable Input
 * Ce fichier vérifie que le composant affiche correctement le label et le champ associé
 * et applique bien l'attribut "required" lorsqu'il est spécifié.
 */
describe("<Input />", () => {
  test("renders label and input", () =>{
    render(
        <Input
            label="Nom"
            name="lastName"
            value=""
            onChange={() => {}} />
    );

    expect(screen.getByLabelText("Nom")).toBeInTheDocument();
  });

  test("calls onChange when user types", () => {
    const handleChange = vi.fn();
    render(
      <Input
        label="Nom"
        name="lastName"
        value=""
        onChange={handleChange}
      />
    );

    const inputName = screen.getByLabelText("Nom") as HTMLInputElement;
    fireEvent.change(inputName, { target: { value: "Doe" } });

    expect(handleChange).toHaveBeenCalled();
  });

  test("input is required when prop is true", () => {
    render(
      <Input
        label="Prénom"
        name="firstName"
        value=""
        onChange={() => {}}
        required
      />
    );

    const firstName = screen.getByLabelText("Prénom");

    expect(firstName).toBeRequired();
  });
});