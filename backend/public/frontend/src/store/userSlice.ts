import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    firstName: string;
    lastName: string;
    birthDate: string;
}

const initialState: UserState = {
    firstName: "",
    lastName: "",
    birthDate: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<UserState>) => {
            return { ...state, ...action.payload };
        },
        fetchUserRequest: (state) => state, // ✅ Add this if missing
    },
});

export const { updateUser, fetchUserRequest } = userSlice.actions;
export default userSlice.reducer;
