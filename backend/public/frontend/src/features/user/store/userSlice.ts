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
            return action.payload;
        },
        fetchUserRequest: () => {},
    },
});

export const { updateUser, fetchUserRequest } = userSlice.actions;
export default userSlice.reducer;
