import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Informations from '../informations.tsx';
import useStore from '../../store';

// Mock de react-navigation
jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
      ...actualNav,
      useNavigation: () => ({
        navigate: jest.fn(),
        goBack: jest.fn(),
      }),
    };
});

describe('Composant Informations', () => {
    // Réinitialisation du store avant chaque test
    beforeEach(() => {
      useStore.setState({ user: null });
      jest.clearAllMocks();
    });
  
    test('Affiche un formulaire vide sans utilisateur', () => {
      const { getByText, getByPlaceholderText } = render(<Informations />);
      
      // Vérification du titre
      expect(getByText("Informations de l'utilisateur")).toBeTruthy();
      
      // Vérification des champs du formulaire
      expect(getByPlaceholderText("Entrez un nom...")).toBeTruthy();
      expect(getByPlaceholderText("Entrez un prénom...")).toBeTruthy();
      expect(getByText("Sélectionner")).toBeTruthy();
      
    });
  
    test("Affiche correctement les informations d'un utilisateur", () => {
      const testUser = {
        firstname: 'Lucas',
        lastname: 'Fourteau',
        birthday: new Date(1989, 11, 21)
      };
      
      useStore.setState({ user: testUser });
      
      const { getByText, getByDisplayValue } = render(<Informations />);
      
      // Vérification que les champs contiennent les bonnes valeurs
      expect(getByDisplayValue('Lucas')).toBeTruthy();
      expect(getByDisplayValue('Fourteau')).toBeTruthy();
      expect(getByText('Modifier')).toBeTruthy();
      expect(getByText('21/12/1989')).toBeTruthy();
    });
  
    test('Met à jour le nom correctement', async () => {
      const { getByPlaceholderText } = render(<Informations />);
      
      // Réupréation du champ nom
      const lastnameInput = getByPlaceholderText("Entrez un nom...");
      
      // Simuation de l'entrée d'une valeur  dans le champ nom
      fireEvent.changeText(lastnameInput, 'Fourteau');
      
      // Vérification dans le store
      await waitFor(() => {
        const state = useStore.getState();
        expect(state.user?.lastname).toBe('Fourteau');
      });
    });
  
    test('Met à jour le prénom correctement', async () => {
        const { getByPlaceholderText } = render(<Informations />);
        
        // Réupréation du champ prénom
        const firstnameInput = getByPlaceholderText("Entrez un prénom...");
        
        // Simuation de l'entrée d'une valeur  dans le champ prénom
        fireEvent.changeText(firstnameInput, 'Lucas');
        
        // Vérification dans le store
        await waitFor(() => {
          const state = useStore.getState();
          expect(state.user?.firstname).toBe('Lucas');
        });
      });
      
    // Reste à faire le test de changement de date
});