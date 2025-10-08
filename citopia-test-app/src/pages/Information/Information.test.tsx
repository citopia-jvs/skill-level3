import { render, screen } from "@testing-library/react"
import Information from "./Information"; 

/**
 * Tests unitaires de la page d'information
 * Ce fichier vérifie que la page d'information s'affiche correctement
 * et contient le bon titre.
 */
describe("<Information />", () => {
  test("Information page displays Informations", () =>{
    render( <Information /> );

    expect(screen.getByText("Informations")).toBeInTheDocument();
  })
});