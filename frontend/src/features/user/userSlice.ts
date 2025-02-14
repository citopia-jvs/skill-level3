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
        // Updates user information and can handle partial updates
        updateUserInfo: (state, action: PayloadAction<Partial<UserState>>) => {
            state.firstName = action.payload.firstName ?? state.firstName;
            state.lastName = action.payload.lastName ?? state.lastName;
            state.birthDate = action.payload.birthDate ?? state.birthDate;
            state.avatarUrl = action.payload.avatarUrl ?? state.avatarUrl;
        },

        // Specifically update avatar URL
        setAvatarUrl: (state, action: PayloadAction<string | null>) => {
            state.avatarUrl = action.payload ?? ''; // If null, fallback to empty string
        },

        // Store the last fetched data to avoid unnecessary API calls
        updateLastFetchedInfo: (state) => {
            state.lastFetchedFirstName = state.firstName;
            state.lastFetchedLastName = state.lastName;
            state.lastFetchedBirthDate = state.birthDate;
        },
    },
});

export const { updateUserInfo, setAvatarUrl, updateLastFetchedInfo } = userSlice.actions;
export default userSlice.reducer;
