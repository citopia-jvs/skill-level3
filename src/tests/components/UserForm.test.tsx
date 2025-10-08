import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserForm } from "../../components/UserForm/UserForm";
import * as userStoreModule from "../../stores/userStore";

vi.mock("../../stores/userStore");

describe("UserForm", () => {
  const mockSetUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(userStoreModule.useUserStore).mockReturnValue({
      firstName: "",
      lastName: "",
      birthDate: "",
      setFirstName: vi.fn(),
      setLastName: vi.fn(),
      setBirthDate: vi.fn(),
      setUser: mockSetUser,
      resetUser: vi.fn(),
    });
  });

  it("devrait afficher les trois champs du formulaire", () => {
    render(<UserForm />);

    expect(screen.getByLabelText("Prénom")).toBeInTheDocument();
    expect(screen.getByLabelText("Nom de Famille")).toBeInTheDocument();
    expect(screen.getByLabelText("Date de naissance")).toBeInTheDocument();
  });
  it("devrait afficher les erreurs de validation si les champs sont vides", async () => {
    render(<UserForm />);
    const user = userEvent.setup();

    const firstNameInput = screen.getByLabelText("Prénom");
    await user.click(firstNameInput);
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText("Le prénom est requis")).toBeInTheDocument();
    });
  });

  it("devrait appeler setUser du store lorsque les champs changent", async () => {
    render(<UserForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText("Prénom"), "J");

    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalled();
    });

    expect(mockSetUser).toHaveBeenCalledWith(
      expect.objectContaining({ firstName: expect.any(String) })
    );
  });

  it("devrait pré-remplir les champs avec les valeurs du store", () => {
    vi.mocked(userStoreModule.useUserStore).mockReturnValue({
      firstName: "Alice",
      lastName: "Martin",
      birthDate: "1985-05-15",
      setFirstName: vi.fn(),
      setLastName: vi.fn(),
      setBirthDate: vi.fn(),
      setUser: mockSetUser,
      resetUser: vi.fn(),
    });
    render(<UserForm />);

    expect(screen.getByLabelText("Prénom")).toHaveValue("Alice");
    expect(screen.getByLabelText("Nom de Famille")).toHaveValue("Martin");
    expect(screen.getByLabelText("Date de naissance")).toHaveValue(
      "1985-05-15"
    );
  });
});
