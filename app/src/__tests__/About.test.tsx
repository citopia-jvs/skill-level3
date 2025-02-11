/**
 * @jest-environment jsdom
 */

import '@testing-library/dom';
import { describe, expect, test, afterEach, beforeAll } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import About from '../pages/About/About';
import { Provider } from 'react-redux';
import { userSlice } from '../redux/slices/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import dataSlice from '../redux/slices/dataSlice';
import { RootState } from '../redux/store';

describe('Given the About component', () => {
  const store: ReturnType<typeof configureStore> = configureStore({
    reducer: {
      user: userSlice.reducer,
      dummyData: dataSlice,
    },
  });

  beforeAll(() => {
    render(
      <Provider store={store}>
        <About />
      </Provider>
    );
  });

  afterEach(() => {
    // store.dispatch(userSlice.actions.reset());
  });

  describe('When it is rendered', () => {
    test('Then it should render a form with the correct title', () => {
      expect(screen.getByText('Vos informations')).toBeTruthy();
    });

    test('Then it should render two input fields (nom and prénom)', () => {
      expect(screen.getAllByRole('textbox').length).toBe(2);
    });

    test('Then it should render a date selector', () => {
      expect(screen.getByTestId('dateNaissance')).toBeTruthy();
    });
  });

  describe('When the form change', () => {
    test('Then it should dispatch the correct action', async () => {
      screen.debug(screen.getByTestId('nom'));
      const nomInput = screen.getByTestId('nom');
      const prenomInput = screen.getByTestId('prenom');
      // const dateNaissanceInput = screen.getByTestId('dateNaissance');

      fireEvent.change(nomInput, { target: { value: 'Doe' } });
      fireEvent.change(prenomInput, { target: { value: 'John' } });
      fireEvent.blur(nomInput);
      // fireEvent.change(dateNaissanceInput, { target: { value: '1990-01-01' } });

      await waitFor(() => expect((store.getState() as RootState).user).toEqual({ nom: 'Doe', prenom: 'John', dateNaissance: null }));
    });
  });
});
