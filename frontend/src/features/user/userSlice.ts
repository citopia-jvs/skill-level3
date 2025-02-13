// src/features/user/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    firstName: string;
    lastName: string;
    birthDate: string;
    avatarUrl: string; // Always a string
    lastFetchedFirstName: string;
    lastFetchedLastName: string;
    lastFetchedBirthDate: string;
}

const initialState: UserState = {
    firstName: '',
    lastName: '',
    birthDate: '',
    avatarUrl: '', // Default avatar (prevents flickering)
    lastFetchedFirstName: '',
    lastFetchedLastName: '',
    lastFetchedBirthDate: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserInfo: (state, action: PayloadAction<Partial<UserState>>) => {
            return { ...state, ...action.payload };
        },
        setAvatarUrl: (state, action: PayloadAction<string | null>) => {
            state.avatarUrl = action.payload ?? ''; // Use empty string if null
        },
        updateLastFetchedInfo: (state) => {
            state.lastFetchedFirstName = state.firstName;
            state.lastFetchedLastName = state.lastName;
            state.lastFetchedBirthDate = state.birthDate;
        },
    }
});

export const { updateUserInfo, setAvatarUrl, updateLastFetchedInfo } = userSlice.actions;
export default userSlice.reducer;