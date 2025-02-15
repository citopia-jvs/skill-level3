// src/features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    firstName: string;
    lastName: string;
    birthDate: string;
    avatarUrl: string;
    lastFetchedFirstName: string;
    lastFetchedLastName: string;
    lastFetchedBirthDate: string;
}

const initialState: UserState = {
    firstName: '',
    lastName: '',
    birthDate: '',
    avatarUrl: '',
    lastFetchedFirstName: '',
    lastFetchedLastName: '',
    lastFetchedBirthDate: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserInfo: (state, action: PayloadAction<Partial<UserState>>) => {
            if (action.payload.firstName !== undefined) {
                state.firstName = action.payload.firstName;
            }
            if (action.payload.lastName !== undefined) {
                state.lastName = action.payload.lastName;
            }
            if (action.payload.birthDate !== undefined) {
                state.birthDate = action.payload.birthDate;
            }
            if (action.payload.avatarUrl !== undefined) {
                state.avatarUrl = action.payload.avatarUrl;
            }
            if (action.payload.lastFetchedFirstName !== undefined) {
                state.lastFetchedFirstName = action.payload.lastFetchedFirstName;
            }
            if (action.payload.lastFetchedLastName !== undefined) {
                state.lastFetchedLastName = action.payload.lastFetchedLastName;
            }
            if (action.payload.lastFetchedBirthDate !== undefined) {
                state.lastFetchedBirthDate = action.payload.lastFetchedBirthDate;
            }
        },
        setAvatarUrl: (state, action: PayloadAction<string>) => {
            state.avatarUrl = action.payload;
        },
        // Add the updateLastFetchedInfo action
        updateLastFetchedInfo: (state) => {
            state.lastFetchedFirstName = state.firstName;
            state.lastFetchedLastName = state.lastName;
            state.lastFetchedBirthDate = state.birthDate;
        },
    },
});

// Export actions
export const {
    updateUserInfo,
    setAvatarUrl,
    updateLastFetchedInfo  // Export the new action
} = userSlice.actions;

export default userSlice.reducer;