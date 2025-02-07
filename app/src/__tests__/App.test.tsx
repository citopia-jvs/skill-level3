/**
 * @jest-environment jsdom
 */

import { describe, expect, test, beforeAll } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../redux/slices/userSlice';
import dataSlice from '../redux/slices/dataSlice';

describe('Given that I am visiting the app', () => {
  beforeAll(() => {
    const store: ReturnType<typeof configureStore> = configureStore({
      reducer: {
        user: userSlice.reducer,
        dummyData: dataSlice,
      },
    });
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    screen.debug(); // prints out the jsx tree unto the command line
  });

  describe('When I navigate on the home page', () => {
    test('Then it should renders Header component', () => {
      const headerElement = screen.getByTestId('header');
      expect(headerElement).toBeTruthy();
    });

    test('Then it should renders Menu into Header', () => {
      const homeElement = screen.getByTestId('home');
      const aboutElement = screen.getByTestId('about');
      expect(homeElement).toBeTruthy();
      expect(aboutElement).toBeTruthy();
    });

    test('Then it should renders the content of Home component', async () => {
      await waitFor(() => {
        const homeElement = screen.getByTestId('welcome-title');
        expect(homeElement).toBeTruthy();
      });
    });

    describe('When I navigate to the About page from the menu link item', () => {
      test('Then it should redirect to the About page and renders the About component', async () => {
        fireEvent.click(screen.getByTestId('about'));
        await waitFor(() => {
          const aboutElement = screen.getByTestId('about-title');
          expect(aboutElement).toBeTruthy();
        });
      });
    });
  });
});
