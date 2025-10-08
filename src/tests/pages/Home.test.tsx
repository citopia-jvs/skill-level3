import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";

let mockUserStore = {
  firstName: "",
  lastName: "",
  birthDate: "",
};

vi.mock("../../stores/userStore", () => ({
  useUserStore: () => ({ ...mockUserStore }),
}));

vi.mock("../../hooks/useBirthday", () => ({
  useBirthday: () => ({
    daysUntilBirthday: 2,
    nextBirthday: new Date(),
    isTodayBirthday: false,
  }),
}));

vi.mock("../../services/api", () => ({
  getUserImage: vi.fn().mockResolvedValue("https://test/image.png"),
}));

import Home from "../../pages/Home";

describe("Home page", () => {
  beforeEach(() => {
    cleanup();
    mockUserStore = { firstName: "", lastName: "", birthDate: "" };
  });

  it("affiche le titre et l’avatar utilisateur", async () => {
    mockUserStore = {
      firstName: "Marie",
      lastName: "Curie",
      birthDate: "1990-10-10",
    };

    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /accueil/i })
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByAltText(/avatar de marie curie/i)).toBeInTheDocument()
    );
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://test/image.png"
    );
  });

  it("affiche le message d’anniversaire", async () => {
    mockUserStore = {
      firstName: "Marie",
      lastName: "Curie",
      birthDate: "1990-10-10",
    };

    render(<Home />);
    expect(
      await screen.findByText((txt) => /votre anniversaire est dans/i.test(txt))
    ).toBeInTheDocument();
    expect(
      screen.getByText((_content, node) => {
        const hasText = (node: Element) =>
          node.textContent?.replace(/\s+/g, " ").includes("2 jours");
        const nodeHasText = hasText(node as Element);
        const childrenDontHaveText = Array.from(node?.children || []).every(
          (child) => !hasText(child as Element)
        );
        return nodeHasText && childrenDontHaveText;
      })
    ).toBeInTheDocument();
  });

  it("affiche un message d’avertissement si les champs sont vides", () => {
    mockUserStore = {
      firstName: "",
      lastName: "",
      birthDate: "",
    };

    render(<Home />);
    expect(
      screen.getByText(/renseignez votre prénom, nom et date de naissance/i)
    ).toBeInTheDocument();
  });
});
