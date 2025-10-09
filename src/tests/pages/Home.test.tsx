import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

let mockUserStore = {
  firstName: "",
  lastName: "",
  birthDate: "",
};

vi.mock("../../stores/userStore", () => ({
  useUserStore: () => ({ ...mockUserStore }),
}));

vi.mock("../../hooks/useBirthday", () => ({
  useBirthday: (date: string) =>
    date
      ? {
          daysUntilBirthday: 2,
          nextBirthday: new Date(),
          isTodayBirthday: false,
        }
      : null,
}));

const MOCK_IMAGE_URL =
  "https://dummyjson.com/image/128x128/c3762b/ffffff?text=Marie%20Curie&fontFamily=ubuntu&fontSize=24&type=png";

const getUserImageUrlMock = vi
  .fn()
  .mockImplementation((firstName: string, lastName: string) =>
    firstName && lastName ? MOCK_IMAGE_URL : null
  );

vi.mock("../../services/api", () => ({
  getUserImageUrl: (...args: string[]) => getUserImageUrlMock(...args),
}));

import Home from "../../pages/Home";

describe("Home page", () => {
  beforeEach(() => {
    cleanup();
    mockUserStore = { firstName: "", lastName: "", birthDate: "" };
    getUserImageUrlMock.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("affiche le titre et l’avatar utilisateur (avec prénom + nom)", () => {
    mockUserStore = {
      firstName: "Marie",
      lastName: "Curie",
      birthDate: "1990-10-10",
    };
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /accueil/i })
    ).toBeInTheDocument();

    const img = screen.getByAltText(/avatar de marie curie/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", MOCK_IMAGE_URL);
    expect(img.className).not.toMatch(/\bloaded\b/);
    fireEvent.load(img);
    expect(img.className).toMatch(/\bloaded\b/);

    expect(getUserImageUrlMock).toHaveBeenCalledWith("Marie", "Curie");
  });

  it("affiche le message d’anniversaire avec le nombre de jours (tous champs remplis)", () => {
    mockUserStore = {
      firstName: "Marie",
      lastName: "Curie",
      birthDate: "1990-10-10",
    };
    render(<Home />);

    const anniversaryMessage = screen.getByText(/votre anniversaire est dans/i);
    expect(anniversaryMessage).toBeInTheDocument();

    expect(
      screen.getByText((_content, node) => {
        const hasText = (el: Element) =>
          el.textContent?.replace(/\s+/g, " ").includes("2 jours");
        const nodeHasText = hasText(node as Element);
        const childrenDontHaveText = Array.from(node?.children || []).every(
          (child) => !hasText(child as Element)
        );
        return nodeHasText && childrenDontHaveText;
      })
    ).toBeInTheDocument();
  });

  it("affiche un message d’avertissement si les champs sont vides (pas d’image)", () => {
    render(<Home />);
    expect(screen.getByText(/complétez vos informations/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/avatar de/i)).not.toBeInTheDocument();
    expect(getUserImageUrlMock).not.toHaveBeenCalled();
  });

  it("ne rend pas d'image et affiche l’avertissement si le nom manque (prénom seul)", () => {
    mockUserStore = {
      firstName: "Marie",
      lastName: "",
      birthDate: "1990-10-10",
    };
    render(<Home />);

    expect(screen.getByText(/complétez vos informations/i)).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(getUserImageUrlMock).not.toHaveBeenCalled();
  });

  it("ne rend pas d'image et affiche l’avertissement si le prénom manque (nom seul)", () => {
    mockUserStore = {
      firstName: "",
      lastName: "Curie",
      birthDate: "1990-10-10",
    };
    render(<Home />);

    expect(screen.getByText(/complétez vos informations/i)).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(getUserImageUrlMock).not.toHaveBeenCalled();
  });

  it("alt text exact respecte la casse générée", () => {
    mockUserStore = {
      firstName: "Marie",
      lastName: "Curie",
      birthDate: "1990-10-10",
    };
    render(<Home />);
    const img = screen.getByAltText("Avatar de Marie Curie");
    expect(img).toBeInTheDocument();
  });
});
