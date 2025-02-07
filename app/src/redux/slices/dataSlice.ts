// features/postsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { DummyData } from '../../types';

const initialState: DummyData = {
  url: '',
  loading: false,
  error: false,
};

export const dataSlice = createSlice({
  name: 'dummydata',
  initialState,
  reducers: {
    fetchDataRequest: (state) => {
      state.url = '';
      state.loading = true;
      state.error = false;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.url = action.payload;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure } = dataSlice.actions;
export default dataSlice.reducer;
