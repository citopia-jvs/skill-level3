// src/tests/Accueil.test.tsx
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Accueil from '@/pages/Accueil';
import { fetchUserAvatar } from '@/features/user/userAPI';
import { sendQuery } from '@/api/wishService';
import axios from 'axios';
import { setAvatarUrl, updateUserInfo } from '@/features/user/userSlice';

// Mock modules
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('@/features/user/userAPI', () => ({
    fetchUserAvatar: jest.fn(),
}));

jest.mock('@/api/wishService', () => ({
    sendQuery: jest.fn(),
}));

describe('Accueil Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        store.dispatch(updateUserInfo({
            firstName: '',
            lastName: '',
            birthDate: '',
            avatarUrl: '',
            lastFetchedFirstName: '',
            lastFetchedLastName: '',
            lastFetchedBirthDate: '',
        }));
    });

    it('fetches avatar when user info changes', async () => {
        // Mock axios response for DummyJSON
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                users: [{
                    image: 'https://example.com/avatar.jpg'
                }]
            }
        });

        // Mock fetchUserAvatar implementation
        (fetchUserAvatar as jest.Mock).mockImplementation(async (firstName, lastName, dispatch) => {
            const avatarUrl = 'https://example.com/avatar.jpg';
            dispatch(setAvatarUrl(avatarUrl));
            dispatch(updateUserInfo({
                lastFetchedFirstName: firstName,
                lastFetchedLastName: lastName,
            }));
            return avatarUrl;
        });

        render(
            <Provider store={store}>
                <Accueil />
            </Provider>
        );

        // Input user information
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/^Nom$/i), {
                target: { value: 'Doe', name: 'lastName' }
            });
        });

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/^Prénom$/i), {
                target: { value: 'John', name: 'firstName' }
            });
        });

        // Verify fetchUserAvatar was called
        await waitFor(() => {
            expect(fetchUserAvatar).toHaveBeenCalledWith(
                'John',
                'Doe',
                expect.any(Function)
            );
        }, { timeout: 3000 });

        // Verify avatar is displayed
        await waitFor(() => {
            const avatarImage = screen.getByAltText(/Avatar/i);
            expect(avatarImage).toHaveAttribute('src', 'https://example.com/avatar.jpg');
        });
    });

    it('handles wish submission and log update', async () => {
        // Mock sendQuery response
        (sendQuery as jest.Mock).mockResolvedValueOnce({
            status: 'success',
            response: 'Success!',
            reasoning: 'Logic complete',
            summary: 'Wish processed',
            processingDetails: [{
                iteration: 1,
                supervisorState: {
                    supervisor: { next: 'complete' },
                    researcher: { messages: [] },
                    cart_manager: { messages: [] }
                }
            }]
        });

        render(
            <Provider store={store}>
                <Accueil />
            </Provider>
        );

        // Submit wish
        const wishInput = screen.getByPlaceholderText(/Entrez votre vœu/i);
        await act(async () => {
            fireEvent.change(wishInput, {
                target: { value: 'I wish for a new laptop' }
            });
        });

        await act(async () => {
            fireEvent.click(screen.getByText(/Vœu!/i));
        });

        // Verify response
        await waitFor(() => {
            expect(screen.getByText(/Réponse: Success!/i)).toBeInTheDocument();
            expect(screen.getByText(/Raisonnement: Logic complete/i)).toBeInTheDocument();
            expect(screen.getByText(/Résumé: Wish processed/i)).toBeInTheDocument();
        });

        expect(sendQuery).toHaveBeenCalledWith('I wish for a new laptop');
    });

    it('clears logs when clear button is clicked', async () => {
        (sendQuery as jest.Mock).mockResolvedValueOnce({
            status: 'success',
            response: 'Success!',
            reasoning: 'Logic complete',
            summary: 'Wish processed',
            processingDetails: [{
                iteration: 1,
                supervisorState: {
                    supervisor: { next: 'complete' }
                }
            }]
        });

        render(
            <Provider store={store}>
                <Accueil />
            </Provider>
        );

        // Generate logs
        const wishInput = screen.getByPlaceholderText(/Entrez votre vœu/i);
        await act(async () => {
            fireEvent.change(wishInput, {
                target: { value: 'Test wish' }
            });
        });

        await act(async () => {
            fireEvent.click(screen.getByText(/Vœu!/i));
        });

        // Wait for logs
        await waitFor(() => {
            expect(screen.getByText(/Réponse: Success!/i)).toBeInTheDocument();
        });

        // Clear logs
        await act(async () => {
            fireEvent.click(screen.getByText(/Vider/i));
        });

        // Verify logs are cleared
        await waitFor(() => {
            expect(screen.queryByText(/Réponse: Success!/i)).not.toBeInTheDocument();
            expect(screen.getByText(/Logs effacés./i)).toBeInTheDocument();
        });
    });
});