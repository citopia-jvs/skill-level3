/**
 * @jest-environment jsdom
 */

import { describe, expect, test, beforeAll } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

describe('Given that I am visiting the app', () => {
  beforeAll(() => {
    render(<App />);
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

    test('Then it should renders the Home component', () => {
      const homeElement = screen.getByTestId('home-title');
      expect(homeElement).toBeTruthy();
    });
  });

  describe('When I navigate to the About page from the menu link item', () => {
    test('Then it should redirect to the About page and renders the About component', () => {
      fireEvent.click(screen.getByTestId('about'));
      // screen.debug();
      const aboutElement = screen.getByTestId('about-title');
      expect(aboutElement).toBeTruthy();
    });
  });
});
