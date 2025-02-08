import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    firstName: string;
    lastName: string;
    birthDate: string;
    avatarUrl: string; // ✅ Always a string
}

const initialState: UserState = {
    firstName: '',
    lastName: '',
    birthDate: '',
    avatarUrl: '' // ✅ Default avatar (prevents flickering)
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserInfo: (state, action: PayloadAction<Partial<UserState>>) => {
            return { ...state, ...action.payload };
        },
        setAvatarUrl: (state, action: PayloadAction<string>) => {
            // Safeguard to ensure avatarUrl is always a string
            state.avatarUrl = action.payload || state.avatarUrl; // Fallback to current value if empty string
        }
    }
});

export const { updateUserInfo, setAvatarUrl } = userSlice.actions;
export default userSlice.reducer;
