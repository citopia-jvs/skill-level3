import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Informations } from "../../pages/Informations";
import { vi } from "vitest";

vi.mock("../stores/userStore", () => ({
  useUserStore: () => ({
    firstName: "",
    lastName: "",
    birthDate: "",
    setUser: vi.fn(),
  }),
}));

describe("Informations page", () => {
  it("affiche le titre et le formulaire", () => {
    render(<Informations />);
    expect(
      screen.getByRole("heading", { name: /mes informations/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/prénom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nom de famille/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date de naissance/i)).toBeInTheDocument();
  });

  it("affiche une erreur si le champ prénom est vide après blur", async () => {
    render(<Informations />);
    const firstNameInput = screen.getByLabelText(/prénom/i);
    firstNameInput.focus();
    firstNameInput.blur();
    expect(
      await screen.findByText(/le prénom est requis/i)
    ).toBeInTheDocument();
  });
});
