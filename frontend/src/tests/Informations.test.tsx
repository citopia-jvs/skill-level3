import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';  //  Redux store
import Informations from '../pages/Informations';

describe('Informations Page', () => {
    test('renders form inputs', () => {
        // Render the component wrapped with the Redux Provider
        render(
            <Provider store={store}>
                <Informations />
            </Provider>
        );

        // Use getAllByLabelText and filter by id for more precision
        const inputs = screen.getAllByLabelText(/Nom/i);
        const inputNom = inputs.find(input => input.id === 'lastName') as HTMLInputElement;

        // Ensure input is rendered
        expect(inputNom).toBeInTheDocument();

        // Simulate a change event on the input field
        fireEvent.change(inputNom, { target: { value: 'John' } });

        // Check if the value of the input field has changed
        expect(inputNom.value).toBe('John');
    });
});
