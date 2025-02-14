import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from '../features/user/userSlice'; // Assuming userSlice is located here
import watchUserData from '../features/user/userSaga'; // Your saga watcher file (adjust the path if necessary)

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store
export const store = configureStore({
    reducer: {
        user: userReducer, // Adds userReducer to the store
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware), // Add saga middleware here
});

// Run the saga middleware
sagaMiddleware.run(watchUserData);

// Export types for better TypeScript support
export type RootState = ReturnType<typeof store.getState>; // RootState will be used to infer the state shape
export type AppDispatch = typeof store.dispatch; // AppDispatch will be used to type dispatch correctly
