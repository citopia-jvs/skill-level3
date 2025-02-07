// src/pages/__tests__/Accueil.test.tsx
import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../test/test-utils'
import Accueil from '../Accueil'
import React from "react";
describe('Accueil', () => {
    it('renders loading state initially', () => {
        renderWithProviders(<Accueil />)
        expect(screen.getByText(/chargement/i)).toBeInTheDocument()
    })

    it('renders user data when available', async () => {
        const preloadedState = {
            user: {
                firstName: 'John',
                lastName: 'Doe',
                birthDate: '2000-01-01',
                loading: false,
                error: null
            }
        }

        renderWithProviders(<Accueil />, { preloadedState })

        await waitFor(() => {
            expect(screen.getByText(/bienvenue john doe/i)).toBeInTheDocument()
        })
    })

    it('renders error message when fetch fails', async () => {
        const preloadedState = {
            user: {
                firstName: '',
                lastName: '',
                birthDate: '',
                loading: false,
                error: 'Failed to fetch user data'
            }
        }

        renderWithProviders(<Accueil />, { preloadedState })

        await waitFor(() => {
            expect(screen.getByText(/failed to fetch user data/i)).toBeInTheDocument()
        })
    })
})