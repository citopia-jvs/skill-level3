import { render, screen } from "@testing-library/react"
import Footer from "./Footer"; 

/**
 * Tests unitaires du composant Footer
 * Ce fichier vérifie que le composant s'affiche correctement avec le texte attendu.
 */
describe("<Footer />", () => {
  test("renders footer text correctly", () =>{
    render(<Footer />);

    expect(screen.getByText("This footer is made with ❤️ by Barbara")).toBeInTheDocument();
  });
});