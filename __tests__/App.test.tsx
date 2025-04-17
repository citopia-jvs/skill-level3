import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  test('snapshot', async () => {
    // Rendu du composant avec testing-library
    const { toJSON } = render(<App />);
    
    // Création d'un snapshot
    expect(toJSON()).toMatchSnapshot();
  });
});
