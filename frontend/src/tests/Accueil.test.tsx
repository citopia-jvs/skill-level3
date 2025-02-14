import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Accueil from '../pages/Accueil';
import { fetchUserAvatar } from '@/features/user/userAPI';
import { sendQuery } from '../api/wishService';
import { setAvatarUrl } from '@/features/user/userSlice';

jest.mock('@/features/user/userAPI', () => ({
    fetchUserAvatar: jest.fn(),
}));

jest.mock('../api/wishService', () => ({
    sendQuery: jest.fn(),
}));

describe('Accueil Component', () => {
    test('fetches avatar when user info changes', async () => {
        /*
        * Instead of mockResolvedValueOnce, we use mockImplementationOnce
        * so we can manually dispatch setAvatarUrl(...) to the store,
        * exactly as your real fetchUserAvatar code would do.
        */
        (fetchUserAvatar as jest.Mock).mockImplementationOnce(
            (_firstName: string, _lastName: string, dispatch: any) => {
                dispatch(setAvatarUrl('https://example.com/avatar.jpg'));
            }
        );

        render(
            <Provider store={store}>
                <Accueil />
            </Provider>
        );

// Use anchored regex (/^Nom$/i) so "Nom" doesn't match "Prénom".
        fireEvent.change(screen.getByLabelText(/^Nom$/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/^Prénom$/i), { target: { value: 'Doe' } });

// Wait for fetchUserAvatar to have been called
        await waitFor(() => expect(fetchUserAvatar).toHaveBeenCalledTimes(1));

// Check if the avatar image is actually rendered
        const avatarImage = screen.getByAltText(/avatar/i) as HTMLImageElement;
        expect(avatarImage).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    test('handles wish submission and log update', async () => {
// Mock the response for sendQuery
        (sendQuery as jest.Mock).mockResolvedValueOnce({
            response: 'Success!',
            reasoning: 'Logic complete',
            summary: 'Wish processed',
            processingDetails: [{ step: 'Step 1', result: 'Success' }],
        });


        render(
            <Provider store={store}>
                <Accueil />
            </Provider>
        );

// Type a wish
        fireEvent.change(screen.getByPlaceholderText(/Entrez votre vœu/i), {
            target: { value: 'I wish for a new laptop' },
        });

// Click the "Vœu!" button
        fireEvent.click(screen.getByText(/Vœu!/i));

// Wait for the sendQuery mock to have been called
        await waitFor(() => expect(sendQuery).toHaveBeenCalledTimes(1));

// Verify logs
        expect(screen.getByText(/Réponse: Success!/i)).toBeInTheDocument();
        expect(screen.getByText(/Raisonnement: Logic complete/i)).toBeInTheDocument();
        expect(screen.getByText(/Résumé: Wish processed/i)).toBeInTheDocument();

        /*
         * Since the text in DOM for steps is:
         *   > [Étape 1] {"step":"Step 1","result":"Success"}
         * We can match via substring or via a more flexible regex:
         */
        expect(
            screen.getByText((content) =>
                content.includes('[Étape 1] {"step":"Step 1","result":"Success"}')
            )
        ).toBeInTheDocument();

// Alternatively, a regex approach might look like:
// expect(
//   screen.getByText(/$$Étape 1$$\s*\{"step":"Step 1","result":"Success"\}/i)
// ).toBeInTheDocument();
    });
});