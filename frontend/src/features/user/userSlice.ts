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
            state.avatarUrl = action.payload || state.avatarUrl; // ✅ Never set to null
        }
    }
});

export const { updateUserInfo, setAvatarUrl } = userSlice.actions;
export default userSlice.reducer;
