// src/test/test-utils.tsx
import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/store/userSlice'

const createTestStore = (preloadedState = {}) => {
    return configureStore({
        reducer: {
            user: userReducer
        },
        preloadedState
    })
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = createTestStore(preloadedState),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            </Provider>
        )
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}