/**
 * @jest-environment jsdom
 */

import '@testing-library/dom';
import { describe, expect, test } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import About from '../pages/About/About';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from '../../redux/slices/userSlice';

describe('Given the About component', () => {
  describe('When it is rendered', () => {
    test('Then it should render a form with the correct title', () => {
      const { getByText } = render(<About />);
      expect(getByText('Vos informations')).toBeTruthy();
    });

    test('Then it should render three input fields', () => {
      const { getAllByRole } = render(<About />);
      expect(getAllByRole('textbox').length).toBe(3);
    });

    test('Then it should render a calendar', () => {
      const { getByRole } = render(<About />);
      // expect(getByRole('button')).toBeInTheDocument();
      expect(getByRole('button')).toBeTruthy();
    });

    test('Then it should render a submit button', () => {
      const { getByRole } = render(<About />);
      expect(getByRole('button', { name: 'Envoyer' })).toBeTruthy();
    });
  });

  describe('When the form is submitted', () => {
    test('Then it should dispatch the correct action', async () => {
      const store = createStore(reducer);
      const { getByRole } = render(
        <Provider store={store}>
          <About />
        </Provider>
      );
      const nomInput = getByRole('textbox', { name: 'nom' });
      const prenomInput = getByRole('textbox', { name: 'prenom' });
      const dateNaissanceInput = getByRole('textbox', { name: 'dateNaissance' });
      const submitButton = getByRole('button', { name: 'Envoyer' });

      fireEvent.change(nomInput, { target: { value: 'Doe' } });
      fireEvent.change(prenomInput, { target: { value: 'John' } });
      fireEvent.change(dateNaissanceInput, { target: { value: '1990-01-01' } });

      fireEvent.click(submitButton);

      await waitFor(() => expect(store.getState().user).toEqual({ nom: 'Doe', prenom: 'John', dateNaissance: '1990-01-01' }));
    });
  });
});
