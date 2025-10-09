import { render, screen } from "@testing-library/react";
import PageTitle from "./PageTitle";

/**
 * Tests unitaires du composant réutilisable TitlePage
 * Ce fichier vérifie que le titre passé en prop s'affiche correctement dans le document.
 */
describe("<PageTitle />", () => {
  test("display prop title", () => {
    render(<PageTitle title="Accueil" />);
    expect(screen.getByText("Accueil")).toBeInTheDocument();
  });
});