import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

let mockIsDark = false;
const toggleThemeMock = vi.fn();

vi.mock("../../hooks/useTheme", () => ({
  useTheme: () => ({
    isDark: mockIsDark,
    toggleTheme: toggleThemeMock,
  }),
}));

import Navigation from "../../components/Layout/Navigation";

describe("Navigation", () => {
  beforeEach(() => {
    cleanup();
    mockIsDark = false;
    toggleThemeMock.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("devrait afficher les liens de navigation", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navigation />
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /accueil/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /informations/i })
    ).toBeInTheDocument();
  });

  it("devrait afficher l'icône de thème sombre lorsque le thème est clair", () => {
    mockIsDark = false;
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    const btn = screen.getByRole("button", {
      name: /activer le thème sombre/i,
    });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent("🌙");
  });

  it("devrait afficher l'icône de thème clair lorsque le thème est sombre", () => {
    mockIsDark = true;
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    const btn = screen.getByRole("button", {
      name: /activer le thème clair/i,
    });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent("☀️");
  });

  it("devrait appeler toggleTheme lors du clic sur le bouton", () => {
    mockIsDark = false;
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    const btn = screen.getByRole("button", {
      name: /activer le thème sombre/i,
    });
    fireEvent.click(btn);
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
