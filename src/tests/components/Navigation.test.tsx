import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "../../components/Layout/Navigation";
import * as useThemeModule from "../../hooks/useTheme";

// Mock du hook useTheme
vi.mock("../../hooks/useTheme");

describe("Navigation", () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("devrait afficher les liens de navigation", () => {
    vi.mocked(useThemeModule.useTheme).mockReturnValue({
      isDark: false,
      isLight: true,
      isSystem: false,
      theme: "light",
      effectiveTheme: "light",
      toggleTheme: vi.fn(),
      setTheme: vi.fn(),
    });

    renderWithRouter(<Navigation />);

    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("Informations")).toBeInTheDocument();
  });

  it("devrait afficher l'icône de thème clair lorsque le thème est sombre", () => {
    vi.mocked(useThemeModule.useTheme).mockReturnValue({
      isDark: true,
      isLight: false,
      isSystem: false,
      theme: "dark",
      effectiveTheme: "dark",
      toggleTheme: vi.fn(),
      setTheme: vi.fn(),
    });

    renderWithRouter(<Navigation />);

    expect(screen.getByLabelText("Changer le thème")).toHaveTextContent("☀️");
  });

  it("devrait afficher l'icône de thème sombre lorsque le thème est clair", () => {
    vi.mocked(useThemeModule.useTheme).mockReturnValue({
      isDark: false,
      isLight: true,
      isSystem: false,
      theme: "light",
      effectiveTheme: "light",
      toggleTheme: vi.fn(),
      setTheme: vi.fn(),
    });

    renderWithRouter(<Navigation />);

    expect(screen.getByLabelText("Changer le thème")).toHaveTextContent("🌙");
  });

  it("devrait appeler toggleTheme lors du clic sur le bouton de changement de thème", () => {
    const toggleThemeMock = vi.fn();

    vi.mocked(useThemeModule.useTheme).mockReturnValue({
      isDark: false,
      isLight: true,
      isSystem: false,
      theme: "light",
      effectiveTheme: "light",
      toggleTheme: toggleThemeMock,
      setTheme: vi.fn(),
    });

    renderWithRouter(<Navigation />);

    const button = screen.getByLabelText("Changer le thème");
    button.click();

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
