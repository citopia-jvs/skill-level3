import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Home from '../home.tsx';
import useStore from '../../store';

import { getDummyImage } from '../../lib/user';

// Mock pour la fonction getDummyImage
const mockImageUrl = 'https://dummyjson.com/image/150';
jest.mock('../../lib/user', () => ({
  getDummyImage: jest.fn().mockResolvedValue(mockImageUrl)
}));

// Mock de navigation
jest.mock('@react-navigation/native', () => {
    return {
      ...jest.requireActual('@react-navigation/native'),
      useNavigation: () => ({
        navigate: jest.fn(),
      }),
    };
});

// Mock de dayjs pour utiliser une date du jour fixe
jest.mock('dayjs', () => {
    const actualDayjs = jest.requireActual('dayjs');
    const mockedDayjs = function(...args) {
      if (args.length === 0) {
        return actualDayjs('2025-12-10');
      }
      return actualDayjs(...args);
    };
  
    Object.assign(mockedDayjs, actualDayjs);
    
    return mockedDayjs;
});

describe('Home Component', () => {
    // Réinitialisation du store avant chaque test
    beforeEach(() => {
      useStore.setState({ user: null });
      jest.clearAllMocks();
    });

    test('Rendu au démarrage sans utilisateur', () => {        
        const { getByText } = render(<Home />);
        
        // Vérification du contenu pour un utilisateur non défini
        expect(getByText("Aucun utilisateur de paramétré")).toBeTruthy();
        expect(getByText("Ajouter un utilisateur")).toBeTruthy();
    });

    test("Rendu avec un utilisateur dont ce n'est pas la date anniversaire", async () => {
        const testUser = {
          firstname: 'Lucas',
          lastname: 'Fourteau',
          birthday: new Date(1989, 11, 21)
        };
        
        useStore.setState({ user: testUser });
        
        const { findByText } = render(<Home />);
        
        // Vérification du texte d'anniversaire
        const birthdayText = await findByText("Votre anniversaire est dans 11 jour(s)");
        expect(birthdayText).toBeTruthy();
        
        // Vérification du titre du bouton
        const changeUserButton = await findByText("Changer d'utilisateur");
        expect(changeUserButton).toBeTruthy();
    });

    test("Rendu avec un utilisateur dont c'est la date anniversaire", async () => {
        const testUser = {
            firstname: 'Lucas',
            lastname: 'Fourteau',
            birthday: new Date(1989, 11, 10)
        };
        
        useStore.setState({ user: testUser });
        
        const { findByText } = render(<Home />);
        
        // Vérification du texte d'anniversaire
        const birthdayText = await findByText("Joyeux anniversaire ! 🎉");
        expect(birthdayText).toBeTruthy();
    });

    test("Affichage de l'image si un utilisateur existe", async () => {
        const testUser = {
            firstname: 'Lucas',
            lastname: 'Fourteau',
            birthday: new Date(1989, 11, 21)
        };
        const mockImageUrl = 'https://example.com/dummy-image.jpg';
        jest.mocked(getDummyImage).mockResolvedValue(mockImageUrl);
        useStore.setState({ user: testUser });
        
        const { findByTestId } = render(<Home />);
        
        // Vérification que la fonction getDummyImage a été appelée avec les bons arguments
        await waitFor(() => {
        expect(getDummyImage).toHaveBeenCalledWith('Lucas', 'Fourteau', 300, 300);
        });
        
        // Attendre que l'image soit chargée et affichée
        const image = await findByTestId('userImage');
        expect(image.props.source.uri).toBe(mockImageUrl);
    });
});