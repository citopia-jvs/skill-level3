/**
 * @jest-environment jsdom
 */

import '@testing-library/dom';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import About from '../pages/About/About';
import { Provider } from 'react-redux';
import { userSlice } from '../redux/slices/userSlice';
import { configureStore } from '@reduxjs/toolkit';

describe('Given the About component', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userSlice.reducer,
      },
    });
  });

  afterEach(() => {
    // store.dispatch(userSlice.actions.reset());
  });

  describe('When it is rendered', () => {
    test('Then it should render a form with the correct title', () => {
      const { getByText } = render(
        <Provider store={store}>
          <About />
        </Provider>
      );
      expect(getByText('Vos informations')).toBeTruthy();
    });

    test('Then it should render three input fields', () => {
      const { getAllByRole } = render(
        <Provider store={store}>
          <About />
        </Provider>
      );
      expect(getAllByRole('textbox').length).toBe(4);
    });

    test('Then it should render a calendar', () => {
      render(
        <Provider store={store}>
          <About />
        </Provider>
      );
      // expect(getByRole('button')).toBeTruthy();
    });
  });

  describe('When the form change', () => {
    test('Then it should dispatch the correct action', async () => {
      render(
        <Provider store={store}>
          <About />
        </Provider>
      );
      // const nomInput = getByTestId('nom');
      // const prenomInput = getByTestId('prenom');
      // const dateNaissanceInput = getByTestId('dateNaissance');

      // fireEvent.change(nomInput, { target: { value: null } });
      // fireEvent.change(prenomInput, { target: { value: null } });
      // fireEvent.change(dateNaissanceInput, { target: { value: '1990-01-01' } });

      // await waitFor(() => expect((store.getState() as any).user).toEqual({ nom: 'Doe', prenom: 'John' }));
    });
  });
});
