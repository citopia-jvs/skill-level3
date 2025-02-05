import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormData } from '../../types';

const initialState: FormData = {
  prenom: null,
  nom: null,
  dateNaissance: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes.
    registerUserInfosAction: (state, action: PayloadAction<Partial<FormData>>) => {
      state.prenom = action.payload.prenom || '';
      state.nom = action.payload.nom || '';
      state.dateNaissance = action.payload.dateNaissance || null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { registerUserInfosAction } = userSlice.actions;

export default userSlice.reducer;
