// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice'; // Assuming userSlice is located here

// Create the Redux store
export const store = configureStore({
    reducer: {
        user: userReducer, // Adds userReducer to the store
    },
});

// Export types for better TypeScript support
export type RootState = ReturnType<typeof store.getState>; // RootState will be used to infer the state shape
export type AppDispatch = typeof store.dispatch; // AppDispatch will be used to type dispatch correctly
