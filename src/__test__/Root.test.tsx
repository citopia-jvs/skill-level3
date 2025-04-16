import React from 'react';
import { render } from '@testing-library/react-native';
import Root from '../index';

describe('App', () => {
  test('snapshot', async () => {
    // Rendu du composant avec testing-library
    const { toJSON } = render(<Root />);
    
    // Création d'un snapshot
    expect(toJSON()).toMatchSnapshot();
  });
});
